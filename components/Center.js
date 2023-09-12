import { styled } from "styled-components"

const StyledDiv = styled.div`
    max-width: 800px;
    @media screen and (min-width: 1024px){
        max-width: 1000px;
    }
    margin: 0 auto;
    padding: 0 20px;
    position: relative;
`

export default function Center ({children}) {
    return (
        <StyledDiv>{children}</StyledDiv>

    )
}