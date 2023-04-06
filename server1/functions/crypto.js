const cheerio = require("cheerio");
const axios = require("axios");

const cryptoPriceScrapper = async () => {
  const url = "https://coinmarketcap.com/";
  const coinArray = [];

  await axios(url).then((res) => {
    const html_data = res.data;
    const $ = cheerio.load(html_data);
    //*[@id="__next"]/div/div[1]/div[2]/div/div[1]/div[4]/table/tbody/tr[1]/td[3]/div
    // #__next > div > div.main-content > div.sc-1a736df3-0.PimrZ.cmc-body-wrapper > div > div:nth-child(1) > div.sc-beb003d5-2.bkNrIb > table > tbody > tr:nth-child(1) > td:nth-child(3) > div

    const selectedElem =
      "#__next > div > div.main-content > div.sc-1a736df3-0.PimrZ.cmc-body-wrapper > div > div:nth-child(1) > div.sc-beb003d5-2.bkNrIb > table > tbody > tr";
    const keys = [
      "No.",
      "Coin",
      "Price",
      "1h",
      "24h",
      "7d",
      "Marketcap",
      "Volume",
      "CirculatingSupply",
    ];

    $(selectedElem).each((parentIndex, parentElem) => {
      let keyIndex = 0;
      const coinDetails = {};
      if (parentIndex <= 20) {
        $(parentElem)
          .children()
          .each((child, childElem) => {
            const value = $(childElem).text();
            if (value) {
              coinDetails[keys[keyIndex]] = value;
              keyIndex++;
            }
          });
        coinArray.push(coinDetails);
      }
    });
  });
  return coinArray;
};

module.exports = { cryptoPriceScrapper };
