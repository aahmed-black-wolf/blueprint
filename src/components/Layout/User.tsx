import {
  deleteCookie,
  setCookie,
} from 'cookies-next';
import {
  useLocale,
  useTranslations,
} from 'next-intl';
import {
  usePathname,
  useRouter,
} from 'next/navigation';

import { UserData } from '@/src/@types/User';
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';

type Props = { user: UserData };

export default function User({ user }: Props) {
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

  const handleLogout = () => {
    deleteCookie("token");
    router.replace(`/${locale}/auth/login`);
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="secondary"
          name={user?.username}
          src={user?.image}
          size="sm"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">{t("sign_as")}</p>
          <p className="font-semibold">{user?.email}</p>
        </DropdownItem>
        <DropdownItem
          onClick={handleLanguageSwitcher}
          key="logout"
          color="primary"
        >
          {t("lang")}
        </DropdownItem>
        <DropdownItem onClick={handleLogout} key="logout" color="danger">
          {t("log_out")}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
