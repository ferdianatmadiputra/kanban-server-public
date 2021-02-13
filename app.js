if (process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

const cors = require('cors');
const express = require('express');
const index = require('./routes/index.js');
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json())
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/', index);

app.listen(port, ()=> {
    console.log('port:', port);
})