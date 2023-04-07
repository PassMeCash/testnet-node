const cheerio = require("cheerio");
const axios = require("axios");
const {MODE} = require('../config')
const {db} = require("../api/test/index")


const cryptoPriceScrapper = async () => {
  const url = "https://coinmarketcap.com/currencies/";
  
  // the second db would be from mongodb
  // TODO: Add mongo db 
  
  const coin = MODE !== 'live' ? db.coins : db

  const coinArray = [];
  
  for (let i = 0; i < coin.length;i++){

    await axios(`${url}${coin[i]}`).then((res) => {

      const html_data = res.data;
      const $ = cheerio.load(html_data);
      const logo = ''
      //*[@id="__next"]/div/div[1]/div[2]/div/div[1]/div[4]/table/tbody/tr[1]/td[3]/div
      // #__next > div > div.main-content > div.sc-1a736df3-0.PimrZ.cmc-body-wrapper > div > div:nth-child(1) > div.sc-beb003d5-2.bkNrIb > table > tbody > tr:nth-child(1) > td:nth-child(3) > div

      const priceElem =
        "#__next > div > div.main-content > div.sc-1a736df3-0.PimrZ.cmc-body-wrapper > div > div.sc-aef7b723-0.jfPVkR.container > div.sc-fe06e004-0.jYNuJy > div > div.sc-aef7b723-0.dDQUel.priceSection > div.sc-aef7b723-0.dDQUel.priceTitle > div";
      const marketCapElem = "#__next > div > div.main-content > div.sc-1a736df3-0.PimrZ.cmc-body-wrapper > div > div.sc-aef7b723-0.jfPVkR.container > div.sc-fe06e004-0.jYNuJy > div > div.sc-aef7b723-0.eslelo.statsSection > div.hide.statsContainer > div:nth-child(1) > div:nth-child(1) > div.statsItemRight > div"
      const h24Elem = "#__next > div > div.main-content > div.sc-1a736df3-0.PimrZ.cmc-body-wrapper > div > div.sc-aef7b723-0.jfPVkR.container > div.sc-fe06e004-0.jYNuJy > div > div.sc-aef7b723-0.dDQUel.priceSection > div.sc-aef7b723-0.dDQUel.priceTitle > span"
      const nameElem = "#__next > div > div.main-content > div.sc-1a736df3-0.PimrZ.cmc-body-wrapper > div > div.sc-aef7b723-0.jfPVkR.container > div.sc-fe06e004-0.jYNuJy > div > div.sc-aef7b723-0.eDHaky.nameSection > div.sc-aef7b723-0.jPJwrb.nameHeader > h2 > span > span"
      const symbolElem = "#__next > div > div.main-content > div.sc-1a736df3-0.PimrZ.cmc-body-wrapper > div > div.sc-aef7b723-0.jfPVkR.container > div.sc-fe06e004-0.jYNuJy > div > div.sc-aef7b723-0.eDHaky.nameSection > div.sc-aef7b723-0.jPJwrb.nameHeader > h2 > small"
      const price = $(priceElem).children().text()
      const marketCap = $(marketCapElem).text()
      const h24 = $(h24Elem).text()
      const name = $(nameElem).text()
      const symbol = $(symbolElem).text()
      
      
      const result = { name, symbol, logo, price,  ['24h']:h24, marketCap }
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

      coinArray.push(result);
        });
      }
      return coinArray;
};

module.exports = { cryptoPriceScrapper };
