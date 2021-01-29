import React, { useState } from 'react'
import axios from 'axios'

const TransactionModal = props => {
    const [category, setCategory] = useState('income')
    const [description, setDescription] = useState('')
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState('')

    const addTransaction = (e) => {
        const { userId } = this.props
        e.preventDefault()

        axios.post('/api/transaction', { userId, category, description, amount: parseFloat(amount), date })
            .then(() => {
                //close modal here
            })
            .catch(err => console.log(err))
    }

    return (
        <section>
            <h4>Add a transaction</h4>
            <form>
                <select value={category} onChange={e => setCategory(e.target.value)}>
                    <option value='income'>Income</option>
                    <option value='expense'>Expense</option>
                </select>
                <input value={description} onChange={e => setDescription(e.target.value)} />
                <input type='number' value={amount} onChange={e => setAmount(e.target.value)} />
                <input type='date' value={date} onChange={e => setDate(e.target.value)} />
                <button onClick={e => addTransaction(e)}>Add</button>
            </form>
        </section>
    )
}

export default TransactionModal