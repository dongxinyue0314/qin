import { EverydayObject } from './types';

// The 14 everyday objects. 
// Note: In a real deployment, replace these URLs with actual transparent PNGs of objects (e.g., scissors, mug, fruit).
export const OBJECTS: EverydayObject[] = [
  { id: 1, name: 'Apple', imageUrl: 'https://placehold.co/400x400/transparent/000000?text=Apple' },
  { id: 2, name: 'Mug', imageUrl: 'https://placehold.co/400x400/transparent/000000?text=Mug' },
  { id: 3, name: 'Banana', imageUrl: 'https://placehold.co/400x400/transparent/000000?text=Banana' },
  { id: 4, name: 'Bottle', imageUrl: 'https://placehold.co/400x400/transparent/000000?text=Bottle' },
  { id: 5, name: 'Lamp', imageUrl: 'https://placehold.co/400x400/transparent/000000?text=Lamp' },
  { id: 6, name: 'Spoon', imageUrl: 'https://placehold.co/400x400/transparent/000000?text=Spoon' },
  { id: 7, name: 'Leaf', imageUrl: 'https://placehold.co/400x400/transparent/000000?text=Leaf' },
  { id: 8, name: 'Shoe', imageUrl: 'https://placehold.co/400x400/transparent/000000?text=Shoe' },
  { id: 9, name: 'Key', imageUrl: 'https://placehold.co/400x400/transparent/000000?text=Key' },
  { id: 10, name: 'Egg', imageUrl: 'https://placehold.co/400x400/transparent/000000?text=Egg' },
  { id: 11, name: 'Rock', imageUrl: 'https://placehold.co/400x400/transparent/000000?text=Rock' },
  { id: 12, name: 'Bag', imageUrl: 'https://placehold.co/400x400/transparent/000000?text=Bag' },
  { id: 13, name: 'Chair', imageUrl: 'https://placehold.co/400x400/transparent/000000?text=Chair' },
  { id: 14, name: 'Hat', imageUrl: 'https://placehold.co/400x400/transparent/000000?text=Hat' },
];

export const FLUORESCENT_COLORS = [
  { name: 'Red', hex: '#FF073A' },
  { name: 'Orange', hex: '#FF8C00' },
  { name: 'Yellow', hex: '#CCFF00' },
  { name: 'Purple', hex: '#9D00FF' },
  { name: 'Green', hex: '#39FF14' },
  { name: 'Blue', hex: '#00FFFF' },
];

export const STORAGE_KEY = 'faces_hidden_artworks_v1';