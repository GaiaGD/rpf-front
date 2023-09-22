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
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';


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
  const [categoryProductsState, setCategoryProductsState] = useState(categoryProducts)

  const router = useRouter()
  const { query } = router;

  // filter the products shown picking up from url

  const propertyToFilter = router.query.propertyType
  const valueToFilter = router.query.value

  // fix filter of properties
  useEffect(() => {
    console.log("changed url")
    
    const { propertyType, value } = query;
    if (propertyType) {

      const filteredProducts = categoryProducts.filter((product) => {
        for (const property in product.properties) {
          if (property === propertyType && product.properties[propertyType] == value) {
            return true;
          }
        }
        return false;
      })

      setCategoryProductsState(filteredProducts);
    } else {
      setCategoryProductsState(categoryProducts);

    }

  }, [query, categoryProducts])


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

            <ProductsGrid products={categoryProductsState} />
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



  // if(propertyTypeFilter){
  //   setCategoryProductsState(prev => {
  //     return prev.filter((prod) => {
  //           for(const propertyRequested in prod.properties){
  //             if(propertyRequested === filtersApplied.propertyType && prod.properties[propertyRequested] == filterValue){
  //               return true
  //             }
  //           }
  //           return false
  //         })
  //       }
  //   )
  // }