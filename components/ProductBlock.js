import { styled } from "styled-components" 
import Button from "./Button"

const ProductWrapper = styled.div`

`

const Box = styled.div`
    padding: 0;
    margin: 0;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {

        max-width: 100%;
        max-height: 150px;
    }
`

const Title = styled.h2`
    font-weight: normal;
    margin-bottom: 5px;
`

const Price = styled.p`
    text-align: end;
`

export default function ProductBlock({_id, name, description, price, images}){
    return (
        <ProductWrapper>
            <Box>
                <div>
                    <img src={images[0]} />
                </div>
            </Box>
            <Title>{name}</Title>
            <Price>{price}</Price>
            <Button color={"green"} align={"right"}>Add To Cart</Button>
        </ProductWrapper>
    )
}