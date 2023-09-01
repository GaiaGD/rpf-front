import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/Product";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";

export default function ProductPage({product}){
    
    return (
        <>
            <Header/>
            <Center>
                <Title>{product.name}</Title>
            </Center>
        </>
    )
}


// here we fetch the single product (alternative to useEffect)
export async function getServerSideProps(context){

    await mongooseConnect()

    const {id}  = context.query
    // it's the same as writing "const id = context.query.id"

    const product = await Product.findById(id)

    return {
      props: {
        // first parse then stringify: a trick to be used because mongoose models aren't compatible with JSON
        product: JSON.parse(JSON.stringify(product))
       },
    }
  }