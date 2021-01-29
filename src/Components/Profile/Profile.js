import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { clearUser } from '../../redux/userReducer'

const Profile = props => {
    const logout = () => {
        axios.get('/api/logout')
            .then(() => {
                props.clearUser()
                props.history.push('/')
            })
    }

    return (
        <main>
            <p>{props.user.first_name} {props.user.last_name}</p>
            <p>{props.user.email}</p>
            <button onClick={logout}>Logout</button>
        </main>
    )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps, { clearUser })(Profile)
