import React from 'react';
import styled from 'styled-components';

const FooterBottom = styled.footer`
    display: flex;
    height: 50px;
    flex-flow: row wrap;
    justify-content: space-between;
    box-shadow: 0px 0px 0px #888, 0px -1px 5px #888;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color:#fff;
`;
const Link =styled.a`
    font-size: 12px;
    color: #090830;
    padding: 6px;
    text-align: center; 
    &:hover {
        text-decoration: none;
    }    
`;
const Icon = styled.i`    
}
`;
function Footer(props) {
    return (
        <FooterBottom>
            {props.links && props.links.map((link,ind) => {
                return (
                    <Link key={ind} href="#"><Icon className={link.icon}/><br/>{link.name}</Link>
                )
            })}
        </FooterBottom>
    );
}

export default Footer;
