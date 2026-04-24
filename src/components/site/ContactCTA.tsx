import { Link } from "react-router-dom";
import { ArrowRight, MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteData } from "@/hooks/use-site-data";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function ContactCTA() {
  const { data } = useSiteData();
  if (!data) return null;
  const { brand, contactSection } = data;

  const waUrl = buildWhatsAppUrl(brand, `Assalamualaikum ${brand.shortName}, saya ingin bertanya tentang paket aqiqah.`);

  return (
    <section id="kontak" className="py-16 md:py-24">
      <div className="container-page">
        <div className="overflow-hidden rounded-3xl gradient-hero shadow-card">
          <div className="grid gap-8 p-8 md:grid-cols-2 md:p-12 lg:p-16">
            <div className="text-primary-foreground">
              <h2 className="font-heading text-3xl font-bold sm:text-4xl">{contactSection.title}</h2>
              <p className="mt-3 text-primary-foreground/85">{contactSection.subtitle}</p>

              <ul className="mt-6 space-y-3 text-sm text-primary-foreground/90">
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{brand.address}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                  <a href={`tel:${brand.phoneTel}`} className="hover:underline">{brand.phoneDisplay}</a>
                </li>
              </ul>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" variant="secondary">
                  <Link to="/contact">
                    Isi Form Pemesanan
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  <a href={waUrl} target="_blank" rel="noreferrer">
                    <MessageCircle className="mr-1 h-4 w-4" />
                    Chat WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl bg-background shadow-soft">
              <iframe
                title="Lokasi Aqiqah Ahsan"
                src={brand.mapsEmbedSrc}
                className="h-72 w-full md:h-full"
                style={{ border: 0, minHeight: 280 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
