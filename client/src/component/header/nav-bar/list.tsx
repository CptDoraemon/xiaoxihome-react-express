import * as React from "react";
import {ButtonType, DropDownListData, LinkButton, MultiLinkButton} from "./index";
import {Link} from "react-router-dom";
import './list.css';
import {CSSProperties, useRef} from "react";
import useIsHovering from "../../../tools/use-is-hovering";

type ToggleDropDownList = (data: DropDownListData, left: number) => void

interface MultiLinkButtonProps {
    data: DropDownListData,
    name: string,
    toggleDropDownList: ToggleDropDownList
}

const DropDownButton: React.FC<MultiLinkButtonProps> = ({
    data,
    name,
    toggleDropDownList
                                                         }) => {
    const buttonRef = useRef<HTMLLIElement>(null);
    const clickHandler = () => {
        const left = buttonRef && buttonRef.current ? buttonRef.current.offsetLeft : 0;
        toggleDropDownList(data, left)
    };

    return (
        <li onClick={clickHandler} ref={buttonRef}><button>{ name }</button></li>
    )
};

interface ListProps {
    className?: string,
    data: Array<LinkButton | MultiLinkButton>,
    isDropDownListActive: boolean,
    toggleDropDownList: ToggleDropDownList,
    maskHeight?: number,
    slideInBackground?: boolean
}

const List: React.FC<ListProps> = (
    {
        className,
        data,
        isDropDownListActive,
        toggleDropDownList,
        maskHeight,
        slideInBackground
    }) => {

    const containerRef = useRef(null);
    const isHovering = useIsHovering(containerRef);
    const isBackgroundVisible = isHovering || (!isHovering && isDropDownListActive);
    const backgroundDIVStyle: CSSProperties = {
        width: `100%`,
        height: `100px`,
        transition: `transform 0.3s`,
        backgroundColor: `rgb(37, 41, 45)`,
        position: "absolute",
        top: `0`,
        left: `0`
    };

    return (
        <nav className={className ? className : 'nav-bar-list-wrapper'} ref={containerRef} onClick={(e) => e.stopPropagation()}>
            <div className={'nav-bar-list-mask'} style={{height: `${maskHeight || 100}px`}}>
                { slideInBackground && <div style={{...backgroundDIVStyle, transform: isBackgroundVisible ? 'translateY(0)' : 'translateY(-100%)'}}> </div>}
                <ul>
                    {
                        data.map((button, i) => {
                            if (button.type === ButtonType.LINK) {
                                if ("isExternal" in button && button.isExternal) {
                                    return <li key={i}><a href={button.link}><span>{ button.name }</span></a></li>
                                } else {
                                    return <li key={i}><Link to={button.link}><span>{ button.name }</span></Link></li>
                                }
                            } else if (button.type === ButtonType.MULTILINK) {
                                return <DropDownButton key={i} data={button.data} name={button.name} toggleDropDownList={toggleDropDownList}/>
                            }
                        })
                    }
                </ul>
            </div>
        </nav>
    )
};

export default List;
