"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isValidSession, setIsValidSession] = useState<boolean | null>(null);

  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    // Verificar se o usuário tem uma sessão válida (veio do link de reset)
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsValidSession(!!session);
    };
    checkSession();
  }, [supabase.auth]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      if (error.message.includes("should be different")) {
        setError("A nova senha deve ser diferente da senha atual.");
      } else {
        setError(error.message);
      }
    } else {
      setSuccess(true);
      setTimeout(() => {
        router.push("/home");
      }, 2000);
    }

    setLoading(false);
  };

  // Loading state
  if (isValidSession === null) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-6">
        <p className="text-muted">Carregando...</p>
      </div>
    );
  }

  // No valid session
  if (!isValidSession) {
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
            <h1 className="text-2xl font-light text-green text-center mb-4">
              Link inválido
            </h1>
            <p className="text-muted text-center mb-6 text-sm">
              Este link de redefinição de senha é inválido ou expirou. Solicite um novo link.
            </p>
            <Link
              href="/authentication/forgot-password"
              className="block w-full bg-green text-white py-3 rounded-full font-medium hover:bg-green/90 transition-colors text-center"
            >
              Solicitar novo link
            </Link>
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

  // Success state
  if (success) {
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-light text-green text-center mb-2">
              Senha alterada
            </h1>
            <p className="text-muted text-center text-sm">
              Redirecionando para a área do aluno...
            </p>
          </div>
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
            Nova senha
          </h1>
          <p className="text-muted text-center mb-8 text-sm">
            Digite sua nova senha
          </p>

          {error && (
            <div className="mb-6 p-3 bg-terracotta/10 border border-terracotta/20 rounded-lg text-terracotta text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleResetPassword}>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Nova senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full px-4 py-3 border border-green/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-green/30 bg-cream/50"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Confirmar senha
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full px-4 py-3 border border-green/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-green/30 bg-cream/50"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green text-white py-3 rounded-full font-medium hover:bg-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Salvando..." : "Salvar nova senha"}
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
