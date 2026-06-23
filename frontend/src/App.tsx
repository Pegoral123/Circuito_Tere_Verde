import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AttractionsView } from './components/Attraction/AttractionsView';
import { RoutesView } from './components/RoutesPark/RoutesView';
import { Footer } from './components/Footer';
import InstallPrompt from './components/InstallPwa';

function App() {
  const [currentView, setCurrentView] = useState<string>('home');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <InstallPrompt />

      <Header
        currentView={currentView}
        onNavigate={setCurrentView}
      />

      <main className="flex-1">
        {currentView === 'home' && (
          <Hero onNavigate={setCurrentView} />
        )}

        {currentView === 'attractions' && (
          <AttractionsView />
        )}

        {currentView === 'routes' && (
          <RoutesView />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;