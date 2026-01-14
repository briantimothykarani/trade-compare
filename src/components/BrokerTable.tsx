/*import type { Broker } from "../types/broker";

const BrokerTable = ({ brokers }: { brokers: Broker[] }) => (
  <div className="overflow-x-auto mt-6 bg-white dark:bg-gray-800 border rounded-xl shadow-md">
    <table className="min-w-full text-sm">
      <thead className="bg-gray-100 dark:bg-gray-700 text-left">
        <tr>
          <th className="p-4">Broker</th>
          <th>Deposit</th>
          <th>Trust</th>
          <th>Platforms</th>
          <th>Visit site</th>
        </tr>
      </thead>
      <tbody>
        {brokers.map((b) => (
          <tr
            key={b.id}
            className="border-b hover:bg-blue-50 dark:hover:bg-gray-700 transition"
          >
            <td className="p-4 flex gap-3 items-center">
              <img src={b.logo} className="h-6" alt={b.name} />
              {b.name}
            </td>
            <td>${b.minDeposit}</td>
            <td>{b.trustScore}★</td>
            <td>
              {b.platforms.mt4 && "MT4 "}
              {b.platforms.mt5 && "MT5 "}
              {b.platforms.ctrader && "cTrader"}
            </td>
            <td className="text-center">
              <a
                href={b.affiliateLink}
                className="inline-block w-3/4 text-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
              >
                Visit
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default BrokerTable;
 
 */
import type { Broker } from "../types/broker";
import { AlertTriangle, Crown } from "lucide-react";

const BrokerTable = ({ brokers }: { brokers: Broker[] }) => (
  <div className="overflow-x-auto mt-6 bg-white dark:bg-gray-800 border rounded-xl shadow-md">
    <table className="min-w-full text-sm">
      <thead className="bg-gray-100 dark:bg-gray-700 text-left">
        <tr>
          <th className="p-4">Broker</th>
          <th>Deposit</th>
          <th>Trust</th>
          <th>Platforms</th>
          <th>Visit</th>
        </tr>
      </thead>
      <tbody>
        {brokers.map((b) => (
          <tr
            key={b.id}
            className={`border-b transition hover:bg-blue-50 dark:hover:bg-gray-700 ${
              b.trustScore === 5 && "bg-yellow-50 dark:bg-yellow-900/20"
            }`}
          >
            <td className="p-4 flex gap-3 items-center">
              <img src={b.logo} className="h-6" alt={b.name} />
              <div>
                <div className="flex items-center gap-1">
                  {b.name}
                  {b.trustScore === 5 && (
                    <Crown size={12} className="text-yellow-500" />
                  )}
                </div>
                <div className="text-xs text-gray-500 flex gap-1 items-center">
                  <AlertTriangle size={10} />
                  CFDs – Capital at risk
                </div>
              </div>
            </td>

            <td>${b.minDeposit}</td>

            <td
              className={`font-semibold ${
                b.trustScore >= 5
                  ? "text-green-600"
                  : b.trustScore >= 4
                    ? "text-yellow-500"
                    : "text-red-500"
              }`}
            >
              {b.trustScore}★
            </td>

            <td>
              {b.platforms.mt4 && "MT4 "}
              {b.platforms.mt5 && "MT5 "}
              {b.platforms.ctrader && "cTrader"}
            </td>

            <td className="text-center">
              <a
                href={b.affiliateLink}
                className="inline-block w-3/4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
              >
                Visit
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default BrokerTable;
/*
import type { Broker } from "../types/broker";
import { AlertTriangle, Crown } from "lucide-react";

const BrokerTable = ({
  brokers,
  pinnedBrokers,
  setPinnedBrokers,
  compareBrokers,
  setCompareBrokers,
}: any) => {
  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 border rounded-xl shadow-md">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 dark:bg-gray-700 text-left">
          <tr>
            <th className="p-4">Broker</th>
            <th>Deposit</th>
            <th>Trust</th>
            <th>Platforms</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {brokers.map((b) => (
            <tr
              key={b.id}
              className="border-b hover:bg-blue-50 dark:hover:bg-gray-700 transition"
            >
              <td className="p-4 flex gap-3 items-center">
                <img src={b.logo} alt={b.name} className="h-6" />
                <div>
                  <div className="flex items-center gap-1">
                    {b.name}{" "}
                    {b.trustScore === 5 && (
                      <Crown size={12} className="text-yellow-500" />
                    )}
                  </div>
                  <div className="text-xs text-gray-500 flex gap-1 items-center">
                    <AlertTriangle size={10} /> CFDs – Capital at risk
                  </div>
                </div>
              </td>
              <td>${b.minDeposit}</td>
              <td
                className={`font-semibold ${b.trustScore >= 5 ? "text-green-600" : b.trustScore >= 4 ? "text-yellow-500" : "text-red-500"}`}
              >
                {b.trustScore}★
              </td>
              <td>
                {b.platforms.mt4 && "MT4 "} {b.platforms.mt5 && "MT5 "}{" "}
                {b.platforms.ctrader && "cTrader"}
              </td>
              <td className="flex gap-2">
                <button
                  onClick={() =>
                    setCompareBrokers((prev: any) =>
                      prev.includes(b.id) ? prev : [...prev, b.id],
                    )
                  }
                  className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                >
                  Compare
                </button>
                <button
                  onClick={() =>
                    setPinnedBrokers((prev: any) =>
                      prev.includes(b.id)
                        ? prev.filter((i: any) => i !== b.id)
                        : [...prev, b.id],
                    )
                  }
                  className="text-xs bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
                >
                  {pinnedBrokers.includes(b.id) ? "Unpin" : "Pin"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BrokerTable;
*/
