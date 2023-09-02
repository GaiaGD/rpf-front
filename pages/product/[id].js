import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/Product";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import ProductImages from "@/components/ProductImages";
import { styled } from "styled-components";

const ColWrapper = styled.div`
    display: grid;
    grid-template-columns: .8fr 1.2fr;
    gap: 40px;
    margin-top: 40px;
`

export default function ProductPage({product}){
    
    return (
        <>
            <Header/>
            <Center>
                <ColWrapper>

                <div>
                    <ProductImages images={product.images} />
                </div>

                <div>
                    <Title>{product.name}</Title>
                </div>

                </ColWrapper>
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