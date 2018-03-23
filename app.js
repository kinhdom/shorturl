const express = require('express');
const bodyParser = require('body-parser');
const level = require('level');
const ejs = require('ejs');
const shortid = require('shortid');
const path = require('path');

const db = level('./db')
const app = express()
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Running on port ' + port)
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs');
app.set('views', './views')

app.get('/', (req, res) => {
    res.render('home', { msg: '' })
})
app.get('/:id', (req, res) => {
    let id = req.params.id
    db.get(id, (err, url) => {
        res.setHeader('Location', url)
        res.statusCode = 301
        res.end('404')
    })
})

app.post('/', (req, res) => {
    if (req.body.id) {
        var id = req.body.id
    } else {
        var id = shortid.generate()
    }
    let url = req.body.url
    console.log(req.body)
    db.put(id, url, (err) => {
        if (err) {
            return res.render('home', { msg: 'Fail' })
        }
        res.render('home', { msg: 'http://localhost:' + port + '/' + id })
    })
})