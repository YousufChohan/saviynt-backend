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
              // images: [item.eventPicture], // Fix typo: "imaegs" to "images"
              description: item.venue,
              metadata: {
                id: item._id,
                venue: item.venue,
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
              // images: [items.eventPicture], // Fix typo: "imaegs" to "images"
              description: items.venue,
              metadata: {
                id: items._id,
                venue: items.venue,
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
    cancel_url: `${process.env.CLIENT_URL}`,
  });

  res.send({ url: session.url });
});

module.exports = stripeRouter;
