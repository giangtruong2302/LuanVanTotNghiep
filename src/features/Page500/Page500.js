import React from "react";
import backGround500 from "../../assets/images/banner/500page.png"
import './Page500.scss'
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
const Page500 = () => {
    const history = useHistory();
    return (
        <div className="screen500">

            <img src={backGround500} className="imgBg"></img>
            <Link to={`/`}> <button className="button5001" >Back to Home</button></Link>
            <button className="button5002" onClick={() => {
                history.goBack();
            }}>Previos Page</button>
        </div>
    )
}
export default Page500;