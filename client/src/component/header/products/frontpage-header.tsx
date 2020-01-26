import {NavBar, NavBarData} from "../nav-bar";
import * as React from "react";
import './frontpage-header.css';

interface FrontpageHeaderProps {
    data: NavBarData
}

const FrontpageHeader: React.FC<FrontpageHeaderProps> = ({data}) => {
    return (
        <div className={'frontpage-header-wrapper'}>
                <NavBar
                    data={data}
                    listClassName={'frontpage-header-list-wrapper'}
                    dropDownListClassName={'frontpage-header-dropdown-wrapper'}
                    dropDownListFadeOut={true}
                    maskHeight={200}
                    slideInBackground={true}
                />
        </div>
    )
};

export { FrontpageHeader };