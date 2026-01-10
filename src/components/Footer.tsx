import { Link } from "react-router-dom";
import {
  Twitter,
  Facebook,
  Instagram,
  Music, // TikTok icon replacement
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-8 mt-10 border-t border-gray-300 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        {/* Disclaimer */}
        <p className="text-xs text-center leading-relaxed max-w-4xl mx-auto">
          <strong>Risk Warning:</strong> CFDs are complex instruments and come
          with a high risk of losing money rapidly due to leverage. Most retail
          investor accounts lose money when trading CFDs. You should consider
          whether you understand how CFDs work and whether you can afford to
          take the high risk of losing your money. This website is for
          educational purposes only and does not provide investment advice.
        </p>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <div className="text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Trade Compare. All data is
            fictional.
          </div>

          {/* Navigation */}
          <div className="flex gap-4">
            <Link to="/" className="hover:text-blue-500">
              Home
            </Link>
            <Link to="/brokers" className="hover:text-blue-500">
              Brokers
            </Link>
            <Link to="/brokers/comparepage" className="hover:text-blue-500">
              Compare
            </Link>
          </div>

          {/* Social Media */}
          <div className="flex gap-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
            >
              <Twitter size={20} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black dark:hover:text-white"
            >
              <Music size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
