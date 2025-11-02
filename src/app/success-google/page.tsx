"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/hooks";
import token from "@/utils/token";
import { setAuthenticatedUser } from "@/features/auth";

function SuccessGoogleContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const accessToken = searchParams.get("access_token");

    if (!accessToken) {
      router.push("/auth/login");
      return;
    }

    try {
      const decoded = token.decode(accessToken);

      if (decoded) {
        dispatch(
          setAuthenticatedUser({
            userId: decoded.userId,
            role: decoded.role,
            jwt: accessToken,
            provider: decoded.provider,
          })
        );
        router.push("/dashboard");
      } else {
        router.push("/auth/login");
      }
    } catch {
      router.push("/auth/login");
    }
  }, [dispatch, router, searchParams]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-lg font-medium">Signing you in via Google...</p>
    </div>
  );
}

export default function SuccessGooglePage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <SuccessGoogleContent />
    </Suspense>
  );
}
