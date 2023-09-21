import { mongooseConnect } from "@/lib/mongoose";
import { styled } from "styled-components";
import Category from "@/models/Category";
import Product from "@/models/Product";
import MarginTop from "@/components/MarginTop";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import FilterButton from "@/components/FilterButton"
import ProductsGrid from "@/components/ProductsGrid";
import { useState } from "react";


const Properties = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const SelectStyled = styled.select`
    border: 1px solid #064e3b;
    padding: 10px;
    border-radius: 50px;
`

const CatContainer = styled.div`
  padding: 0 10px;
`

const StyledLabel = styled.label`
  padding-right: 5px;
`

export default function CategoryPage({category, categoryProducts}){

  const [catProperties, setCatProperties] = useState(category.properties)

  return (
      <>
        <Header></Header>
        <MarginTop>
          <Center>
            <Title>{category.name}</Title>
            <Properties>
              {catProperties.map(property => {
                return (
                  <CatContainer key={property.name}>
                    <FilterButton property={property}></FilterButton>
                  </CatContainer>
                )
              }
                
              )}
            </Properties>

            <ProductsGrid products={categoryProducts} />
          </Center>
        </MarginTop>
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