import React from 'react'
import './Transaction.css'

const Transaction = props => {
    return (
        <div className='transaction'>
            <p>{props.transaction.description}</p>
            <p className={props.transaction.category === 'income' ? 'income-overview' : 'expense-overview'}>${props.transaction.amount.toFixed(2)}</p>
            <p>{props.transaction.transaction_date}</p>
        </div>
    )
}

export default Transaction