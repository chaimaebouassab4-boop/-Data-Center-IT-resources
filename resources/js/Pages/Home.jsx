import { Head } from '@inertiajs/react';
import Hero from '@/Components/Hero';
import Features from '@/Components/Features';
import UserRoles from '@/Components/UserRoles';
import Stats from '@/Components/Stats';
import Footer from '@/Components/Footer';
import { useState, useEffect } from 'react';

export default function Home({ totalResources, utilizationRate, activeReservations }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <Head title="Accueil" />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <Hero 
            totalResources={totalResources}
            utilizationRate={utilizationRate}
            activeReservations={activeReservations}
          />
          <Stats />
          <Features />
          <UserRoles />
          <Footer />
        </div>
      </div>
    </>
  );
}
