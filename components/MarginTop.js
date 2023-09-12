import { styled } from "styled-components"

const StyledDiv = styled.div`
    margin-top: 10vh;
    position: relative;
`

export default function MarginTop({children}) {
    return (
        <StyledDiv>{children}</StyledDiv>

    )
}