declare module 'motion/react' {
  import * as React from 'react';

  export type SpringOptions = {
    stiffness?: number;
    damping?: number;
    mass?: number;
  };

  export function useMotionValue(initial: number): { set: (v: number) => void } & { get: () => number } & any;
  export function useSpring(value: any, opts?: SpringOptions): any;

  export const motion: any;
  export const useMotion: any;
  export const animate: any;

  export function useTransform(...args: any[]): any;

  export default motion;
}
