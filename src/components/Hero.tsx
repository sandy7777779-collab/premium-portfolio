import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacityText = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100svh] flex flex-col justify-center items-center px-6 editorial-grid">
      <motion.div 
        style={{ y: yText, opacity: opacityText }}
        className="text-center z-10 flex flex-col items-center"
      >
        <motion.h1 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-6xl md:text-8xl lg:text-[10rem] font-light tracking-tight leading-none mb-8"
        >
          SANTHOSH
        </motion.h1>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-sans text-xs md:text-sm tracking-[0.3em] text-[#8A8A8A] uppercase max-w-lg"
        >
          Product Designer & Frontend Developer
        </motion.p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-[#8A8A8A]"
      >
        <span className="font-sans text-[10px] tracking-widest uppercase">Explore</span>
        <svg width="14" height="60" viewBox="0 0 14 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path 
            d="M7 0L7 58M7 58L1 52M7 58L13 52" 
            stroke="#8A8A8A" 
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0.2 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
          />
        </svg>
      </motion.div>
    </section>
  );
}
