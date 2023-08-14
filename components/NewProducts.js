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
    return (
        <Center>

            <h2>New Arrivals</h2>

            <ProductsGrid>
                {products?.length > 0 && products.map(product => (
                    <ProductBlock key={product._id} {...product} />
                ))}
            </ProductsGrid>
        </Center>
    )
}