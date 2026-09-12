import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Education from './sections/Education';
import Experience from './sections/Experience';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Achievements from './sections/Achievements';
import Resume from './sections/Resume';
import Contact from './sections/Contact';
import { initLenis } from './animations/gsapSetup';
import { useScrollAnimations } from './animations/scrollAnimations';
import './App.css';

function App() {
  useScrollAnimations();

  useEffect(() => {
    const lenisState = initLenis();

    return () => {
      lenisState.destroy();
    };
  }, []);

  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <Experience />
        <Skills />
        <Projects />
        <Achievements />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
