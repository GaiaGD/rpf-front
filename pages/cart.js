import Header from "@/components/Header";
import Center from "@/components/Center";
import Title from "@/components/Title";
import Button from "@/components/Button";
import Table from "@/components/Table";
import Input from "@/components/Input";
import { styled } from "styled-components";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import { nanoid } from 'nanoid'

const ColumnWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;
    margin-top: 40px;
    padding: 0;
    @media screen and (min-width: 768px){
        grid-template-columns: 1.2fr .8fr;
        padding: 30px;
    }
`

const Box = styled.div`
`

const ProductInfoCell = styled.td`
    padding: 10px 0;
`

const ProductImageBox = styled.div`
    height: 100px;
    overflow: hidden;
    background-color: #f0f0f0;
    box-shadow: 0 0 10px rgba(0,0,0,.3);
    border-radius: 10px;
    img {
        min-width: 100%;
        height: 100%;
    }
`

const QuantityLabel = styled.span`
    padding: 0 6px;
`

const DoubleFields = styled.div`
    display: flex;
    gap: 5px;
`

export default function CartPage(){

    const {cartProducts, addProduct, removeProduct, clearCart} = useContext(CartContext)
    // this only shows what products are in the cart, not the quantity of each one
    const [productsInCart, setProductsInCart] = useState([])

    const [isSuccess, setIsSuccess] = useState(false)

    // states for delivery info
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [mobilenumber, setMobilenumber] = useState('')
    const [email, setEmail] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')
    const [postcode, setPostcode] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')

    useEffect(() => {

        if(cartProducts.length > 0){
            axios.post('/api/cart', {ids: cartProducts})
            .then(response => {
                setProductsInCart(response.data)
            })

        } else {
            setProductsInCart([])
        }

    }, [cartProducts])

    useEffect(() => {
        if (typeof window === 'undefined'){
            return
        }
        if (window?.location.href.includes('success')){
            setIsSuccess(true)
            clearCart()
        }
    }, [])

    function moreOfThisProduct(id){
        addProduct(id)
    }

    function lessOfThisProduct(id){
        removeProduct(id)
    }

    async function goToPayment(){
        const response = await axios.post('/api/checkout', {
            firstname,
            lastname,
            mobilenumber,
            email,
            city,
            address,
            postcode,
            state,
            country,
            cartProducts, 
        })

        if(response.data.url){
            window.location = response.data.url
        }
    }

    // get total price
    let cartTotal = 0

    for (const productId of cartProducts){
        const price = productsInCart.find(product => product._id === productId)?.price || 0
        cartTotal += price
    }

    // showing after order is completed _____________________________________________________________
    if (isSuccess){
        return (
            <>
                <Header/>
                <Center>
                    <ColumnWrapper>
                        <Box>
                            <h1>Thank you for your order. Your payment was successful.</h1>
                            <p>You will receive an email shortly with more info</p>
                        </Box>
                    </ColumnWrapper>
                </Center>
            </>
        )
    }
    // _______________________________________________________________________________________________


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
                                <Title>Cart</Title>

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
                                            <tr key={nanoid()}>
                                                <ProductInfoCell>
                                                    <ProductImageBox>
                                                        <img src={product.images[0]} />
                                                    </ProductImageBox>
                                                    {product.name}
                                                </ProductInfoCell>
                                                <td>
                                                    <QuantityLabel>
                                                        <Button onClick={() => lessOfThisProduct(product._id)} color={"green"}>-</Button>
                                                    </QuantityLabel>

                                                    {cartProducts.filter(id => id === product._id).length}

                                                    <QuantityLabel>
                                                        <Button onClick={() => moreOfThisProduct(product._id)} color={"green"}>+</Button>
                                                    </QuantityLabel>
                                                </td>
                                                <td>${cartProducts.filter(id => id === product._id).length * product.price}</td>
                                            </tr>
                                            
                                        ))}
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td>${cartTotal}</td>
                                        </tr>
                                    </tbody>

                                </Table>
                            </>
                        )}

                    </Box>
                    {!!cartProducts?.length && (
                        <Box>
                            <h2>Order Information</h2>
                                <DoubleFields>
                                    <Input value={firstname}
                                            name="firstname"
                                            onChange={e => setFirstname(e.target.value)}
                                            type="text"
                                            placeholder="First Name" />
                                    <Input value={lastname}
                                            name="lastName"
                                            onChange={e => setLastname(e.target.value)}
                                            type="text"
                                            placeholder="Last Name" />
                                </DoubleFields>
                                <Input value={mobilenumber}
                                        name="mobileNumber"
                                        onChange={e => setMobilenumber(e.target.value)}
                                        type="tel"
                                        placeholder="Mobile Number" />
                                <Input value={email}
                                        name="email"
                                        onChange={e => setEmail(e.target.value)}
                                        type="text"
                                        placeholder="Email" />
                                <Input value={address}
                                        name="address"
                                        onChange={e => setAddress(e.target.value)}
                                        type="text"
                                        placeholder="Address" />
                                <Input value={city}
                                        name="city"
                                        onChange={e => setCity(e.target.value)}
                                        type="text"
                                        placeholder="City/Town" />
                                <DoubleFields>
                                    <Input value={postcode}
                                            name="postcode"
                                            onChange={e => setPostcode(e.target.value)}
                                            type="text"
                                            placeholder="Postcode" />
                                    <Input value={state}
                                            name="state"
                                            onChange={e => setState(e.target.value)}
                                            type="text"
                                            placeholder="State" />
                                </DoubleFields>
                                <Input value={country}
                                        name="country"
                                        onChange={e => setCountry(e.target.value)}
                                        type="text"
                                        placeholder="Country" />
                                <input type="hidden"
                                        name="products"
                                        value={cartProducts.join(',')} />
                                <Button
                                        onClick={goToPayment}
                                        color={"green"}
                                        align={"block"}>Continue to Payment
                                </Button>
                        </Box>
                        )}
                </ColumnWrapper>
            </Center>
        </>
    )
}