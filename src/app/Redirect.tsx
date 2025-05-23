"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Redirect() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center text-xl bg-black text-white">
      Redirecionando...
    </div>
  );
}
