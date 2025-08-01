// import React & hooks normally (no esm.sh URLs)
import React, { useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import { useEffect } from 'react';
import { useGSAP } from '@gsap/react'; // <-- import the hook from our React package
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function App() {
const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // 左邊動作的圖片索引
    const leftImages = [0, 1, 2];
    // 右邊動作的圖片索引
    const rightImages = [4, 5, 6];

    // 左邊圖片左右輕微移動
    leftImages.forEach((idx) => {
      if (!imagesRef.current[idx]) return;
      gsap.to(imagesRef.current[idx], {
        x: -20,
        yoyo: true,
        repeat: -1,
        duration: 1.5,
        ease: 'sine.inOut',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        },
      });
    });

    rightImages.forEach((idx) => {
      if (!imagesRef.current[idx]) return;
      gsap.to(imagesRef.current[idx], {
        x: 20,
        yoyo: true,
        repeat: -1,
        duration: 1.5,
        ease: 'sine.inOut',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.killTweensOf(imagesRef.current);
    };
  }, []);


  return (
    <div className="">
      <div className="section1 h-screen w-screen">1</div>
      <div className="section2 relative h-screen w-screen border-amber-400">
        {[...Array(7)].map((_, i) => (
          <Image
            key={i}
            ref={(el) => {(imagesRef.current[i] = el)}}
            src="/images/food1.png"
            width={200}
            height={150}
            alt={`image-${i + 1}`}
            className="flex-shrink-0"
          />
        ))}
      </div>
      <div className="section3 h-screen w-screen">3</div>
    </div>
  );
}
