import * as React from "react";
import {DropDownListData, NavBarData} from "./index";
import './nav-bar.css';
import List from "./list";
import {useCallback, useState} from "react";
import DropDownList from "./drop-down-list";
import {useEffect} from "react";
import useIsMobile from "../../../tools/use-is-mobile";

const useCloseDropDownOnClickElseWhere = (close: () => void) => {
    useEffect(() => {
        window.addEventListener('click', close);
        return () => {
            window.removeEventListener('click', close);
        }
    }, [close]);
};

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
    const [isDropDownListActive, setIsDropDownListActive] = useState(false);
    const [dropDownListData, setDropDownListData] = useState<DropDownListData>([]);
    const [dropDownListLeft, setDropDownListLeft] = useState(0);

    const closeDropDown = useCallback(() => {
        setIsDropDownListActive(false);
    }, []);
    useCloseDropDownOnClickElseWhere(closeDropDown);

    const isMobile = useIsMobile();
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
                fadeOut={dropDownListFadeOut}
            />
        </>
    )
};

export default NavBar;
