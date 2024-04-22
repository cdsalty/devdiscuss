'use client';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { sidebarLinks } from '@/constants/constants';
import { SignedOut } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavContent = () => {
  const pathname = usePathname();
  return (
    <section className="flex h-full flex-col gap-6 pt-16">
      {sidebarLinks.map((item) => {
        // To style the current active selected link, we first need to know which one is selected in order to apply the styling.
        // ** Important note why you need to make sure the route is greater than 1 ** if item.route were "/", it would match every pathname that starts with "/", which is not typically desirable unless explicitly intended.
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;

        return (
          <SheetClose asChild key={item.route}>
            <Link
              href={item.route}
              className={`${isActive ? 'primary-gradient rounded-lg text-light-900' : `text-dark300_light900`} flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                className={`${isActive ? '' : 'invert-colors'}`}
              />
              <p className={`${isActive ? 'base-bold' : 'base-medium'}`}>
                {item.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          className="invert-colors sm:hidden"
          src="/assets/icons/hamburger.svg"
          alt="Menu"
          width={36}
          height={36}
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 border-none"
      >
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/assets/images/site-logo.svg"
            alt="DevDiscuss"
            width={23}
            height={23}
          />
          <p className="h2-bold text-dark100_light900 font-spaceGrotesk">
            Dev<span className="text-primary-500">Discuss</span>
          </p>
        </Link>
        <div>
          <SheetClose asChild>
            <NavContent />
          </SheetClose>
          {/* Signedout will only show if a user is actually signed out of the application */}
          <SignedOut>
            <div className="flex flex-col gap-3">
              <SheetClose asChild>
                <Link href="/sign-in">
                  <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                    <span className="primary-text-gradient">LogIn</span>
                  </Button>
                </Link>
              </SheetClose>

              {/* For the Sign-up button */}
              <SheetClose asChild>
                <Link href="/sign-up">
                  <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                    SignUp
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;

/*
SheetTrigger is going to act as a child, meaning that something will be passed into it. 
- In this example, it will be an Image



*/
