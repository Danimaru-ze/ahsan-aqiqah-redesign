import { useSiteData } from "@/hooks/use-site-data";
import { Lightbox } from "./Lightbox";

export function Gallery() {
  const { data } = useSiteData();
  if (!data) return null;
  const { gallery, gallerySection } = data;

  return (
    <section id="galeri" className="bg-secondary/40 py-16 md:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Galeri</p>
          <h2 className="mt-3 font-heading text-2xl font-bold text-foreground sm:text-4xl">{gallerySection.title}</h2>
          <p className="mt-3 text-muted-foreground">{gallerySection.subtitle}</p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:gap-5">
          {gallery.map((g, i) => (
            <Lightbox key={i} src={g.image} alt={g.caption}>
              <figure
                className="group relative aspect-square overflow-hidden rounded-2xl bg-muted shadow-soft cursor-zoom-in"
              >
                <img
                  src={g.image}
                  alt={g.caption}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/80 to-transparent p-4 text-left text-[10px] sm:text-xs font-medium text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100">
                  {g.caption}
                </figcaption>
              </figure>
            </Lightbox>
          ))}
        </div>
      </div>
    </section>
  );
}
