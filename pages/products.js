import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/Product";
import Category from "@/models/Category";
import { styled } from "styled-components"
import { primary, white } from "@/lib/colors"
import MarginTop from "@/components/MarginTop";
import Center from "@/components/Center"
import Header from "@/components/Header"
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import { useState } from "react";
import Link from "next/link";

const SearchBar = styled.div`
    width: 100%;
`

const ContainerTest = styled.div`
    position: relative;
    width: 100%;
`

const Bar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 30px;
    border: 1px solid ${primary};
    margin: 20px 0 10px;
    padding: 10px 20px;
    svg {
        height: 20px;
    }
    input {
        border: none;
        font: inherit;
        width: 100%;
    }
    *:focus {outline:none !important}
`

const SearchResults = styled.div`
    border: 1px solid ${primary};
    width: 100%;
    padding: 20px 0;
    background-color: rgb(210, 230, 212);
    border-radius: 30px;
    position: absolute;
    a {
        text-decoration: none;
        color: inherit;
            border: 1px solid ${primary};
    }
    a div {
        padding: 20px;
        p {
            margin: 0;
            font-weight: bold;
        }
    }
`

export default function ProductsPage({products, categories}){
    
    const [allProducts, setAllProducts] = useState(products)
    const [searchInput, setSearchInput] = useState("")
    const [searchResults, setSearchResults] = useState("")

    const handleChange = (e) => {
        e.preventDefault()
        console.log(e.target.value)
        setSearchInput(e.target.value)
      };
      
        const filteredProducts = allProducts.filter((el) => {
            //if no input the return the original
            if (searchInput === '') {
                return;
            }
            //return the item which contains the user input
            else {
                return el.name.toLowerCase().includes(searchInput)
            }
        })

    return (
        <>
            <Header/>
            <MarginTop>
                <Center>
                    <Title>All Products</Title>
                    <SearchBar>
                        <Bar>
                            <input placeholder="Search" onChange={handleChange} value={searchInput}/>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </Bar>
                        <ContainerTest>
                                {filteredProducts.length > 0 &&
                                    <SearchResults>
                                        {filteredProducts.map((item) => (
                                            <Link key={item.id} href={'/product/' + item._id}>
                                                <div>
                                                    <p>{item.name}</p>

                                                </div>
                                            </Link>
                                        ))}
                                    </SearchResults>
                                }
                        </ContainerTest>
                    </SearchBar>

                    <ProductsGrid products={allProducts} />
                </Center>
            </MarginTop>
        </>
    )
}

// here we fetch all the products
export async function getServerSideProps(){
    await mongooseConnect()
    const products = await Product.find({}, null, {sort:{'_id':-1}})
    const categories = await Category.find()

    return {
      props: {
        // first parse then stringify: a trick to be used because mongoose models aren't compatible with JSON
        products: JSON.parse(JSON.stringify(products)),
        categories: JSON.parse(JSON.stringify(categories))

       },
    }
  }