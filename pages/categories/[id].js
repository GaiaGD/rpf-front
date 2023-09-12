import { mongooseConnect } from "@/lib/mongoose";
import Category from "@/models/Category";
import Product from "@/models/Product";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import ProductsGrid from "@/components/ProductsGrid";

export default function CategoryPage({category, categoryProducts}){
  return (
      <>
        <Header></Header>
        <Center>
          <Title>{category.name}</Title>
          <ProductsGrid products={categoryProducts}>

          </ProductsGrid>
        </Center>
      </>
  )
}

// here we fetch the single category and its products (alternative to useEffect)
export async function getServerSideProps(context){

    await mongooseConnect()

    const {id}  = context.query

    // it's the same as writing "const id = context.query.id"

    const category = await Category.findById(id)
    const categoryProducts = await Product.find({category: id})

    return {
      props: {
        // first parse then stringify: a trick to be used because mongoose models aren't compatible with JSON
        category: JSON.parse(JSON.stringify(category)),
        categoryProducts: JSON.parse(JSON.stringify(categoryProducts))
       },
    }
  }