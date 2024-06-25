import { pick } from 'lodash';
import { NextIntlClientProvider } from 'next-intl';
import {
  getLocale,
  getMessages,
} from 'next-intl/server';

import Landing from '@/src/components/Landing/Landing';

export default async function Home() {
  const messages = await getMessages();
  const locale = await getLocale();

  return (
    <NextIntlClientProvider locale={locale} messages={pick(messages, "Home")}>
      <Landing />
    </NextIntlClientProvider>
  );
}
