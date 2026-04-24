import { Brand } from "@/types/site";

/** Build a wa.me URL with the given message. */
export function buildWhatsAppUrl(brand: Pick<Brand, "whatsappNumber">, message: string) {
  return `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Replace {placeholder} tokens in the template with values. */
export function fillTemplate(template: string, values: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
}
