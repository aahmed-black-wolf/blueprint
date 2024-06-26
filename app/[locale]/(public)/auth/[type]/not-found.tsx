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
    <div className="h-[calc(100vh-100px)] w-full flex justify-center items-center">
      <Button
        className=" rtl:rotate-180 p-0 min-w-[50px] h-[50px] fixed bottom-10 rtl:right-10 ltr:left-10"
        radius="full"
        variant="bordered"
        size="lg"
        onClick={() => router.push("/")}
      >
        <BiArrowBack />
      </Button>
      <h1 className="text-2xl">{t("message")}</h1>
    </div>
  );
}
