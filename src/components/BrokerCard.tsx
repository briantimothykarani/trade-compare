import { useParams, useNavigate } from "react-router-dom";
import brokers from "../data/brokers.json";
import { Crown, AlertTriangle } from "lucide-react";
import type { Broker } from "../types/broker";

const BrokerCard = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const brokersData = brokers as Broker[];
  const broker = brokersData.find((b) => b.id === id);

  if (!broker) {
    return (
      <div className="text-center mt-20 text-red-500 text-xl">
        Broker not found
      </div>
    );
  }

  const trustColor =
    broker.trustScore >= 5
      ? "text-green-600"
      : broker.trustScore >= 4
        ? "text-yellow-500"
        : "text-red-500";

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition hover:shadow-2xl">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-500 hover:underline"
      >
        &larr; Back to Brokers
      </button>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Logo + Basic Info */}
        <div className="flex-shrink-0 flex flex-col items-center md:items-start">
          <img
            src={broker.logo}
            alt={broker.name}
            className="h-20 w-40 object-contain mb-4"
          />
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            {broker.name}
            {broker.trustScore === 5 && (
              <Crown size={20} className="text-yellow-500" />
            )}
          </h1>
          <div className="text-xs text-gray-500 flex items-center gap-1 mb-4">
            <AlertTriangle size={14} /> CFDs – Capital at risk
          </div>

          <a
            href={broker.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded transition"
          >
            Visit Broker
          </a>
        </div>

        {/* Details Section */}
        <div className="flex-1 space-y-3">
          <p>
            <strong>Country:</strong> {broker.country}
          </p>
          <p>
            <strong>Trust Score:</strong>{" "}
            <span className={`${trustColor} font-semibold`}>
              {broker.trustScore}★
            </span>
          </p>
          <p>
            <strong>Min Deposit:</strong> ${broker.minDeposit}
          </p>
          <p>
            <strong>Platforms:</strong>{" "}
            {[
              broker.platforms.mt4 ? "MT4" : null,
              broker.platforms.mt5 ? "MT5" : null,
              broker.platforms.ctrader ? "cTrader" : null,
            ]
              .filter((p): p is string => p !== null)
              .map((p) => (
                <span
                  key={p}
                  className="inline-block mr-2 px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded-full"
                >
                  {p}
                </span>
              ))}
          </p>
          <p>
            <strong>Regulators:</strong>{" "}
            {broker.regulators.map((r) => (
              <span
                key={r}
                className="inline-block mr-2 px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded-full"
              >
                {r}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BrokerCard;
