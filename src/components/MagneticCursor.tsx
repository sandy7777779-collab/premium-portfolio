import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const followerPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;

      gsap.to(cursor, {
        x: pos.x,
        y: pos.y,
        duration: 0.15,
        ease: 'power2.out',
      });
    };

    // Smooth follower with spring physics
    const updateFollower = () => {
      followerPos.x += (pos.x - followerPos.x) * 0.08;
      followerPos.y += (pos.y - followerPos.y) * 0.08;

      gsap.set(follower, {
        x: followerPos.x,
        y: followerPos.y,
      });

      requestAnimationFrame(updateFollower);
    };

    // Magnetic hover for interactive elements
    const magneticElements = document.querySelectorAll('a, button, [data-magnetic]');
    
    const handleEnter = () => setIsHovering(true);
    const handleLeave = () => setIsHovering(false);

    magneticElements.forEach((el) => {
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    window.addEventListener('mousemove', handleMouseMove);
    const animId = requestAnimationFrame(updateFollower);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
      magneticElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Inner dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[100] pointer-events-none hidden md:block"
        style={{
          width: isHovering ? '8px' : '6px',
          height: isHovering ? '8px' : '6px',
          backgroundColor: '#E5E5E5',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.3s, height 0.3s',
          mixBlendMode: 'difference',
        }}
      />
      {/* Outer ring follower */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 z-[99] pointer-events-none hidden md:block"
        style={{
          width: isHovering ? '56px' : '36px',
          height: isHovering ? '56px' : '36px',
          border: `1px solid ${isHovering ? 'rgba(229,229,229,0.6)' : 'rgba(229,229,229,0.2)'}`,
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.4s cubic-bezier(0.22,1,0.36,1), height 0.4s cubic-bezier(0.22,1,0.36,1), border-color 0.3s',
          mixBlendMode: 'difference',
        }}
      />
    </>
  );
}
