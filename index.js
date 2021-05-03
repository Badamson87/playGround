// import connection from './dbConnection';
const connection = require('./dbConnection');
var express = require('express')
var app = express()
app.use(express.static('public'))
app.use(express.urlencoded({
    extended: true
}))
app.listen(3000)

app.get('/', function(req, res) {
    res.send('Hello Sir')
})

app.get('/home', function(req, res) {
    res.send('home route')
})

app.get('/signup', function(req, res) {
    res.sendFile(__dirname + '/signup.html')
})

app.get('/users', function(req, res) {
    res.sendFile(__dirname + '/users.html')
})

app.post('/signup', function(req, res) {
    const user = {name: req.body.name};
    connection.query('INSERT INTO user SET ?', user, (err,rows) => {
        if(err) throw err;
        res.redirect( '/users')
    });
})

app.get('/api/v1/users', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    connection.query('SELECT * FROM user', (err,rows) => {
        if(err) throw err;
        res.send(rows);
    });
})

app.delete('/api/v1/users/:id', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    const id = req.params.id;
    connection.query('DELETE FROM user WHERE id = ?', id, (err,rows) => {
        if(err) throw err;
        res.send(rows);
    });
})
