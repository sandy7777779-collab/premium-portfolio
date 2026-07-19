import { useState, useEffect } from 'react';

export function Footer() {
  const [time, setTime] = useState('');

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

  return (
    <footer id="contact" className="px-6 py-12 md:px-12 md:py-24 border-t border-[#262626]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        
        <div className="flex flex-col gap-2">
          <h3 className="font-serif text-2xl font-medium mb-4">Contact</h3>
          <a href="mailto:sand.y7777779@gmail.com" className="font-sans text-[#8A8A8A] hover:text-[#E5E5E5] transition-colors">
            sand.y7777779@gmail.com
          </a>
          <a href="https://github.com/Santhosh" target="_blank" rel="noreferrer" className="font-sans text-[#8A8A8A] hover:text-[#E5E5E5] transition-colors">
            GitHub
          </a>
          <a href="https://linkedin.com/in/Santhosh" target="_blank" rel="noreferrer" className="font-sans text-[#8A8A8A] hover:text-[#E5E5E5] transition-colors">
            LinkedIn
          </a>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-serif text-2xl font-medium mb-4">Local Time</h3>
          <p className="font-sans text-[#8A8A8A]">Chennai, India (IST)</p>
          <p className="font-sans text-[#E5E5E5] font-medium tabular-nums">{time}</p>
        </div>

        <div className="flex flex-col gap-2 md:items-end justify-end">
          <p className="font-sans text-[#8A8A8A] text-sm">
            © {new Date().getFullYear()} Santhosh. All Rights Reserved.
          </p>
          <p className="font-sans text-[#8A8A8A] text-xs uppercase tracking-widest mt-2">
            Design & Engineering
          </p>
        </div>

      </div>
    </footer>
  );
}
