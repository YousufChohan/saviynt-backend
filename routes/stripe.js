const Stripe = require("stripe");
const express = require("express");

const dotenv = require("dotenv");
dotenv.config();

const stripe = Stripe(process.env.STRIPE_KEY);

const stripeRouter = express.Router();

stripeRouter.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "{{PRICE_ID}}",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.CLIENT}`,
    cancel_url: `${process.env.CLIENT}/events`,
  });

  res.send({ url: session.url });
});

module.exports = stripeRouter;
