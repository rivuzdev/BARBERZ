import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useLogin } from "@workspace/api-client-react";
import { useAuth } from "@/lib/auth";
import { Glass } from "@/components/Glass";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getErrorMessage, isValidEmail } from "@/lib/formErrors";
import { Scissors } from "lucide-react";

export default function Login() {
  const [, navigate] = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const loginMutation = useLogin({
    mutation: {
      onSuccess: (data) => {
        login(data.token, data.usuario);
        toast.success("Sesión iniciada correctamente.");
        navigate(data.usuario.rol === "admin" ? "/admin" : "/");
      },
      onError: (err: any) => {
        toast.error("No pudimos ingresar", {
          description: getErrorMessage(err, "No pudimos conectar con el servidor. Intentá nuevamente."),
        });
      },
    },
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors: { email?: string; password?: string } = {};
    if (!email.trim()) nextErrors.email = "El email es obligatorio.";
    else if (!isValidEmail(email)) nextErrors.email = "Ingresá un email válido.";

    if (!password) nextErrors.password = "La contraseña es obligatoria.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }
    loginMutation.mutate({ data: { email: email.trim(), password } });
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
      <div className="grid gap-6 lg:grid-cols-[0.95fr,1.05fr] lg:items-center">
        <div className="space-y-5 text-center">
          <div className="inline-flex mx-auto items-center gap-2 rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary shadow-sm">
            <Scissors className="h-3.5 w-3.5" /> BARBERZ
          </div>
          <h1 className="headline text-4xl sm:text-5xl lg:text-6xl text-secondary text-center">
            Ingresá a tu cuenta BARBERZ
          </h1>
          <p className="max-w-xl mx-auto text-muted-foreground text-center">
            Accedé a tus turnos, reservas y perfil con una interfaz clara, rápida y adaptada a mobile.
          </p>
        </div>
        <motion.div className="flex items-center justify-center" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="mx-auto w-full lg:w-[440px]">
            <Glass variant="strong" className="p-6 sm:p-8 rounded-3xl shadow-2xl ring-1 ring-black/5 bg-gradient-to-b from-white to-white/95">
              <div className="mb-6 flex items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-secondary text-white shadow-md">
                  <Scissors className="h-7 w-7" />
                </div>
              </div>
              <h2 className="headline text-center text-3xl font-semibold text-secondary">Bienvenido de nuevo</h2>
              <p className="mt-2 text-sm text-muted-foreground text-center">
                Ingresá para reservar y ver tu historial.
              </p>

              <form onSubmit={onSubmit} className="mt-8 space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    autoComplete="email"
                    data-testid="input-login-email"
                    className="h-12 px-4"
                  />
                  {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                </div>
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <Label htmlFor="password">Contraseña</Label>
                    <Link href="/recuperar" className="text-xs text-muted-foreground hover:text-primary">
                      ¿La olvidaste?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                    }}
                    autoComplete="current-password"
                    data-testid="input-login-password"
                    className="h-12 px-4"
                  />
                  {errors.password && <p className="mt-1 text-xs text-destructive">{errors.password}</p>}
                </div>
                <Button type="submit" className="w-full text-lg py-3" size="lg" disabled={loginMutation.isPending} data-testid="button-login-submit">
                  {loginMutation.isPending ? "Ingresando..." : "Ingresar"}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                ¿No tenés cuenta?{" "}
                <Link href="/registro" className="text-primary hover:underline">
                  Crear cuenta
                </Link>
              </div>
            </Glass>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
