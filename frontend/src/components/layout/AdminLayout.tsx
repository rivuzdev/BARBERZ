import { Link, useLocation } from "wouter";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  CalendarDays,
  ClipboardList,
  ImageIcon,
  Users,
  LogOut,
  Menu,
  X,
  Home,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { inicialesDe } from "@/lib/format";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/turnos", label: "Turnos", icon: CalendarDays },
  { href: "/admin/reservas", label: "Reservas", icon: ClipboardList },
  { href: "/admin/posts", label: "Posts", icon: ImageIcon },
  { href: "/admin/clientes", label: "Clientes", icon: Users },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location, navigate] = useLocation();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background text-foreground">
      <aside className="hidden md:flex w-72 shrink-0 border-r border-border bg-secondary text-white flex-col">
        <div className="p-5 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="brand-mark text-xl tracking-wide">
              BARBER<span className="text-primary">Z</span>
            </div>
          </Link>
          <div className="mt-1 text-[10px] uppercase tracking-[0.28em] text-white/70">
            Panel administrador
          </div>
        </div>

        <nav className="flex-1 p-3 flex flex-col gap-1">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = location === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                data-testid={`link-admin-${item.label.toLowerCase()}`}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors hover-elevate",
                  active
                    ? "bg-primary text-white border border-primary-border"
                    : "text-white/75 hover:text-white hover:bg-white/8",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/10 flex flex-col gap-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/75 hover:text-white hover:bg-white/8 hover-elevate"
          >
            <Home className="h-4 w-4" />
            Ver sitio
          </Link>
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/75 hover:text-white hover:bg-white/8 hover-elevate text-left"
            data-testid="button-admin-logout"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      <header className="md:hidden sticky top-0 z-40 border-b border-border bg-white/90 backdrop-blur-xl">
        <div className="px-4 h-14 flex items-center justify-between">
          <Link href="/admin" className="brand-mark text-lg text-secondary">
            BARBER<span className="text-primary">Z</span>
            <span className="text-xs text-muted-foreground ml-1">admin</span>
          </Link>
          <button
            className="h-10 w-10 rounded-full border border-border bg-white shadow-sm hover-elevate flex items-center justify-center"
            onClick={() => setMobileOpen((o) => !o)}
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
              className="border-t border-border bg-white/95 backdrop-blur-xl overflow-hidden"
            >
              <div className="p-3 flex flex-col gap-1">
                {NAV.map((item) => {
                  const Icon = item.icon;
                  const active = location === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm hover-elevate",
                        active ? "bg-primary/10 text-primary" : "text-muted-foreground",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  );
                })}
                <div className="h-px my-2 bg-border" />
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm text-muted-foreground hover-elevate"
                >
                  <Home className="h-4 w-4" /> Ver sitio
                </Link>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    logout();
                    navigate("/");
                  }}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm text-muted-foreground hover-elevate text-left"
                >
                  <LogOut className="h-4 w-4" /> Cerrar sesión
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1 min-w-0">
        <div className="hidden md:flex h-16 px-6 sm:px-8 items-center justify-end border-b border-border bg-white/70 backdrop-blur-xl">
          {user && (
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user.foto ?? undefined} />
                <AvatarFallback className="bg-primary/20 text-primary text-xs">
                  {inicialesDe(user.nombre)}
                </AvatarFallback>
              </Avatar>
              <div className="leading-tight">
                <div className="text-sm text-secondary">{user.nombre}</div>
                <div className="text-xs text-muted-foreground">{user.email}</div>
              </div>
            </div>
          )}
        </div>
        <div className="px-3 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">{children}</div>
      </main>
    </div>
  );
}
