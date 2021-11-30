const { default: axios } = require("axios");
const express = require("express");
const Coins = require("../models/coins.js");
const Users = require("../models/users.js");
const Apis = require("../models/apiKeys");

const router = express.Router();

router.get('/', (req,res) => {
  res.send('DB server!')
})

router.get("/userSession", async (req, res) => {
  try {
    const user = await Users.findOne({
      where: { email: req.query.ID },
    });
    const api = await Apis.findAll({ where: { email: req.query.ID } });
    const result = { user, api };
    res.json(result);
  } catch {
    console.log("세션 에러");
  }
});
module.exports = router;
