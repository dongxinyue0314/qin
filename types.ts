export interface EverydayObject {
  id: number;
  name: string;
  imageUrl: string;
}

export interface Artwork {
  id: string;
  objectId: number;
  dataUrl: string;
  createdAt: number;
}

export interface P5Instance {
  setup: () => void;
  draw: () => void;
  background: (val: any) => void;
  createCanvas: (w: number, h: number) => any;
  loadImage: (url: string, callback?: (img: any) => void) => any;
  image: (img: any, x: number, y: number, w: number, h: number) => void;
  stroke: (color: string) => void;
  strokeWeight: (weight: number) => void;
  line: (x1: number, y1: number, x2: number, y2: number) => void;
  mouseX: number;
  mouseY: number;
  pmouseX: number;
  pmouseY: number;
  mouseIsPressed: boolean;
  clear: () => void;
  remove: () => void;
  canvas: HTMLCanvasElement;
}

// Declare p5 globally since we are loading it via CDN
declare global {
  interface Window {
    p5: any;
  }
}