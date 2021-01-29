import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import './Header.css'

const Header = props => {
    return (
        <header className='main-header'>
            {props.location.pathname !== '/'
              ? (
                  <section className='header-flex'>
                    <h2>Welcome, {props.firstName}</h2>
                    <nav>
                        <Link to='/dashboard'>Home</Link>
                        <Link to='/profile'>Profile</Link>
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