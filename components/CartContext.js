import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({})

export function CartContextProvider({children}){

    const ls = typeof window !== "undefined" ? window.localStorage : null
    const defaultProducts = ls ? JSON.parse(ls?.getItem('cart')) : []

    const [cartProducts, setCartProducts] = useState(defaultProducts)

    useEffect(() => {
        if(cartProducts?.length > 0){
            ls?.setItem('cart', JSON.stringify(cartProducts))
        }
    }, [cartProducts])

    function addProduct(productId){
        setCartProducts(prev => [...prev, productId])
        console.log(cartProducts)
    }

    return (
        <CartContext.Provider value={{cartProducts, setCartProducts, addProduct}}>
            {children}
        </CartContext.Provider>
    )
}