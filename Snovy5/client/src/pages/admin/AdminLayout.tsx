import { NavLink, Outlet, Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useAdminAuth } from "@/context/AdminAuthContext";
import ParticlesComponent from "@/components/Particles";

const adminLinks = [
  { label: "Dashboard", to: "/admin" },
  { label: "Products", to: "/admin/products" },
  { label: "Add Product", to: "/admin/add-product" },
  { label: "Orders", to: "/admin/orders" },
];

const AdminLayout = () => {
  const [open, setOpen] = useState(false);
  const { admin, logoutAdmin } = useAdminAuth();

  const sidebar = (
    <nav className="space-y-2">
      {adminLinks.map((link) => (
  <NavLink
    key={link.to}
    to={link.to}
    end={link.to === "/admin"} // 👈 Only enforce exact match for dashboard
    className={({ isActive }) =>
      cn(
        "block rounded-md px-3 py-2 text-sm font-medium transition",
        isActive
          ? "bg-primary text-primary-foreground"
          : "hover:bg-muted/40"
      )
    }
    onClick={() => setOpen(false)}
  >
    {link.label}
  </NavLink>
))}

    </nav>
  );

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* 🔥 Background Animation */}
      <div className="fixed inset-0 -z-10 pointer-events-none opacity-60">
        <ParticlesComponent />
      </div>

      <div className="min-h-screen flex relative z-10">

        {/* Desktop Sidebar */}
        <aside className="hidden md:flex md:flex-col w-64 
          border-r bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl
          p-6 gap-6 shadow-xl">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Snovy Admin</h1>
            <p className="text-xs text-muted-foreground mt-1">
              Manage products and store content
            </p>
          </div>
          {sidebar}

          <div className="mt-auto text-xs text-muted-foreground">
            <p className="mb-1">
              Logged in as <span className="font-medium">{admin?.email}</span>
            </p>
            <Button
              variant="secondary"
              size="sm"
              className="w-full"
              onClick={logoutAdmin}
            >
              Logout
            </Button>
            <Link
              to="/"
              className="mt-2 inline-block text-[11px] underline text-muted-foreground"
            >
              Back to store
            </Link>
          </div>
        </aside>

        {/* Mobile Sidebar */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="md:hidden fixed top-4 left-4 z-50"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="flex flex-col justify-between 
            bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl"
          >
            <div className="space-y-6 mt-4">
              <div>
                <h1 className="text-xl font-semibold">Snovy Admin</h1>
                <p className="text-xs text-muted-foreground">
                  Manage products and store content
                </p>
              </div>
              {sidebar}
            </div>

            <div className="text-xs text-muted-foreground mb-4">
              <p className="mb-1">
                Logged in as <span className="font-medium">{admin?.email}</span>
              </p>
              <Button
                variant="secondary"
                size="sm"
                className="w-full"
                onClick={logoutAdmin}
              >
                Logout
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-6 md:p-8 
          bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl
          border-l md:border-none">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;
