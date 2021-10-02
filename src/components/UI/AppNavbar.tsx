import React from 'react';
import styled from "styled-components";

type AppNavbarProps = {
    size?: 'sm' | 'lg',
    fixed?: boolean
}

const _Navbar = styled.div<AppNavbarProps>`
  background: #282c34;
  height: ${props => props.size === 'sm' ? '5vh' : '7vh'};
`

const AppNavbar:React.FC<AppNavbarProps> = ({children, size}) => {
    return (
        <_Navbar>
            {children}
        </_Navbar>
    );
};

export default AppNavbar;
