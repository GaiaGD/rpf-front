import { CartContextProvider } from "@/components/CartContext"
import { createGlobalStyle } from "styled-components"
import { Bricolage_Grotesque } from 'next/font/google'

const GlobalStyles = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    font-family: 'Bricolage Grotesque', sans-serif;
  }

`

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
          <CartContextProvider>
            <Component {...pageProps} />
          </CartContextProvider>
    </>
  )
}
