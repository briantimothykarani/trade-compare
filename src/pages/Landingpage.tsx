import { Link } from "react-router-dom";

const LandingPage = () => (
  <div className="text-center py-24 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
    <h1 className="text-4xl md:text-5xl font-bold">Compare CFD Brokers</h1>
    <p className="mt-4 text-gray-600 dark:text-gray-300">
      Filter brokers by trader type, deposit, platform and country.
    </p>
    <Link
      to="/brokers"
      className="inline-block mt-8 bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full text-xl transition"
    >
      Compare Brokers
    </Link>
  </div>
);

export default LandingPage;
