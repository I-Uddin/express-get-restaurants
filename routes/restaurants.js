const express = require("express");
const { check, validationResult } = require("express-validator");
const { Restaurant } = require("../models");
const router = express.Router();

router.get("/", async (req, res) => {
  const result = await Restaurant.findAll();
  res.json(result);
});

router.get("/:id", async (req, res) => {
  const result = await Restaurant.findByPk(req.params.id);
  res.json(result);
});

router.post(
  "/",
  [
    check("name").not().isEmpty().trim(),
    check("location").not().isEmpty().trim(),
    check("cuisine").not().isEmpty().trim(),
    check("name").isLength({min: 10, max: 30})
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.json({error: errors.array()})
    } else {
        const result = await Restaurant.create(req.body);
        res.json("Post Success!");
    }
  }
);

router.put("/:id", async (req, res) => {
  const result = await Restaurant.findByPk(req.params.id);
  await result.update({
    name: req.body.name,
    location: req.body.location,
    cuisine: req.body.cuisine,
  });
  res.json("Put Success!");
});

router.delete("/:id", async (req, res) => {
  const result = await Restaurant.findByPk(req.params.id);
  await result.destroy();
  res.json("Delete Success!");
});

module.exports = router;
