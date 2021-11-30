const express = require("express");
const Users = require("../models/users.js");
const ApiKeys = require("../models/apiKeys.js");

const router = express.Router();

router.route("/").post(async (req, res, next) => {
  try {
    console.log("ApiKey DB server");

    const find = await ApiKeys.findOne({
      where: { exchange: req.body.whatKey, email: req.body.user.passport.user },
    });

    if (find == null) {
      await ApiKeys.create({
        exchange: req.body.whatKey,
        accessKey: req.body.accessKey,
        secretKey: req.body.secretKey,
        email: req.body.user.passport.user,
      });
      console.log("Api 키 입력 완료");
      res.send("ok");
    } else {
      await ApiKeys.update(
        {
          accessKey: req.body.accessKey,
          secretKey: req.body.secretKey,
        },
        {
          where: {
            exchange: req.body.whatKey,
            email: req.body.user.passport.user,
          },
        }
      );
      console.log("Api 키 입력 완료");
      res.send("ok");
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
