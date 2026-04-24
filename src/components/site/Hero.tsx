import { Link } from "react-router-dom";
import { ArrowRight, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteData } from "@/hooks/use-site-data";

export function Hero() {
  const { data } = useSiteData();
  if (!data) return null;
  const { hero, brand } = data;

  return (
    <section id="home" className="relative overflow-hidden gradient-soft">
      {/* decorative blobs */}
      <div aria-hidden className="pointer-events-none absolute -top-32 -right-32 h-80 w-80 rounded-full bg-primary-glow/20 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

      <div className="container-page relative grid gap-10 py-14 md:grid-cols-2 md:items-center md:gap-12 md:py-20 lg:py-28">
        <div className="animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/60 px-4 py-1.5 text-xs font-medium text-primary backdrop-blur">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            {hero.eyebrow}
          </div>

          <h1 className="mt-5 font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
            {hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {hero.subtitle}
          </p>

          <div className="mt-6 flex items-center gap-2 rounded-2xl border border-primary/15 bg-white/70 px-4 py-3 text-sm text-foreground/80 backdrop-blur">
            <Truck className="h-4 w-4 shrink-0 text-primary" />
            <span className="font-medium">{hero.highlight}:</span>
            <span className="truncate text-muted-foreground">{hero.areas.slice(0, 4).join(", ")} & lainnya</span>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="group">
              <Link to={hero.ctaPrimary.href}>
                {hero.ctaPrimary.label}
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={hero.ctaSecondary.href}>{hero.ctaSecondary.label}</a>
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
            <div>
              <div className="font-heading text-2xl font-bold text-primary">5+</div>
              <div className="text-xs">Tahun melayani</div>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <div className="font-heading text-2xl font-bold text-primary">{hero.areas.length}+</div>
              <div className="text-xs">Kota terjangkau</div>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <div className="font-heading text-2xl font-bold text-primary">100%</div>
              <div className="text-xs">Higienis</div>
            </div>
          </div>
        </div>

        <div className="relative grid grid-cols-2 gap-4 sm:gap-5">
          <div className="relative overflow-hidden rounded-3xl shadow-card animate-fade-in">
            <img
              src={hero.images[0]}
              alt={`${brand.shortName} - Paket Sate Gule`}
              className="h-full w-full object-cover"
              width={600}
              height={800}
            />
          </div>
          <div className="relative mt-8 overflow-hidden rounded-3xl shadow-card animate-fade-in" style={{ animationDelay: "120ms" }}>
            <img
              src={hero.images[1]}
              alt={`${brand.shortName} - Daftar Menu Paket Kotak`}
              className="h-full w-full object-cover"
              width={600}
              height={800}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
