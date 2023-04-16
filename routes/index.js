const express = require("express")
const path = require("path")

const app = express()


//app.verb (put)
app.put('/articles/:id', (req, res, next) => {
    const id = req.params.id

    console.log('Updating article', id)
    console.log('Atrributes', req.body)
})

app.use(express.static(__dirname + '/blog'))

//app.verb (get)
app.get('/blog/:slug.:format?', (req, res, next) => {
    const format = req.params.format;
    const slug = req.params.slug;

    switch(format) {
        case 'html':
            res.send(path.resolve(__dirname, 'blog', slug + '.' + format))
            break;
        case 'json':
            res.send(path.resolve(__dirname, 'blog', slug + '.' + format))
            break;
        default:
            res.send("404")
            break;
    }
})

//launch app
app.listen(80, () => {
    console.log("server started")
})