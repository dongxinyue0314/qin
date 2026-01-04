import React, { useEffect, useState, useCallback } from 'react';
import { EverydayObject } from '../types';
import { OBJECTS } from '../constants';

interface InfiniteGridProps {
  onSelectObject: (obj: EverydayObject) => void;
}

const InfiniteGrid: React.FC<InfiniteGridProps> = ({ onSelectObject }) => {
  // Initialize with 3 sets of the original objects to create immediate scroll depth
  const [displayItems, setDisplayItems] = useState<EverydayObject[]>([
    ...OBJECTS,
    ...OBJECTS,
    ...OBJECTS
  ]);

  const handleScroll = useCallback(() => {
    // Check if user has scrolled near the bottom
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    // Threshold: 200px from bottom
    if (scrollTop + windowHeight >= docHeight - 200) {
      // Append another set of objects to simulate infinity
      setDisplayItems((prev) => [...prev, ...OBJECTS]);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="w-full max-w-7xl mx-auto pt-32 pb-20 px-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {displayItems.map((obj, index) => (
          <div
            key={`${obj.id}-${index}`}
            className="group relative cursor-pointer flex flex-col items-center justify-center p-6 transition-transform duration-300 hover:scale-105"
            onClick={() => onSelectObject(obj)}
          >
            <div className="w-full aspect-square relative bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <img
                src={obj.imageUrl}
                alt={obj.name}
                className="w-4/5 h-4/5 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none select-none"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5">
                <span className="bg-black text-white px-4 py-2 rounded-full font-artistic text-sm">
                  Draw Face
                </span>
              </div>
            </div>
            <p className="mt-4 text-gray-400 font-light text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
              {obj.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteGrid;