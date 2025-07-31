'use client';

import { Button, Drawer, Layout } from '@arco-design/web-react';
import { IconList, IconMenu } from '@arco-design/web-react/icon';
import clsx from 'clsx';
import { useState } from 'react';
import NavItem from './NavItem';
import Logo from './Logo';

const navItems = [
  { name: 'MODULE', href: '/' },
  { name: 'about', href: '/about' },
  { name: 'PRICING', href: '/pricing' },
  { name: 'CONTACT US', href: '/contact_us' },
];

const Header = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const toggleDrawer = () => setDrawerVisible(!drawerVisible);
  const closeDrawer = () => setDrawerVisible(false);

  return (
    <Layout.Header className="flex w-full items-center justify-center border border-black p-[20px] text-base font-semibold sm:py-[2.7604vw]">
      <div className="flex w-full items-center justify-between xl:w-[83.33vw]">
        {/* Logo */}
        <Logo />

        {/* Desktop Nav */}
        <div className="hidden lg:flex">
          <ul className="flex justify-between gap-[4.9479vw]">
            {navItems.map((item) => (
              <NavItem key={item.href} {...item} />
            ))}
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <div className="ml-auto flex items-center lg:hidden">
          <Button
            style={{ backgroundColor: 'black', color: 'white' }}
            icon={<IconMenu />}
            onClick={toggleDrawer}
          />
        </div>

        {/* Drawer Menu */}
        <Drawer
          title={null}
          visible={drawerVisible}
          onCancel={closeDrawer}
          footer={null}
          width="100%"
          placement="right"
          className="lg:hidden"
        >
          <ul className="flex flex-col space-y-6 p-6">
            {navItems.map((item) => (
              <NavItem key={item.href} {...item} onClick={closeDrawer} />
            ))}

            {/* Login Link */}
            <NavItem href="/login" name="LOGIN" onClick={closeDrawer} />

            {/* 隐藏的语言按钮 */}
            <div className="hidden">
              <Button type="outline" icon={<IconList />} />
            </div>
          </ul>
        </Drawer>

        {/* Desktop Login Link */}
        <div className="relative hidden lg:flex">
          <ul className="flex justify-between">
            <NavItem href="/login" name="LOGIN" />
          </ul>
        </div>
      </div>
    </Layout.Header>
  );
};

export default Header;
