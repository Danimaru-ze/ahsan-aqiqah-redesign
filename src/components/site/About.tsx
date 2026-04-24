import { Heart, Leaf, ShieldCheck, Truck } from "lucide-react";
import { useSiteData } from "@/hooks/use-site-data";

const ICONS = [ShieldCheck, Leaf, Heart, Truck];

export function About() {
  const { data } = useSiteData();
  if (!data) return null;
  const { about } = data;

  return (
    <section id="tentang" className="py-16 md:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Tentang Kami</p>
          <h2 className="mt-3 font-heading text-2xl font-bold text-foreground sm:text-4xl">{about.title}</h2>
          <p className="mt-3 text-muted-foreground">{about.subtitle}</p>
          <p className="mt-5 text-base leading-relaxed text-foreground/80">{about.description}</p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {about.values.map((v, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <div
                key={v.title}
                className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-card"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
