import LeftSideBar from '@/components/shared/LeftSideBar';
import RightSideBar from '@/components/shared/RightSideBar';
import Navbar from '@/components/shared/navbar/Navbar';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-light850_dark100 relative">
      {/* Navbar will go here... */}
      <Navbar />
      <div className="flex">
        <LeftSideBar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          {/* The section will be used to show the main content of the application */}
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        <RightSideBar />
      </div>
      Toaster Component Here
    </main>
  );
};

export default Layout;
