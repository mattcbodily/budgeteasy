import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import TransactionModal from '../TransactionModal/TransactionModal'

const Home = props => {
    const [transactions, setTransactions] = useState([])
    const [modalView, setModalView] = useState(false)

    const getTransactions = () => {
        axios.get(`/api/transactions/${props.user.user_id}`)
            .then(res => {
                setTransactions(res.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getTransactions()
    }, [])

    console.log(transactions)

    return (
        <main>
            <button onClick={() => setModalView(true)}>+</button>
            <TransactionModal userId={props.user.user_id} getTransactions={getTransactions} />
        </main>
    )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Home)