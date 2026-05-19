import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Glass } from "@/components/Glass";
import { useGetAdminPublicos } from "@workspace/api-client-react";
import { Scissors, Sparkles, Calendar, MessageSquare, Instagram } from "lucide-react";

export default function Home() {
  const { data: admin } = useGetAdminPublicos();

  return (
    <div className="space-y-16 pb-8">
      <section className="relative overflow-hidden pt-8 sm:pt-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(215,38,56,0.12),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(11,31,59,0.14),_transparent_26%)]" />
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-primary shadow-sm">
              <Sparkles className="h-3.5 w-3.5" /> BARBERZ premium booking
            </div>

            <div className="lg:flex lg:items-start lg:gap-8">
              <div className="lg:flex-1">
                <h1 className="headline mt-5 max-w-xl text-4xl leading-[0.92] sm:text-5xl lg:text-7xl text-secondary">
                  Tu próximo corte empieza en <span className="text-primary">BARBERZ</span>
                </h1>
                <p className="mt-5 max-w-xl text-base sm:text-lg text-muted-foreground text-center lg:text-left">
                  Elegí día, horario y servicio en segundos. BARBERZ te espera con una experiencia simple, rápida y profesional.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg" data-testid="button-hero-reservar">
                    <Link href="/reservar"><Calendar className="h-4 w-4" /> Reservar turno</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/feed">Ver servicios</Link>
                  </Button>
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 shadow-sm">
                    <span className="h-2 w-2 rounded-full bg-primary" /> Horarios actualizados
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 shadow-sm">
                    <span className="h-2 w-2 rounded-full bg-secondary" /> Atención profesional
                  </span>
                </div>
              </div>

              <div className="mt-6 lg:mt-0 w-full sm:w-auto lg:w-96">
                <Glass variant="strong" className="relative overflow-hidden p-6 sm:p-8 shadow-xl ring-1 ring-black/5 bg-gradient-to-b from-white to-white/95">
                  <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-primary/10 blur-3xl" />
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 rounded-full bg-secondary p-1 text-white shadow-md">
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-secondary overflow-hidden">
                        {admin?.foto ? <img src={admin.foto} alt={admin.nombre} className="h-full w-full object-cover" /> : <Scissors className="h-7 w-7 text-primary" />}
                      </div>
                    </div>
                    <div>
                      <div className="brand-mark text-3xl font-semibold text-secondary">BARBER<span className="text-primary">Z</span></div>
                      <div className="text-sm uppercase tracking-[0.28em] text-muted-foreground mt-0.5">BARBERZ moderna</div>
                    </div>
                  </div>
                  <p className="mt-6 text-base sm:text-base text-muted-foreground leading-relaxed">
                    {admin?.bio ?? "Cortes clásicos, modernos y servicio premium con una experiencia clara, rápida y profesional."}
                  </p>
                <div className="mt-6 flex flex-col sm:flex-row items-center sm:items-start gap-3">
                  <Button asChild size="lg">
                    <a
                      href={`https://wa.me/${admin?.whatsapp ?? '3430000000'}?text=${encodeURIComponent('Hola, quiero reservar un turno')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4"
                    >
                      <MessageSquare className="h-5 w-5" /> WhatsApp
                    </a>
                  </Button>

                  <Button asChild size="lg" variant="outline">
                    <a
                      href={`https://instagram.com/${(admin?.instagram || 'rivuzbarber').replace(/^@/, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4"
                    >
                      <Instagram className="h-5 w-5" /> Instagram
                    </a>
                  </Button>
                </div>
                </Glass>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.28em] text-primary">Servicios</div>
            <h2 className="text-3xl sm:text-4xl text-secondary">Elegí tu servicio</h2>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { title: "Corte clásico", desc: "Líneas limpias y terminación prolija para el día a día." },
            { title: "Corte + barba", desc: "Un look completo con equilibrio y definición." },
            { title: "Perfilado de barba", desc: "Contornos precisos con presencia y detalle." },
            { title: "Servicio premium", desc: "Una experiencia más completa con atención personalizada." },
          ].map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <Glass className="h-full p-5">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Scissors className="h-5 w-5" />
                </div>
                <div className="text-xl text-secondary">{s.title}</div>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </Glass>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Características removidas por solicitud del cliente */}

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <Glass className="overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="text-xs uppercase tracking-[0.28em] text-primary">BARBERZ</div>
              <h2 className="mt-2 text-3xl sm:text-4xl text-secondary">Listo para tu próximo corte?</h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                Reservá ahora y asegurá tu lugar con una experiencia simple, fuerte y profesional.
              </p>
            </div>
            <Button asChild size="lg" data-testid="button-cta-reservar">
              <Link href="/reservar">Reservar ahora</Link>
            </Button>
          </div>
        </Glass>
      </section>
    </div>
  );
}
