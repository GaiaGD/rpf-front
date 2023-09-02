import { styled } from "styled-components"
import { nanoid } from "nanoid"
import { useState } from "react"

const Image = styled.img`
max-width: 100%;
max-height: 100%;
`

const ImageButtons = styled.div`
display: flex;
flex-grow: 0;
gap: 5px;
margin-top: 10px;
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
            <Image src={activeImage} />
            <ImageButtons>
                {images.map(image => (
                    <ImageButton active={image === activeImage} key={nanoid()} onClick={() => setActiveImage(image)}>
                        <Image src={image} alt="" />
                    </ImageButton>
                ))}
            </ImageButtons>
        </>
    )
}