import { styled } from "styled-components";
import Center from "./Center";
import Button from "./Button"
import ButtonLink from "./ButtonLink";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const Bg = styled.div`
    background-color: #064e3b;
    color: #fff;
    padding: 50px 0;
`

const Title = styled.h1`
    margin: 0;
    font-wight: normal;
`

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    img {
        max-width: 100%;
    }
`

const ButtonWrapper = styled.div`
    display: flex;
    gap: 5px;
`

const Column = styled.div`
    display: flex;
    align-items: center;
    flex-direction
`




export default function Featured({product}) {

    const {setCartProducts} = useContext(CartContext)
    
    function addFeaturedToCart(){
        setCartProducts(prev => [...prev, product._id])
    }

    return (
        <Bg>
            <Center>
                <ColumnsWrapper>
                    <Column>
                        <div>
                            <Title>{product.name}</Title>
                            <p>{product.description}</p>
                            <ButtonWrapper>
                                <ButtonLink href={'/products/'+ product._id} outline={"white"} color={"white"}>Read More</ButtonLink>
                                <ButtonLink href={''} color={"white"} onClick={addFeaturedToCart}>Add to Cart</ButtonLink>
                            </ButtonWrapper>
                        </div>
                    </Column>
                    <Column>
                        <img src={product.images[0]} />
                    </Column>
                </ColumnsWrapper>
            </Center>
        </Bg>
    )
}