if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const routeIndex = require('./routes/index')
const mongoose = require('mongoose');

const app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use('/', routeIndex);

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => console.log('Connected to Mongoose'));


app.listen(process.env.PORT || 3000);