import express from "express";
import stripe from "../configs/stripe.js";
import User from "../models/User.js"
import Order from "../models/Order.js";
import sendEmail from "../data/sendMail.js";
const router = express.Router();

router.post('/create-payment-intent/:userId',async(req,res)=>{

    const {products} = req.body;
    const {userId} = req.params;
    const customer = await stripe.customers.create({
        metadata:{
            userId:userId,
            cart:JSON.stringify(products),
        }
    })
    const lineItems = products.map((prod)=>({
        price_data:{
            currency:"usd",
            product_data:{
                name:prod.name,
                images:[prod.images]
            },
            unit_amount:Math.round(prod.totalPrice)
        },
        quantity:prod.quantity
    }))
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_address_collection: {
          allowed_countries: ["US", "CA", "KE","IN","KR","JP"],
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 0,
                currency: "usd",
              },
              display_name: "Free shipping",
              // Delivers between 5-7 business days
              delivery_estimate: {
                minimum: {
                  unit: "business_day",
                  value: 5,
                },
                maximum: {
                  unit: "business_day",
                  value: 7,
                },
              },
            },
          },
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 1500,
                currency: "usd",
              },
              display_name: "Next day air",
              // Delivers in exactly 1 business day
              delivery_estimate: {
                minimum: {
                  unit: "business_day",
                  value: 1,
                },
                maximum: {
                  unit: "business_day",
                  value: 1,
                },
              },
            },
          },
        ],
        phone_number_collection: {
          enabled: true,
        },
        line_items:lineItems,
        mode: "payment",
        customer: customer.id,
        success_url: `http://localhost:5173/success`,
        cancel_url: `http://localhost:5173/cancel`,
    })
    // customer:customer.id,
    // payment_method_types:['card'],
    // line_items:lineItems,
    // mode:'payment',
    // success_url:"http://localhost:5173/success",
    // cancel_url:"http://localhost:5173/cancel"
    const user = await User.findById(userId);
    user.cart = [];
   
    await user.save();

    res.json({id:session.id,session});
})

// Create Orderrr:
const createOrder = async(customer,data)=>{
    const items = JSON.parse(customer.metadata.cart);
    const newOrder = new Order({
        userId:customer.metadata.userId,
        customerId:data.customer,
        paymentIntentId:data.payment_intent,
        products:items,
        subTotal:data.amount_subtotal,
        total:data.amount_total,
        Shipping:data.customer_details,
        paymentStatus:data.payment_status,
    });
    try {
      const savedOrder = await newOrder.save();
      const FoundUser = await User.findById(customer.metadata.userId);
      FoundUser.orders.push(savedOrder._id);
      await FoundUser.save();
      console.log("saved order:",savedOrder);
      // Email send
      sendEmail(savedOrder.Shipping.email,savedOrder.Shipping.name,savedOrder.products,savedOrder.subTotal)
    } catch (error) {
      console.log(error)
    }

}


// Stripe Webhook

// This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret;
// endpointSecret = "whsec_8565b292d4d5880304e482ca3af2966afb6ba4570880c4b6fc025de3f094d5c0";

router.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];
  let data;
  let eventType;
  if(endpointSecret){
    let event;
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
      console.log("Webhook varified")
    } catch (err) {
      console.log(`webhook error ${err.message}`)
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }   
    data = event.data.object;
    eventType = event.type;
  }else{
    data = request.body.data.object;
    eventType = request.body.type
  }

  // Handle the event
  if(eventType === "checkout.session.completed"){
        stripe.customers.retrieve(data.customer).then(
            (customer)=>{
                createOrder(customer,data);
            }
        ).catch(err=>console.log(err.message))
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send().end();
});


export default router;

