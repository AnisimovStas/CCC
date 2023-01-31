const API_KEY =
  "85d4964e83d6e54ba4a126a258e47674a81e1f9be1b18b900757e96652e4ec5a";

export async function fetchPrice(currencyName1, currencyName2) {
  let url =
    "https://min-api.cryptocompare.com/data/price?fsym=${currencyName1}&tsyms=${currencyName2}";
  let response = await fetch(url);

  let price = await response.json();
}
