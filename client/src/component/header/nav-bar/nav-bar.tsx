import * as React from "react";
import {DropDownListData, NavBarData} from "./index";
import './nav-bar.css';
import List from "./list";
import {useState} from "react";
import DropDownList from "./drop-down-list";
import useIsMobile from "../../../tools/use-is-mobile";

interface NavBarProps {
    data: NavBarData,
    listClassName?: string,
    dropDownListClassName?: string,
    dropDownListFadeOut?: boolean,
    dropDownListCloseOnMouseLeave?: boolean,
    maskHeight?: number,
    slideInBackground?: boolean
}

const NavBar: React.FC<NavBarProps> = (
    {
        data,
        listClassName,
        dropDownListClassName,
        dropDownListFadeOut,
        dropDownListCloseOnMouseLeave,
        maskHeight,
        slideInBackground
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

    const closeDropDownAfterResized = () => {
        if (isDropDownListActive) setIsDropDownListActive(false);
    };
    const isMobile = useIsMobile(null, null, closeDropDownAfterResized);

    const toggleDropDownList = (data: DropDownListData, left: number) => {
        setDropDownListData(data);
        if (!isMobile) {
            setDropDownListLeft(left);
        } else if (dropDownListLeft) {
            setDropDownListLeft(0);
        }
        setIsDropDownListActive((state) => !state);
    };

    return (
        <>
            <List
                className={listClassName}
                data={data}
                isDropDownListActive={isDropDownListActive}
                toggleDropDownList={toggleDropDownList}
                maskHeight={maskHeight}
                slideInBackground={slideInBackground}/>
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