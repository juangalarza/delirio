import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { StatsBanner } from "@/components/StatsBanner";
import { Esencia } from "@/components/Esencia";
import { Manifesto } from "@/components/Manifesto";
import { Collection } from "@/components/Collection";
import { B2B } from "@/components/B2B";
import { Rewards } from "@/components/Rewards";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Orbs } from "@/components/Orbs";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Orbs />
      <Navbar />

      <main>
        <Hero />
        <StatsBanner />
        <Esencia />
        <Manifesto />
        <Collection />
        <B2B />
        <Rewards />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
