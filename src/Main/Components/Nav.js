import React from 'react'
import './CSS/nav.css';
import NavPopUp from './NavPopUp'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const Nav = ({ handlesearch, isHome, showSearch }) => {
    const [showNav, setshowNav] = React.useState(false);
    const [showPopUp, setshowPopUp] = React.useState(false);
    const user_details = useSelector(state => state.userDetails);

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
            window.removeEventListener('scroll', null)
            mounted = false;
        };
    }, [])
    const handlepopup = () => {
        setshowPopUp(!showPopUp)
    }
    return (
        <div className={`navbar ${showNav && "nav__black"}`}>
            <Link to="/home">
                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1280px-Netflix_2015_logo.svg.png' alt='Netflix Logo' className='nav__logo' />
            </Link>
            {showSearch && <div>
                <i className="fa fa-search netflix__search__input__icon__homepage" onClick={handlesearch} aria-hidden="true"></i>
            </div>
            }
            {isHome && <div className='netflix__search__input__div'>
                <i className="fa fa-search netflix__search__input__icon" aria-hidden="true"></i>
                <input type="search" placeholder='Search Through Movies' className='netflix__search__input' onChange={(e) => { handlesearch(e) }} />
            </div>
            }
            <div className='nav__avatar' onClick={handlepopup}>
                <img src={user_details?.profile_pic} alt={user_details?.user?.email} />
                {showPopUp && <NavPopUp show={showPopUp} />
                }
            </div>
        </div>
    )
}

export default Nav
