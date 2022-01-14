const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");

const router = require("express").Router();

const stripe = new Stripe(`${process.env.STRIPE}`);

//router.use(cors({ origin: "http://localhost:3000" }));
router.use(cors({ origin: "https://nextdoor-app.herokuapp.com/" }));
router.use(express.json());

router.post("/checkout", async (req, res) => {
  try {
    const { id, amount } = req.body;

    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "EUR",
      description: "Compra en NextDoor",
      payment_method: id,
      confirm: true,
    });
    res.send({ message: "Pago realizado" });
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
