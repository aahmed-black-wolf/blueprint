import React from 'react';

import { notFound } from 'next/navigation';

import Login from '@/src/components/Auth/Login/Login';
import Register from '@/src/components/Auth/Register/Register';

type Props = {
  params: {
    type: "login" | "register";
  };
};

export default function page({ params }: Props) {
  const components = {
    login: <Login />,
    register: <Register />,
  };

  if (!components.hasOwnProperty(params?.type)) return notFound();

  return components[params?.type];
}
