import { Link } from "react-router-dom";
import { Instagram, MapPin, Phone } from "lucide-react";
import { useSiteData } from "@/hooks/use-site-data";

export function Footer() {
  const { data } = useSiteData();
  if (!data) return null;
  const { brand, footer, nav } = data;

  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="container-page py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <img src={brand.logo} alt="" className="h-10 w-10" width={40} height={40} loading="lazy" />
              <div>
                <div className="font-heading text-base font-bold text-primary">{brand.shortName}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Official • Sejak {brand.since}</div>
              </div>
            </Link>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">{footer.description}</p>
            <div className="mt-5 flex items-center gap-4">
              <a href={brand.instagram} target="_blank" rel="noreferrer" className="text-foreground/70 hover:text-primary" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={`tel:${brand.phoneTel}`} className="text-foreground/70 hover:text-primary" aria-label="Telepon">
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold text-foreground">Navigasi</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href.startsWith("#") ? `/${item.href}` : item.href} className="text-muted-foreground transition-colors hover:text-primary">
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <Link to="/contact" className="text-muted-foreground transition-colors hover:text-primary">Hubungi Kami</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold text-foreground">Kontak</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{brand.address}</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a href={`tel:${brand.phoneTel}`} className="hover:text-primary">{brand.phoneDisplay}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {footer.copyright}
        </div>
      </div>
    </footer>
  );
}
