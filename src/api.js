const API_KEY =
  "85d4964e83d6e54ba4a126a258e47674a81e1f9be1b18b900757e96652e4ec5a";

export async function updateCurrencyPrice(currency) {
  const f = await fetch(
    `https://min-api.cryptocompare.com/data/price?fsym=${currency.name1}&tsyms=${currency.name2}`
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
