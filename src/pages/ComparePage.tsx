import brokers from "../data/brokers.json";
import { useCompare } from "../hooks/useCompare";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
const ComparePage = () => {
  const { ids, toggle, clear } = useCompare();

  const selected = (brokers as any[]).filter((b) => ids.includes(b.id));

  if (selected.length < 2) {
    return (
      <Link to="/brokers" className="text-center text-red-500 mt-20 text-2xl">
        Go backto home page
      </Link>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white py-10 px-6">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Compare Brokers
      </h1>

      {/* 🔥 FLEX LAYOUT */}
      <div className="flex flex-wrap gap-6 justify-center">
        {selected.map((b) => (
          <div
            key={b.id}
            className="relative w-full sm:w-[320px] bg-white dark:bg-gray-800 border rounded-xl shadow-md"
          >
            {/* ❌ Remove button */}
            <button
              onClick={() => toggle(b.id)}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
              aria-label="Remove broker"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="p-4 border-b">
              <img
                src={b.logo}
                alt={b.name}
                className="h-8 object-contain mb-2"
              />
              <h2 className="text-lg font-semibold">{b.name}</h2>
            </div>

            {/* Mini comparison table */}
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b">
                  <td className="p-3 font-semibold">Min Deposit</td>
                  <td className="p-3 text-right">${b.minDeposit}</td>
                </tr>

                <tr className="border-b">
                  <td className="p-3 font-semibold">Trust Score</td>
                  <td className="p-3 text-right">{b.trustScore}★</td>
                </tr>

                <tr className="border-b">
                  <td className="p-3 font-semibold">Platforms</td>
                  <td className="p-3 text-right">
                    {b.platforms.mt4 && "MT4 "}
                    {b.platforms.mt5 && "MT5 "}
                    {b.platforms.ctrader && "cTrader"}
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="p-3 font-semibold">Country</td>
                  <td className="p-3 text-right">{b.country}</td>
                </tr>

                <tr className="border-b">
                  <td className="p-3 font-semibold">Regulators</td>
                  <td className="p-3 text-right">{b.regulators.join(", ")}</td>
                </tr>

                <tr>
                  <td className="p-3 font-semibold">Affiliate</td>
                  <td className="p-3 text-right">
                    <a
                      href={b.affiliateLink}
                      className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition"
                    >
                      Visit
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* Clear all */}
      <div className="flex justify-center mt-10">
        <button
          onClick={clear}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition"
        >
          <Link to="/brokers">Clear Comparison</Link>
        </button>
      </div>
    </div>
  );
};

export default ComparePage;
