import brokers from "../data/brokers.json";
import { useCompare } from "../hooks/useCompare";

const ComparePage = () => {
  const { ids, clear } = useCompare();
  const selected = (brokers as any[]).filter((b) => ids.includes(b.id));

  if (selected.length < 2) {
    return (
      <p className="text-center text-red-500 mt-20 text-xl">
        Select at least 2 brokers to compare.
      </p>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white py-10 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Compare Brokers
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border rounded-xl overflow-hidden shadow-md">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-4 text-left">Feature</th>
              {selected.map((b) => (
                <th key={b.id} className="p-4 text-center">
                  {b.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800">
            <tr className="border-b hover:bg-blue-50 dark:hover:bg-gray-700 transition">
              <td className="p-4 font-semibold">Min Deposit</td>
              {selected.map((b) => (
                <td key={b.id} className="p-4 text-center">
                  ${b.minDeposit}
                </td>
              ))}
            </tr>
            <tr className="border-b hover:bg-blue-50 dark:hover:bg-gray-700 transition">
              <td className="p-4 font-semibold">Trust Score</td>
              {selected.map((b) => (
                <td key={b.id} className="p-4 text-center">
                  {b.trustScore}★
                </td>
              ))}
            </tr>
            <tr className="border-b hover:bg-blue-50 dark:hover:bg-gray-700 transition">
              <td className="p-4 font-semibold">Platforms</td>
              {selected.map((b) => (
                <td key={b.id} className="p-4 text-center">
                  {b.platforms.mt4 && "MT4 "}
                  {b.platforms.mt5 && "MT5 "}
                  {b.platforms.ctrader && "cTrader"}
                </td>
              ))}
            </tr>
            <tr className="border-b hover:bg-blue-50 dark:hover:bg-gray-700 transition">
              <td className="p-4 font-semibold">Country</td>
              {selected.map((b) => (
                <td key={b.id} className="p-4 text-center">
                  {b.country}
                </td>
              ))}
            </tr>
            <tr className="border-b hover:bg-blue-50 dark:hover:bg-gray-700 transition">
              <td className="p-4 font-semibold">Regulators</td>
              {selected.map((b) => (
                <td key={b.id} className="p-4 text-center">
                  {b.regulators.join(", ")}
                </td>
              ))}
            </tr>
            <tr className="hover:bg-blue-50 dark:hover:bg-gray-700 transition">
              <td className="p-4 font-semibold">Affiliate</td>
              {selected.map((b) => (
                <td key={b.id} className="p-4 text-center">
                  <a
                    href={b.affiliateLink}
                    className="inline-block w-3/4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
                  >
                    Visit
                  </a>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={clear}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition"
        >
          Clear Comparison
        </button>
      </div>
    </div>
  );
};

export default ComparePage;
