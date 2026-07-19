import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';

export function Footer() {
  const [time, setTime] = useState('');
  const ref = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  useEffect(() => {
    const updateTime = () => {
      const chennaiTime = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setTime(chennaiTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isInView || !titleRef.current) return;

    const title = titleRef.current;
    const text = title.textContent || '';
    title.textContent = '';

    const chars = text.split('').map((char) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(60px)';
      span.style.willChange = 'transform, opacity';
      title.appendChild(span);
      return span;
    });

    gsap.to(chars, {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.03,
      ease: 'power4.out',
    });
  }, [isInView]);

  return (
    <footer ref={ref} id="contact" className="relative px-6 py-24 md:px-12 md:py-36">
      {/* Top divider */}
      <div className="absolute top-0 left-6 right-6 md:left-12 md:right-12 h-[1px] bg-gradient-to-r from-transparent via-[#262626] to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Large CTA headline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="mb-20"
        >
          <h2
            ref={titleRef}
            className="font-serif text-5xl md:text-7xl lg:text-9xl font-light leading-tight"
          >
            Let's work together
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col gap-3"
          >
            <h3 className="font-sans text-xs tracking-[0.25em] text-[#8A8A8A] uppercase mb-4 flex items-center gap-3">
              <span className="w-6 h-[1px] bg-[#8A8A8A]" />
              Contact
            </h3>
            <a href="mailto:sand.y7777779@gmail.com" className="font-sans text-[#8A8A8A] hover:text-[#E5E5E5] transition-colors duration-500 group inline-flex items-center gap-2">
              sand.y7777779@gmail.com
              <span className="w-0 group-hover:w-4 h-[1px] bg-[#E5E5E5] transition-all duration-500" />
            </a>
            <a href="https://github.com/Santhosh" target="_blank" rel="noreferrer" className="font-sans text-[#8A8A8A] hover:text-[#E5E5E5] transition-colors duration-500 group inline-flex items-center gap-2">
              GitHub
              <span className="w-0 group-hover:w-4 h-[1px] bg-[#E5E5E5] transition-all duration-500" />
            </a>
            <a href="https://linkedin.com/in/Santhosh" target="_blank" rel="noreferrer" className="font-sans text-[#8A8A8A] hover:text-[#E5E5E5] transition-colors duration-500 group inline-flex items-center gap-2">
              LinkedIn
              <span className="w-0 group-hover:w-4 h-[1px] bg-[#E5E5E5] transition-all duration-500" />
            </a>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col gap-3"
          >
            <h3 className="font-sans text-xs tracking-[0.25em] text-[#8A8A8A] uppercase mb-4 flex items-center gap-3">
              <span className="w-6 h-[1px] bg-[#8A8A8A]" />
              Local Time
            </h3>
            <p className="font-sans text-[#8A8A8A]">Chennai, India (IST)</p>
            <p className="font-sans text-[#E5E5E5] font-medium tabular-nums text-lg">{time}</p>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col gap-3 md:items-end justify-end"
          >
            <p className="font-sans text-[#8A8A8A] text-sm">
              © {new Date().getFullYear()} Santhosh
            </p>
            <p className="font-sans text-[#8A8A8A] text-xs uppercase tracking-[0.2em]">
              Design & Engineering
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
