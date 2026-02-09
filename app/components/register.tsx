"use client";

import { signIn } from "next-auth/react";

export default function GetStartedButton() {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      className="px-6 py-3 bg-blue-600 text-white rounded-lg"
    >
      Get Started with Google
    </button>
  );
}
