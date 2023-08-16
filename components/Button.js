import { styled, css } from "styled-components"
import { primary, white } from "@/lib/colors"

export const ButtonStyle = css`
    border: 2px solid ${primary};
    padding: 10px;
    border-radius: 6px;
    color: ${primary};
    cursor: pointer;
    text-decoration: none;

    ${props => props.large && css`
        font-size:1.2rem;
        padding: 15px 20px;
    `}

    ${props => props.color === "white" && !props.outline && css`
        background-color: ${white};
        border: 2px solid ${white};
    `}
    
    ${props => props.color === "white" && props.outline === "white" && css`
        border: 2px solid ${white};
        background-color: transparent;
        color: ${white};
    `}

    ${props => props.color === "green" && !props.outline && css`
        background-color: ${primary};
        border: 2px solid ${primary};
        color: ${white};
    `}

    ${props => props.color === "green" && props.outline === "green" && css`
        border: 2px solid ${primary};
        background-color: transparent;
        color: ${white};
    `}

    ${props => props.align === "right" && css`
        float: right;
    `}

    ${props => props.align === "block" && css`
        display: block;
        width: 100%;
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
