import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useRegistrar } from "@workspace/api-client-react";
import { useAuth } from "@/lib/auth";
import { Glass } from "@/components/Glass";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getErrorMessage, isValidEmail } from "@/lib/formErrors";
import { isValidWhatsAppPhone } from "@/utils/whatsapp";
import { Scissors } from "lucide-react";

export default function Registro() {
  const [, navigate] = useLocation();
  const { login } = useAuth();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [errors, setErrors] = useState<{ nombre?: string; email?: string; password?: string; whatsapp?: string }>({});

  const mutation = useRegistrar({
    mutation: {
      onSuccess: (data) => {
        login(data.token, data.usuario);
        toast.success("Cuenta creada correctamente.", {
          description: "Ya podés iniciar sesión.",
        });
        navigate("/reservar");
      },
      onError: (err: any) => {
        toast.error("No pudimos crear la cuenta", {
          description: getErrorMessage(err, "No pudimos crear tu cuenta. Intentá nuevamente."),
        });
      },
    },
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors: { nombre?: string; email?: string; password?: string; whatsapp?: string } = {};

    if (!nombre.trim()) nextErrors.nombre = "El nombre es obligatorio.";
    if (!email.trim()) nextErrors.email = "El email es obligatorio.";
    else if (!isValidEmail(email)) nextErrors.email = "Ingresá un email válido.";

    if (!password) nextErrors.password = "La contraseña es obligatoria.";
    else if (password.length < 8) nextErrors.password = "La contraseña debe tener al menos 8 caracteres.";
    else if (!/^(?=.*[A-Za-z])(?=.*\d).+$/.test(password)) {
      nextErrors.password = "La contraseña debe incluir letras y números.";
    }

    if (!whatsapp.trim()) nextErrors.whatsapp = "El WhatsApp es obligatorio.";
    else if (!isValidWhatsAppPhone(whatsapp)) nextErrors.whatsapp = "Ingresá un número de WhatsApp válido.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    mutation.mutate({
      data: {
        nombre: nombre.trim(),
        email: email.trim(),
        password,
        whatsapp: whatsapp.trim(),
      },
    });
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
      <div className="grid gap-6 lg:grid-cols-[0.95fr,1.05fr] lg:items-center">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary shadow-sm">
            <Scissors className="h-3.5 w-3.5" /> BARBERZ
          </div>
          <h1 className="headline text-4xl sm:text-5xl lg:text-6xl text-secondary">
            Creá tu cuenta BARBERZ
          </h1>
          <p className="max-w-xl text-muted-foreground">
            Guardá tus turnos, acelerá futuras reservas y mantené todo el historial en un solo lugar.
          </p>
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Glass variant="strong" className="p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-white shadow-sm">
                <Scissors className="h-5 w-5" />
              </div>
            </div>
            <h2 className="headline text-center text-3xl text-secondary">Crear cuenta</h2>
            <p className="mt-2 text-sm text-muted-foreground text-center">
              Reservá más rápido y mantené tu historial.
            </p>

            <form onSubmit={onSubmit} className="mt-8 space-y-4">
              <div>
                <Label htmlFor="nombre">Nombre completo</Label>
                <Input id="nombre" value={nombre} onChange={(e) => { setNombre(e.target.value); if (errors.nombre) setErrors((prev) => ({ ...prev, nombre: undefined })); }} data-testid="input-reg-nombre" />
                {errors.nombre && <p className="mt-1 text-xs text-destructive">{errors.nombre}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((prev) => ({ ...prev, email: undefined })); }} data-testid="input-reg-email" />
                {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
              </div>
              <div>
                <Label htmlFor="password">Contraseña</Label>
                <Input id="password" type="password" value={password} onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors((prev) => ({ ...prev, password: undefined })); }} data-testid="input-reg-password" />
                {errors.password && <p className="mt-1 text-xs text-destructive">{errors.password}</p>}
              </div>
              <div>
                <Label htmlFor="whatsapp">WhatsApp</Label>
                <Input id="whatsapp" value={whatsapp} onChange={(e) => { setWhatsapp(e.target.value); if (errors.whatsapp) setErrors((prev) => ({ ...prev, whatsapp: undefined })); }} placeholder="+54 9 11 ..." data-testid="input-reg-whatsapp" />
                {errors.whatsapp && <p className="mt-1 text-xs text-destructive">{errors.whatsapp}</p>}
              </div>
              <Button type="submit" className="w-full" disabled={mutation.isPending} data-testid="button-reg-submit">
                {mutation.isPending ? "Creando cuenta..." : "Crear cuenta"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              ¿Ya tenés cuenta?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Ingresá
              </Link>
            </div>
          </Glass>
        </motion.div>
      </div>
    </div>
  );
}
