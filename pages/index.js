import Header from "@/components/Header";
import Featured from "@/components/Featured";
import NewProducts from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/Product";

export default function HomePage({featuredProduct, newProducts}) {
  console.log(newProducts)
  return (
    <div>
      <Header></Header>
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} /> 
    </div>
  )
}

export async function getServerSideProps(){
  const featuredProductId = '64d3a5f7f96bb6011c7b0f37'
  await mongooseConnect()
  const featuredProduct = await Product.findById(featuredProductId)
  const newProducts = await Product.find({}, null, {sort: {"_id": -1}, limit: 10})
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
     },
  }
}