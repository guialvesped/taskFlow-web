"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { loginAction, signUpAction } from "./action";

// Define o schema de validação com Zod
const loginSchema = z.object({
  email: z.string().email("Email inválido").nonempty("Email é obrigatório"),
  password: z.string().min(3, "Senha deve ter no mínimo 3 caracteres"),
});

const signUpSchema = z.object({
  username: z.string().nonempty("Nome do usuário é obrigatório").max(70),
  email: z.string().email("Email inválido").nonempty("Email é obrigatório"),
  password: z.string().min(3, "Senha deve ter no mínimo 3 caracteres"),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignUpFormValues = z.infer<typeof signUpSchema>;

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    const { email, password } = data;
    const response = await loginAction({ email, password });

    if (response.success) {
      localStorage.setItem("token", response.token);
      router.push("/");
      return;
    }
    alert("Erro ao fazer login.");
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full max-w-sm mx-auto"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  {...field}
                  className="text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Senha</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={show ? "text" : "password"}
                    placeholder="Senha"
                    className="pr-10 text-white"
                    {...field}
                  />
                  <Button
                    type="button"
                    onClick={() => setShow((prev) => !prev)}
                    className="absolute right-1 top-1/2 -translate-y-1/2 p-2 h-auto w-auto bg-transparent hover:bg-transparent"
                  >
                    {show ? (
                      <EyeOff className="w-4 h-4 text-white" />
                    ) : (
                      <Eye className="w-4 h-4 text-white" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading} className="mt-4">
          {isLoading ? <Loader2 className="animate-spin" /> : "Entrar"}
        </Button>
      </form>
    </Form>
  );
}

export function SignUpForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: SignUpFormValues) {
    setIsLoading(true);
    const { username, email, password } = data;
    const response = await signUpAction({ username, email, password });

    if (response.success) {
      localStorage.setItem("token", response.token);
      router.push("/");
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full max-w-sm mx-auto"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Nome de usuário</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="seuNome123"
                  {...field}
                  className="text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  {...field}
                  className="text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Senha</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={show ? "text" : "password"}
                    placeholder="Senha"
                    className="pr-10 text-white"
                    {...field}
                  />
                  <Button
                    type="button"
                    onClick={() => setShow((prev) => !prev)}
                    className="absolute right-1 top-1/2 -translate-y-1/2 p-2 h-auto w-auto bg-transparent hover:bg-transparent"
                  >
                    {show ? (
                      <EyeOff className="w-4 h-4 text-white" />
                    ) : (
                      <Eye className="w-4 h-4 text-white" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading} className="mt-4">
          {isLoading ? <Loader2 className="animate-spin" /> : "Entrar"}
        </Button>
      </form>
    </Form>
  );
}
