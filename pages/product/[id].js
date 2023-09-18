import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/Product";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";
import MarginTop from "@/components/MarginTop";
import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductTitle from "@/components/ProductTitle";
import ProductImages from "@/components/ProductImages";
import { styled } from "styled-components";
import Button from "@/components/Button";

const ColWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;
    margin-top: 40px;
    @media screen and (min-width: 768px){
        grid-template-columns: 1.2fr .8fr;
    }
`

export default function ProductPage({product}){
    const {addProduct} = useContext(CartContext)

    return (
        <>
            <Header/>
            <MarginTop>
                <Center>
                    <ColWrapper>

                    <div>
                        <ProductImages images={product.images} />
                    </div>

                    <div>
                        <ProductTitle>{product.name}</ProductTitle>
                        <div>
                            <p>{product.category}</p>
                            <p>{product.description}</p>
                            <p>${product.price}</p>
                        </div>

                        <div>
                            <Button onClick={() => addProduct(product._id)} color={"green"} align={"left"}>Add To Cart</Button>
                        </div>
                    </div>

                    </ColWrapper>
                </Center>
            </MarginTop>
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