import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-40 flex justify-between items-center px-6 py-8 md:px-12 md:py-10 transition-all duration-500 ${scrolled ? 'bg-[#0D0D0D]/80 backdrop-blur-md border-b border-[#262626]' : 'bg-transparent border-transparent'}`}>
        <div className="font-serif text-2xl font-medium tracking-wide">
          S.
        </div>
        <button 
          onClick={() => setIsOpen(true)}
          className="text-[#E5E5E5] hover:text-white transition-colors duration-300"
        >
          <Menu className="w-8 h-8" strokeWidth={1} />
        </button>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-[#0D0D0D] text-[#E5E5E5] flex flex-col px-6 py-8 md:px-12 md:py-10"
          >
            <div className="flex justify-between items-center">
              <div className="font-serif text-2xl font-medium tracking-wide">
                S.
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-[#E5E5E5] hover:text-white transition-colors duration-300"
              >
                <X className="w-8 h-8" strokeWidth={1} />
              </button>
            </div>
            
            <div className="flex-1 flex flex-col justify-center items-center gap-12 font-serif text-5xl md:text-7xl font-light">
              <motion.a 
                href="#work" 
                onClick={() => setIsOpen(false)}
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1, duration: 0.8 }}
                className="hover:italic transition-all duration-300"
              >
                Work
              </motion.a>
              <motion.a 
                href="#about"
                onClick={() => setIsOpen(false)}
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }}
                className="hover:italic transition-all duration-300"
              >
                About
              </motion.a>
              <motion.a 
                href="#contact"
                onClick={() => setIsOpen(false)}
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}
                className="hover:italic transition-all duration-300"
              >
                Contact
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
