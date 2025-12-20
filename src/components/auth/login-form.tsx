"use client";

import { useAuthStore } from "@/store/auth";
import { ChangeEvent, FormEvent, use, useState, useTransition } from "react";
import z from "zod";
import Link from "next/link";
import { redirect } from "next/navigation";
import { setAuthCookie } from "@/actions/set-auth-cookie";
import { login } from "@/actions/login";

const schema = z.object({
  email: z.email({ message: "Email inválido" }),
  password: z
    .string()
    .min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),
});

type ErrorStructure = {
  email?: string;
  password?: string;
  form?: string;
};

export const LoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<ErrorStructure>({});
  const [pending, startTransition] = useTransition();
  const authStore = useAuthStore((state) => state);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: any = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0]] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    startTransition(async () => {
      const res = await login(form);
      if (res.error) {
        setErrors({ form: res.error });
      } else if (res.token) {
        await setAuthCookie(res.token);
        authStore.setToken(res.token);
        redirect("/");
      }
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
    setErrors((errors) => ({
      ...errors,
      [e.target.name]: undefined,
      form: undefined,
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border bg-gray-700 text-gray-200 border-gray-400 p-4 rounded-sm"
    >
      <h2 className="text-xl font-bold mb-4">LOGIN</h2>
      <div className="mb-4">
        <label className="mb-1">E-mail</label>
        <input
          autoFocus
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded-sm px-3 py-2 "
          disabled={pending}
        />
        {errors.email && (
          <div className="text-red-500 text-sm mt-1">{errors.email}</div>
        )}
      </div>
      <div className="mb-4">
        <label className="mb-1">Senha</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-sm"
          disabled={pending}
        />
        {errors.password && (
          <div className="text-red-500 text-sm mt-1">{errors.password}</div>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded cursor-pointer"
        disabled={pending}
      >
        {pending ? "Entrando..." : "Entrar"}
      </button>
      {errors.form && (
        <div className="text-red-500 text-sm mt-1">{errors.form}</div>
      )}
      <div className="text-center mt-4">
        <Link href={"/register"} className="text-sm">
          Ainda não tem conta? Cadastre-se!
        </Link>
      </div>
    </form>
  );
};
