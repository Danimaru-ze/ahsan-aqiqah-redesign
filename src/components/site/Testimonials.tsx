import { useSiteData } from "@/hooks/use-site-data";
import { Quote } from "lucide-react";

export function Testimonials() {
  const { data } = useSiteData();
  if (!data) return null;
  const { testimonials } = data;

  return (
    <section className="py-16 md:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Testimoni</p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">Cerita dari keluarga yang kami layani</h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <blockquote
              key={t.name}
              className="rounded-2xl border border-border bg-card p-6 shadow-soft"
            >
              <Quote className="h-6 w-6 text-primary/60" />
              <p className="mt-3 text-sm leading-relaxed text-foreground/85">"{t.message}"</p>
              <footer className="mt-5 border-t border-border pt-4">
                <div className="font-heading text-sm font-semibold text-foreground">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.city}</div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
