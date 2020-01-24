import * as React from "react";
import {DropDownListData, NavBarData} from "./index";
import './nav-bar.css';
import List from "./list";
import {useState} from "react";
import DropDownList from "./drop-down-list";
import useIsMobile from "../../../tools/use-is-mobile";
import useIsResized from "../../../tools/use-is-resized";

interface NavBarProps {
    data: NavBarData,
    listClassName?: string,
    dropDownListClassName?: string,
    dropDownListFadeOut?: boolean,
    dropDownListCloseOnMouseLeave?: boolean,
    maskHeight?: number
}

const NavBar: React.FC<NavBarProps> = (
    {
        data,
        listClassName,
        dropDownListClassName,
        dropDownListFadeOut,
        dropDownListCloseOnMouseLeave,
        maskHeight
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
            <List className={listClassName} data={data} toggleDropDownList={toggleDropDownList} maskHeight={maskHeight}/>
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