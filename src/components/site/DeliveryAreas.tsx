import { MapPin } from "lucide-react";
import { useSiteData } from "@/hooks/use-site-data";

export function DeliveryAreas() {
  const { data } = useSiteData();
  if (!data) return null;
  const { deliveryAreas, deliverySection } = data;

  return (
    <section className="py-16 md:py-20">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Jangkauan</p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">{deliverySection.title}</h2>
          <p className="mt-3 text-muted-foreground">{deliverySection.subtitle}</p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {deliveryAreas.map((area) => (
            <div key={area} className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-accent/50">
              <MapPin className="h-4 w-4 shrink-0 text-primary" />
              <span>{area}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
