const API_KEY =
  "85d4964e83d6e54ba4a126a258e47674a81e1f9be1b18b900757e96652e4ec5a";

export async function fetchPrice() {
  const tsyms = currencyName2;
  const f = await fetch(
    `https://min-api.cryptocompare.com/data/price?fsym=${currencyName1}&tsyms=${currencyName2}`
  );
  const price = await f.json();
}
