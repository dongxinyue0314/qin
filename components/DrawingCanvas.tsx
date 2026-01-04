import React, { useEffect, useRef, useState } from 'react';
import { EverydayObject, P5Instance, Artwork } from '../types';
import { FLUORESCENT_COLORS, STORAGE_KEY } from '../constants';

interface DrawingCanvasProps {
  object: EverydayObject;
  onBack: () => void;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ object, onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<P5Instance | null>(null);
  const [currentColor, setCurrentColor] = useState<string>(FLUORESCENT_COLORS[0].hex);
  const [gallery, setGallery] = useState<Artwork[]>([]);
  
  // Dimensions for the square canvas
  const CANVAS_SIZE = 500;

  // Load local storage data
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const allArtworks: Artwork[] = JSON.parse(savedData);
      // Filter for current object
      const objectArtworks = allArtworks
        .filter(art => art.objectId === object.id)
        .sort((a, b) => b.createdAt - a.createdAt);
      setGallery(objectArtworks);
    }
  }, [object.id]);

  // Initialize p5
  useEffect(() => {
    if (!containerRef.current) return;

    // cleanup previous instance if exists (shouldn't happen due to deps, but safety first)
    if (p5InstanceRef.current) {
      p5InstanceRef.current.remove();
    }

    const sketch = (p: P5Instance) => {
      let bgImage: any;

      p.setup = () => {
        const canvas = p.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
        // Ensure image fits properly
        bgImage = p.loadImage(object.imageUrl, (img) => {
            p.image(img, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
        });
        p.stroke(currentColor);
        p.strokeWeight(4);
      };

      p.draw = () => {
        if (p.mouseIsPressed) {
          // Check if mouse inside canvas
          if (p.mouseX >= 0 && p.mouseX <= CANVAS_SIZE && p.mouseY >= 0 && p.mouseY <= CANVAS_SIZE) {
            p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
          }
        }
      };
      
      // We expose a custom method to the instance to allow external control
      (p as any).updateColor = (color: string) => {
        p.stroke(color);
      };

      (p as any).resetCanvas = () => {
        p.clear();
        p.background(255); // Should effectively clear to transparent if not for the image redraw
        // Redraw image
        if (bgImage) {
           p.image(bgImage, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
        }
      };
    };

    // Instantiate p5 in instance mode
    // @ts-ignore - accessing window.p5
    p5InstanceRef.current = new window.p5(sketch, containerRef.current);

    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [object]);

  // Update color when state changes
  useEffect(() => {
    if (p5InstanceRef.current) {
      (p5InstanceRef.current as any).updateColor(currentColor);
    }
  }, [currentColor]);

  const handleClear = () => {
    if (p5InstanceRef.current) {
      (p5InstanceRef.current as any).resetCanvas();
    }
  };

  const handleSubmit = () => {
    if (p5InstanceRef.current) {
      const canvas = p5InstanceRef.current.canvas;
      const dataUrl = canvas.toDataURL('image/png');
      
      const newArtwork: Artwork = {
        id: crypto.randomUUID(),
        objectId: object.id,
        dataUrl,
        createdAt: Date.now()
      };

      // Save to localStorage
      const savedData = localStorage.getItem(STORAGE_KEY);
      let allArtworks: Artwork[] = savedData ? JSON.parse(savedData) : [];
      allArtworks.push(newArtwork);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allArtworks));

      // Update local state
      setGallery(prev => [newArtwork, ...prev]);
      
      // Optional: Clear after submit? Or let them keep drawing. 
      // Let's clear to indicate success.
      handleClear();
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col items-center animate-fade-in">
        
      {/* Navigation */}
      <div className="w-full max-w-4xl px-6 mb-4 flex justify-start">
        <button 
            onClick={onBack}
            className="text-gray-500 hover:text-black transition-colors font-light flex items-center gap-2"
        >
            ← Back to Collection
        </button>
      </div>

      {/* Main Interaction Area */}
      <div className="bg-white p-4 shadow-xl rounded-sm border border-gray-100">
        <div ref={containerRef} className="cursor-crosshair bg-white" />
      </div>

      {/* Controls */}
      <div className="mt-8 flex flex-col items-center gap-6 w-full max-w-md">
        
        {/* Color Palette */}
        <div className="flex gap-4">
          {FLUORESCENT_COLORS.map((c) => (
            <button
              key={c.hex}
              onClick={() => setCurrentColor(c.hex)}
              className={`w-10 h-10 rounded-full transition-transform hover:scale-110 focus:outline-none border-2 ${
                currentColor === c.hex ? 'border-gray-900 scale-110' : 'border-transparent'
              }`}
              style={{ backgroundColor: c.hex, boxShadow: `0 0 10px ${c.hex}80` }}
              aria-label={`Select ${c.name}`}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-4 w-full">
            <button 
                onClick={handleClear}
                className="flex-1 py-3 px-6 border border-gray-300 text-gray-600 font-light hover:bg-gray-50 transition-colors rounded-sm uppercase tracking-widest text-sm"
            >
                Clear
            </button>
            <button 
                onClick={handleSubmit}
                className="flex-1 py-3 px-6 bg-black text-white hover:bg-gray-800 transition-colors rounded-sm uppercase tracking-widest text-sm font-semibold"
            >
                Submit
            </button>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="mt-24 w-full max-w-6xl px-6 border-t border-gray-100 pt-12">
        <h3 className="font-artistic text-2xl mb-8 text-center text-gray-800">
            Gallery: {object.name} Variations
        </h3>
        
        {gallery.length === 0 ? (
            <p className="text-center text-gray-400 font-light italic">No faces found yet. Be the first.</p>
        ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {gallery.map(art => (
                    <div key={art.id} className="aspect-square bg-gray-50 border border-gray-100 rounded-sm overflow-hidden hover:shadow-lg transition-all">
                        <img src={art.dataUrl} alt="User submission" className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>
        )}
      </div>

    </div>
  );
};

export default DrawingCanvas;