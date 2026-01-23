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
*/

import type { Broker } from "../types/broker";
import { AlertTriangle, Crown } from "lucide-react";
import { useCompare } from "../hooks/useCompare";
import { useNavigate, Link } from "react-router-dom";

type Props = {
  brokers?: Broker[];
};

const BrokerTable = ({ brokers = [] }: Props) => {
  const { ids, toggle } = useCompare();
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-gray-800 border rounded-xl shadow-md">
      {/* 🔵 Compare Bar (ABOVE table) */}
      {ids.length > 0 && (
        <div className="flex justify-between items-center px-4 py-3 border-b bg-blue-50 dark:bg-gray-700">
          <span className="text-sm font-semibold">
            {ids.length} broker{ids.length > 1 ? "s" : ""} selected
          </span>

          <button
            disabled={ids.length < 2}
            onClick={() => navigate("/brokers/comparepage")}
            className={`px-5 py-2 rounded-full text-white font-semibold transition
              ${
                ids.length >= 2
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-400 cursor-not-allowed"
              }
            `}
          >
            Compare {ids.length >= 2 && `(${ids.length})`}
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-700 text-left">
            <tr>
              <th className="p-4 w-12"></th>
              <th className="p-4">Broker</th>
              <th>Deposit</th>
              <th>Trust</th>
              <th>Platforms</th>
            </tr>
          </thead>

          <tbody>
            {brokers.map((b) => {
              const selected = ids.includes(b.id);

              return (
                <tr
                  key={b.id}
                  onClick={() => toggle(b.id)}
                  className={`border-b cursor-pointer transition
                    ${
                      selected
                        ? "bg-blue-50 dark:bg-blue-900/30"
                        : "hover:bg-blue-50 dark:hover:bg-gray-700"
                    }
                  `}
                >
                  {/* ⭕ Radio Button */}
                  <td className="p-4">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                        ${selected ? "border-blue-500" : "border-gray-400"}
                      `}
                    >
                      {selected && (
                        <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
                      )}
                    </div>
                  </td>

                  {/* Broker Info */}
                  <td className="p-4 flex gap-3 items-center">
                    <img
                      src={b.logo}
                      alt={b.name}
                      className="h-6 w-16 object-contain"
                    />
                    <div>
                      <div className="flex items-center gap-1">
                        {/* 🔗 Clickable Broker Name */}
                        <Link
                          to={`/brokers/${b.id}`}
                          onClick={(e) => e.stopPropagation()} // prevent toggle
                          className="font-semibold hover:text-blue-500 cursor-pointer transition"
                        >
                          {b.name}
                        </Link>
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

                  <td className="font-semibold">{b.trustScore}★</td>

                  <td>
                    {b.platforms.mt4 && "MT4 "}
                    {b.platforms.mt5 && "MT5 "}
                    {b.platforms.ctrader && "cTrader"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BrokerTable;
