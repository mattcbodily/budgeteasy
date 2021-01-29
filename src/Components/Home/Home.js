import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import ChartDisplay from '../ChartDisplay/ChartDisplay'
import Transaction from '../Transaction/Transaction'
import TransactionModal from '../TransactionModal/TransactionModal'
import './Home.css'

const Home = props => {
    const [transactions, setTransactions] = useState([])
    const [income, setIncome] = useState(0)
    const [expenses, setExpenses] = useState(0)
    const [modalView, setModalView] = useState(false)


    useEffect(() => {
        axios.get(`/api/transactions/${props.user.user_id}`)
            .then(res => {
                setTransactions(res.data)
            })
            .catch(err => console.log(err))
    }, [props.user.user_id])

    useEffect(() => {
        setIncome(transactions.filter(el => el.category === 'income').reduce((acc, curr) => acc + curr.amount, 0))
        setExpenses(transactions.filter(el => el.category === 'expense').reduce((acc, curr) => acc + curr.amount, 0))
    }, [transactions])

    const getTransactions = () => {
        axios.get(`/api/transactions/${props.user.user_id}`)
            .then(res => {
                setTransactions(res.data)
            })
            .catch(err => console.log(err))
    }

    return (
        <main>
            <ChartDisplay income={income} expenses={expenses} />
            <section className='finance-overview'>
                <div>
                    <p>Income</p>
                    <p className='income-overview'>${income.toFixed(2)}</p>
                </div>
                <div id='column-two'>
                    <p>Expenses</p>
                    <p className='expense-overview'>${expenses.toFixed(2)}</p>
                </div>
                <div>
                    <p>Balance</p>
                    <p className={income - expenses >= 0 ? 'income-overview' : 'expense-overview'}>${(income - expenses).toFixed(2)}</p>
                </div>
            </section>
            <button onClick={() => setModalView(true)}>+</button>
            {transactions.map(transaction => (
                <Transaction key={transaction.transaction_id} transaction={transaction} />
            ))}
            {modalView
                ? <TransactionModal userId={props.user.user_id} getTransactions={getTransactions} setModalView={setModalView} />
                : null}
        </main>
    )
}

const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(Home)