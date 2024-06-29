import '@/src/styles/globals.css';

import { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import NextTopLoader from 'nextjs-toploader';

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

export function generateMetadata({ params }: Props): Metadata {
  return {
    title: {
      // @ts-ignore
      default: siteConfig.title[params.locale],
      // @ts-ignore
      template: `${siteConfig.title[params.locale]} - %s`,
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
            <div className="container mx-auto ps-6">
              <NextTopLoader
                color="#2299DD"
                initialPosition={0.08}
                crawlSpeed={200}
                height={3}
                crawl={true}
                showSpinner={true}
                easing="ease"
                speed={200}
                shadow="0 0 10px #2299DD,0 0 5px #2299DD"
              />
              {children}
            </div>
          </UiProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
