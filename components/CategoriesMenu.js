import { styled } from "styled-components";
import Center from "./Center";
import Title from "./Title";

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

    // <>
    //     { touchDevice ?
    //         <div className="h-[calc(100dvh)] bg-cover bg-center mobileVideo">
    //             <NavMenu />
    //         </div>
    //         :
    //         <div>
    //             <video autoPlay muted loop="loop" playsInline>
    //                     <source src={BgVideo} type="video/mp4" />
    //             </video>
    //             <NavMenu />
    //         </div>
    //     }
    // </>

    return (
        <div>
            <Video playsInline autoPlay muted loop>
                <source src='../pond.mp4' type="video/mp4" />
            </Video>
            <Center>
                {/* <Title>Categories</Title> */}
                {categories.map(cat => {
                    return (
                        <p key={cat._id}>{cat.name}</p>
                    )
                })}
            </Center>
        </div>
    )
}