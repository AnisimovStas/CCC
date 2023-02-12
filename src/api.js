const API_KEY =
  "f5b01dd8d28b2e98a872d600f41195821853b82f469cf98c9a01dffeb7db2c91";

export async function updateCurrencyPrice(currency) {
  const f = await fetch(
    `https://min-api.cryptocompare.com/data/price?fsym=${currency.name1}&tsyms=${currency.name2}&api_key=${API_KEY}`
  );
  const Newprice = await f.json();

  currency.price = Newprice[currency.name2];
}

export async function fetchCryptoCurrencies() {
  const response = await fetch(
    "https://min-api.cryptocompare.com/data/all/coinlist?summary=true"
  );
  const currenciesNotТormalized = await response.json();
  const currencies = Object.keys(currenciesNotТormalized.Data);

  return currencies;
}
