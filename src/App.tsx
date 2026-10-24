import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Education from "./sections/Education";
import Experience from "./sections/Experience";
import Hero from "./sections/Hero";
import Process from "./sections/Process";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";

/**
 * Page order lives here. To remove an optional section (Education, Process…) delete its line;
 * to add one, create a file in src/sections and place it below.
 */
export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-ink"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
