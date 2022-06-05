import React from "react";
import classes from "./styles.module.scss";

const QuickAccess= (props) => {
    const {image,title,description}=props
    return (
        <div className={classes.cardQuickAccess}>
            <div className={classes.imagesQuickAccess}>{image}</div>
            <div className={classes.titleQuickAccess}>{title}</div>
            <div className={classes.descriptionQuickAccess}>{description}</div>
        </div>
    );
};

export default QuickAccess;
