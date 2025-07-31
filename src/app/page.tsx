'use client';

import { Roboto, Poppins } from 'next/font/google';
 
import Header from '@/app/components/ui/Header/Header';
import Hero from '@/app/sections/Hero';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '600', '700', '900'], // 这里必须写
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '600', '700', '900'], // 这里也必须写
});

export default function Home() {
  return (
    <>
      <Header/>
      <Hero/>
    </>
  );
}
