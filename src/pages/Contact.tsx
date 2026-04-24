import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, MessageCircle, Phone, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { useSiteData } from "@/hooks/use-site-data";
import { buildWhatsAppUrl, fillTemplate } from "@/lib/whatsapp";

const formSchema = z.object({
  nama: z.string().trim().min(2, "Nama minimal 2 karakter").max(80, "Nama terlalu panjang"),
  telepon: z
    .string()
    .trim()
    .min(8, "Nomor terlalu pendek")
    .max(20, "Nomor terlalu panjang")
    .regex(/^[0-9+\-\s]+$/u, "Hanya angka, +, -, dan spasi"),
  paket: z.string().min(1, "Pilih paket aqiqah"),
  tanggal: z.string().min(1, "Pilih tanggal acara"),
  alamat: z.string().trim().min(8, "Alamat terlalu pendek").max(300, "Alamat terlalu panjang"),
  catatan: z.string().trim().max(500, "Catatan terlalu panjang").optional().or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const { data, isLoading } = useSiteData();
  const [searchParams] = useSearchParams();
  const presetPaket = searchParams.get("paket") ?? "";

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { nama: "", telepon: "", paket: presetPaket, tanggal: "", alamat: "", catatan: "" },
  });

  useEffect(() => {
    if (presetPaket) form.setValue("paket", presetPaket);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presetPaket]);

  if (isLoading || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        Memuat…
      </div>
    );
  }

  const { brand, contactPage, packages } = data;
  const allPackages = [...packages.jantan.items, ...packages.betina.items];

  const onSubmit = (values: FormValues) => {
    const message = fillTemplate(contactPage.whatsappTemplate, {
      nama: values.nama,
      telepon: values.telepon,
      paket: values.paket,
      tanggal: values.tanggal,
      alamat: values.alamat,
      catatan: values.catatan?.trim() ? values.catatan : "-",
    });
    const url = buildWhatsAppUrl(brand, message);

    toast({
      title: "Mengarahkan ke WhatsApp…",
      description: "Pesan Anda akan terbuka di WhatsApp.",
    });

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-secondary/30 py-12 md:py-16">
        <div className="container-page">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke beranda
          </Link>

          <div className="mt-6 grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">{contactPage.title}</h1>
              <p className="mt-3 text-muted-foreground">{contactPage.subtitle}</p>

              <div className="mt-8 space-y-4 rounded-2xl border border-border bg-card p-6 shadow-soft">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Telepon / WA</div>
                    <a href={`tel:${brand.phoneTel}`} className="font-heading text-base font-semibold text-foreground hover:text-primary">
                      {brand.phoneDisplay}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Alamat</div>
                    <div className="text-sm text-foreground">{brand.address}</div>
                    <a href={brand.mapsUrl} target="_blank" rel="noreferrer" className="mt-1 inline-block text-xs text-primary hover:underline">
                      Buka di Google Maps →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft md:p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <FormField control={form.control} name="nama" render={({ field }) => (
                        <FormItem>
                          <FormLabel>{contactPage.fields.nama.label}</FormLabel>
                          <FormControl><Input placeholder={contactPage.fields.nama.placeholder} maxLength={80} {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="telepon" render={({ field }) => (
                        <FormItem>
                          <FormLabel>{contactPage.fields.telepon.label}</FormLabel>
                          <FormControl><Input type="tel" placeholder={contactPage.fields.telepon.placeholder} maxLength={20} {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <FormField control={form.control} name="paket" render={({ field }) => (
                        <FormItem>
                          <FormLabel>{contactPage.fields.paket.label}</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger><SelectValue placeholder={contactPage.fields.paket.placeholder} /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>{packages.jantan.label}</SelectLabel>
                                {packages.jantan.items.map((p) => (
                                  <SelectItem key={p.id} value={`${p.name} (${packages.jantan.label}) - ${p.priceLabel}`}>
                                    {p.name} — {p.priceLabel}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                              <SelectGroup>
                                <SelectLabel>{packages.betina.label}</SelectLabel>
                                {packages.betina.items.map((p) => (
                                  <SelectItem key={p.id} value={`${p.name} (${packages.betina.label}) - ${p.priceLabel}`}>
                                    {p.name} — {p.priceLabel}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                              <SelectGroup>
                                <SelectLabel>Lainnya</SelectLabel>
                                <SelectItem value="Konsultasi paket">Konsultasi paket dulu</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="tanggal" render={({ field }) => (
                        <FormItem>
                          <FormLabel>{contactPage.fields.tanggal.label}</FormLabel>
                          <FormControl><Input type="date" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    <FormField control={form.control} name="alamat" render={({ field }) => (
                      <FormItem>
                        <FormLabel>{contactPage.fields.alamat.label}</FormLabel>
                        <FormControl><Textarea rows={3} maxLength={300} placeholder={contactPage.fields.alamat.placeholder} {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="catatan" render={({ field }) => (
                      <FormItem>
                        <FormLabel>{contactPage.fields.catatan.label}</FormLabel>
                        <FormControl><Textarea rows={3} maxLength={500} placeholder={contactPage.fields.catatan.placeholder} {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <Button type="submit" size="lg" className="w-full">
                      <MessageCircle className="mr-1 h-4 w-4" />
                      {contactPage.submitLabel}
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">
                      Saat dikirim, Anda akan diarahkan ke WhatsApp dengan pesan yang sudah terisi otomatis.
                    </p>
                    {/* allPackages prevents unused warning when needed elsewhere */}
                    <span className="hidden">{allPackages.length}</span>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
