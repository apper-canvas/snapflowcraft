import { useState, useEffect } from 'react';
      import AnimatedBackground from '../atoms/AnimatedBackground';
      import AppHeader from '../organisms/AppHeader';
      import WelcomeSection from '../organisms/WelcomeSection';
      import QuickStatsSection from '../organisms/QuickStatsSection';
      import MainFeatureTemplate from './MainFeatureTemplate';
      
      const HomeTemplate = () => {
        const [currentTime, setCurrentTime] = useState(new Date());
      
        useEffect(() => {
          const timer = setInterval(() => {
            setCurrentTime(new Date());
          }, 1000);
      
          return () => clearInterval(timer);
        }, []);
      
        return (
          <div className="min-h-screen bg-gradient-to-br from-black via-surface-900 to-surface-800 relative overflow-hidden">
            <AnimatedBackground />
            <AppHeader currentTime={currentTime} />
      
            <main className="relative z-10 px-4 md:px-6 pb-6">
              <WelcomeSection />
              <MainFeatureTemplate />
              <QuickStatsSection />
            </main>
          </div>
        );
      };
      
      export default HomeTemplate;