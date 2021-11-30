const { default: axios } = require("axios");
const express = require("express");
const Coins = require("../models/coins.js");

const router = express.Router();


router.route('/query/:symbol').get( async (req,res,next) => {
  try {
    const coins = await Coins.findAll({
      where: { symbol: req.params.symbol },
    });
    res.send(coins)
  } catch (err) {
    console.error(err);
    next(err);
  }
})
// router.route('/test').get( async (req,res,next) => {
//   try {
//     const coins = await Coins.findAll({
//       where: {},
//     });
//     const list = coins.map(el=>el=el.id)
//     console.log(list.slice(0,1));
//     const result = await axios.get('https://api.coingecko.com/api/v3/coins/markets',{
//       params:{
//         vs_currency :'usd',
//         ids: list.slice(0,510).toString()
//       }
//     })

//     res.send(result.data)
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// })

// 코인 name, symbol 테이블 만들기
router.route('/create')
.get(async (req, res, next) => {
  try {
    const {data} = await axios.get('https://api.coingecko.com/api/v3/coins/list');
    res.locals.list = data;
    next()
  } catch (err) {
    console.error(err);
    next(err)
  }
  
}).get(async (req,res,next) => {
  try {
    const list = res.locals.list;
    list.forEach((el)=>{
      const deleteCoins = Coins.destroy({
        where: {},
      });
      const coins = Coins.create({
        id: el.id,
        name: el.name,
        symbol: el.symbol,
      });
    })
  } catch (err) {
    console.error(err);
    next(err)
  } finally {
    res.send("Coin list created!");
  }
})


module.exports = router;
