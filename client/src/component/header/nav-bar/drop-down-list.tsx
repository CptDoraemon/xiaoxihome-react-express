import * as React from "react";
import {DropDownListData} from "./index";
import {Link} from "react-router-dom";
import './drop-down-list.css';
import {Dispatch, SetStateAction, useEffect} from "react";

interface DropDownListProps {
    data: DropDownListData,
    className?: string,
    isActive: boolean,
    left: number,
    setIsActive: Dispatch<SetStateAction<boolean>>,
    fadeOut?: boolean,
    closeOnMouseLeave?: boolean
}

const DropDownList: React.FC<DropDownListProps> = ({
    data,
    className,
    isActive,
    left,
    setIsActive,
    fadeOut,
    closeOnMouseLeave
}) => {

    useEffect(() => {
       window.addEventListener('click', closeDropDownList);
       return () => {
           window.removeEventListener('click', closeDropDownList);
       }
    });

    const closeDropDownList = () => {
        setIsActive(false);
    };

    return (
        <div className={className ? className : 'drop-down-list-wrapper'}
             onClick={(e) => e.stopPropagation()}
             style={{
                 transform: isActive ? 'translateY(0)' : 'translateY(-100%)',
                 opacity: !isActive && fadeOut ? 0 : 1,
                 transition: 'transform 0.3s, opacity 0.3s',
                 left: `${left}px`
             }}
             onMouseLeave={closeOnMouseLeave ? closeDropDownList : () => false}
        >
            {
                data.map((section, i) => {
                    return (
                        <React.Fragment key={i}>
                            <span>{ section.sectionName }</span>
                            <ul>
                                {
                                    section.data.map((button, j) => {
                                        if (j !== 0) {
                                            return <li key={j}><Link to={button.link} tabIndex={isActive ? 0 : -1}>{ button.name }</Link></li>
                                        }
                                    })
                                }
                            </ul>
                        </React.Fragment>
                    )
                })
            }
        </div>
    )
};

export default DropDownList;