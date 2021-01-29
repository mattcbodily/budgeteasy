import React, { useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { getUser } from '../../redux/userReducer'

const Auth = props => {
    let [firstName, setFirstName] = useState('')
    let [lastName, setLastName] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [verPassword, setVerPassword] = useState('')
    let [registerView, setRegisterView] = useState(false)

    const registerUser = (e) => {
        e.preventDefault()

        if(password && password === verPassword){
            axios.post('/api/register', { firstName, lastName, email, password })
                .then(res => {
                    props.getUser(res.data)
                    props.history.push('/dashboard')
                })
                .catch(err => console.log(err))
        } else {
            alert('Passwords do not match')
        }
    }

    const loginUser = (e) => {
        e.preventDefault()

        axios.post('/api/login', { email, password })
            .then(res => {
                props.getUser(res.data)
                props.history.push('/dashboard')
            })
            .catch(err => console.log(err))
    }

    return (
        <main>
            <h1>Budgeteasy</h1>
            <h3>Budgeting made simple</h3>
            <form>
                {registerView
                    ? (
                        <>
                            <input value={firstName} onChange={e => setFirstName(e.target.value)} />
                            <input value={lastName} onChange={e => setLastName(e.target.value)} />
                        </>
                    )
                    : null}
                <input value={email} onChange={e => setEmail(e.target.value)} />
                <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
                {registerView
                    ? (
                        <>
                            <input type='password' value={verPassword} onChange={e => setVerPassword(e.target.value)} />
                            <button onClick={e => registerUser(e)}>Register</button>
                        </>
                    )
                    : <button onClick={e => loginUser(e)}>Login</button>}
            </form>
            {registerView
                ? <p>Have an account? <span onClick={() => setRegisterView(false)}>Login here</span></p>
                : <p>Don't have an account? <span onClick={() => setRegisterView(true)}>Register here</span></p>}
        </main>
    )
}

export default connect(null, { getUser })(Auth)