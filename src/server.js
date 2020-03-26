import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

const app = express();

//Connect to Database
const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/demo';
const options = {useNewUrlParser: true, useCreateIndex:true};

mongoose.connect(uri, options)
    .then(
        () => {console.log('Connect Database')},
        err => {console.log(err)}
    );

//Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Routes
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/user'));

// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), () => {
  console.log('Puerto: '+ app.get('puerto'));
});

