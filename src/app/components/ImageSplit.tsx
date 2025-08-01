'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function ImageSplit() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const smootherRef = useRef<ScrollSmoother | null>(null);

  useEffect(() => {
    if (!wrapperRef.current || !contentRef.current || !sectionRef.current)
      return;

    // 初始化 ScrollSmoother
    smootherRef.current = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 1.2,
      effects: true,
      normalizeScroll: true, // 额外平滑
    });

    // 选中图片元素
    const images = gsap.utils.toArray('.split-img') as HTMLElement[];
    gsap.set(images, { xPercent: 0 });

    // 创建动画时间线，注意 scroller 传入 smoother 的 wrapper
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

    tl.to(images[0], { xPercent: -150 }, 0)
      .to(images[1], { xPercent: 0 }, 0)
      .to(images[2], { xPercent: 150 }, 0);

    return () => {
      tl.scrollTrigger?.kill();
      smootherRef.current?.kill();
      smootherRef.current = null;
    };
  }, []);

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
          {/* 图片容器：绝对居中 */}
          <div className="absolute  left-1/2 top-1/2 h-[15vw] w-[15vw] -translate-x-1/2 -translate-y-1/2">
            {/* images stacked on top of each other */}
            <div className="split-img absolute inset-0">
              <Image
                src="/images/food1.png"
                alt="food left"
                fill
                className="object-cover"
              />
            </div>
            <div className="split-img absolute inset-0">
              <Image
                src="/images/food1.png"
                alt="food center"
                fill
                className="object-cover"
              />
            </div>
            <div className="split-img absolute inset-0">
              <Image
                src="/images/food1.png"
                alt="food right"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="section3 text-10xl flex h-screen w-screen items-center justify-center bg-amber-200">
          screen3
        </div>
      </div>
    </div>
  );
}
