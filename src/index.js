const express = require("express")
const path = require("path")
const app = express()
    // const hbs = require("hbs")
const LogInCollection = require("./mongo")
const port = process.env.PORT || 3000
app.use(express.json())

app.use(express.urlencoded({ extended: false }))

const tempelatePath = path.join(__dirname, '../tempelates')
const publicPath = path.join(__dirname, '../public')
console.log(publicPath);

app.set('view engine', 'ejs')
app.set('views', tempelatePath)
app.use(express.static(publicPath))


// hbs.registerPartials(partialPath)


app.get('/signup', (req, res) => {
    res.render('signup')
})
app.get('/', (req, res) => {
    res.render('login')
})



// app.get('/home', (req, res) => {
//     res.render('home')
// })

app.post('/signup', async(req, res) => {

    // const data = new LogInCollection({
    //     name: req.body.name,
    //     password: req.body.password
    // })
    // await data.save()

    const data = {
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone

    }

    // const checking = await LogInCollection.findOne({ name: req.body.name })

    try {
        // console.log("hi")
        await LogInCollection.insertMany([data])
    } catch {
        res.send("wrong inputs")
    }

    res.status(201).render("index")
})


app.post('/login', async(req, res) => {

    try {
        const check = await LogInCollection.findOne({ name: req.body.name })

        if (check.password === req.body.password) {
            res.status(201).render("index")
                // console.log("before")
                // console.log("After")
        } else {
            res.send("incorrect password")
        }


    } catch (e) {

        res.send("wrong details")


    }


})



app.listen(port, () => {
    console.log('port connected');
})