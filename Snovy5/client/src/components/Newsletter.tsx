
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Mail } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thanks for subscribing!");
    setEmail("");
  };

  return (
    <section className="bg-secondary py-20">
      <div className="container-custom text-center">
        <Mail className="mx-auto mb-6 text-primary" size={32} />
        <h2 className="text-3xl md:text-4xl font-serif mb-4">Stay Updated</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Subscribe to our newsletter for exclusive offers, style tips, and new collection announcements.
        </p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 rounded-md border border-input bg-background"
            required
          />
          <Button type="submit">Subscribe</Button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
