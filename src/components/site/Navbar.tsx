import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSiteData } from "@/hooks/use-site-data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { data } = useSiteData();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const onHome = location.pathname === "/";

  if (!data) return null;
  const { brand, nav } = data;

  const renderLink = (href: string, label: string, onClick?: () => void) => {
    if (href.startsWith("#")) {
      return onHome ? (
        <a key={href} href={href} onClick={onClick} className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary">
          {label}
        </a>
      ) : (
        <Link key={href} to={`/${href}`} onClick={onClick} className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary">
          {label}
        </Link>
      );
    }
    return (
      <Link key={href} to={href} onClick={onClick} className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary">
        {label}
      </Link>
    );
  };

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md"
    )}>
      <div className="container-page flex h-16 items-center justify-between md:h-20">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={brand.logo} alt={`${brand.shortName} logo`} className="h-10 w-10 md:h-11 md:w-11" width={44} height={44} />
          <div className="flex flex-col leading-tight">
            <span className="font-heading text-base font-bold text-primary md:text-lg">{brand.shortName}</span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground md:text-xs">Official</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => renderLink(item.href, item.label))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a href={`tel:${brand.phoneTel}`} className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary">
            <Phone className="h-4 w-4" />
            {brand.phoneDisplay}
          </a>
          <Button asChild>
            <Link to="/contact">Pesan Sekarang</Link>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Buka menu">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[85%] max-w-sm">
            <div className="mt-8 flex flex-col gap-6">
              <nav className="flex flex-col gap-4">
                {nav.map((item) => renderLink(item.href, item.label, () => setOpen(false)))}
              </nav>
              <div className="border-t border-border pt-6">
                <a href={`tel:${brand.phoneTel}`} className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground/80">
                  <Phone className="h-4 w-4" />
                  {brand.phoneDisplay}
                </a>
                <Button asChild className="w-full">
                  <Link to="/contact" onClick={() => setOpen(false)}>Pesan Sekarang</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
