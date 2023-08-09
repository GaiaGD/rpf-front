import { styled, css } from "styled-components"

const StyledButton = styled.button`
    border: 2px solid #064e3b;
    padding: 10px;
    border-radius: 6px;
    color: #064e3b;
    cursor: pointer;

    ${props => props.large && css`
        font-size:1.2rem;
        padding: 15px 20px;
    `}

    ${props => props.white && !props.outline && css`
        background-color: #fff;
        border: 2px solid #fff;
    `}

    ${props => props.white && props.outline && css`
        border: 2px solid #fff;
        background-color: transparent;
        color: #fff;
    `}

    ${props => props.green && !props.outline && css`
        background-color: #064e3b;
        border: 2px solid #064e3b;
        color: #fff;
    `}

    ${props => props.green && props.outline && css`
        background-color: transparent;
        color: #fff;
    `}
`

export default function Button({children, ...rest}) {
    return (
        <StyledButton {...rest}>{children}</StyledButton>
    )
}