import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[60vh] bg-neutral-100">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1552668693-2be72c866be4?q=80&w=1500"
              alt="Fashion design sketches"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>

          <div className="relative container-custom h-full flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl md:text-6xl text-white font-serif mb-6 max-w-2xl">
              Our Philosophy
            </h1>
            <p className="text-white/90 text-lg md:text-xl mb-8 max-w-xl">
              Creating timeless fashion for the modern individual
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-serif mb-6">Our Mission</h2>
                <p className="text-muted-foreground mb-4">
                  At Snoovy, we believe in the power of personal expression
                  through fashion. Our mission is to create high-quality,
                  versatile pieces that empower you to build a wardrobe that is
                  both timeless and uniquely yours. We are driven by a passion
                  for design and a commitment to our customers.
                </p>
                <p className="text-muted-foreground mb-4">
                  Founded in 2020, we saw a need for clothing that transcends
                  trends. We focus on modern classics that are designed to be
                  worn and loved for years to come, reducing waste and promoting
                  conscious consumption. Our design philosophy centers on clean
                  lines, sophisticated aesthetics, and exceptional comfort.
                </p>
                <p className="text-muted-foreground mb-4">
                  We partner with skilled artisans and ethical factories around
                  the globe to ensure exceptional craftsmanship. From the finest
                  fabrics to the final stitch, every garment is made with
                  integrity and a commitment to excellence. We meticulously
                  select materials that are not only luxurious but also
                  sustainable and durable.
                </p>
                <p className="text-muted-foreground">
                  Our goal is to inspire confidence and help you curate a
                  wardrobe that reflects your individuality, making fashion an
                  enjoyable and sustainable journey.
                </p>
              </div>
              <div>
                <div className="relative h-full rounded-lg overflow-hidden shadow-lg">
                  <div className="absolute inset-0 bg-neutral-200 animate-pulse"></div>
                  <div className="relative z-10 p-6 h-full flex flex-col justify-center">
                    <div className="w-16 h-16 mb-4 mx-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <path d="M12 2l-2 7h4l-2 7 4 6H8l4-6H8l2-7z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-center mb-2">
                      Timeless Style
                    </h3>
                    <p className="text-sm text-center text-muted-foreground">
                      Our collections are designed to be versatile and lasting,
                      forming the foundation of your personal style for seasons
                      to come.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-secondary">
          <div className="container-custom">
            <h2 className="text-3xl font-serif mb-12 text-center">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-primary text-2xl">01</span>
                </div>
                <h3 className="text-xl font-medium mb-4">
                  Quality Craftsmanship
                </h3>
                <p className="text-muted-foreground">
                  We are committed to exceptional quality in every stitch and
                  seam. Each garment is meticulously crafted from the finest
                  materials, sourced responsibly, to ensure not only a perfect
                  fit but also lasting durability and comfort. Our dedication to
                  quality means your clothes will stand the test of time.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-primary text-2xl">02</span>
                </div>
                <h3 className="text-xl font-medium mb-4">Modern Design</h3>
                <p className="text-muted-foreground">
                  Our aesthetic is rooted in modern simplicity and elegance. We
                  create pieces that are both contemporary and timeless,
                  allowing for effortless style that seamlessly integrates into
                  any wardrobe. We believe in designs that are functional,
                  beautiful, and adaptable to various occasions and personal
                  tastes.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-primary text-2xl">03</span>
                </div>
                <h3 className="text-xl font-medium mb-4">Ethical Approach</h3>
                <p className="text-muted-foreground">
                  We partner with manufacturers and suppliers who uphold the
                  highest standards of ethical labor practices and environmental
                  responsibility. We ensure fair wages, safe working conditions,
                  and a commitment to reducing our ecological footprint
                  throughout our supply chain. Integrity is at the heart of
                  everything we do.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="container-custom">
            <h2 className="text-3xl font-serif mb-12 text-center">
              Meet Our Founders
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Shivam Giri ",
                  role: "Founder & Creative Director",
                  image:
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400",
                },
                {
                  name: "Shivam Giri",
                  role: "Head of Design",
                  image:
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400",
                },
                {
                  name: "Shivam Giri",
                  role: "Operations Lead",
                  image:
                    "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=400",
                },
              ].map((member, idx) => (
                <div key={idx} className="text-center">
                  <div className="aspect-square rounded-full overflow-hidden w-48 h-48 mx-auto mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-medium mb-2">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        {/* CTA Section */}
<section className="py-20 bg-black text-white">
  <div className="container-custom text-center">
    <h2 className="text-3xl md:text-4xl font-serif mb-6">
      Join the Snovy5 Community
    </h2>

    <p className="text-lg text-gray-300 mb-10 max-w-xl mx-auto">
      Unlock exclusive drops, insider news, and streetwear built for bold individuality.
    </p>

    <div className="flex flex-wrap gap-4 justify-center">
  <Button
    className="bg-white text-black hover:bg-white/90 font-semibold px-8 py-3 rounded-md transition"
    asChild
  >
    <Link to="/shop">Shop The Latest</Link>
  </Button>

  <Button
    className="border border-gray-500 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-3 rounded-md"
    variant="ghost"
    asChild
  >
    <Link to="/contact">Ask a Question</Link>
  </Button>
</div>

  </div>
</section>

      </main>

      <Footer />
    </div>
  );
};

export default About;
