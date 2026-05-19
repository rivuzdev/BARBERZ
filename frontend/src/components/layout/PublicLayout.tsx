import { Link, useLocation } from "wouter";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { inicialesDe } from "@/lib/format";
import { Menu, X, Scissors } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Inicio" },
  { href: "/reservar", label: "Reservar" },
  { href: "/feed", label: "Feed" },
];

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const [location, navigate] = useLocation();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-10 w-10 rounded-full bg-secondary text-white flex items-center justify-center shadow-sm shadow-slate-900/10 relative overflow-hidden">
              <Scissors className="h-4 w-4" />
              <span className="absolute bottom-1 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-primary" />
            </div>
            <div className="leading-tight">
              <div className="brand-mark text-lg sm:text-xl text-secondary group-hover:text-primary transition-colors">
                BARBER<span className="text-primary">Z</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                BARBERZ premium
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-full text-sm transition-colors",
                  location === item.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {!user ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/login")}
                  data-testid="button-login-nav"
                >
                  Ingresar
                </Button>
                <Button
                  size="sm"
                  onClick={() => navigate("/registro")}
                  data-testid="button-register-nav"
                >
                  Reservar ahora
                </Button>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="flex items-center gap-2 rounded-full pl-2 pr-3 py-1.5 bg-white border border-border shadow-sm hover-elevate active-elevate"
                    data-testid="button-user-menu"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.foto ?? undefined} />
                      <AvatarFallback className="bg-primary/20 text-primary text-xs">
                        {inicialesDe(user.nombre)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-secondary">{user.nombre.split(" ")[0]}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => navigate("/perfil")}>
                    Mi perfil
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/mis-turnos")}>
                    Mis turnos
                  </DropdownMenuItem>
                  {user.rol === "admin" && (
                    <DropdownMenuItem onClick={() => navigate("/admin")}>
                      Panel admin
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                  >
                    Cerrar sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          <button
            className="md:hidden h-10 w-10 rounded-full border border-border bg-white shadow-sm hover-elevate flex items-center justify-center"
            onClick={() => setMobileOpen((o) => !o)}
            data-testid="button-mobile-menu"
            aria-label="Menú"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border bg-white/95 backdrop-blur-xl overflow-hidden"
            >
              <div className="px-4 py-3 flex flex-col gap-1">
                {NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobile}
                    className={cn(
                      "px-3 py-2 rounded-md text-sm",
                      location === item.href
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover-elevate",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="h-px my-2 bg-white/5" />
                {!user ? (
                  <>
                    <Link
                      href="/login"
                      onClick={closeMobile}
                      className="px-3 py-2 rounded-2xl text-sm hover-elevate"
                    >
                      Ingresar
                    </Link>
                    <Link
                      href="/registro"
                      onClick={closeMobile}
                      className="px-3 py-2 rounded-2xl text-sm text-primary hover-elevate"
                    >
                      Reservar ahora
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/perfil"
                      onClick={closeMobile}
                      className="px-3 py-2 rounded-2xl text-sm hover-elevate"
                    >
                      Mi perfil
                    </Link>
                    <Link
                      href="/mis-turnos"
                      onClick={closeMobile}
                      className="px-3 py-2 rounded-2xl text-sm hover-elevate"
                    >
                      Mis turnos
                    </Link>
                    {user.rol === "admin" && (
                      <Link
                        href="/admin"
                        onClick={closeMobile}
                        className="px-3 py-2 rounded-2xl text-sm hover-elevate"
                      >
                        Panel admin
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        closeMobile();
                        logout();
                        navigate("/");
                      }}
                      className="text-left px-3 py-2 rounded-2xl text-sm hover-elevate"
                    >
                      Cerrar sesión
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border mt-16 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 grid gap-8 md:grid-cols-3">
          <div>
            <div className="brand-mark text-2xl mb-2 text-secondary">
            BARBER<span className="text-primary">Z</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Reservas online, servicios premium y una presencia visual fuerte para tu próxima visita.
            </p>
          </div>
          <div className="text-sm md:justify-self-center">
            <div className="text-secondary font-semibold mb-3">Navegación</div>
            <ul className="space-y-2 text-muted-foreground">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="hover:text-primary">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-sm md:justify-self-end">
            <div className="text-secondary font-semibold mb-3">Contacto</div>
            <ul className="space-y-2 text-muted-foreground">
              <li>Lun a Sáb</li>
              <li>Atención con turno previo</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} BARBERZ · Hecho con detalle
        </div>
      </footer>
    </div>
  );
}
