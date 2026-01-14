import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Broker } from "../types/broker";

type Props = {
  brokers: Broker[];
  isOpen: boolean;
  onClose: () => void;
};

const CompareModal = ({ brokers, isOpen, onClose }: Props) => {
  if (!isOpen || brokers.length === 0) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-xl p-6 relative"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
              onClick={onClose}
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-semibold mb-6 text-center">
              Compare Brokers
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brokers.map((b) => (
                <div
                  key={b.id}
                  className="border dark:border-gray-700 rounded-lg p-4 flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img src={b.logo} className="h-8" alt={b.name} />
                    <div>
                      <h3 className="font-semibold">{b.name}</h3>
                      <div className="text-xs text-gray-500">
                        {b.trustScore}★ Trust Score
                      </div>
                    </div>
                  </div>

                  <div className="text-sm space-y-1 flex-1">
                    <div>
                      <strong>Min Deposit:</strong> ${b.minDeposit}
                    </div>
                    <div>
                      <strong>Platforms:</strong> {b.platforms.mt4 && "MT4 "}
                      {b.platforms.mt5 && "MT5 "}
                      {b.platforms.ctrader && "cTrader"}
                    </div>
                    <div>
                      <strong>Region:</strong> {b.region}
                    </div>
                    <div>
                      <strong>Assets:</strong>{" "}
                      {Object.entries(b.assets)
                        .filter(([_, v]) => v)
                        .map(([k]) => k)
                        .join(", ")}
                    </div>
                    <div>
                      <strong>Badges:</strong>{" "}
                      {[
                        b.trustScore === 5 && "Top Rated",
                        b.beginnerFriendly && "Beginner Friendly",
                        b.scalpingAllowed && "Scalping Allowed",
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </div>
                  </div>

                  <a
                    href={b.affiliateLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 text-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
                  >
                    Visit Broker
                  </a>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CompareModal;
