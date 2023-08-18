import Header from "@/components/Header";
import Center from "@/components/Center";
import Button from "@/components/Button";
import Table from "@/components/Table";
import { styled } from "styled-components";
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

const ProductInfoCell = styled.td`
    padding: 10px 0;
`

const ProductImageBox = styled.div`
    height: 150px;
    overflow: hidden;
    background-color: #f0f0f0;
    box-shadow: 0 0 10px rgba(0,0,0,.3);
    border-radius: 10px;
    img {
        width: 100%;
    }
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
                        
                        <h2>Cart</h2>
                        {productsInCart?.length > 0 && (

                            <Table>
                                <thead>
                                    <tr>
                                        <th>
                                            Products
                                        </th>
                                        <th>
                                            Quantity
                                        </th>
                                        <th>
                                            Price
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {productsInCart.map(product => (
                                        <tr>
                                            <ProductInfoCell>
                                                <ProductImageBox>
                                                    <img src={product.images[0]} />
                                                </ProductImageBox>
                                                {product.name}
                                            </ProductInfoCell>
                                            <td>{cartProducts.filter(id => id === product._id).length}</td>
                                            <td>{product.price}</td>
                                        </tr>
                                        
                                    ))}
                                </tbody>

                            </Table>
                        
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