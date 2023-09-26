import { useState, useEffect } from "react"
import { styled } from "styled-components"
import { primary, white } from "@/lib/colors"

const Bar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 30px;
    border: 1px solid ${primary};
    margin: 20px 0;
    padding: 10px 20px;
    svg {
        height: 20px;
    }
    input {
        border: none;
        font: inherit;

    }
    *:focus {outline:none !important}
`

export default function FilterButton(){
    return (
        <Bar>
            <input placeholder="Search"/>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
        </Bar>
    )
}