import { styled } from "styled-components";
import Center from "./Center";
import Title from "./Title";
import Link from "next/link";

// document.documentElement.style.setProperty("--vh", window.innerHeight * 0.01 + 'px')
// let touchDevice = (navigator.maxTouchPoints || 'ontouchstart' in document.documentElement)
// console.log(touchDevice)

const Video = styled.video`
    object-fit: cover;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    
`

const CategoriesGrid = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;

    a {
        position:absolute;
        color: white;
        text-decoration: none;
        padding: 20px;
    }

    > :nth-child(1) {
        top:0;
        left:0;    
    }
    > :nth-child(2) {
        top:0;
        right:0;
    }
    > :nth-child(3) {
        bottom:0;
        left:0;
    }
    > :nth-child(4) {
        bottom:0;
        right:0;
`

export default function CategoriesMenu({categories}){

    return (
        <div>
            <Video playsInline autoPlay muted loop>
                <source src='../pond.mp4' type="video/mp4" />
            </Video>
            <Center>
                <CategoriesGrid>
                    {categories.map(cat => {
                        return (
                            <Link href={'/categories/' + cat._id} key={cat._id}>{cat.name}</Link>
                        )
                    })}
                </CategoriesGrid>
            </Center>
        </div>
    )
}