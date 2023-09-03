import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/Product";
import Header from "@/components/Header";
import Featured from "@/components/Featured";
import NewProducts from "@/components/NewProducts";

export default function HomePage({featuredProduct, newProducts}) {
  console.log('MONGODB_URI:', process.env.MONGODB_URI);

  return (
    <div>
      <Header></Header>
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} /> 
    </div>
  )
}

// here we fetch the featured product and the new products from the database products
export async function getServerSideProps(){
  const featuredProductId = '64d3a5f7f96bb6011c7b0f37'
  await mongooseConnect()
  const featuredProduct = await Product.findById(featuredProductId)
  const newProducts = await Product.find({}, null, {sort: {"_id": -1}, limit: 10})
  return {
    props: {
      // first parse then stringify: a trick to be used because mongoose models aren't compatible with JSON
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
     },
  }
}