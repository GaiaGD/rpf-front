import { useState, useEffect } from "react"
import { styled } from "styled-components"
import { primary, white } from "@/lib/colors"
import { useRouter } from 'next/router';

const ButtonFilter = styled.div`
    div {
        padding: 10px 20px;
        border-radius: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    border-radius: 50px;
    border: 1px solid ${primary};
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
    border: 1px solid #064e3b;
    border-radius: 25px;
    padding: 10px 30px;
    box-shadow: 0 10px 10px rgba(0,0,0,0.1);
    p {
        padding: 5px 0;
    }
`

const AppliedFilted = styled.div`
    background-color: ${primary};
    color: ${white}
`

export default function FilterButton({property}){

    const router = useRouter()
    const query = { ...router.query}
    const [propertyChosen, setPropertyChosen] = useState(property.name)
    const [show, setShow] = useState(false)

    const [params, setParams] = useState('')

    // but first check if something was selected already on refresh
    useEffect(() => {
        // gathered filter from url
        const { id, ...rest } = router.query

        // if there are filters, the matching button will be activated (setting the property)
        for (const propertyUrl in rest) {
            if(property.name === propertyUrl){
                setPropertyChosen(rest[propertyUrl])
            }
          }

    }, [router.query])
    


    function handleFilterClick(value){
        let propertyType = property.name
        setPropertyChosen(value)
        setShow(!show)
        const query = { ...router.query, [propertyType]: value }
        router.push({ query })
    }

    function clearFilter(property){
        setPropertyChosen(property)
        delete query[property];
        router.push({ query })
    }



    return (
        <div>
            <ButtonFilter>
                {propertyChosen === property.name ?
                    <div onClick={() => setShow(!show)} >
                        <p>{propertyChosen}</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </div>
                :
                    <AppliedFilted>
                        <p>{propertyChosen}</p>
                        <svg onClick={() => clearFilter(property.name)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </AppliedFilted>

                }
            </ButtonFilter>

            <DropdownStyled style={{ display: show ? 'block' : 'none' }}>
                {property.values.map(value => {
                    return (
                        <div key={value} value={value} onClick={() => {handleFilterClick(value)}}>
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