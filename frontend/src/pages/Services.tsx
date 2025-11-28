
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Settings, Home, Heart } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Interior Design Consultation",
    description: "Get expert advice on how to style your space with our curated collection."
  },
  {
    icon: Settings,
    title: "Custom Orders",
    description: "Work with our artisans to create unique pieces tailored to your needs."
  },
  {
    icon: Heart,
    title: "Personal Shopping",
    description: "Let our experts help you find the perfect pieces for your home."
  }
];

const Services = () => {
  const contentRef = useScrollAnimation({ y: 30 });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <section className="bg-secondary py-16">
          <div className="container-custom">
            <h1 className="text-4xl font-serif mb-4">Our Services</h1>
            <p className="text-muted-foreground max-w-2xl">
              Discover how we can help you create your perfect living space with our range of professional services.
            </p>
          </div>
        </section>
        
        <section ref={contentRef} className="py-20">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} className="text-center p-6 bg-secondary/50 rounded-lg">
                  <service.icon className="mx-auto mb-4 text-primary" size={32} />
                  <h2 className="text-xl font-medium mb-2">{service.title}</h2>
                  <p className="text-muted-foreground">{service.description}</p>
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

export default Services;
