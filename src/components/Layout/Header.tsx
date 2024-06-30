"use client";
import {
  useEffect,
  useState,
} from 'react';

import {
  getCookie,
  setCookie,
} from 'cookies-next';
import {
  useLocale,
  useTranslations,
} from 'next-intl';
import Link from 'next/link';
import {
  usePathname,
  useRouter,
} from 'next/navigation';

import { UserData } from '@/src/@types/User';
import { getUserData } from '@/src/api/getUser';
import { siteConfig } from '@/src/config/site';
import {
  cn,
  Navbar,
  NavbarBrand,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/react';

import BlueLogo from './BlueLogo';
import User from './User';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations("Home");
  const pathName = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const token = getCookie("token");
  const [user, setUser] = useState<UserData>();

  const handleLanguageSwitcher = () => {
    let lang = pathName.split("/")[1];
    if (lang === "en") lang = "ar";
    else lang = "en";
    const href = pathName.replace(/^\/(en|ar)/, `/${lang}`);
    setCookie("NEXT_LOCALE", lang);
    router.push(href);
  };

  useEffect(() => {
    setIsMenuOpen(true);
  }, [pathName]);

  const fetchUser = async () => {
    const userData = await getUserData(token as any);
    setUser(userData);
  };

  useEffect(() => {
    if (!user?.firstName) {
      fetchUser();
    }
  }, []);

  return (
    <Navbar
      className={cn(pathName.includes("auth") && "hidden")}
      maxWidth="2xl"
    >
      <div className="sm:hidden flex justify-between w-full gap-6">
        <User user={user} />
        <div className="flex items-center">
          <BlueLogo />
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </div>
      </div>

      <div className="hidden sm:flex justify-between items-center w-full gap-4">
        <div className="flex items-center gap-4">
          <NavbarBrand>
            <BlueLogo />
          </NavbarBrand>
          {siteConfig.navItems.map((route, index) => (
            <Link
              key={route.id}
              className="w-max"
              href={`/${locale}/${route.href}`}
            >
              {t(route.label)}
            </Link>
          ))}
        </div>
        <User user={user} />
      </div>
      <NavbarMenu className="overflow-hidden bg-primary-300/20">
        {siteConfig.navItems.map((route, index) => (
          <NavbarMenuItem key={route.id}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === siteConfig.navItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              href={route.href}
            >
              {t(route.label)}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
