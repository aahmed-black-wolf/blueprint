import React from 'react';

import {
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa';

import { Button } from '@nextui-org/react';

type Props = {
  isVisiblePass: "password" | "text";
  setIsVisiblePass: React.Dispatch<React.SetStateAction<"password" | "text">>;
};
export default function PasswordVisibility({
  isVisiblePass,
  setIsVisiblePass,
}: Props) {
  return (
    <Button
      onClick={() =>
        setIsVisiblePass(isVisiblePass == "password" ? "text" : "password")
      }
      variant="light"
      size="sm"
      className="min-w-[30px] text-sm p-0"
    >
      {isVisiblePass === "password" ? <FaEye /> : <FaEyeSlash />}
    </Button>
  );
}
