import Link from "next/link";
import styled from "styled-components"
import Center from "./Center";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import Burger from "./icons/Burger";

const StyledHeader = styled.header`
    background-color: #064e3b;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
`

const Logo = styled(Link)`
    img {
        height: 50px;
    }
`

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
`

const StyledNav = styled.nav`
    ${props => props.mobileNavActive ? `display: block;` : `display: none;`}
    background-color: #064e3b;
    gap: 10px;
    position: fixed;
    top: 70px;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    padding: 20px 20px 0;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
    @media screen and (min-width: 768px){
        display: flex;
        position: static;
        padding: 0;
    }
`

const NavLink = styled(Link)`
    display: block;
    color: #aaa;
    text-decoration: none;
    padding: 10px;
    @media screen and (min-width: 768px){
        padding: 0 10px;
    }
`

const NavButton = styled.button`
    background-color: transparent;
    height: 50px;
    width: 50px;
    border: 0;
    color: white;
    cursor: pointer;
    position: relative;
    z-index: 3;
    @media screen and (min-width: 768px){
        display: none;
    }
`


export default function Header() {

    const {cartProducts} = useContext(CartContext)
    const [mobileNavActive, setMobileNavActive] = useState(false)

    return (
        <StyledHeader>
            <Center>
                <Wrapper>
                    <Logo href={'/'}>
                        <img src="../logo.svg"></img>
                    </Logo>

                    <StyledNav mobileNavActive={mobileNavActive}>
                        {/* <NavLink href={'/'}>Home</NavLink> */}
                        <NavLink href={'/products'}>All products</NavLink>
                        <NavLink href={'/contact'}>Contact</NavLink>
                        <NavLink href={'/about'}>About</NavLink>
                        {/* <NavLink href={'/accounts'}>Accounts</NavLink> */}
                        <NavLink href={'/cart'}>Cart ({cartProducts.length})</NavLink>
                    </StyledNav>

                    {/* mobile */}

                    <NavButton onClick={() => setMobileNavActive(prev => !prev)}>
                        <Burger></Burger>
                    </NavButton>

                </Wrapper>
            </Center>
        </StyledHeader>
    )
}