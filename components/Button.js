import { styled, css } from "styled-components"

export const ButtonStyle = css`
    border: 2px solid #064e3b;
    padding: 10px;
    border-radius: 6px;
    color: #064e3b;
    cursor: pointer;
    text-decoration: none;

    ${props => props.large && css`
        font-size:1.2rem;
        padding: 15px 20px;
    `}

    ${props => props.color === "white" && !props.outline && css`
        background-color: #fff;
        border: 2px solid #fff;
    `}
    
    ${props => props.color === "white" && props.outline === "white" && css`
        border: 2px solid #fff;
        background-color: transparent;
        color: #fff;
    `}

    ${props => props.color === "green" && !props.outline && css`
        background-color: #064e3b;
        border: 2px solid #064e3b;
        color: #fff;
    `}

    ${props => props.color === "green" && props.outline === "green" && css`
        border: 2px solid #064e3b;
        background-color: transparent;
        color: #fff;
    `}

`

export const StyledButton = styled.button`
    ${ButtonStyle}
`

export default function Button({children, ...rest}) {
    return (
        <StyledButton {...rest}>{children}</StyledButton>
    )
}
