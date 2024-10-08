// ClientAuth.tsx
"use client";

import { useEffect } from "react";

interface ClientAuthProps {
  children: React.ReactNode;
  newToken: string | undefined;
  newRefreshToken: string | undefined;
}

export default function ClientAuth({
  children,
  newToken,
  newRefreshToken,
}: ClientAuthProps) {
  useEffect(() => {
    document.cookie = `token=${newToken}; path=/; httpOnly`;
    document.cookie = `refreshToken=${newRefreshToken}; path=/; httpOnly`;
  }, [newToken, newRefreshToken]);

  return <>{children}</>;
}
