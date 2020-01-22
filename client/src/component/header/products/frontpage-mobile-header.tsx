import {NavBar, NavBarData} from "../nav-bar";
import * as React from "react";
import './frontpage-mobile-header.css';

interface FrontpageMobileHeaderProps {
    data: NavBarData
}

const FrontpageMobileHeader: React.FC<FrontpageMobileHeaderProps> = ({data}) => {
    return (
        <div className={'frontpage-header-wrapper'}>
            <div className={'frontpage-header-wrapper-inner'}>
                <NavBar
                    data={data}
                    listClassName={'frontpage-header-list-wrapper'}
                    dropDownListClassName={'frontpage-header-dropdown-wrapper'}
                />
            </div>
        </div>
    )
};

export { FrontpageMobileHeader };