"use client";

import React, { ReactNode } from 'react';

import { Toaster } from 'react-hot-toast';

import { NextUIProvider } from '@nextui-org/react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function UiProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" reverseOrder={false} />
      <NextUIProvider>{children}</NextUIProvider>
    </QueryClientProvider>
  );
}
