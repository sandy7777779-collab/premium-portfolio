import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current || !lineRef.current) return;

    // Split title into individual characters for staggered reveal
    const title = titleRef.current;
    const text = title.textContent || '';
    title.textContent = '';

    const chars = text.split('').map((char) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(100px) rotateX(90deg)';
      span.style.willChange = 'transform, opacity';
      title.appendChild(span);
      return span;
    });

    // Split subtitle into words
    const subtitle = subtitleRef.current;
    const words = (subtitle.textContent || '').split(' ');
    subtitle.textContent = '';

    const wordSpans = words.map((word) => {
      const span = document.createElement('span');
      span.textContent = word + '\u00A0';
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(30px)';
      span.style.willChange = 'transform, opacity';
      subtitle.appendChild(span);
      return span;
    });

    // Master timeline — cinematic entrance
    const tl = gsap.timeline({ delay: 0.3 });

    // Title chars: spring-powered stagger
    tl.to(chars, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 1.2,
      stagger: 0.04,
      ease: 'power4.out',
    });

    // Subtitle words: smooth wave
    tl.to(wordSpans, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.06,
      ease: 'power3.out',
    }, '-=0.6');

    // Decorative line expand
    tl.fromTo(lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.4, ease: 'power4.inOut' },
      '-=0.5'
    );

    return () => { tl.kill(); };
  }, []);

  return (
    <section ref={ref} className="relative min-h-[100svh] flex flex-col justify-center items-center px-6">
      <motion.div
        style={{ y: yText, opacity: opacityText, scale }}
        className="text-center z-10 flex flex-col items-center"
      >
        {/* Decorative top mark */}
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent to-[#8A8A8A] mb-10 opacity-40" />

        <h1
          ref={titleRef}
          className="font-serif text-6xl md:text-8xl lg:text-[10rem] font-light tracking-tight leading-none mb-6"
          style={{ perspective: '600px' }}
        >
          SANTHOSH
        </h1>

        {/* Expanding decorative line */}
        <div
          ref={lineRef}
          className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#8A8A8A] to-transparent mb-8 origin-center"
          style={{ transform: 'scaleX(0)' }}
        />

        <p
          ref={subtitleRef}
          className="font-sans text-xs md:text-sm tracking-[0.3em] text-[#8A8A8A] uppercase max-w-lg"
        >
          Product Designer & Frontend Developer
        </p>
      </motion.div>

      {/* Animated scroll arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-[#8A8A8A]"
      >
        <span className="font-sans text-[10px] tracking-[0.4em] uppercase">Scroll</span>
        <div className="relative w-[1px] h-16 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full bg-[#8A8A8A]"
            animate={{ height: ['0%', '100%', '0%'], top: ['0%', '0%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ willChange: 'height, top' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
