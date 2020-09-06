const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./Controllers/register');
const signin = require('./Controllers/signin');
const profile = require('./Controllers/profile');
const image = require('./Controllers/image');


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'Alfred',
    password : '',
    database : 'facerecognition'
  }
});

db.select('*').from('users').then(data => {
	console.log(data);
});

const app = express();
app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => { res.send(database.users) })

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { { profile.loadProfile(req, res, db) } })

app.put('/image', (req, res) => { { image.loadImage(req, res, db) }})

app.post('/imageurl', (req, res) => { { image.handleApiCall(req, res) }})

app.listen(process.env.PORT || 3000, () => {
	console.log('wapp is running on port ${process.env.PORT}');
})



