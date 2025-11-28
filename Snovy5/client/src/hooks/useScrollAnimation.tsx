
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type AnimationOptions = {
  threshold?: number;
  duration?: number;
  delay?: number;
  y?: number;
  opacity?: number;
  scale?: number;
  ease?: string;
};

export const useScrollAnimation = (options: AnimationOptions = {}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    gsap.fromTo(
      element,
      {
        y: options.y ?? 50,
        opacity: options.opacity ?? 0,
        scale: options.scale ?? 0.95,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: options.duration ?? 1,
        delay: options.delay ?? 0,
        ease: options.ease ?? "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top bottom-=100",
          end: "bottom top+=100",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, [options]);

  return elementRef;
};
