import { useRouter } from 'next/navigation';

import { Button } from '@nextui-org/react';

export default function BlueLogo() {
  const router = useRouter();
  return (
    <Button
      className="text-xl p-0 min-w-max font-bold me-[40px]"
      variant="light"
      onClick={() => router.push("/")}
    >
      Blueprint
    </Button>
  );
}
