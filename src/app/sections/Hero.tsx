'use client';

import { Layout } from '@arco-design/web-react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import { TextPlugin } from 'gsap/TextPlugin';
import { useGSAP } from '@gsap/react';
import TypingEffect from '../components/animations/TypingEffect'; 

gsap.registerPlugin(TextPlugin, useGSAP);

const Content = Layout.Content;

const Hero = () => {
 

  return (
    <Content className="wrapper relative mx-auto">
      <div className="relative flex w-full p-[20px]">
        {/* 左半部分文字 */}
        <div className="flex w-full shrink-0 basis-1/2 flex-col">
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In sequi,
            quibusdam ipsa voluptas placeat molestiae ex delectus veritatis,
            neque ducimus blanditiis laboriosam vitae laborum doloribus nobis
            commodi. Tempora, expedita quod.
          </span>
          <button></button>

          <div className="relative flex h-[300px] w-[300px] items-center justify-center rounded-xl p-8">
            {/* 黃色不規則背景 */}
            <svg
              viewBox="0 0 200 200"
              className="absolute left-0 top-0 h-full w-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#fce68a"
                d="M45.6,-54.4C60.1,-46,69.7,-30.1,69.5,-15.7C69.3,-1.3,59.2,11.7,50.1,24.9C41,38,33,51.3,21.3,57.1C9.7,62.8,-6.7,61,-22.2,56.1C-37.7,51.1,-52.4,43.1,-58.7,30.1C-65,17,-62.9,-1,-55,-15.9C-47.2,-30.8,-33.8,-42.5,-19.3,-51.3C-4.8,-60.2,10.8,-66.3,25.7,-65.1C40.7,-63.9,55,-55.4,45.6,-54.4Z"
                transform="translate(100 100)"
              />
            </svg>

            {/* 照片 */}
            <img
              src="/images/girl1.png"
              alt="kids"
              className="relative h-48 w-48 rounded-[30%] object-cover shadow-lg"
            />
          </div>
        </div>

        {/* 右半部分圖片及虛線裝飾 */}
        <div className="relative flex w-full shrink-0 basis-1/2">
          <div className="relative z-10 h-[26.04vw] w-full">
            <svg
              viewBox="0 0 900 675"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <clipPath id="clip-shape">
                  <path
                    d="M150.8 -173.4C164.8 -136.7 124.6 -68.4 126.5 1.9C128.4 72.1 172.4 144.2 158.3 164.2C144.2 184.2 72.1 152.1 1.1 151.1C-70 150 -140 180 -189.8 160C-239.7 140 -269.3 70 -274.1 -4.8C-278.9 -79.5 -258.8 -159.1 -208.9 -195.8C-159.1 -232.4 -79.5 -226.2 -5.6 -220.6C68.4 -215 136.7 -210 150.8 -173.4"
                    transform="translate(506.85 364.56)"
                  />
                </clipPath>
              </defs>

              <image
                href="/images/dog1.jpg"
                width="900"
                height="675"
                x="60"
                y="100"
                clipPath="url(#clip-shape)"
                preserveAspectRatio="xMidYMid slice"
              />

              <path
                d="M150.8 -173.4C164.8 -136.7 124.6 -68.4 126.5 1.9C128.4 72.1 172.4 144.2 158.3 164.2C144.2 184.2 72.1 152.1 1.1 151.1C-70 150 -140 180 -189.8 160C-239.7 140 -269.3 70 -274.1 -4.8C-278.9 -79.5 -258.8 -159.1 -208.9 -195.8C-159.1 -232.4 -79.5 -226.2 -5.6 -220.6C68.4 -215 136.7 -210 150.8 -173.4"
                fill="none"
                stroke="#cfe0ee"
                strokeWidth="30"
                transform="translate(506.85 364.56)"
              />
            </svg>
          </div>

          {/* 虛線裝飾SVG，絕對定位 */}
          <svg
            preserveAspectRatio="xMidYMid meet"
            className="right-25 pointer-events-none absolute"
            fill="none"
            width="326"
            height="202"
            viewBox="0 0 326 202"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M325 39.5447C183.965 532.076 86.7647 -302.303 1 129.505"
              stroke="#cfe0ee"
              strokeWidth="6"
              strokeDasharray="12 12"
              strokeLinecap="round"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 100"
            className="pointer-events-none absolute bottom-10 left-20 h-20 w-40"
            fill="none"
          >
            <path
              d="M0 80 C40 20, 160 20, 200 80"
              stroke="#cfe0ee"
              strokeWidth="6"
              strokeDasharray="12 12"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      <h1 className="text-4xl font-bold text-blue-500">
        Build awesome apps with <TypingEffect text="Aceternity." />
      </h1>

      
    </Content>
  );
};

export default Hero;
