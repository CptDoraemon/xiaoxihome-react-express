import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    root: {
        position: 'absolute'
    },
});

const MagnifyingGlass: React.FC = ({children}) => {
    const classes = useStyles();

    return (
        <div>

        </div>
    )
};

export default MagnifyingGlass
