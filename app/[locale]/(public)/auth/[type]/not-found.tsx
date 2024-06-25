"use client";
import React from 'react';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { BiArrowBack } from 'react-icons/bi';

import { Button } from '@nextui-org/react';

export default function Notfound() {
  const router = useRouter();
  const t = useTranslations("Notfound");
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Button
        className="border-none rtl:rotate-180 fixed top-10 rtl:right-10 ltr:left-10 min-w-max"
        variant="bordered"
        onClick={() => router.push("/")}
      >
        <BiArrowBack />
      </Button>
      <h1 className="text-2xl">{t("message")}</h1>
    </div>
  );
}
