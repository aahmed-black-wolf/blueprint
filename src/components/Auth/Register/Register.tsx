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
  const { handleSubmit, control } = methods;

  return (
    <div className="flex  px-4 justify-center items-center h-screen w-full">
      <div className="w-[600px]">
        <h1 className="mb-[50px] text-2xl text-center uppercase">Register</h1>
        <FormProvider {...methods}>
          <form
            className="w-full"
            id="register"
            onSubmit={handleSubmit(loginRequest)}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
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
                      type={
                        inp?.type === "password" ? isVisiblePass : inp?.type
                      }
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
            </div>
            <div className="w-full mt-8  flex items-end">
              <div className="w-full  text-sm">
                Have an account ?{" "}
                <Link
                  className="text-secondary-600 underline"
                  href={`/${locale}/auth/login`}
                >
                  Login
                </Link>
              </div>
              <Button
                form="register"
                type="submit"
                size="lg"
                className="w-[200px] "
                color="primary"
              >
                Registration
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
