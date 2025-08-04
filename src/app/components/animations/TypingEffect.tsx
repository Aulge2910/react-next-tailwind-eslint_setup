'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface TypingEffectProps {
  text: string;
  className?: string;
  typingSpeed?: number;
  pauseTime?: number;
}

const TypingEffect: React.FC<TypingEffectProps> = ({
  text,
  className = '',
  typingSpeed = 0.1,
  pauseTime = 1,
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  // 自己建立 keyframes 用於游標閃爍（因為 inline style 不支持 keyframes，要用 <style> 標籤放）
  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      @keyframes blink {
        0%, 100% { opacity: 0; }
        50% { opacity: 1; }
      }
    `;
    document.head.appendChild(styleEl);

    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll('span.char');
    const cursor = containerRef.current.querySelector('span.cursor');

    gsap.set(chars, { opacity: 0 });
    gsap.set(cursor, { opacity: 1 });

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0 });

    chars.forEach((char, i) => {
      tl.to(
        char,
        {
          opacity: 1,
          duration: 0.3,
          ease: 'power1.out',
        },
        i * typingSpeed,
      );
    });

    tl.to({}, { duration: pauseTime });

    chars.forEach((char, i) => {
      tl.to(
        char,
        {
          opacity: 0,
          duration: 0.3,
          ease: 'power1.out',
        },
        pauseTime +
          typingSpeed * chars.length +
          typingSpeed * (chars.length - 1 - i),
      );
    });

    tl.to({}, { duration: 0.5 });

    return () => {
      tl.kill();
      gsap.set(chars, { opacity: 1 });
      gsap.set(cursor, { opacity: 1 });
    };
  }, [text, typingSpeed, pauseTime]);

  return (
    <span
      ref={containerRef}
      className={`inline-block ${className}`}
      style={{ whiteSpace: 'pre' }}
    >
      {text.split('').map((char, i) => (
        <span key={i} className="char" style={{ opacity: 0 }}>
          {char}
        </span>
      ))}
      {/* 游標用 inline style 加動畫 */}
      <span
        className="cursor"
        style={{
          marginLeft: '4px',
          display: 'inline-block',
          animation: 'blink 1s step-end infinite',
        }}
      >
        |
      </span>
    </span>
  );
};

export default TypingEffect;
