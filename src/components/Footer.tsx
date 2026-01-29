import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card text-card-foreground pt-20 pb-10 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="block">
              <span className="font-heading text-3xl font-bold tracking-tight text-primary">EasyBuy</span>
            </Link>

            <p className="text-muted-foreground leading-relaxed text-sm">
              Your premier destination for fashion-forward clothing and
              accessories. We believe in quality, style, and sustainability.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-lg font-bold mb-6 text-foreground">Shop</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link to="/search" className="text-muted-foreground hover:text-primary transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/search?category=men" className="text-muted-foreground hover:text-primary transition-colors">
                  Men's Collection
                </Link>
              </li>
              <li>
                <Link to="/search?category=women" className="text-muted-foreground hover:text-primary transition-colors">
                  Women's Collection
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg font-bold mb-6 text-foreground">Company</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg font-bold mb-6 text-foreground">Connect</h4>
            <div className="flex space-x-4 mb-6">
              {[FaFacebook, FaInstagram, FaTwitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-lg text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <Icon />
                </a>
              ))}
            </div>
            <p className="text-muted-foreground text-sm">
              Subscribe to our newsletter for updates and exclusive offers.
            </p>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">&copy; {currentYear} EasyBuy. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <Link to="/privacy-policy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
            <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
            <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
