'use client';

import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <div className="relative flex h-[41px] w-[225px]">
      <Link href="/">
        <Image src="/images/food1.png" alt="Logo" fill className="object-fit" />
      </Link>
    </div>
  );
};

export default Logo;
