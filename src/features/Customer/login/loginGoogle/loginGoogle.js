import React from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';


const onSuccess = (res) => {
    console.log('Login success', res.profileObj);
}
const onFailure = (res) => {
    console.log('Login fail', res);
}

const Google = () => {

    return (
        <div>

            <GoogleLogin
                clientId="486606115670-5eot9c17ma4fvhhej4pbevep3cn2b6jg.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
            />

        </div>
    )



}
export default Google;