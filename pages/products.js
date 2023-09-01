import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/Product";
import { styled } from "styled-components"
import Center from "@/components/Center"
import Header from "@/components/Header"
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";

export default function ProductsPage({products}){
    return (
        <>
            <Header/>
            <Center>
                <Title>All Products</Title>
                <ProductsGrid products={products} />
            </Center>
        </>
    )
}

// here we fetch all the products
export async function getServerSideProps(){
    await mongooseConnect()
    const products = await Product.find({}, null, {sort:{'_id':-1}})

    return {
      props: {
        // first parse then stringify: a trick to be used because mongoose models aren't compatible with JSON
        products: JSON.parse(JSON.stringify(products))
       },
    }
  }