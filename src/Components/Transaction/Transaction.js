import React from 'react'

const Transaction = props => {
    return (
        <div>
            {props.transaction.category} {props.transaction.amount}
        </div>
    )
}

export default Transaction