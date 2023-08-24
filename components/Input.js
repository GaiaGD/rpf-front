import { styled } from "styled-components"

const StyledInput = styled.input`
    width: 100%;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 6px;
    margin-bottom: 5px;
    display: block;
    box-sizing: border-box;
`

export default function Input(props){
    return <StyledInput {...props} />
}