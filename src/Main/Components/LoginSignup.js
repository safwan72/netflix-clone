import React from 'react'
import './CSS/loginsingup.css';
import * as actions from '../../Main/Redux/actionstore'
import { connect } from 'react-redux';

const mapdispatchToProps = (dispatch) => {
    return {
        authsignin: (email, password, mode) => dispatch(actions.authSignin(email, password, mode))
    }
}


const LoginSignup = (props) => {
    const { myemail } = props;
    const [status, setstatus] = React.useState("Sign In");
    const [userPass, setuserPass] = React.useState("");
    const [userEmail, setuserEmail] = React.useState("");

    const handlestatus = () => {
        setstatus(status === "Sign In" ? "Sign Up" : "Sign In")
    }
    React.useEffect(() => {
        setuserEmail(myemail)
    }, [myemail])

    const Submit = (e) => {
        props.authsignin(userEmail, userPass, status);
        setuserEmail("");
        setuserPass("");
        e.preventDefault();
    };
    const handleEmailChange = (e) => {
        setuserEmail(e.target.value)
    };
    const handlePassChange = (e) => {
        setuserPass(e.target.value)
    };
    return (
        <div className='login__signup__component'>
            <div className='login__signup__component__child'>
                <h3>{status}</h3>
                <button className='loginscreenbtn login__signup__form__button' onClick={() => handlestatus()}>Change to {status === "Sign In" ? "Sign Up" : "Sign In"}</button>

                <form className='login__signup__form' onSubmit={(e) => Submit(e)}>
                    <input type="email" placeholder="Email" value={userEmail} onChange={handleEmailChange} />
                    <input type="password" placeholder="Password" required value={userPass} onChange={handlePassChange} />
                    {status === 'Sign Up' ? (<input type="password" placeholder="Confirm Password" />
                    ) : (null)}
                    <button type="submit" className='loginscreenbtn login__signup__form__button'>
                        {status}
                    </button>
                </form>
                {status === 'Sign Up' ? (<p onClick={() => handlestatus()} className='login__signup__form__bottom__text'> Already have an account? </p>
                ) : (null)}
            </div>
        </div>
    )
}

export default connect(null, mapdispatchToProps)(LoginSignup)
