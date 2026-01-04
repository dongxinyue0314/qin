import React, { useState } from 'react';
import InfiniteGrid from './components/InfiniteGrid';
import DrawingCanvas from './components/DrawingCanvas';
import { EverydayObject } from './types';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'canvas'>('home');
  const [selectedObject, setSelectedObject] = useState<EverydayObject | null>(null);

  const handleSelectObject = (obj: EverydayObject) => {
    setSelectedObject(obj);
    setCurrentView('canvas');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedObject(null);
    setCurrentView('home');
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-black selection:text-white">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 py-6 px-8 bg-white/80 backdrop-blur-sm border-b border-gray-100 flex items-center justify-center transition-all duration-300">
        <h1 
            className="font-artistic text-2xl md:text-4xl text-black cursor-pointer"
            onClick={handleBack}
        >
          Faces Hidden in the Everyday
        </h1>
      </header>

      <main>
        {currentView === 'home' ? (
          <InfiniteGrid onSelectObject={handleSelectObject} />
        ) : (
          selectedObject && (
            <DrawingCanvas 
              object={selectedObject} 
              onBack={handleBack} 
            />
          )
        )}
      </main>
    </div>
  );
}

export default App;