import Header from "@/components/Header";
import Center from "@/components/Center";
import { styled } from "styled-components";
import Button from "@/components/Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";

const ColumnWrapper = styled.div`
    display: grid;
    grid-template-columns: 1.3fr .7fr;
    gap: 40px;
    margin-top: 40px;
    padding: 30px;
`

const Box = styled.div`
`

export default function CartPage(){

    const {cartProducts} = useContext(CartContext)

    const [productsInCart, setProductsInCart] = useState([])

    useEffect(() => {
        if(cartProducts.length > 0){
            axios.post('/api/cart', {ids: cartProducts})
            .then(response => {
                setProductsInCart(response.data)
            })
        }
    }, [cartProducts])

    return (
        <>
            <Header/>
            <Center>
                <ColumnWrapper>
                    <Box>
                        {!cartProducts?.length && (
                            <div>
                                <p>Your Cart is empty</p>
                            </div>
                        )}
                        {productsInCart?.length > 0 && (
                            <>
                                <h2>Cart</h2>
                                {productsInCart.map(product => (
                                    <div key={product}>{product.name}</div>
                                ) )}
                            </>
                        )}
                    </Box>
                    {!!cartProducts?.length && (
                        <Box>
                            <h2>Order Information</h2>
                            <input type="text" placeholder="Address" />
                            <input type="text" placeholder="Address 2" />
                            <Button color={"green"} align={"block"}>Continue to Payment</Button>
                        </Box>
                        )}
                </ColumnWrapper>
            </Center>
        </>
    )
}