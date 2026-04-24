export type Brand = {
  name: string;
  shortName: string;
  tagline: string;
  since: string;
  logo: string;
  phoneDisplay: string;
  phoneTel: string;
  whatsappNumber: string;
  address: string;
  mapsUrl: string;
  mapsEmbedSrc: string;
  instagram: string;
  tiktok: string;
};

export type NavItem = { label: string; href: string };

export type CTA = { label: string; href: string };

export type Hero = {
  eyebrow: string;
  title: string;
  subtitle: string;
  highlight: string;
  areas: string[];
  ctaPrimary: CTA;
  ctaSecondary: CTA;
  images: string[];
};

export type AboutValue = { title: string; description: string };
export type About = {
  title: string;
  subtitle: string;
  description: string;
  values: AboutValue[];
};

export type Section = { title: string; subtitle: string };

export type PackageItem = {
  id: string;
  name: string;
  image: string;
  tagline: string;
  features: string[];
  note: string;
  priceLabel: string;
};

export type PackageGroup = {
  label: string;
  description: string;
  items: PackageItem[];
};

export type Packages = {
  jantan: PackageGroup;
  betina: PackageGroup;
};

export type GalleryItem = { image: string; caption: string };
export type Testimonial = { name: string; city: string; message: string };

export type ContactField = { label: string; placeholder: string };
export type ContactPage = {
  title: string;
  subtitle: string;
  fields: {
    nama: ContactField;
    telepon: ContactField;
    paket: ContactField;
    tanggal: ContactField;
    alamat: ContactField;
    catatan: ContactField;
  };
  submitLabel: string;
  whatsappTemplate: string;
};

export type Footer = { description: string; copyright: string };
export type Seo = { title: string; description: string; ogImage: string };

export type SiteData = {
  brand: Brand;
  nav: NavItem[];
  hero: Hero;
  about: About;
  deliverySection: Section;
  deliveryAreas: string[];
  packagesSection: Section;
  packages: Packages;
  gallerySection: Section;
  gallery: GalleryItem[];
  testimonials: Testimonial[];
  contactSection: Section;
  contactPage: ContactPage;
  footer: Footer;
  seo: Seo;
};
