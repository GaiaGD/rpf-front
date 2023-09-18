import { mongooseConnect } from "@/lib/mongoose";
import { styled } from "styled-components";
import Category from "@/models/Category";
import Product from "@/models/Product";
import MarginTop from "@/components/MarginTop";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import ProductsGrid from "@/components/ProductsGrid";
import { useState } from "react";


const Properties = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const SelectStyled = styled.div`
    border: 1px solid black;
    padding: 20px;
`

export default function CategoryPage({category, categoryProducts}){

  const [catProperties, setCatProperties] = useState(category.properties)
  console.log(catProperties)

  return (
      <>
        <Header></Header>
        <MarginTop>
          <Center>
            <Title>{category.name}</Title>

            <Properties>
              {catProperties.map(property => {
                return (
                  <div key={property.name}>
                    <label for="pet-select">{property.name}</label>

                    <select>

                        {property.values.map(value => {
                          return (
                            <option key={value} value={value}>{value}</option>
                            )
                        }

                      )}

                    </select>

                  </div>
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