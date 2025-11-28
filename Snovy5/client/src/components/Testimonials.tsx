import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const testimonials = [
  {
    id: 1,
    name: "Aisha Khan",
    role: "Fashion Blogger",
    content:
      "The quality of the fabric is amazing, and the fit is perfect. I always get compliments when I wear their pieces.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150",
  },
  {
    id: 2,
    name: "Rahul Verma",
    role: "Stylist",
    content:
      "Snoovy has become my go-to for timeless staples. Their collections are versatile and effortlessly chic.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150",
  },
  {
    id: 3,
    name: "Sneha Reddy",
    role: "Software Engineer",
    content:
      "I love how comfortable and stylish their clothes are. Perfect for both work and weekends.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150",
  },
  {
    id: 4,
    name: "David Lee",
    role: "Photographer",
    content:
      "The attention to detail in their designs is incredible. You can really see the craftsmanship in every piece.",
    image:
      "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=150",
  },
  {
    id: 5,
    name: "Emily Clark",
    role: "Marketing Manager",
    content:
      "I'm so impressed with the quality and customer service. I'll definitely be a returning customer.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150",
  },
  {
    id: 6,
    name: "Michael Brown",
    role: "Architect",
    content:
      "Their clothes are the perfect blend of modern and timeless. I always feel confident when I wear them.",
    image:
      "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=150",
  },
];

const Testimonials = () => {
  const containerRef = useScrollAnimation({ y: 30 });

  return (
    <section className="py-20" ref={containerRef}>
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="text-center bg-secondary p-6 rounded-lg"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <p className="text-muted-foreground mb-4">
                {testimonial.content}
              </p>
              <h3 className="font-medium">{testimonial.name}</h3>
              <p className="text-sm text-muted-foreground">
                {testimonial.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
