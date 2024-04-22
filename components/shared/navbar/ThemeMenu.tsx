'use client';

import { useTheme } from '@/context/ThemeProvider';

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';
import Image from 'next/image';
import { themes } from '@/constants/constants';

// const Theme = () => {
const ThemeMenu = () => {
  const { mode, setMode } = useTheme();
  return (
    <Menubar className="relative border-none bg-transparent shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200">
          {/* 1.The Menubar Trigger will be an image that's responsible for checking the theme and rendering the appropriate icon */}
          {mode === 'light' ? (
            <Image
              src="/assets/icons/sun.svg"
              alt="Light Mode"
              width={20}
              height={20}
              className="active-theme"
            />
          ) : (
            <Image
              src="/assets/icons/moon.svg"
              alt="Dark Mode"
              width={20}
              height={20}
              className="active-theme"
            />
          )}
        </MenubarTrigger>
        <MenubarContent className="absolute -right-12 mt-3 min-w-[120px] rounded border py-2">
          {themes.map((item) => (
            <MenubarItem
              key={item.value}
              className="flex items-center gap-4 px-2.5 py-2 dark:focus:bg-dark-400"
              onClick={() => {
                setMode(item.value);
                if (item.value !== 'system') {
                  localStorage.theme = item.value;
                } else {
                  // else, use the theme from the system/local device
                  localStorage.removeItem('theme');
                }
              }}
            >
              <Image
                src={item.icon}
                alt={item.value}
                width={16}
                height={16}
                className={`${mode === item.value && 'active-theme'}`}
              />
              <p
                className={`body-semibold text-light-500 ${mode === item.value ? `text-primary-500` : `text-dark100_light900`}`}
              >
                {item.label}
              </p>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default ThemeMenu;
