import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Showcase } from './components/Showcase';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="relative w-full min-h-screen bg-[#0D0D0D] text-[#E5E5E5] font-sans selection:bg-[#E5E5E5] selection:text-[#0D0D0D] overflow-hidden">
      <div className="ambient-cloud"></div>
      <div className="film-grain"></div>
      
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <Showcase />
      </main>
      <Footer />
    </div>
  );
}

export default App;
