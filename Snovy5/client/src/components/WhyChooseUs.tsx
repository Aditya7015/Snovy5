import { ShieldCheck, Leaf, Truck, Star } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const features = [
  {
    icon: <ShieldCheck size={40} className="text-primary" />,
    title: "Quality Guaranteed",
    description: "We stand by the quality of our products. Each item is crafted with the finest materials and attention to detail.",
  },
  {
    icon: <Leaf size={40} className="text-primary" />,
    title: "Sustainable Practices",
    description: "We are committed to sustainability, from sourcing materials to our packaging, to minimize our environmental impact.",
  },
  {
    icon: <Truck size={40} className="text-primary" />,
    title: "Fast & Free Shipping",
    description: "Enjoy fast and free shipping on all orders over $50. We deliver to your doorstep in the shortest time possible.",
  },
  {
    icon: <Star size={40} className="text-primary" />,
    title: "5-Star Reviews",
    description: "Our customers love us! We have thousands of 5-star reviews praising our products and customer service.",
  },
];

const WhyChooseUs = () => {
  const sectionRef = useScrollAnimation({ y: 100 });

  return (
    <section ref={sectionRef} className="py-20 bg-background">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif">Why Choose Us?</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            We are dedicated to providing you with the best products and services. Here are a few reasons why you should choose us.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
