import Featured from "@/components/Featured";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/Product";

export default function HomePage({featuredProduct}) {
  console.log(featuredProduct)
  return (
    <div>
      <Header></Header>
      <Featured></Featured>
    </div>
  )
}

export async function getServerSideProps(){
  const featuredProductId = '64d3a5f7f96bb6011c7b0f37'
  await mongooseConnect()
  const featuredProduct = await Product.findById(featuredProductId)
  return {
    props: { featuredProduct },
  }
}