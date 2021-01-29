import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import menuIcon from '../../assets/icons/menu.svg'
import closeIcon from '../../assets/icons/x.svg'
import './Header.css'

const Header = props => {
    const [dropdown, setDropdown] = useState('closed')

    const closeMenu = () => {
        setDropdown('close-menu');
        setTimeout(() => {
            setDropdown('closed');
        }, 225);
    }

    return (
        <header className='main-header'>
            {props.location.pathname !== '/'
              ? (
                  <section className='header-flex'>
                    <h2>Welcome, {props.firstName}</h2>
                    <div className='menu-bubble' onClick={() => setDropdown('open-menu')}>
                        <img src={menuIcon} alt='Main menu' />
                    </div>
                    <nav className={`dropdown-menu ${dropdown}`}>
                        <img src={closeIcon} alt='Close menu' onClick={closeMenu}/>
                        <Link to='/dashboard' className='nav-links' onClick={() => setDropdown('closed')}>Home</Link>
                        <Link to='/profile' className='nav-links' onClick={() => setDropdown('closed')}>Profile</Link>
                    </nav>
                  </section>
              )
              : null}
        </header>
    )
}

const mapStateToProps = reduxState => {
    return {
        firstName: reduxState.user.first_name
    }
}

export default withRouter(connect(mapStateToProps)(Header))