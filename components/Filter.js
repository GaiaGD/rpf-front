import { useState } from "react"
import { styled } from "styled-components"

const ButtonFilter = styled.div`
    div {
        padding: 10px 20px;
        border-radius: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    border-radius: 50px;
    border: 1px solid green;
    p {
        margin: 0;
    }
    svg {
        height: 12px;
        padding-left: 10px;
    }
`

const DropdownStyled = styled.div`
    margin-top: 5px;
    position: absolute;
    background-color: #d2e6d4;
    border-radius: 25px;
    padding: 10px 30px;
    box-shadow: 0 10px 10px rgba(0,0,0,0.1);
`

const AppliedFilted = styled.div`
    background-color: #d2e6d4;
`

export default function Filter({property}){

    console.log(property.values)

    const [propertyChosen, setPropertyChosen] = useState(property.name)
    const [show, setShow] = useState(false)

    return (
        <div>
            <ButtonFilter>
                {propertyChosen === property.name ?
                    <div>
                        <p>{propertyChosen}</p>
                            <svg onClick={() => setShow(!show)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                    </div>
                :
                    <AppliedFilted>
                        <p>{propertyChosen}</p>
                            <svg onClick={() => setPropertyChosen(property.name)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                    </AppliedFilted>

                }

            </ButtonFilter>
            <DropdownStyled style={{ display: show ? 'block' : 'none' }}>
                {property.values.map(value => {
                    return (
                        <div key={value} value={value} onClick={() => {setPropertyChosen(value); setShow(!show)}}>
                            <div>
                                <p>{value}</p>
                            </div>
                        </div>
                    )
                })}
            </DropdownStyled>
        </div>
    )
}