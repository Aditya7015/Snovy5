import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Send } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary pt-16 pb-8">
      <div className="container-custom">
        {/* Newsletter Section */}
        <div className="mb-12 max-w-lg mx-auto text-center">
          <h3 className="text-2xl font-serif mb-3">
            Subscribe to our newsletter
          </h3>
          <p className="text-muted-foreground mb-6">
            Stay updated with our latest collections and exclusive offers.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 py-3 px-4 border border-r-0 rounded-l-md focus:outline-none"
            />
            <button
              type="button"
              title="Subscribe"
              className="bg-primary text-white px-4 rounded-r-md flex items-center"
              onClick={(e) => {
                e.preventDefault();
                const input = e.currentTarget
                  .previousElementSibling as HTMLInputElement;
                if (input) {
                  input.value = "";
                  const parentDiv = input.parentElement;
                  if (parentDiv) {
                    parentDiv.style.position = "relative";
                    const message = document.createElement("span");
                    message.className =
                      "text-green-600 text-sm absolute -bottom-6 left-0";
                    message.textContent = "Subscribed successfully!";
                    parentDiv.appendChild(message);
                    setTimeout(() => message.remove(), 3000);
                  }
                }
              }}
            >
              <Send size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Column */}
          <div>
            <h4 className="font-serif text-lg mb-4">Snoovy</h4>
            <p className="text-muted-foreground text-sm">
              A curated collection of modern classics and timeless pieces
              designed to elevate your personal style.
            </p>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <p>GCET, Greater Noida</p>
              <p>Phone: +91 7777048666</p>
              <p>Email: nk10nikhil@gmail.com</p>
            </div>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="hover:text-primary" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="hover:text-primary" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="hover:text-primary" aria-label="Twitter">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="font-medium mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/shop"
                  className="text-muted-foreground hover:text-primary"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="text-muted-foreground hover:text-primary"
                >
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="text-muted-foreground hover:text-primary"
                >
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="font-medium mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-primary"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link
                  to="/#"
                  className="text-muted-foreground hover:text-primary"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-primary"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  to="/#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Sustainability
                </Link>
              </li>
              <li>
                <Link
                  to="/#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-16 pt-8 text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Snoovy. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex gap-2">
            <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
              VISA
            </div>
            <div className="w-10 h-6 bg-red-500 rounded flex items-center justify-center text-white text-xs font-bold">
              MC
            </div>
            <div className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center text-white text-xs">
              AmEx
            </div>
            <div className="w-10 h-6 bg-yellow-400 rounded flex items-center justify-center text-black text-xs font-bold">
              GPay
            </div>
            <div className="w-10 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">
              PayP
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
