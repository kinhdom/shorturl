const express = require('express');
const bodyParser = require('body-parser');
const level = require('level');
const ejs = require('ejs');
const shortid = require('shortid');
const db = level('./db')
const app = express()
app.listen(3000, () => {
    console.log('Running')
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs');
app.set('views', './views')

app.get('/', (req, res) => {
    console.log('999999')
    res.render('home', { msg: 'Hello' })
})
app.get('/:id', (req, res) => {

    let id = req.params.id
    db.get(id, (err, url) => {
        // res.json({ url: url })
        res.setHeader('Location', url)
        res.statusCode = 301
        res.end('404')
        // res.render('home', { msg: url })
    })
    console.log('get ' + id)
})

app.post('/', (req, res) => {
    let id = shortid.generate()
    let url = req.body.url
    db.put(id, url, (err) => {
        if (err) {
            console.log('loi cmnr')
            return 0;
        }
        res.render('home', { msg: id })
    })

})