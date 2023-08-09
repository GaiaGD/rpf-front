import { styled } from "styled-components";
import Center from "./Center";
import Button from "./Button"

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

export default function Featured () {
    return (
        <Bg>
            <Center>
                <ColumnsWrapper>
                    <Column>
                        <div>
                            <Title>Featured Product</Title>
                            <p>Lorem Ipsum</p>
                            <ButtonWrapper>
                                <Button outline white>Read More</Button>
                                <Button white>Add to Cart</Button>
                            </ButtonWrapper>
                        </div>
                    </Column>
                    <Column>
                        <img src="https://rockpondfish.s3.amazonaws.com/1690817156066.jpg" />
                    </Column>
                </ColumnsWrapper>
            </Center>
        </Bg>
    )
}