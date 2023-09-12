import { styled } from "styled-components";
import Center from "./Center";
import MarginTop from "./MarginTop";
import Title from "./Title";
import Link from "next/link";

const Video = styled.video`
    object-fit: cover;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    filter:brightness(40%);
`

const CategoriesGrid = styled.div`
    width: 100%;
    height: 90vh;
    div {
        position:absolute;
        padding: 20px;
        border: solid white 3px;
        margin: 30px 0;
        text-align: center;
        border-radius: 50%;
        height: 70px;
        width: 70px;
        @media screen and (min-width: 768px){
            height: 15vh;
            width: 15vh;
        }
        a {
            text-decoration: none;
            color: white;
            p {
                font-size: 25px;
            }
        }
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

const Bubble = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const LogoCenter = styled.div`
    position: absolute;
    height: 30vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: white;
    img {
        height: 100%;
    }
    p {
        margin: 10px;
    }
`

export default function CategoriesMenu({categories}){

    return (
        <div>
            <Video playsInline autoPlay muted loop>
                <source src='../pond.mp4' type="video/mp4" />
            </Video>
            <Center>
                <LogoCenter>
                    <img src="../logotype.svg" alt="Rock Fish Pond" />
                    <p>a KoiZilla Company</p>
                </LogoCenter>
                <MarginTop>
                    <CategoriesGrid>
                        {categories.map(cat => {
                            return (
                                <Bubble key={cat._id}>
                                    <Link key={cat._id} href={'/categories/' + cat._id}>
                                        <p>{cat.name}</p>
                                    </Link>
                                </Bubble>
                            )
                        })}
                    </CategoriesGrid>
                </MarginTop>
            </Center>
        </div>
    )
}