import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Simulate form submission
    setLoading(true);
    setTimeout(() => {
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-secondary py-16">
          <div className="container-custom text-center">
            <h1 className="text-4xl font-serif mb-4">Contact Us</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Have a question or need assistance? We're here to help. Fill out
              the form below and we'll get back to you as soon as possible.
            </p>
          </div>
        </section>

        {/* Contact Form and Info */}
        <section className="py-20">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-serif mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-serif mb-6">Get In Touch</h2>

                <div className="space-y-6">
                  <div className="flex">
                    <MapPin size={24} className="text-primary mr-4" />
                    <div>
                      <h3 className="font-medium mb-2">Our Location</h3>
                      <p className="text-muted-foreground">
                        Snovy5
                        <br />
                        GCET, Greater Noida, UP, India
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <Phone size={24} className="text-primary mr-4" />
                    <div>
                      <h3 className="font-medium mb-2">Phone</h3>
                      <p className="text-muted-foreground">+91 9616008169</p>
                    </div>
                  </div>

                  <div className="flex">
                    <Mail size={24} className="text-primary mr-4" />
                    <div>
                      <h3 className="font-medium mb-2">Email</h3>
                      <p className="text-muted-foreground">
                        shivamgiri2020@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <Clock size={24} className="text-primary mr-4" />
                    <div>
                      <h3 className="font-medium mb-2">Hours</h3>
                      <p className="text-muted-foreground">
                        Monday - Friday: 9:00 AM - 6:00 PM
                        <br />
                        Saturday: 10:00 AM - 4:00 PM
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t">
                  <h3 className="font-medium mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    {["Instagram", "Facebook"].map(
                      (social) => (
                        <a
                          target="blank"
                          key={social}
                          href="https://www.instagram.com/snovy5_?igsh=MXRlcXJrcG1qd2hmNQ=="
                          className="px-4 py-2 border rounded hover:bg-secondary transition-colors"
                        >
                          {social}
                        </a>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section
        <section className="h-[400px] bg-neutral-100 relative">
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            Map Placeholder - Google Map would be integrated here
          </div>
        </section> */}

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container-custom">
            <h2 className="text-3xl font-serif mb-10 text-center">
              Frequently Asked Questions
            </h2>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  q: "What sizes do you offer?",
                  a: "We offer a range of sizes from XS to XXL for most of our apparel. Please refer to our Size Guide on each product page for detailed measurements.",
                },
                {
                  q: "What is your return policy?",
                  a: "We accept returns within 30 days of delivery for unworn items with tags attached. Please visit our Shipping & Returns page for detailed instructions.",
                },
                {
                  q: "How should I care for my garments?",
                  a: "Care instructions are provided on the label of each garment. Generally, we recommend gentle machine washing or hand washing to preserve the quality of the fabric.",
                },
                {
                  q: "How can I track my order?",
                  a: "Once your order ships, you'll receive a confirmation email with a tracking number. You can use this to track your package on the carrier's website.",
                },
              ].map((faq, idx) => (
                <div key={idx} className="border-b pb-6">
                  <h3 className="font-medium text-lg mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
