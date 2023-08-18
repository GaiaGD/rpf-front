import { CartContextProvider } from "@/components/CartContext"
import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`

  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@10..48,300&display=swap');

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
