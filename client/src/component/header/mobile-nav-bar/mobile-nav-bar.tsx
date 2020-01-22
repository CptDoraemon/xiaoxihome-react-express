import * as React from "react";
import {useEffect, useState} from "react";
import './mobile-nav-bar.css'
import {ButtonType, DropDownListData, NavBarData} from "../nav-bar";
import DropDownList from "../nav-bar/drop-down-list";
import MenuButton from "./menu-button";
import {Link} from "react-router-dom";

interface MobileNavBarDropDownListProps {
    name: string,
    data: DropDownListData,
}

const MobileNavBarDropDownList: React.FC<MobileNavBarDropDownListProps> = ({
    name,
    data
                                                                           }) => {
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);

    const toggleDropDownList = () => {
        setIsDropDownOpen((state) => !state)
    };

    return (
        <li>
            <span onClick={toggleDropDownList}>{ name }</span>
            <div style={{
                display: isDropDownOpen ? 'block' : 'none'
            }}>
                <DropDownList data={data} className={'mobile-nav-bar-drop-down-list'} left={0} setIsActive={setIsDropDownOpen} isActive={true}/>
            </div>
        </li>
    )
};

interface MobileNavBarProps {
    data: NavBarData
}

const MobileNavBar: React.FC<MobileNavBarProps> = ({data}) => {

    const [isNavBarOpen, setIsNavBarOpen] = useState(false);
    const toggleNavBar = () => setIsNavBarOpen((state) => !state);
    const closeNavBar = () => setIsNavBarOpen(false);
    useEffect(() => {
        if (isNavBarOpen) {
            window.addEventListener('click', closeNavBar);
            return () => {
                window.removeEventListener('click', closeNavBar);
            }
        }
    }, [isNavBarOpen]);

    return (
        <div className={'mobile-nav-bar-wrapper'} onClick={(e) => e.stopPropagation()}>
            <div className={'mobile-nav-bar-button'} onClick={toggleNavBar}>
                <MenuButton isActive={isNavBarOpen} size={50}/>
            </div>
            <div
                className={'mobile-nav-bar-list'}
                style={{
                    transform: isNavBarOpen ? 'translateX(0)' : 'translateX(-100%)',
                    transition: 'transform 0.3s'
                }}
            >
                <div className={'mobile-nav-bar-list-github-button'}>
                    <a href={'https://github.com/CptDoraemon'}>GitHub</a>
                </div>
                <ul>
                { data.map((listItem, i) => {
                    if (listItem.type === ButtonType.LINK ) {
                        if (listItem.isExternal) {
                            return <li key={i}><a href={listItem.link}>{ listItem.name }</a></li>
                        } else {
                            return <li key={i}><Link to={listItem.link}>{ listItem.name }</Link></li>
                        }
                    } else if (listItem.type === ButtonType.MULTILINK ) {
                        return (
                            <MobileNavBarDropDownList key={i} name={listItem.name} data={listItem.data}/>
                        )
                    }
                })}
                </ul>
            </div>
        </div>
    )
};

export default MobileNavBar;