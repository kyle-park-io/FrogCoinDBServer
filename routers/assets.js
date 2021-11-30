const { default: axios } = require("axios");
const express = require("express");
const Assets = require("../models/assets.js");

const router = express.Router();

router.route('/search').post(async(req,res,next)=>{
  try {
    const data = await Assets.findAll({
      where :{
        email : req.body.email,
        exchange: req.body.exchange,
      }
    })
    let temp = data.map(el=> el = el.dataValues)
    res.send(temp);
  } catch (err) {
    console.error(err);
    next(err);
  }
})

router.route('/edit').post(async(req,res,next) => {
  try {
    const data = req.body;
    let result = {};
    const read = await Assets.findOne({
      where:{
        email: data.email,
        exchange: data.exchange,
        coinId: data.coinId,
      }
    })
    if (read === null) {
      const create = await Assets.create({
        email: data.email,
        exchange: data.exchange.toUpperCase(),
        coinId: data.coinId,
        amount: data.amount,
        buyPrice: data.buyPrice,
      })
    } else {
      const update = await Assets.update({
        amount: data.amount,
        buyPrice: data.buyPrice,
      },{
        where:{
          coinId: data.coinId,
          exchange: data.exchange,
          email: data.email,
        }
      })
    }

    res.send('Edit success!')
  } catch (err) {
    console.error(err);
    next(err);
  }
})

router.route('/check').post(async(req,res,next) => {
  try {
    const data = req.body.data;
    let temp = []
    for (let i = 0; i < data.length; i++) {
      const el = data[i];
      const read = await Assets.findOne({
        where:{
          email: el.email,
          exchange: el.exchange,
          coinId: el.currency,
        }
      })
      if(read !== null) {
        el.avg_buy_price = read.dataValues.buyPrice;
        el.balance = read.dataValues.amount;
      }
      temp = [...temp, el]
    }
    res.send(temp)
  } catch (err) {
    console.error(err);
    next(err);
  }
})

router.route('/create').post(async(req,res,next) => {
  try {
    const email = req.body.email
    const data = req.body.data
    const result = await Assets.create({
      email : email,
      exchange : data.exchange,
      coinId : data.coinName.id,
      amount : data.amount,
      buyPrice: data.buyPrice,
    })
    res.send('Create Success!')
  } catch (err) {
    console.error(err);
    next(err);
  }
})



// router.route('/update').post(async(req,res,next) => {
//   try {
//     req.body.data.forEach( async (el) => {
//       const result = await Assets.update({
//         amount: el.balance,
//         buyPrice: el.avg_buy_price,
//       },{
//         where:{
//           coinId: el.currency,
//           exchange: el.exchange,
//           email: el.email,
//         }
//       })
//     })
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// })

module.exports = router;
