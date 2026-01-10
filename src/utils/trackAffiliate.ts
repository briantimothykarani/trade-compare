export const trackAffiliateClick = (id: string) => {
  const data = JSON.parse(localStorage.getItem("affiliateClicks") || "{}");
  data[id] = (data[id] || 0) + 1;
  localStorage.setItem("affiliateClicks", JSON.stringify(data));
};
