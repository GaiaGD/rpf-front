import { styled } from "styled-components";
import Center from "./Center";
import ProductBlock from "./ProductBlock";

const ProductsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
    padding-top: 20px;
`

export default function NewProducts({products}){
    console.log(products)
    return (
        <Center>
            <ProductsGrid>
                {products?.length > 0 && products.map(product => (
                    <ProductBlock key={product._id} {...product} />
                ))}
            </ProductsGrid>
        </Center>
    )
}