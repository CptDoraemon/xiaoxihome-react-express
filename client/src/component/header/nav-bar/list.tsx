import * as React from "react";
import {ButtonType, DropDownListData, LinkButton, MultiLinkButton} from "./index";
import {Link} from "react-router-dom";
import './list.css';
import {useRef} from "react";

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
        <li onClick={clickHandler} ref={buttonRef}><span>{ name }</span></li>
    )
};

interface ListProps {
    className?: string,
    data: Array<LinkButton | MultiLinkButton>,
    toggleDropDownList: ToggleDropDownList,
    maskHeight?: number
}

const List: React.FC<ListProps> = (
    {
        className,
        data,
        toggleDropDownList,
        maskHeight
    }) => {
    return (
        <div className={className ? className : 'nav-bar-list-wrapper'}>
            <div className={'nav-bar-list-mask'} style={{height: `${maskHeight || 100}px`}}>
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
        </div>
    )
};

export default List;