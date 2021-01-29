import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import Transaction from '../Transaction/Transaction'
import TransactionModal from '../TransactionModal/TransactionModal'

const Home = props => {
    const [transactions, setTransactions] = useState([])
    const [modalView, setModalView] = useState(false)

    
    useEffect(() => {
        axios.get(`/api/transactions/${props.user.user_id}`)
        .then(res => {
            setTransactions(res.data)
        })
        .catch(err => console.log(err))
    }, [props.user.user_id])
    
    const getTransactions = () => {
        axios.get(`/api/transactions/${props.user.user_id}`)
            .then(res => {
                setTransactions(res.data)
            })
            .catch(err => console.log(err))
    }

    return (
        <main>
            <button onClick={() => setModalView(true)}>+</button>
            {transactions.map(transaction => (
                <Transaction key={transaction.transaction_id} transaction={transaction} />
            ))}
            {modalView
              ? <TransactionModal userId={props.user.user_id} getTransactions={getTransactions} setModalView={setModalView}/>
              : null}
        </main>
    )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Home)