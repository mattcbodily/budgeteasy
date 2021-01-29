module.exports = {
    getTransactions: (req, res) => {
        const { id } = req.params
        const db = req.app.get('db')
        
        db.transactions.get_transactions({ id: +id })
        .then(transactions => res.status(200).send(transactions))
        .catch(err => res.status(500).send(err))
    },
    addTransaction: (req, res) => {
        const { userId, category, description, amount, transactionDate } = req.body
        const db = req.app.get('db')

        console.log('hit', req.body)

        db.transactions.add_transaction({ userId, category, description, amount, transactionDate })
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
    }
}