import { useTranslations } from 'next-intl';

export default function Landing() {
  const t = useTranslations("Home");
  return (
    <div className="h-[calc(100vh-80px)] w-full flex justify-center items-center">
      <h1 className="text-3xl font-[600] text-primary">{t("home_page")}</h1>
    </div>
  );
}
