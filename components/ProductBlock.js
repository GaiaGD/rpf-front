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
            <Button color={"green"}>Add To Cart</Button>
            <div>{price}</div>
        </ProductWrapper>
    )
}