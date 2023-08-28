import { mongooseConnect } from "@/lib/mongoose"
import Product from "@/models/Product"
import Order from "@/models/Order"
const stripe = require('stripe')(process.env.STRIPE_SK);


export default async function handler(req, res){
    if(req.method != 'POST'){
        res.json('should be a POST request')
        return
    }
    const {firstname,
            lastname,
            mobilenumber,
            email,
            city,
            address,
            postcode,
            state,
            country,
            cartProducts
        } = req.body

    mongooseConnect()

    const productsIds = cartProducts

    const uniqueIds = [...new Set(productsIds)]

    const productsInfo = await Product.find({_id: uniqueIds})


    // information for Stripe
    let line_items = []
    for (const productId of uniqueIds){
        const productInfo = productsInfo.find(p => p._id.toString() === productId)
        const quantity = productsIds.filter(id => id === productId)?.length || 0
        if(quantity > 0 && productsInfo){
            line_items.push({
                quantity,
                price_data: {
                    currency: 'USD',
                    product_data: {name: productInfo.name},
                    // adding *100 because this calculates CENTS not dollars
                    unit_amount: quantity * productInfo.price * 100

                }
            })
        }
    }
    
    const orderDoc = await Order.create({
        line_items,
        firstname,
        lastname,
        mobilenumber,
        email,
        city,
        address,
        postcode,
        state,
        country,
        paid: false
    })

    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        customer_email: email,
        // update url once published
        success_url: process.env.PUBLIC_URL + '/cart?success=1',
        cancel_url: process.env.PUBLIC_URL + '/cart?cancelled=1',
        metadata: {orderId: orderDoc._id.toString()}
    })

    res.json({
        url: session.url
    })

}