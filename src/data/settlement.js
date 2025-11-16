// Settlement account mock data

export const settlement = {
  balance: -1112096.38,
  maxLimit: 5000000,
  iban: "DE89370400440532013000",
  beneficiary: "Q Crypto Settlement GmbH",
  bankName: "Deutsche Bank AG",
  bic: "DEUTDEBBXXX",
  settlementDue: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
  currency: "EUR"
};

export default settlement;
