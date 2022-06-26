import React from "react";
import classes from "./styles.module.scss";

const Summarize = (props) => {

    return (
        <div className={classes.cardSummarize}>
            <div className={classes.imagesSummarize}>
                <img src={props.image} alt="" />
            </div>
            <div className={classes.titleSummarize}>{props.title}</div>
            <div className={classes.numberSummarize}>{props.total !== -1 ? props.total : "Loading..."}</div>
            <div className={classes.descriptionSummarize}>Total</div>
        </div>
    );
};
export default Summarize;
