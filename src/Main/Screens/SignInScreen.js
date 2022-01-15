import React from 'react'
import LoginComponentNav from '../Components/LoginComponentNav';
import LoginSignup from '../Components/LoginSignup';
import { useLocation } from 'react-router-dom';
const SignInScreen = () => {
    const { state } = useLocation();
    const [email, setemail] = React.useState("");
    React.useEffect(() => {
        setemail(state?.email)
    }, [email, state?.email]);
    return (
        <div>
            <LoginComponentNav >
                <LoginSignup myemail={email} />
            </LoginComponentNav >
        </div>
    )
}

export default SignInScreen
