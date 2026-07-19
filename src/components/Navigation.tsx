import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      // GSAP staggered menu reveal
      const items = menuItemsRef.current.filter(Boolean);
      gsap.fromTo(items,
        { y: 80, opacity: 0, rotateX: -15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power4.out',
          delay: 0.2,
        }
      );

      if (lineRef.current) {
        gsap.fromTo(lineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.2, ease: 'power4.inOut', delay: 0.5 }
        );
      }
    }
  }, [isOpen]);

  const navItems = [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-40 flex justify-between items-center px-6 py-8 md:px-12 md:py-10 transition-all duration-700 ${scrolled ? 'bg-[#0D0D0D]/80 backdrop-blur-md' : 'bg-transparent'}`}>
        {/* Bottom border with gradient fade */}
        <div className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#262626] to-transparent transition-opacity duration-700 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />

        <a href="#" className="font-serif text-2xl font-medium tracking-wide relative group" data-magnetic>
          S.
          <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#E5E5E5] group-hover:w-full transition-all duration-500" />
        </a>

        <button
          onClick={() => setIsOpen(true)}
          className="relative w-10 h-10 flex flex-col justify-center items-end gap-1.5 group"
          data-magnetic
        >
          <span className="w-8 h-[1px] bg-[#E5E5E5] group-hover:w-6 transition-all duration-300" />
          <span className="w-5 h-[1px] bg-[#E5E5E5] group-hover:w-8 transition-all duration-300" />
        </button>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at calc(100% - 48px) 48px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 48px) 48px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 48px) 48px)' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-[#0D0D0D] text-[#E5E5E5] flex flex-col px-6 py-8 md:px-12 md:py-10"
          >
            <div className="flex justify-between items-center">
              <div className="font-serif text-2xl font-medium tracking-wide">
                S.
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="relative w-10 h-10 flex items-center justify-center group"
                data-magnetic
              >
                <span className="absolute w-8 h-[1px] bg-[#E5E5E5] rotate-45 group-hover:rotate-[135deg] transition-transform duration-500" />
                <span className="absolute w-8 h-[1px] bg-[#E5E5E5] -rotate-45 group-hover:rotate-[45deg] transition-transform duration-500" />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center gap-4">
              {navItems.map((item, i) => (
                <a
                  key={item.label}
                  href={item.href}
                  ref={(el) => { menuItemsRef.current[i] = el; }}
                  onClick={() => setIsOpen(false)}
                  className="font-serif text-6xl md:text-8xl font-light relative group block overflow-hidden"
                  style={{ perspective: '400px' }}
                >
                  <span className="inline-block group-hover:translate-y-[-100%] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                    {item.label}
                  </span>
                  <span className="absolute top-full left-0 inline-block group-hover:translate-y-[-100%] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] italic text-[#8A8A8A]">
                    {item.label}
                  </span>
                </a>
              ))}

              {/* Decorative line */}
              <div
                ref={lineRef}
                className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#8A8A8A] to-transparent mt-8 origin-center"
                style={{ transform: 'scaleX(0)' }}
              />
            </div>

            {/* Footer info */}
            <div className="flex justify-between items-end font-sans text-xs text-[#8A8A8A] tracking-widest uppercase">
              <span>Chennai, India</span>
              <span>Portfolio &mdash; 2026</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
