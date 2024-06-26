"use client";
import React, { useState } from 'react';

import { useLocale } from 'next-intl';
import Link from 'next/link';
import {
  Controller,
  FormProvider,
  useForm,
} from 'react-hook-form';

import { loginRequest } from '@/src/api/authRequests/loginRequest';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Input,
} from '@nextui-org/react';

import PasswordVisibility from '../PasswordVisibility';
import {
  inputsFields,
  LoginSchema,
  LoginSchemaType,
} from './LoginSchema';

type Props = {
  isVisiblePass: "password" | "text";
  setIsVisiblePass: React.Dispatch<React.SetStateAction<"password" | "text">>;
};

export default function Login() {
  const methods = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });
  const [isVisiblePass, setIsVisiblePass] = useState<"password" | "text">(
    "password"
  );
  const locale = useLocale();
  const { handleSubmit, control } = methods;

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div>
        <h1 className="mb-[50px] text-2xl text-center uppercase">Login</h1>
        <FormProvider {...methods}>
          <form
            className="min-w-[300px]  flex flex-col gap-[20px]"
            id="login"
            onSubmit={handleSubmit(loginRequest)}
          >
            {inputsFields?.map((inp) => (
              <Controller
                control={control}
                name={inp?.name as any}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    {...inp}
                    onValueChange={field?.onChange}
                    ref={field?.ref}
                    isInvalid={!!error?.message}
                    errorMessage={error?.message}
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
                )}
              />
            ))}

            <div className="w-full  text-sm">
              Don't have an account ?{" "}
              <Link
                className="text-secondary-600 underline"
                href={`/${locale}/auth/register`}
              >
                register
              </Link>
            </div>

            <Button
              form="login"
              type="submit"
              size="lg"
              className="w-full mt-4"
              color="primary"
            >
              Sign in
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
