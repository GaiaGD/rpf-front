import mongoose from "mongoose";
import { mongooseConnect } from "@/lib/mongoose";
const stripe = require('stripe')(process.env.STRIPE_SK);
import { buffer } from "micro";
import Order from "@/models/Order";

const endpointSecret = "whsec_0325da25cf9ab0ed70cbe9bd19802ac350c80c5853aa895c0ef4d831600e411d"

export default async function handler(req, res){
  console.log("webhook api")
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const paymentIntentSucceeded = event.data.object;
      console.log("need to show: ", paymentIntentSucceeded)

      const orderId = paymentIntentSucceeded.metadata.orderId
      const paid = paymentIntentSucceeded.payment_status === 'paid'

      // checking if it's paid
      if(orderId && paid){
        // updating it in mongodb
        await Order.findByIdAndUpdate(orderId, {
          paid: true
        })
      }


      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send('ok')
}

export const config = {
  api: {bodyParser: false}
}