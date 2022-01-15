import React from 'react'
import '../Components/CSS/loginscreen.css';
import FooterLogin from '../Components/FooterLogin';
import LoginComponentNav from '../Components/LoginComponentNav';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
    const [userEmail, setuserEmail] = React.useState("");
    let navigate = useNavigate();
    const handleChange = (e) => {
        setuserEmail(e.target.value)
    }
    const redirectSignIn = () => {
        return navigate("/signin", {
            state: {
                "email": userEmail ? userEmail : ""
            }
        })
    }
    return (
        <div >
            <LoginComponentNav >
                <main className='loginscreenmain'>
                    <h1>Unlimited movies, TV shows, and more.</h1>
                    <h4>Watch anywhere. Cancel anytime.</h4>
                    <div className='loginscreenformcontainer'>
                        <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
                        <div className='loginscreenform'>
                            <input type='text' placeholder='Email Address' className='loginscreeninput' value={userEmail} name='email' onChange={handleChange} />
                            <button className='loginscreeninputbtn' onClick={
                                redirectSignIn
                            }>
                                Get Started
                            </button>
                        </div>
                    </div>
                </main>
            </LoginComponentNav >

            <div className='loginscreenmain2container'>
                <div className='loginscreenmain2'>
                    <div className='loginscreenmain2text'>
                        <h1>
                            Enjoy on your TV.
                        </h1>
                        <p>
                            Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.
                        </p>
                    </div>
                    <div className='loginscreenmain2animation'>
                        <img className='loginscreentvimage' alt='Netflix TV Logo' src='https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png' />
                        <div className='loginscreentvideo'>
                            <video autoPlay muted={true} playsInline loop>
                                <source src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v" type='video/mp4'>
                                </source>
                            </video>
                        </div>
                    </div>
                </div>
            </div>
            <FooterLogin />
        </div>
    )
}

export default LoginScreen
