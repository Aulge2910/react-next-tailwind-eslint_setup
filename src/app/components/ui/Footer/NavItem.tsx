'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';

type Props = {
  href: string;
  name: string;
  onClick?: () => void;
};

const NavItem = ({ href, name, onClick }: Props) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className={classNames(
          'transition hover:text-blue-600',
          isActive ? 'font-bold text-black' : 'text-black',
        )}
      >
        {name}
      </Link>
    </li>
  );
};

export default NavItem;
