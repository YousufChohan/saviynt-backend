const stripe = require("stripe")(process.env.STRIPE_KEY);
const express = require("express");

const dotenv = require("dotenv");
dotenv.config();

// const stripe = Stripe(process.env.STRIPE_KEY);

const stripeRouter = express.Router();

stripeRouter.post("/create-checkout-session", async (req, res) => {
  console.log("Received POST request to /create-checkout-session");

  const { items, userId, qty, price } = req.body;

  // Ensure items is an array
  const line_items = Array.isArray(items)
    ? items.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
              // images: [item.eventPicture],
              description: item.venue,
              metadata: {
                id: item._id,
              },
            },
            unit_amount: price * 100,
          },
          quantity: qty,
        };
      })
    : [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: items.name,
              // images: [items.eventPicture],
              description: items.venue,
              metadata: {
                id: items._id,
              },
            },
            unit_amount: price * 100,
          },
          quantity: qty,
        },
      ];

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/events`,
    payment_intent_data: {
      // receipt_email: "customer@example.com",
      metadata: {
        business_name: "BETI - SANPEC",
      },
    },
  });

  res.send({ url: session.url });
});

module.exports = stripeRouter;
