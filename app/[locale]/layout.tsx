import '@/src/styles/globals.css';

import { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import Header from '@/src/components/Layout/Header';
import UiProvider from '@/src/components/Layout/RootLayout';
import {
  fontPoppins,
  fontTajawal,
} from '@/src/config/fonts';
import { siteConfig } from '@/src/config/site';

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: {
      // @ts-ignore
      default: siteConfig.title[params.locale],
      // @ts-ignore
      template: `%s - ${siteConfig.title[params.locale]}`,
    },
    // @ts-ignore
    description: siteConfig.description[params.locale],
    // @ts-ignore
    keywords: siteConfig.keywords[params.locale],
    manifest: "/manifest.json",
    icons: [
      { rel: "icon", url: "/favicon/favicon.ico" },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon/favicon-16x16.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon/favicon-32x32.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        url: "/favicon/apple-touch-icon.png",
      },
    ],
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: Props) {
  const messages = await getMessages();

  return (
    <html
      className={
        locale === "en" ? fontPoppins.className : fontTajawal.className
      }
      dir={locale === "en" ? "ltr" : "rtl"}
      lang={locale}
    >
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <UiProvider>
            <div className="container mx-auto ps-6">{children}</div>
          </UiProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
