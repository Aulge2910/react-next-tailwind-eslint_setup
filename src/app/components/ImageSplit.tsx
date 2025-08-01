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
    if (!wrapperRef.current || !contentRef.current || !sectionRef.current)
      return;
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

    const middleIndex = Math.floor(totalImages / 2);

    // Normalize spacingX into array of spacings for offsets from center
    // For example: spacingX = 25 => [25, 50, 75, ...]
    // Or user can pass array like [25, 46, 68]
    let spacingArray: number[] = [];

    if (typeof spacingX === 'number') {
      // create spacing array of length middleIndex
      spacingArray = Array(middleIndex)
        .fill(0)
        .map((_, i) => spacingX * (i + 1));
    } else if (Array.isArray(spacingX)) {
      spacingArray = spacingX;
      // Make sure spacingArray length matches middleIndex (optional)
      if (spacingArray.length !== middleIndex) {
        console.warn(
          `spacingX array length (${spacingArray.length}) does not match half of totalImages (${middleIndex}).`,
        );
      }
    }

    images.forEach((img, i) => {
      if (i === middleIndex) {
        // center image stays centered
        tl.to(img, { xPercent: -50 }, 0);
      } else {
        const offsetIndex = i - middleIndex;
        const direction = offsetIndex < 0 ? -1 : 1;
        const absOffset = Math.abs(offsetIndex);

        // Use spacingArray for distance: index from center -1 (because 1st offset = spacingArray[0])
        // If spacingArray length is less than needed, fallback to last spacing value
        const distance =
          spacingArray[absOffset - 1] !== undefined
            ? spacingArray[absOffset - 1]
            : spacingArray[spacingArray.length - 1];

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
        <div className="section1 text-10xl flex h-screen w-screen items-center justify-center bg-amber-200">
          screen1
        </div>

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

        <div className="section3 text-10xl flex h-screen w-screen items-center justify-center bg-amber-200">
          screen3
        </div>
      </div>
    </div>
  );
}
