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

export default function CategoriesMenu({categories}){


    return (
        <div>
            <Video playsInline autoPlay muted loop>
                <source src='../pond.mp4' type="video/mp4" />
            </Video>
            <Center>
                {/* <Title>Categories</Title> */}
                {categories.map(cat => {
                    // console.log(cat._id)
                    return (
                        <Link href={'/categories/' + cat._id} key={cat._id} categories={categories}>{cat.name}</Link>
                    )
                })}
            </Center>
        </div>
    )
}