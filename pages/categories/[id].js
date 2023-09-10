import { mongooseConnect } from "@/lib/mongoose";
import Category from "@/models/Category";

export default function CategoryPage({category}){
  console.log(category)
    return (
        <>{category.name}</>
    )
}

// here we fetch the single product (alternative to useEffect)
export async function getServerSideProps(context){

    await mongooseConnect()

    const {id}  = context.query
    console.log(id)
    // it's the same as writing "const id = context.query.id"

    try {
      const category = await Category.findById(id)

    } catch (error) {
      console.error("Error finding category by ID:", error);
    }
    

    return {
      props: {
        // first parse then stringify: a trick to be used because mongoose models aren't compatible with JSON
        category: JSON.parse(JSON.stringify([]))
       },
    }
  }