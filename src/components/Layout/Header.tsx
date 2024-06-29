"use client";
import {
  useEffect,
  useState,
} from 'react';

import { setCookie } from 'cookies-next';
import {
  useLocale,
  useTranslations,
} from 'next-intl';
import Link from 'next/link';
import {
  usePathname,
  useRouter,
} from 'next/navigation';

import { siteConfig } from '@/src/config/site';
import {
  Avatar,
  cn,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/react';

import BlueLogo from './BlueLogo';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations("Home");
  const pathName = usePathname();
  const router = useRouter();
  const locale = useLocale();

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

  return (
    <Navbar
      className={cn(pathName.includes("auth") && "hidden")}
      maxWidth="2xl"
    >
      <div className="sm:hidden flex justify-between w-full gap-6">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            {
              siteConfig.settings?.map((item) => (
                <DropdownItem key={item?.key}>{item?.name}</DropdownItem>
              )) as any
            }

            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
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
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">{t("sign_as")}</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem
              onClick={handleLanguageSwitcher}
              key="logout"
              color="primary"
            >
              {t("lang")}
            </DropdownItem>
            <DropdownItem key="logout" color="danger">
              {t("log_out")}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
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
