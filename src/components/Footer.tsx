import { CiFacebook, CiInstagram, CiTwitter } from "react-icons/ci";
import { Link } from "react-router-dom";
import whitLogo from "../assets/images/white.png";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white ">
      <div className="container mx-auto py-12 px-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/">
              <img src={whitLogo} alt="Easybuy" className="w-32 mb-7" />
            </Link>

            <p className="text-gray-400">
              Your premier destination for fashion-forward clothing and
              accessories.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/search" className="text-gray-400 hover:text-white">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Policies</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-400 hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/refund-policy"
                  className="text-gray-400 hover:text-white"
                >
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 text-2xl hover:text-white">
                <CiFacebook />
              </a>
              <a href="#" className="text-gray-400 text-2xl hover:text-white">
                <CiInstagram />
              </a>
              <a href="#" className="text-gray-400 text-2xl hover:text-white">
                <CiTwitter />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} EASYBUY. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
