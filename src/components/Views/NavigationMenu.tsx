import * as React from "react";
import { Link } from "react-router-dom";

import "../../styles/navigation.scss";
import { ReactComponent as Close } from "../../assets/ui/close.svg";

interface NavigationMenuProps {
    opened: boolean
    onClick?: () => void;
}

const NavigationMenu = (props: NavigationMenuProps) => {
    return <div className={`sidenav ${props.opened ? 'opened' : 'closed'}`}>
        <div className='menu-nav-close' onClick={() => props.onClick && props.onClick()}>
            <Close/>
        </div>
        <Link to="/">Main</Link>
        <Link to="/projects">Projects</Link>
    </div>;
};

export default NavigationMenu;
