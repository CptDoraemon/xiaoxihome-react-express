import * as React from "react";
import './menu-button.css'

interface MenuButtonProps {
    size: number,
    isActive: boolean
}

const MenuButton: React.FC<MenuButtonProps> = ({size, isActive}) => {
    return (
        <div style={{
            width: `${size}px`,
            height: `${size}px`
        }}
             className={'menu-button-wrapper'}
        >
            <div className={isActive ? 'menu-button-icon-active' : 'menu-button-icon-inactive'}> </div>
        </div>
    )
};

export default MenuButton;