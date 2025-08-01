'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

interface ImageSplitProps {
  totalImages: number; // 奇数，图片总数
  spacingX: number | number[]; // number or array of spacing
  imageSrcs: string[]; // 图片地址数组，长度至少等于 totalImages
}

export default function ImageSplit({
  
  totalImages = 3,
  spacingX = 25,
  imageSrcs = ['/images/food1.png', '/images/food2.png', '/images/food3.png'],
}: ImageSplitProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const smootherRef = useRef<ScrollSmoother | null>(null);

useEffect(() => {
  if (!wrapperRef.current || !contentRef.current || !sectionRef.current) return;

  if (totalImages % 2 === 0) {
    console.warn('totalImages 必须是奇数');
    return;
  }

  if (imageSrcs.length < totalImages) {
    console.warn('imageSrcs 数组长度必须大于等于 totalImages');
    return;
  }

  smootherRef.current = ScrollSmoother.create({
    wrapper: wrapperRef.current,
    content: contentRef.current,
    smooth: 1.2,
    effects: true,
    normalizeScroll: true,
  });

  const images = gsap.utils.toArray('.split-img') as HTMLElement[];
  const middleIndex = Math.floor(totalImages / 2);

  gsap.set(images, {
    position: 'absolute',
    left: '50%',
    top: '50%',
    xPercent: -50,
    yPercent: -50,
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.current,
      scroller: wrapperRef.current,
      start: 'top top',
      end: '+=100%',
      scrub: true,
      pin: true,
      anticipatePin: 1,
      markers: true,
      id: 'imageSplitAnimation',
    },
  });

  images.forEach((img, i) => {
    const offset = Math.abs(i - middleIndex);

    let zIndex = 0;
    if (i === middleIndex) {
      zIndex = 10; // 中间最高
    } else if (i === 0 || i === totalImages - 1) {
      zIndex = 1; // 最左和最右最低
    } else {
      zIndex = 10 - offset;
      if (zIndex <= 1) zIndex = 2;
    }
    img.style.zIndex = zIndex.toString();

    if (i === middleIndex) {
      tl.to(img, { xPercent: -50 }, 0);
    } else {
      const direction = i < middleIndex ? -1 : 1;
      const absOffset = offset;
      const distance = Array.isArray(spacingX)
        ? (spacingX[absOffset - 1] ?? spacingX[spacingX.length - 1])
        : spacingX * absOffset;

      tl.to(img, { xPercent: -50 + direction * distance }, 0);
    }
  });

  return () => {
    tl.scrollTrigger?.kill();
    smootherRef.current?.kill();
    smootherRef.current = null;
  };
}, [totalImages, spacingX, imageSrcs]);


  return (
    <div
      ref={wrapperRef}
      id="smooth-wrapper"
      className="h-screen w-screen overflow-hidden"
    >
      <div ref={contentRef} id="smooth-content" className="min-h-screen">
 

        <div
          ref={sectionRef}
          className="section2 relative flex h-screen w-full overflow-hidden bg-cyan-500"
        >
          <div className="relative h-full w-full">
            {[...Array(totalImages)].map((_, i) => (
              <div
                key={i}
                className="split-img"
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: '15vw',
                  height: '15vw',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <Image
                  src={imageSrcs[i]}
                  alt={`food ${i}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

  
      </div>
    </div>
  );
}
