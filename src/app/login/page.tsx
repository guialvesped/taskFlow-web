"use client";
import { CircleCheckBig } from "lucide-react";
import { useState } from "react";
import { LoginForm, SignUpForm } from "./form";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-black">
      <div className="flex flex-col items-center justify-center">
        <CircleCheckBig className="text-white w-32 h-32" />
        <h1 className="text-white text-[36px]">TaskFlow</h1>
      </div>
      <div className="inline-flex mt-10 mb-5">
        <button
          className={`rounded-s-md ${
            isLogin ? "bg-white text-black" : "bg-black text-white"
          } border border-gray-300 px-3 py-1 transition-colors duration-300`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={`rounded-e-md ${
            !isLogin ? "bg-white text-black" : "bg-black text-white"
          } border border-gray-300 border-s-0 px-3 py-1 transition-colors duration-700`}
          onClick={() => setIsLogin(false)}
        >
          Registrar
        </button>
      </div>
      {isLogin ? <LoginForm /> : <SignUpForm />}
    </main>
  );
}
