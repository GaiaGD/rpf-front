import { styled } from "styled-components";
import Center from "./Center";
import Title from "./Title";
import ProductsGrid from "./ProductsGrid";
import ProductBlock from "./ProductBlock";


export default function NewProducts({products}){
    return (
        <Center>

            <Title>New Arrivals</Title>

            <ProductsGrid products={products} />
        </Center>
    )
}