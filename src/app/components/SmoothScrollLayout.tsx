'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import 'locomotive-scroll/dist/locomotive-scroll.css';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const locoScrollRef = useRef<any>(null);

  useEffect(() => {
    let LocomotiveScroll: any;
    let isMounted = true;

    async function initLocomotive() {
      LocomotiveScroll = (await import('locomotive-scroll')).default;

      if (!scrollRef.current || !isMounted) return;

      locoScrollRef.current = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
        lerp: 0.1,
      });

      locoScrollRef.current.on('scroll', ScrollTrigger.update);

      ScrollTrigger.scrollerProxy(scrollRef.current, {
        scrollTop(value) {
          return arguments.length
            ? locoScrollRef.current.scrollTo(value, 0, 0)
            : locoScrollRef.current.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: scrollRef.current.style.transform ? 'transform' : 'fixed',
      });

      ScrollTrigger.addEventListener('refresh', () =>
        locoScrollRef.current.update(),
      );
      ScrollTrigger.refresh();
    }

    initLocomotive();

    return () => {
      isMounted = false;
      if (locoScrollRef.current) locoScrollRef.current.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      data-scroll-container
      ref={scrollRef}
      className="min-h-screen overflow-hidden"
    >
      {children}
    </div>
  );
}
