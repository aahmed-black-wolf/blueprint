import React, { ReactNode } from 'react';

import { NextUIProvider } from '@nextui-org/react';

export default function UiProvider({ children }: { children: ReactNode }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
