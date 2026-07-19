import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const showcases = [
  {
    id: '01',
    title: 'Product Engineering',
    description: 'Architecting scalable frontend systems with modern React, TypeScript, and fine-tuned build pipelines.',
    video: '/videos/WhatsApp Video 2026-07-18 at 8.56.21 AM.mp4',
    align: 'left'
  },
  {
    id: '02',
    title: 'AI Agent Systems',
    description: 'Integrating LLMs and autonomous agents into seamless, interactive user experiences with high-fidelity feedback loops.',
    video: '/videos/WhatsApp Video 2026-07-18 at 8.56.23 AM.mp4',
    align: 'right'
  },
  {
    id: '03',
    title: 'Motion & Media',
    description: 'Crafting delicate, structural animations and fluid interactions that respect the user\'s attention and device performance.',
    video: '/videos/WhatsApp Video 2026-07-18 at 8.56.30 AM.mp4',
    align: 'left'
  }
];

function ShowcaseItem({ data }: { data: typeof showcases[0] }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const yText = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const yVideo = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const scaleVideo = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.02, 0.95]);

  return (
    <section ref={ref} className="min-h-[120svh] flex items-center py-24 px-6 md:px-12 border-t border-[#262626]">
      <div className={`w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center`}>
        
        <motion.div 
          style={{ opacity, y: yText }}
          className={`lg:col-span-5 flex flex-col justify-center ${data.align === 'right' ? 'lg:order-2' : ''}`}
        >
          <div className="font-sans text-xs tracking-[0.2em] text-[#8A8A8A] mb-8 uppercase">
            Milestone // {data.id}
          </div>
          <h2 className="font-serif text-5xl md:text-7xl font-light mb-6">
            {data.title}
          </h2>
          <p className="font-sans text-[#8A8A8A] leading-relaxed text-lg max-w-md">
            {data.description}
          </p>
        </motion.div>
        
        <motion.div 
          style={{ opacity, y: yVideo, scale: scaleVideo }}
          className={`lg:col-span-7 ${data.align === 'right' ? 'lg:order-1' : ''}`}
        >
          <div className="aspect-[4/3] bg-[#121212] rounded-sm overflow-hidden border border-[#262626] relative group shadow-2xl">
            <video 
              src={data.video}
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 grayscale group-hover:grayscale-0"
            />
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}

export function Showcase() {
  return (
    <div id="work" className="w-full">
      {showcases.map((showcase) => (
        <ShowcaseItem key={showcase.id} data={showcase} />
      ))}
    </div>
  );
}
