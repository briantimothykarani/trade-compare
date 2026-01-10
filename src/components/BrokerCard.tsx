import type { Broker } from "../types/broker";

const BrokerCard = ({ brokers }: { brokers: Broker[] }) => (
  <div className="overflow-x-auto bg-white dark:bg-gray-800 border rounded-xl">
    <table className="min-w-full text-sm">
      <thead className="bg-gray-100 dark:bg-gray-700">
        <tr>
          <th className="p-4 text-left">Broker</th>
          <th>Deposit</th>
          <th>Trust</th>
          <th>Platforms</th>
          <th>Visit site</th>
        </tr>
      </thead>
      <tbody>
        {brokers.map((b) => (
          <tr key={b.id} className="border-b hover:bg-blue-50">
            <td className="p-4 flex gap-3">
              <img src={b.logo} className="h-6" />
              {b.name}
            </td>
            <td>${b.minDeposit}</td>
            <td>{b.trustScore}★</td>
            <td>
              {b.platforms.mt4 && "MT4 "}
              {b.platforms.mt5 && "MT5 "}
              {b.platforms.ctrader && "cTrader"}
            </td>
            <td></td>
            <td>
              <a
                href={b.affiliateLink}
                className="bg-blue-600 text-white px-3 py-2 rounded text-xs"
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

export default BrokerCard;
