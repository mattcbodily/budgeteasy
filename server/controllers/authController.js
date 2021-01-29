const bcrypt = require('bcryptjs')

module.exports = {
    register: async(req, res) => {
        const { firstName, lastName, email, password } = req.body
        const db = req.app.get('db')

        const [foundUser] = await db.auth.check_user({ email })
        if(foundUser){
            return res.status(400).send('There is already an account with that email')
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const [newUser] = await db.auth.register_user({ firstName, lastName, email, hash })

        req.session.user = newUser
        res.status(201).send(newUser)
    },
    login: async(req, res) => {
        const { email, password } = req.body
        const db = req.app.get('db')

        const [foundUser] = await db.auth.check_user({ email })
        if(!foundUser){
            return res.status(400).send('There is no account with that email')
        }

        const authenticated = bcrypt.compareSync(password, foundUser.password)
        if(!authenticated){
            return res.status(401).send('Password is incorrect')
        }

        delete foundUser.password
        req.session.user = foundUser
        res.status(202).send(foundUser)
    },
    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    }
}