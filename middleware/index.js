const express = require('express')
const session = require('express-session')
const app = express()
const restrictAccess = require('./middleware')
const logger = require('morgan')
app.use(restrictAccess)

//static file service middleware
app.use('/public', express.static(__dirname + '/public'))

//customizable sesion middleware
app.use(session({
    secret: 'ecl39cklcxk329cklje8',
    key: 'session_id',
    cookie: {
        secure: true
    }
}))

//routing process middleware
app.use('/admin', logger("dev", { immediate: true }))
app.use('/admin', function(req, res, next) {
    req.isAdmin = true
    next()
})

app.use(function(req, res) {
    if(req.isAdmin) {
        res.send("Hello Admin")
    }
    else {
        res.send("Hello")
    }
})

app.listen(7777, function() {
    console.log("Server is running on port 7777");
    console.log("App process ID is: %s", process.pid)
})