import React from 'react'
import { Link } from 'react-router-dom';

const LoginComponentNav = ({ children }) => {
    const [showNav, setshowNav] = React.useState(false)
    React.useEffect(() => {
        let mounted = true;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                if (mounted) {
                    setshowNav(true)
                }
            }
            else {
                setshowNav(false)

            }
        });
        return () => {
            window.removeEventListener('scroll', null);
            mounted = false;
        };
    }, []);
    return (
        <div className='loginScreen'>
            <nav className={`loginavbar ${showNav && "nav__black"}`}>
                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1280px-Netflix_2015_logo.svg.png' alt='Netflix Logo' className='nav__logo login__logo' />
                <Link to='/signin'>
                    <button className='loginscreenbtn'>
                        Sign In
                    </button>
                </Link>
            </nav>
            {children}
        </div>
    )
}

export default LoginComponentNav
