import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import Comments from '@/src/components/Comments/Comments';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations("Home");
  return {
    title: t("comments"),
  };
}

export default function page() {
  return <Comments />;
}
