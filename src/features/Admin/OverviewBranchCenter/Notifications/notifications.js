import React from "react";
import classes from "./styles.module.scss";


const Notifications = (props) => {
    return (
        <div className={classes.cardNotifications}>
            <div className={classes.dateNotifications}>23/02/2000</div>
            <div className={classes.titleNotifications}>Notifications</div>
            <div className={classes.textNotifications}>AAAAAAAAAAAAAAAAAA</div>
        </div>
    );
};

export default Notifications;
