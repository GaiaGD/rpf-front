import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/Product";
import Category from "@/models/Category";
import Header from "@/components/Header";
import Featured from "@/components/Featured";
import CategoriesMenu from "@/components/CategoriesMenu";

export default function HomePage({featuredProduct, categories}) {
  return (
    <div>
      <Header></Header>
      {/* <Featured product={featuredProduct} /> */}
      <CategoriesMenu categories={categories} />
      {/* <NewProducts products={newProducts} />  */}
    </div>
  )
}

// here we fetch the featured product and the categories from the database products
export async function getServerSideProps(){
  const featuredProductId = '64d3a5f7f96bb6011c7b0f37'
  await mongooseConnect()
  const categories = await Category.find()
  const firstCat = 'Pond Design'
  const categoryOne = await Category.find({ name: firstCat })


  const featuredProduct = await Product.findById(featuredProductId)
  const newProducts = await Product.find({}, null, {sort: {"_id": -1}, limit: 10})
  return {
    props: {
      // first parse then stringify: a trick to be used because mongoose models aren't compatible with JSON
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      categories: JSON.parse(JSON.stringify(categories)),
     },
  }
}