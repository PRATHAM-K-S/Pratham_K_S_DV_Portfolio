import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SignalTrace from "@/components/SignalTrace";

export default function Home() {
  return (
    <>
      <Navbar />
      <SignalTrace>
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
      </SignalTrace>
      <Footer />
    </>
  );
}
