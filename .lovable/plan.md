
# Rebuild Website Aqiqah Ahsan Official

Membangun ulang [aqiqahahsan2.odoo.com](https://aqiqahahsan2.odoo.com/) dengan tampilan baru yang elegan, ungu, dan fully data-driven via `data.json`.

## Halaman & Struktur

**1. Landing Page (`/`)** — single page scroll dengan section:
- **Navbar** — logo Aqiqah Ahsan + menu (Home, Paket, Tentang, Galeri, Kontak) + tombol WA
- **Hero** — judul "Aqiqah Ahsan Official", tagline "Sejak 2019 — Layanan Aqiqah Keluarga Muslim", info pengiriman luar kota, CTA "Pesan Sekarang", 2 gambar poster (Sate Gule + Daftar Menu Paket Kotak)
- **Tentang Kami** — cerita brand sejak 2019, value (higienis, siap saji, amanah)
- **Paket Aqiqah** — 2 grup tab/section:
  - Paket Kambing Jantan (Laki-laki) — 3 kartu paket
  - Paket Kambing Betina — 3 kartu paket
  - Tiap kartu: gambar, nama paket, deskripsi, list (porsi gulai, tusuk sate, rica-rica), harga, tombol "Pesan Paket Ini"
- **Area Pengiriman** — grid kota: Ponorogo, Nganjuk, Pacitan, Wonogiri, Bojonegoro, Sragen, Ngawi, Magetan
- **Galeri / Testimoni** — grid foto dokumentasi
- **Kontak Singkat** — alamat, peta embed Google Maps, tombol WhatsApp besar
- **Footer** — logo, alamat, sosmed, copyright

**2. Halaman Contact (`/contact`)** — form kontak (Nama, No HP, Pilih Paket, Tanggal Acara, Alamat Pengiriman, Catatan). Saat submit → validasi → redirect otomatis ke WhatsApp `0812-3418-5424` dengan format pesan yang sudah terisi otomatis dari form.

## Data-Driven via `data.json`

Semua konten ada di `public/data.json`. Tidak ada teks/gambar yang di-hardcode di komponen. Struktur:

```json
{
  "brand": {
    "name": "Aqiqah Ahsan Official",
    "tagline": "Layanan Aqiqah Keluarga Muslim",
    "since": "2019",
    "logo": "/images/logo.png",
    "phone": "0812-3418-5424",
    "whatsapp": "6281234185424",
    "address": "jln. mojoendah blok D7 no. 1 Perumnas 1 Desa Mojopurno...",
    "mapsUrl": "https://maps.app.goo.gl/qmkdQrkvwGxpaXXy9",
    "instagram": "...", "tiktok": "..."
  },
  "hero": {
    "title": "...", "subtitle": "...", "ctaLabel": "Pesan Sekarang",
    "images": ["/images/hero-1.webp", "/images/hero-2.webp"]
  },
  "about": { "title": "...", "description": "...", "values": [...] },
  "deliveryAreas": ["Ponorogo", "Nganjuk", "Pacitan", "Wonogiri", "Bojonegoro", "Sragen", "Ngawi", "Magetan"],
  "packages": {
    "jantan": [
      { "id": "jantan-01", "name": "Paket Aqiqah Anak Laki-Laki 01", "image": "/images/paket-jantan-1.webp",
        "description": "Rayakan aqiqah buah hati tanpa ribet!",
        "features": ["2 kambing jantan", "120 porsi gulai", "360 tusuk sate", "Rica-rica kepala, kaki & kulit"],
        "price": 4450000, "priceLabel": "Rp 4.450.000" }
    ],
    "betina": [...]
  },
  "gallery": [{ "image": "/images/galeri-1.webp", "caption": "..." }],
  "testimonials": [...],
  "contactForm": {
    "title": "Hubungi Kami",
    "fields": [...],
    "whatsappTemplate": "Halo Aqiqah Ahsan, saya {nama} ingin pesan paket {paket} untuk tanggal {tanggal}. Alamat: {alamat}. Catatan: {catatan}"
  }
}
```

User tinggal edit `data.json` untuk ubah teks/harga/paket, dan ganti file di `/public/images/` untuk ubah foto.

## Folder Aset

```
public/
├── data.json
└── images/
    ├── logo.png
    ├── hero-1.webp, hero-2.webp           (poster Sate Gule & Menu Paket Kotak)
    ├── paket-jantan-1/2/3.webp
    ├── paket-betina-1/2/3.webp
    └── galeri-*.webp
```

Semua foto akan di-download otomatis dari website asli ke folder ini saat build.

## Design System

- **Palette**: Ungu elegan (sesuai brand asli)
  - Primary: `#5B2A86` (ungu deep)
  - Secondary/accent: `#8B5CF6` (ungu lavender)
  - Background: `#FFFFFF` & `#FAF7FF` (off-white ungu sangat lembut)
  - Foreground: `#1F1235` (deep plum)
  - Muted: `#F3EDFA`
  - Border subtle ungu tipis
- **Typography**: 
  - Headings → **Montserrat** (600/700)
  - Body & UI → **Poppins** (400/500)
  - Loaded via Google Fonts di `index.html`
- **Visual style**: Elegant simple — banyak whitespace, kartu rounded `rounded-2xl`, soft shadow ungu, hover lift halus, divider tipis. Tanpa gradien norak.
- **Komponen**: shadcn Button, Card, Input, Form (zod validation), Tabs (untuk switch Jantan/Betina), Sheet (mobile menu)
- **Responsif**: Mobile-first, breakpoint Tailwind. Navbar collapse ke hamburger di <md. Grid paket: 1 kolom mobile, 2 tablet, 3 desktop.

## Branding & Cleanup

- **Hapus seluruh referensi Lovable**: title, meta, favicon, og-image, semua mengacu ke "Aqiqah Ahsan Official"
- Favicon baru pakai logo Aqiqah Ahsan
- Meta SEO (title, description, og:image) Indonesia, mengarah ke brand
- Hapus `placeholder.svg`, `App.css` default

## Form → WhatsApp Flow

1. User isi form di `/contact` (Nama, HP, Paket [dropdown dari data.json], Tanggal, Alamat, Catatan)
2. Validasi zod (nama wajib, HP format Indonesia, dll)
3. Submit → build pesan dari `whatsappTemplate` di data.json (placeholder `{nama}`, `{paket}`, dst diganti)
4. `window.location.href = https://wa.me/{whatsapp}?text={encodeURIComponent(pesan)}` → otomatis buka WhatsApp dengan pesan terisi

## Detail Teknis

- React + Vite + TypeScript + Tailwind + shadcn (sudah ada)
- `data.json` di `public/` → di-fetch lewat `fetch('/data.json')` di custom hook `useSiteData()` dengan React Query (cached)
- Loading state pakai Skeleton shadcn
- Tambah Google Fonts (Poppins + Montserrat) di `index.html`
- Update `tailwind.config.ts`: extend `fontFamily.sans = ['Poppins', ...]`, `fontFamily.heading = ['Montserrat', ...]`
- Update `src/index.css`: ganti semua HSL token jadi palette ungu (light mode only — hapus dark mode block agar tidak bingung)
- Routes: `/` → Index, `/contact` → Contact, `*` → NotFound (rebrand juga)
- Download foto dari URL Odoo → simpan ke `public/images/` dengan nama rapi
- Hapus `data-lovable-*` attributes, badge Lovable di-hide via `publish_settings--set_badge_visibility` (perlu Pro plan; akan di-attempt)
- Form pakai `react-hook-form` + `zod` (sudah ada di shadcn Form)

## Yang akan dikerjakan (urutan)

1. Download semua gambar dari website asli ke `public/images/`
2. Buat `public/data.json` lengkap dengan konten asli
3. Update `index.html` (title, meta, favicon, fonts, hapus referensi Lovable)
4. Update `index.css` + `tailwind.config.ts` (palette ungu + Poppins/Montserrat)
5. Buat hook `useSiteData()` untuk fetch data.json
6. Bangun komponen: Navbar, Footer, Hero, About, PackageCard, PackagesSection, DeliveryAreas, Gallery, ContactCTA
7. Implement `pages/Index.tsx` (compose semua section)
8. Implement `pages/Contact.tsx` dengan form + redirect WhatsApp
9. Update routing di `App.tsx` + rebrand NotFound
10. Hide Lovable badge via publish settings
