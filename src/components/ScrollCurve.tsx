import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ScrollCurve() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const dotInnerRef = useRef<SVGCircleElement>(null);
  const [pageHeight, setPageHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      const h = document.documentElement.scrollHeight;
      setPageHeight(h);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    // Observe DOM changes that might change page height
    const observer = new MutationObserver(updateHeight);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('resize', updateHeight);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!pathRef.current || !dotRef.current || !dotInnerRef.current || !glowRef.current || pageHeight === 0) return;

    const path = pathRef.current;
    const glow = glowRef.current;
    const dot = dotRef.current;
    const dotInner = dotInnerRef.current;
    const totalLength = path.getTotalLength();

    // Set initial state — line fully hidden
    gsap.set(path, {
      strokeDasharray: totalLength,
      strokeDashoffset: totalLength,
    });
    gsap.set(glow, {
      strokeDasharray: totalLength,
      strokeDashoffset: totalLength,
    });

    // Animate the line drawing on scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
      },
    });

    tl.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
    }, 0);

    tl.to(glow, {
      strokeDashoffset: 0,
      ease: 'none',
    }, 0);

    // Animate the dot along the path
    ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3,
      onUpdate: (self) => {
        const progress = self.progress;
        const point = path.getPointAtLength(progress * totalLength);
        gsap.set(dot, {
          attr: { cx: point.x, cy: point.y },
        });
        gsap.set(dotInner, {
          attr: { cx: point.x, cy: point.y },
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [pageHeight]);

  if (pageHeight === 0) return null;

  // Generate a smooth, organic S-curve path spanning the full page
  const w = 120; // SVG viewport width
  const h = pageHeight;
  const centerX = 60;
  const amplitude = 35;
  const segments = 8;
  const segmentHeight = h / segments;

  let d = `M ${centerX} 0`;

  for (let i = 0; i < segments; i++) {
    const y1 = i * segmentHeight;
    const y2 = (i + 1) * segmentHeight;
    const midY = (y1 + y2) / 2;
    const direction = i % 2 === 0 ? 1 : -1;
    const cp1x = centerX + amplitude * direction;
    const cp2x = centerX - amplitude * direction;

    d += ` C ${cp1x} ${midY - segmentHeight * 0.15}, ${cp2x} ${midY + segmentHeight * 0.15}, ${centerX} ${y2}`;
  }

  return (
    <svg
      ref={svgRef}
      className="fixed top-0 right-0 z-20 pointer-events-none hidden lg:block"
      width="120"
      height={pageHeight}
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        height: `${pageHeight}px`,
      }}
    >
      <defs>
        {/* Gradient for the line */}
        <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(138,138,138,0)" />
          <stop offset="15%" stopColor="rgba(138,138,138,0.25)" />
          <stop offset="50%" stopColor="rgba(229,229,229,0.35)" />
          <stop offset="85%" stopColor="rgba(138,138,138,0.25)" />
          <stop offset="100%" stopColor="rgba(138,138,138,0)" />
        </linearGradient>

        {/* Glow filter */}
        <filter id="curveGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
        </filter>

        {/* Dot glow */}
        <radialGradient id="dotGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(229,229,229,0.9)" />
          <stop offset="100%" stopColor="rgba(229,229,229,0)" />
        </radialGradient>
      </defs>

      {/* Glow layer (blurred copy of the path) */}
      <path
        ref={glowRef}
        d={d}
        fill="none"
        stroke="rgba(229,229,229,0.08)"
        strokeWidth="6"
        filter="url(#curveGlow)"
        strokeLinecap="round"
      />

      {/* Main curve */}
      <path
        ref={pathRef}
        d={d}
        fill="none"
        stroke="url(#curveGradient)"
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* Tracking dot */}
      <circle
        ref={dotRef}
        cx={centerX}
        cy="0"
        r="3"
        fill="url(#dotGlow)"
      />

      {/* Secondary tiny dot for depth */}
      <circle
        ref={dotInnerRef}
        cx={centerX}
        cy="0"
        r="1.5"
        fill="#E5E5E5"
      />
    </svg>
  );
}
