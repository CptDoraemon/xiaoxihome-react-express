import * as React from "react";
import {MutableRefObject, useRef, useState} from "react";

interface AccessibleButtonProps {
    className?: string,
    ariaLabel: string,
    clickHandler: () => void,
}

const AccessibleButton: React.FC<AccessibleButtonProps> = (props) => {
    const [isPressed, setIsPressed] = useState(false);
    const buttonRef = useRef<HTMLDivElement>(null);

    const doClick = () => {
        setIsPressed(prevState => !prevState);
        props.clickHandler();
        if (buttonRef && buttonRef.current) buttonRef.current.blur()
    };


    const buttonClickHandler = () => {
        doClick()
    };

    const keyboardEventHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.which === 32) {
            // Space
            e.preventDefault();
            doClick()
        } else if (e.which === 13) {
            // Enter
            doClick()
        }
    };

    const style = {
        cursor: 'pointer'
    };

    return (
        <div
            className={props.className || ''}
            tabIndex={0}
            role={'button'}
            aria-pressed={isPressed}
            aria-label={props.ariaLabel}
            onClick={buttonClickHandler}
            onKeyDown={keyboardEventHandler}
            ref={buttonRef}
            style={style}
        >
            {props.children}
        </div>
    )
};

export default AccessibleButton