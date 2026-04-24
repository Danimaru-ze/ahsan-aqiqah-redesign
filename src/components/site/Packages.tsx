import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSiteData } from "@/hooks/use-site-data";
import type { PackageItem } from "@/types/site";

function PackageCard({ pkg }: { pkg: PackageItem }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-card">
      <div className="aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={pkg.image}
          alt={pkg.name}
          loading="lazy"
          width={600}
          height={750}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-heading text-xl font-semibold text-foreground">{pkg.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{pkg.tagline}</p>

        <ul className="mt-4 space-y-2">
          {pkg.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <p className="mt-4 text-xs italic text-muted-foreground">{pkg.note}</p>

        <div className="mt-6 flex items-end justify-between border-t border-border pt-4">
          <div>
            <div className="text-xs text-muted-foreground">Mulai dari</div>
            <div className="font-heading text-2xl font-bold text-primary">{pkg.priceLabel}</div>
          </div>
          <Button asChild size="sm">
            <Link to={`/contact?paket=${encodeURIComponent(pkg.name)}`}>Pesan</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

export function Packages() {
  const { data } = useSiteData();
  if (!data) return null;
  const { packages, packagesSection } = data;

  return (
    <section id="paket" className="bg-secondary/40 py-16 md:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Paket Aqiqah</p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">{packagesSection.title}</h2>
          <p className="mt-3 text-muted-foreground">{packagesSection.subtitle}</p>
        </div>

        <Tabs defaultValue="jantan" className="mt-10">
          <div className="flex justify-center">
            <TabsList className="h-auto rounded-full bg-background p-1.5 shadow-soft">
              <TabsTrigger value="jantan" className="rounded-full px-6 py-2.5 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                {packages.jantan.label}
              </TabsTrigger>
              <TabsTrigger value="betina" className="rounded-full px-6 py-2.5 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                {packages.betina.label}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="jantan" className="mt-10">
            <p className="mb-6 text-center text-sm text-muted-foreground">{packages.jantan.description}</p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {packages.jantan.items.map((p) => <PackageCard key={p.id} pkg={p} />)}
            </div>
          </TabsContent>

          <TabsContent value="betina" className="mt-10">
            <p className="mb-6 text-center text-sm text-muted-foreground">{packages.betina.description}</p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {packages.betina.items.map((p) => <PackageCard key={p.id} pkg={p} />)}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
