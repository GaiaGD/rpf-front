import { mongooseConnect } from "@/lib/mongoose"
import Product from "@/models/Product"

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
            products
        } = req.body

    mongooseConnect()

    const productsIds = products.split(',')

    const uniqueIds = [...new Set(productsIds)]

    const productsInfo = await Product.find({_id: uniqueIds})


    //
    let line_items = []
    for (const productId of uniqueIds){
        const productInfo = productsInfo.find(p => p._id.toString() === productId)
        const quantity = productsIds.filter(id => id === productId)?.length || 0
        if(quantity > 0 && productsInfo){
            line_items.push({
                quantity,
                price_data: {
                    currency: 'USD',
                    product_data: {name: productInfo.title},
                    unit_amount: quantity * productInfo.price

                }
            })
        }
    }
    
    res.json({line_items})

}