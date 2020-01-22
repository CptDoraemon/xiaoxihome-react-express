import {NavBar, NavBarData} from "../nav-bar";
import * as React from "react";
import StickyEffect from "../../../tools/sticky-effect";
import './post-header.css';

interface PostHeaderProps {
    title: string,
    data: NavBarData
}

const PostHeader: React.FC<PostHeaderProps> = ({title, data}) => {
    return (
        <div className={'post-header-wrapper'}>
            <div className={'post-header-title'}> { title } </div>
            <StickyEffect stickyStartHeight={50} zIndex={1000}>
                <NavBar data={data} />
            </StickyEffect>
        </div>
    )
};

export { PostHeader };