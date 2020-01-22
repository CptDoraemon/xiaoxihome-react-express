import * as React from "react";
import {DropDownListData, NavBarData} from "./index";
import './nav-bar.css';
import List from "./list";
import {useState} from "react";
import DropDownList from "./drop-down-list";
import isMobile from "../../../tools/is-mobile";

interface NavBarProps {
    data: NavBarData,
    listClassName?: string,
    dropDownListClassName?: string,
    dropDownListFadeOut?: boolean,
    dropDownListCloseOnMouseLeave?: boolean
}

const NavBar: React.FC<NavBarProps> = (
    {
        data,
        listClassName,
        dropDownListClassName,
        dropDownListFadeOut,
        dropDownListCloseOnMouseLeave
    }) => {
    const [
        isDropDownListActive,
        setIsDropDownListActive
    ] = useState(false);

    const [
        dropDownListData,
        setDropDownListData
    ] = useState<DropDownListData>([]);

    const [
        dropDownListLeft,
        setDropDownListLeft
    ] = useState(0);

    const toggleDropDownList = (data: DropDownListData, left: number) => {
        setDropDownListData(data);
        if (!isMobile()) setDropDownListLeft(left);
        setIsDropDownListActive((state) => !state);
    };

    return (
        <>
            <List className={listClassName} data={data} toggleDropDownList={toggleDropDownList}/>
            <DropDownList
                className={dropDownListClassName}
                data={dropDownListData}
                isActive={isDropDownListActive}
                left={dropDownListLeft}
                setIsActive={setIsDropDownListActive}
                fadeOut={dropDownListFadeOut}
                closeOnMouseLeave={dropDownListCloseOnMouseLeave}
            />
        </>
    )
};

export default NavBar;