import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/40 px-4">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Aqiqah Ahsan Official</p>
        <h1 className="mt-3 font-heading text-6xl font-bold text-foreground">404</h1>
        <p className="mt-3 text-muted-foreground">Halaman yang Anda cari tidak ditemukan.</p>
        <Button asChild className="mt-6">
          <Link to="/">Kembali ke Beranda</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
