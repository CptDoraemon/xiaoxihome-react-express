import * as React from "react";
import {DropDownListData} from "./index";
import {Link} from "react-router-dom";
import './drop-down-list.css';

interface DropDownListProps {
    data: DropDownListData,
    className?: string,
    isActive: boolean,
    left: number,
    fadeOut?: boolean,
}

const DropDownList: React.FC<DropDownListProps> = ({
    data,
    className,
    isActive,
    left,
    fadeOut,
}) => {
    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className={className ? className : 'drop-down-list-wrapper'}
            style={{
             transform: isActive ? 'translateY(0)' : 'translateY(-100%)',
             opacity: !isActive && fadeOut ? 0 : 1,
             transition: 'transform 0.3s, opacity 0.3s',
             left: `${left}px`
            }}
        >
            {
                data.map((section, i) => {
                    return (
                        <React.Fragment key={i}>
                            <span>{ section.sectionName }</span>
                            <ul>
                                {
                                    section.data.map((button, j) => {
                                        return <li key={j}><Link to={button.link} tabIndex={isActive ? 0 : -1}>{ button.name }</Link></li>
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
