import React from 'react'
import { Link } from 'react-router-dom'
import './CSS/navpopup.css'
const NavPopUp = ({ show }) => {
    return (
        <>
            {show && (
                <div className={`navpopup__container`}>
                    <ul className='navpopup__child'>
                        <li><Link to='/profile'>Manage Profile</Link></li>
                        <li><Link to='/subscription'>Subscribe</Link></li>
                        <li><Link to='/logout'>Logout</Link></li>
                    </ul>
                </div>

            )}
        </>
    )
}

export default NavPopUp
