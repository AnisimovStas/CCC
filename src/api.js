const API_KEY =
  "85d4964e83d6e54ba4a126a258e47674a81e1f9be1b18b900757e96652e4ec5a";

export function updateCurrencyPrices(currencyName1, currencyName2) {
  setInterval(async () => {
    const f = await fetch(
      `https://min-api.cryptocompare.com/data/price?fsym=${currencyName1}&tsyms=${currencyName2}`
    );
    const price = await f.json();
    this.currencyStore.find(
      (currency) =>
        currency.name1 === currencyName1 && currency.name2 === currencyName2
    ).price = price[currencyName2];
  }, 5000);
  this.currency1 = "";
  this.currency2 = "";
}

export function loadCurrencyList() {}
