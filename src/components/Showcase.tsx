import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const showcases = [
  {
    id: '01',
    title: 'Product Engineering',
    description: 'Architecting scalable frontend systems with modern React, TypeScript, and fine-tuned build pipelines.',
    video: '/videos/WhatsApp Video 2026-07-18 at 8.56.21 AM.mp4',
    align: 'left' as const
  },
  {
    id: '02',
    title: 'AI Agent Systems',
    description: 'Integrating LLMs and autonomous agents into seamless, interactive user experiences with high-fidelity feedback loops.',
    video: '/videos/WhatsApp Video 2026-07-18 at 8.56.23 AM.mp4',
    align: 'right' as const
  },
  {
    id: '03',
    title: 'Motion & Media',
    description: 'Crafting delicate, structural animations and fluid interactions that respect the user\'s attention and device performance.',
    video: '/videos/birds_eye_view.mp4',
    align: 'left' as const
  }
];

function ShowcaseItem({ data }: { data: typeof showcases[0] }) {
  const ref = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const idRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-15%' });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const yVideo = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const scaleVideo = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1.03, 0.92]);
  const rotateVideo = useTransform(scrollYProgress, [0, 0.5, 1], [2, 0, -2]);

  useEffect(() => {
    if (!isInView || !titleRef.current || !descRef.current || !idRef.current) return;

    // GSAP reveal for text elements
    const tl = gsap.timeline();

    tl.fromTo(idRef.current,
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    );

    // Split title into words for staggered reveal
    const title = titleRef.current;
    const words = (title.textContent || '').split(' ');
    title.textContent = '';
    const wordEls = words.map((word) => {
      const wrapper = document.createElement('span');
      wrapper.style.overflow = 'hidden';
      wrapper.style.display = 'inline-block';

      const inner = document.createElement('span');
      inner.textContent = word + '\u00A0';
      inner.style.display = 'inline-block';
      inner.style.transform = 'translateY(100%)';
      inner.style.willChange = 'transform';
      wrapper.appendChild(inner);
      title.appendChild(wrapper);
      return inner;
    });

    tl.to(wordEls, {
      y: '0%',
      duration: 1,
      stagger: 0.1,
      ease: 'power4.out',
    }, '-=0.3');

    tl.fromTo(descRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    );

    return () => { tl.kill(); };
  }, [isInView]);

  return (
    <section ref={ref} className="min-h-[110svh] flex items-center py-24 md:py-36 px-6 md:px-12 relative">
      {/* Section divider line */}
      <div className="absolute top-0 left-6 right-6 md:left-12 md:right-12 h-[1px] bg-gradient-to-r from-transparent via-[#262626] to-transparent" />

      {/* Large background number */}
      <div className="absolute top-1/2 -translate-y-1/2 left-6 md:left-12 font-serif text-[20rem] md:text-[30rem] font-light text-[#0D0D0D] select-none pointer-events-none opacity-60 leading-none"
        style={{ WebkitTextStroke: '1px #1a1a1a' }}
      >
        {data.id}
      </div>

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center relative z-10">

        <motion.div
          style={{ y: yText }}
          className={`lg:col-span-5 flex flex-col justify-center ${data.align === 'right' ? 'lg:order-2' : ''}`}
        >
          <div ref={idRef} className="font-sans text-xs tracking-[0.25em] text-[#8A8A8A] mb-8 uppercase flex items-center gap-4">
            <span className="w-8 h-[1px] bg-[#8A8A8A]" />
            Milestone {data.id}
          </div>
          <h2 ref={titleRef} className="font-serif text-5xl md:text-7xl lg:text-8xl font-light mb-8 overflow-hidden">
            {data.title}
          </h2>
          <p ref={descRef} className="font-sans text-[#8A8A8A] leading-relaxed text-lg max-w-md">
            {data.description}
          </p>
        </motion.div>

        <motion.div
          ref={videoRef}
          style={{ y: yVideo, scale: scaleVideo, rotateZ: rotateVideo }}
          className={`lg:col-span-7 ${data.align === 'right' ? 'lg:order-1' : ''}`}
        >
          <motion.div
            initial={{ clipPath: 'inset(100% 0 0 0)' }}
            animate={isInView ? { clipPath: 'inset(0% 0 0 0)' } : {}}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="aspect-[4/3] bg-[#0a0a0a] rounded-sm overflow-hidden relative group"
          >
            {/* Subtle border glow */}
            <div className="absolute inset-0 rounded-sm border border-[#1a1a1a] group-hover:border-[#333] transition-colors duration-700 z-10 pointer-events-none" />

            <video
              src={data.video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100 grayscale group-hover:grayscale-0"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/40 to-transparent pointer-events-none z-10" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

export function Showcase() {
  return (
    <div id="work" className="w-full relative">
      {showcases.map((showcase) => (
        <ShowcaseItem key={showcase.id} data={showcase} />
      ))}
    </div>
  );
}
