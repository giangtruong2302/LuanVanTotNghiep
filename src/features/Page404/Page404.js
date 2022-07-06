import React from "react";
import backGround from "../../assets/images/banner/404.png"
import './Page404.scss'
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
const Page404 = () => {
    const history = useHistory();
    return (
        <div className="screen">

            <img src={backGround} className="imgBg"></img>
            <Link to={`/`}> <button className="button1" >Back to Home</button></Link>
            <button className="button2" onClick={() => {
                history.goBack();
            }}>Previos Page</button>
        </div>
    )
}
export default Page404;