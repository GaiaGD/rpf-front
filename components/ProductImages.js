import { styled } from "styled-components"
import { nanoid } from "nanoid"
import { useState } from "react"


const PaddingImg = styled.div`
    padding-top: 20px;
`

const ImageDiv = styled.div`
    max-width: 100%;
    max-height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 50vh;
    @media screen and (min-width: 768px){
        height: 70vh;
    }
`
const Image = styled.img`
    max-width: 100%;
    max-height: 100%;
`

const ImageButtons = styled.div`
    display: flex;
    flex-grow: 0;
    gap: 5px;
    margin-top: 10px;
    div {
        height: 50px;
        width: 50px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }
`

const ImageButton = styled.div`
    border: 3px solid #aaa;
    border-radius: 4px;
    height: 40px;
    padding: 2px;
    cursor: pointer;
    ${props => props.active ? `border-color: green` : `border-color: transparent`}
`

export default function ProductImages({images}){

    const [activeImage, setActiveImage] = useState(images?.[0])

    return (
        <>
            <PaddingImg>
                {/* <Image src={activeImage} /> */}
                <ImageDiv style={{backgroundImage: `url(${activeImage})`}} />
                <ImageButtons>
                    {images.map(image => (
                        <ImageButton active={image === activeImage} key={nanoid()} onClick={() => setActiveImage(image)}>
                            {/* <Image src={image} alt="" /> */}
                            <div style={{backgroundImage: `url(${image})`}} alt=""></div>
                        </ImageButton>
                    ))}
                </ImageButtons>
            </PaddingImg>
        </>
    )
}