// Footer.jsx
import { Link, useLocation } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  const location = useLocation();

  const getNavLinkClasses = (path) => {
    const isActive = location.pathname === path;
    if (isActive) {
      return "text-blue-600 hover:text-blue-600 transition-colors font-medium";
    }
    return "text-gray-700 hover:text-blue-600 transition-colors font-medium";
  };

  return (
    <footer className="bg-cyan-50 border-t border-gray-200 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left - Logo / Brand */}
          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="flex items-center space-x-2">
              <img src="/logo.png" alt="BiteFlow" className="w-10 h-10" />
              <span className="text-gray-800 font-semibold text-lg">
                BiteFlow
              </span>
            </div>
            <p className="text-gray-500 text-sm text-center md:text-left">
              Fresh tastes, fast delivery & easy table booking.
            </p>
          </div>

          {/* Center - Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/" className={getNavLinkClasses("/")}>
              Home
            </Link>
            <Link to="/menu" className={getNavLinkClasses("/menu")}>
              Menus
            </Link>
            <Link
              to="/book-table"
              className={getNavLinkClasses("/book-table")}
            >
              Book Table
            </Link>
            <Link to="/contact" className={getNavLinkClasses("/contact")}>
              Contact
            </Link>
          </div>

          {/* Right - Social Media */}
          <div className="flex flex-col items-center md:items-end space-y-2">
            <span className="text-gray-500 text-sm">Follow us</span>
            <div className="flex items-center space-x-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-white shadow-sm hover:shadow-md hover:bg-blue-50 transition-all"
                aria-label="BiteFlow on Facebook"
              >
                <Facebook className="w-4 h-4 text-blue-600" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-white shadow-sm hover:shadow-md hover:bg-blue-50 transition-all"
                aria-label="BiteFlow on Twitter"
              >
                <Twitter className="w-4 h-4 text-sky-500" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-white shadow-sm hover:shadow-md hover:bg-blue-50 transition-all"
                aria-label="BiteFlow on Instagram"
              >
                <Instagram className="w-4 h-4 text-pink-500" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-white shadow-sm hover:shadow-md hover:bg-blue-50 transition-all"
                aria-label="BiteFlow on LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-blue-700" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom - Divider & Copyright */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-gray-500 text-xs sm:text-sm text-center">
            © {new Date().getFullYear()} BiteFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
