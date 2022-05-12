import React, {useState} from "react";
import classes from "./styles.module.scss";

const Header =()=>{
    return(
        <div className={classes.headerContainer}>
            <div className={classes.headerTag}>
                Nav
            </div>
            <div className={classes.languages}>
                <span>Welcome: Giang!</span>
                <span className={classes.languagesVi} >VN</span>
                    <span className={classes.languagesEn} >EN</span>

                    {/* Log out */}
                    <div className={classes.btnLogout}  title='Logout'>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
            </div>
        </div>
    )
}