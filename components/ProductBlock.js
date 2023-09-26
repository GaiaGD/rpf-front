import { useContext } from "react";
import { CartContext } from "./CartContext";
import { styled } from "styled-components" 
import Button from "./Button"
import Link from "next/link"
import { primary } from "@/lib/colors"

const ProductWrapper = styled.div`
`

const ImgBox = styled.div`
    padding: 0;
    margin: 0;
    @media screen and (min-width: 768px){
        height: 200px;
    }
    height: 120px;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(0,0,0,.3);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
`

const Title = styled(Link)`
    text-decoration: none;
    h3 {
        font-weight: bold;
        margin: 10px 0;
        font-size: 20px;
        text-decoration: none;
        color: ${primary}
    }
`

const Price = styled.p`
    text-align: end;
    font-size: 18px;
    margin: 10px 0;
`

export default function ProductBlock({_id, name, description, price, images}){

    const {addProduct} = useContext(CartContext)

    const url = "/product/"+ _id

    
    return (
        <ProductWrapper>
            <Link href={url}>
                <ImgBox style={{backgroundImage: `url(${images?.[0]})`}} >
                </ImgBox>
            </Link>
            <Title href={url}>
                <h3>{name}</h3>
            </Title>
            <Price>${price}</Price>
            <Button onClick={() => addProduct(_id)} color={"green"} align={"right"}>Add To Cart</Button>
        </ProductWrapper>
    )
}