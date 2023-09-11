import { mongooseConnect } from "@/lib/mongoose";
import Category from "@/models/Category";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";

export default function CategoryPage({category}){
  console.log(category)
  return (
      <>
        <Header></Header>
        <Center>
          <Title>{category.name}</Title>
        </Center>
      </>
  )
}

// here we fetch the single category (alternative to useEffect)
export async function getServerSideProps(context){

    await mongooseConnect()

    const {id}  = context.query
    console.log(id)

    // it's the same as writing "const id = context.query.id"

    const category = await Category.findById(id)
    console.log("test cate", category)

    return {
      props: {
        // first parse then stringify: a trick to be used because mongoose models aren't compatible with JSON
        category: JSON.parse(JSON.stringify(category))
       },
    }
  }