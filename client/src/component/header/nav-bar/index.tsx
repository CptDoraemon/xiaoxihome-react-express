import * as React from 'react';
import NavBar from "./nav-bar";

export enum ButtonType {
    LINK = 'LINK',
    MULTILINK = 'MULTILINK'
}

export interface LinkButton {
    name: string,
    link: string,
    isExternal?: boolean,
    type: ButtonType.LINK
}

export type DropDownListData = Array<{
    sectionName: string,
    data: Array<LinkButton>
}>;

export interface MultiLinkButton {
    name: string,
    data: DropDownListData,
    type: ButtonType.MULTILINK
}

export type NavBarData = Array<LinkButton | MultiLinkButton>;

export { NavBar };