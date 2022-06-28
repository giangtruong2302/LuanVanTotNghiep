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
                clientId="486606115670-699qfj88ffthucqe7lhpr8q0k65gq7hv.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
            />

        </div>
    )



}
export default Google;