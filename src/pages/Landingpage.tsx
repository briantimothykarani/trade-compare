import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Testimonials / avatars
const testimonials = [
  {
    name: "Charles",
    role: "Forex Trader",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "This platform saved me hours of research. Comparing brokers has never been easier!",
  },
  {
    name: "Victor",
    role: "Crypto Enthusiast",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    text: "I found the perfect broker in minutes. Highly recommend this tool.",
  },
  {
    name: "Ascsei",
    role: "Stock Trader",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "Clear, fast, and reliable. The broker comparison feature is top-notch.",
  },
  {
    name: "Bakir",
    role: "Commodities Trader",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    text: "Helps me quickly pick brokers I can trust for my trades.",
  },
  {
    name: "Sallahudin",
    role: "Forex Analyst",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    text: "User-friendly and informative. I recommend it to all my colleagues.",
  },
  {
    name: "Tona",
    role: "Beginner Trader",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    text: "Even as a beginner, I could quickly see which brokers are reliable.",
  },
  {
    name: "Andrei",
    role: "Crypto Trader",
    avatar: "https://randomuser.me/api/portraits/men/72.jpg",
    text: "Fast, clean, and precise. A must-use for anyone trading online.",
  },
  {
    name: "Cruz",
    role: "Stocks Enthusiast",
    avatar: "https://randomuser.me/api/portraits/men/85.jpg",
    text: "The comparison table saved me from making a bad decision.",
  },
  {
    name: "Alan",
    role: "Futures Trader",
    avatar: "https://randomuser.me/api/portraits/men/90.jpg",
    text: "I trust the ratings here more than any other site. Excellent tool.",
  },
];

// Logos / brokers avatars
const logos = testimonials.slice(0, 6).map((t) => t.avatar);

const LandingPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Rotate testimonial every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen flex flex-col items-center text-center text-gray-900 dark:text-white px-4">
      {/* Hero Section */}
      <div className="max-w-3xl space-y-6 mt-12">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Compare{" "}
          <span className="text-blue-500 dark:text-blue-400">CFD Brokers</span>{" "}
          Quickly
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl">
          Filter and compare brokers by deposits, platforms, trust scores,
          countries, and more.
        </p>

        <Link
          to="/brokers"
          className="inline-block mt-6 bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg transition transform hover:scale-105"
        >
          Start Comparing
        </Link>

        {/* Social Proof Avatars & Names */}
        <div className="mt-8 flex flex-col items-center">
          <div className="flex -space-x-3 mb-3">
            {logos.map((avatar, idx) => (
              <img
                key={idx}
                src={avatar}
                alt={`Trader ${idx}`}
                className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-900 shadow-md"
              />
            ))}
          </div>
          <p className="mt-1 text-sm md:text-base text-center text-gray-700 dark:text-gray-300">
            Trusted daily by over 2,000 active traders.
          </p>
        </div>
      </div>

      {/* Partial Screenshot Placeholder */}
      <div className="mt-10 w-full max-w-5xl h-48 overflow-hidden rounded-xl shadow-lg relative">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg" // placeholder screenshot
          alt="Platform screenshot"
          className="w-full h-auto object-cover transform -translate-y-16 scale-125"
        />
        {/* -translate-y-16 moves the image up so only ~20% is visible */}
      </div>

      {/* Rotating Testimonial Card - full width with padding */}
      <motion.div
        className="mt-14 w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-10 flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        key={currentIndex}
      >
        <img
          src={currentTestimonial.avatar}
          alt={currentTestimonial.name}
          className="w-16 h-16 rounded-full mb-4"
        />
        <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg md:text-xl">
          "{currentTestimonial.text}"
        </p>
        <p className="font-semibold text-lg">{currentTestimonial.name}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {currentTestimonial.role}
        </p>
      </motion.div>

      {/* Broker/Platform Logo Wall */}
      <div className="mt-20 w-full max-w-5xl grid grid-cols-3 md:grid-cols-6 gap-6 place-items-center">
        {logos.map((logo, idx) => (
          <img
            key={idx}
            src={logo}
            alt={`Broker logo ${idx}`}
            className="w-24 h-24 object-contain filter grayscale hover:grayscale-0 transition"
          />
        ))}
      </div>

      {/* Get Started Button Below Logos */}
      <Link
        to="/brokers"
        className="mt-10 mb-6 inline-block bg-blue-500 hover:bg-blue-600 text-white px-10 py-4 rounded-full text-xl font-semibold shadow-lg transition transform hover:scale-105"
      >
        Get Started Now
      </Link>

      {/* Footer */}
      <footer className="mt-10 mb-6 flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
        <a
          href="https://x.com/briantimothy254"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 cursor-pointer hover:text-blue-500"
        >
          <span>
            Made with <span className="text-red-500">❤️</span> by
          </span>
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg" // placeholder for your Twitter profile pic
            alt="Profile"
            className="w-6 h-6 rounded-full"
          />
        </a>
      </footer>
    </div>
  );
};

export default LandingPage;
