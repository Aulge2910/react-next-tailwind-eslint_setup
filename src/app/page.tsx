import { Roboto, Poppins } from 'next/font/google';
import Hero from './sections/Hero';

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
    <div className="min-h-[200vh] p-8">
      <h1 className="text-4xl">欢迎来到 Locomotive Scroll 演示</h1>
      <p>向下滚动试试平滑滚动效果！</p>
    </div>
  );
}
