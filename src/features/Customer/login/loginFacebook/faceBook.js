import React from "react";
import FacebookLogin from "react-facebook-login";
import './faceBook.scss'



const Facebook = () => {


    const responseFacebook = response => {
        console.log(response);
    }
    return (
        <div>

            <FacebookLogin
                appId="5564700986882792"
                autoLoad={true}
                fields="name,email,picture"
                callback={responseFacebook}
                cssClass="my-facebook-button-class"
                icon="fa-brands fa-facebook"
            />,
        </div>
    )



}
export default Facebook;