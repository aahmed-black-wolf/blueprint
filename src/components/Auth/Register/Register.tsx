"use client";
import React, {
  useEffect,
  useState,
} from 'react';

import {
  useLocale,
  useTranslations,
} from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FormProvider,
  useForm,
} from 'react-hook-form';
import toast from 'react-hot-toast';

import { useSetter } from '@/src/hooks/apiRequest';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Input,
} from '@nextui-org/react';

import PasswordVisibility from '../PasswordVisibility';
import {
  inputsFields,
  RegisterSchema,
  RegisterSchemaType,
} from './RegisterSchema';

export default function Register() {
  const methods = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
  });
  const [isVisiblePass, setIsVisiblePass] = useState<"password" | "text">(
    "password"
  );
  const locale = useLocale();
  const t = useTranslations("Auth");
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = methods;
  const router = useRouter();
  const { mutate, data, isPending } = useSetter({
    endPoint: "/users/add",
    key: "registerRequest",
  });

  const registerRequest = (data: RegisterSchemaType) => {
    mutate({
      username: data.userName,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    });
  };

  useEffect(() => {
    let timer: any;
    if (data && !isPending) {
      toast.success(t("account_created"));
      timer = setTimeout(() => router.push(`/${locale}/auth/login`));
      reset();
    }
    return () => {
      clearTimeout(timer);
    };
  }, [data, isPending]);

  return (
    <div className="flex  px-4 justify-center items-center h-screen w-full">
      <div className="w-[600px]">
        <h1 className="mb-[50px] text-2xl text-center uppercase">
          {t("register")}
        </h1>
        <FormProvider {...methods}>
          <form
            className="w-full"
            id="register"
            onSubmit={handleSubmit(registerRequest)}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
              {inputsFields?.map((inp, index) => (
                <Input
                  //  @ts-ignore
                  {...register(inp.name)}
                  key={index}
                  //  @ts-ignore
                  isInvalid={!!errors[inp.name]?.message}
                  errorMessage={
                    //  @ts-ignore
                    errors[inp.name]?.message
                  }
                  {...inp}
                  label={t(inp?.label)}
                  type={inp?.type === "password" ? isVisiblePass : inp?.type}
                  endContent={
                    inp?.type === "password" ? (
                      <PasswordVisibility
                        isVisiblePass={isVisiblePass}
                        setIsVisiblePass={setIsVisiblePass}
                      />
                    ) : null
                  }
                  variant="underlined"
                />
              ))}
              <div className="w-full  text-sm">
                {t("have_account")}{" "}
                <Link
                  className="text-secondary-600 underline"
                  href={`/${locale}/auth/login`}
                >
                  {t("login")}
                </Link>
              </div>
            </div>
            <div className="w-full mt-8  flex justify-end">
              <Button
                form="register"
                type="submit"
                size="lg"
                isLoading={isPending}
                isDisabled={isPending}
                className="w-[200px]"
                color="primary"
              >
                {t("registration")}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
