import { SignedIn, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ThemeMenu from './ThemeMenu';
import MobileNav from './MobileNav';
import GlobalSearch from '../search/GlobalSearch';

const Navbar = () => {
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      {/* Link to homepage */}
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/assets/images/site-logo.svg"
          alt="DevDiscuss"
          width={23}
          height={23}
        />
        <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Dev<span className="text-primary-500">Discuss</span>
        </p>
      </Link>
      <GlobalSearch />
      {/* Right Sidebar that will have the profile and the switcher for the theme */}
      <div className="flex-between gap-5">
        <ThemeMenu />
        {/* Only want to show the UserButton here if they are signedIn; provided by clerk; if they are signedIn, only the code within will show */}
        {/* IF SIGNED IN, THEN show the user button */}
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: 'h-10 w-10',
              },
              variables: {
                colorPrimary: '#ff7000',
              },
            }}
          />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
