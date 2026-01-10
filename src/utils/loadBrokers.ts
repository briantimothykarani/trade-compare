import base from "../data/brokers.json";
export const loadBrokers = () =>
  JSON.parse(localStorage.getItem("adminBrokers") || "null") || base;
