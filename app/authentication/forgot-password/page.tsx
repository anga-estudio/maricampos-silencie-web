"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  const supabase = createClient();

  const handleSendResetLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/authentication/reset-password`,
    });

    if (error) {
      setError(error.message);
    } else {
      setEmailSent(true);
    }

    setLoading(false);
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <Link href="/" className="block mb-12">
            <Image
              src="/logo.svg"
              alt="Silencie"
              width={180}
              height={45}
              className="mx-auto"
            />
          </Link>

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="w-16 h-16 bg-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-light text-green text-center mb-2">
              Email enviado
            </h1>
            <p className="text-muted text-center mb-2 text-sm">
              Enviamos um link de redefinição de senha para
            </p>
            <p className="font-medium text-foreground text-center mb-6">
              {email}
            </p>
            <p className="text-muted text-center text-sm">
              Verifique sua caixa de entrada e spam.
            </p>
          </div>

          <p className="text-center text-muted text-sm mt-8">
            <Link href="/authentication/sign-in" className="hover:text-green transition-colors">
              Voltar para o login
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <Link href="/" className="block mb-12">
          <Image
            src="/logo.svg"
            alt="Silencie"
            width={180}
            height={45}
            className="mx-auto"
          />
        </Link>

        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h1 className="text-2xl font-light text-green text-center mb-2">
            Esqueci minha senha
          </h1>
          <p className="text-muted text-center mb-8 text-sm">
            Digite seu email para receber o link de redefinição
          </p>

          {error && (
            <div className="mb-6 p-3 bg-terracotta/10 border border-terracotta/20 rounded-lg text-terracotta text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSendResetLink}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="w-full px-4 py-3 border border-green/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-green/30 bg-cream/50"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green text-white py-3 rounded-full font-medium hover:bg-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Enviando..." : "Enviar link de redefinição"}
            </button>
          </form>
        </div>

        <p className="text-center text-muted text-sm mt-8">
          <Link href="/authentication/sign-in" className="hover:text-green transition-colors">
            Voltar para o login
          </Link>
        </p>
      </div>
    </div>
  );
}
