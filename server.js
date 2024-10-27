const express = require('express')
const app = express()
const port = 3000

const user = []

const bcrypt = require("bcrypt");
const passport = require('passport');


const initializePassport = require('./passport-config')

initializePassport(
    passport,
    email => { user.find(user => user.email === email)
    })

app.set('view-engine', 'ejs')
app.use(express.urlencoded({
    extended: false
}))

app.get('/', (req, res) => {
    res.render('index.ejs', {
        name: "kale"
    })
})

app.get('/login', (req, res) => {
    res.render('login.ejs', {
        name: "kale"
    })
})
app.post('/login', (req, res) => {

})

app.get('/register', (req, res) => {
    res.render('register.ejs', {
        name: "kale"
    })
})

app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        user.push({
            id: Date.now().toString(),
            email: req.body.email,
            name: req.body.name,
            password: hashedPassword

        })

        res.redirect('/login')
    } catch (error) {
        res.redirect('/register')
    }

    console.log(user);

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))