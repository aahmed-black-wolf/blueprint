"use client";
import React, { useEffect, useState } from "react";

import { useLocale } from "next-intl";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";

import { useSetter } from "@/src/hooks/apiRequest";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";

import PasswordVisibility from "../PasswordVisibility";
import { inputsFields, LoginSchema, LoginSchemaType } from "./LoginSchema";

export default function Login() {
  const methods = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });
  const [isVisiblePass, setIsVisiblePass] = useState<"password" | "text">(
    "password"
  );
  const { mutate, data, isPending, isError } = useSetter({
    endPoint: "/auth/login",
    key: "loginRequest",
  });
  const locale = useLocale();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    reset,
  } = methods;

  const loginRequest = (data: LoginSchemaType) => {
    mutate({
      username: data.userName,
      password: data.password,
    });
  };

  useEffect(() => {
    if (isError) {
      setError("userName", {
        type: "invalid",
        message: "Invalid credentials",
      });
    }
  }, [isError]);

  useEffect(() => {
    if (data && !isPending) {
      reset();
    }
  }, [data, isPending]);

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
              isLoading={isPending}
              isDisabled={isPending}
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
