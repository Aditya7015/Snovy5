// src/pages/admin/AdminLayout.tsx
import { NavLink, Outlet, Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useAdminAuth } from "@/context/AdminAuthContext";

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
          className={({ isActive }) =>
            cn(
              "block rounded-md px-3 py-2 text-sm font-medium transition",
              isActive
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
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
    <div className="min-h-screen bg-background flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 border-r bg-card p-6 gap-6">
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
            variant="outline"
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

      {/* Mobile sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="md:hidden fixed top-4 left-4 z-40"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col justify-between">
          <div className="space-y-6 mt-4">
            <div>
              <h1 className="text-xl font-semibold">Snovy Admin</h1>
              <p className="text-xs text-muted-foreground">
                Manage products and store content
              </p>
            </div>
            {sidebar}
          </div>
          <div className="mt-6 text-xs text-muted-foreground">
            <p className="mb-1">
              Logged in as <span className="font-medium">{admin?.email}</span>
            </p>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={logoutAdmin}
            >
              Logout
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <header className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">
                Admin Panel
              </h2>
              <p className="text-xs text-muted-foreground">
                Manage your Snovy storefront content
              </p>
            </div>
          </header>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
