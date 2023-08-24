import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({})

export function CartContextProvider({children}){

    // initialize local storage
    const lStorage = typeof window !== "undefined" ? window.localStorage : null

    // initialize cart
    const [cartProducts, setCartProducts] = useState([])

    // on first component mount, useEffect checks if there's any product inside local and saves it to the cart
    useEffect(() => {
        if (lStorage && lStorage.getItem('cart')){
            setCartProducts(JSON.parse(lStorage.getItem('cart')))
        }
    }, [])

    // every time a product is added to the cart, useEffect adds it to local storage
    useEffect(() => {
        if(cartProducts?.length > 0){
            lStorage?.setItem('cart', JSON.stringify(cartProducts))
        } else if (cartProducts?.length === 0) {
            lStorage?.setItem('cart', cartProducts)
        }
    }, [cartProducts])


    function addProduct(productId){
        setCartProducts(prev => [...prev, productId])
    }

    function removeProduct(productId){

        setCartProducts(prev => {
            let indexOfProductToRemove = prev.indexOf(productId)
            // if index exists
            if(indexOfProductToRemove !== -1){
                return prev.filter((product, index) => index != indexOfProductToRemove)
            }
            return prev
        })
    }

    return (
        <CartContext.Provider value={{cartProducts, setCartProducts, addProduct, removeProduct}}>
            {children}
        </CartContext.Provider>
    )
}