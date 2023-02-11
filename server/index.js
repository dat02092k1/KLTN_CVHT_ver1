var express = require('express');
var app = express();
var mongoose = require('mongoose');
require('dotenv').config();
var student = require('./routes/students/students');
var register = require('./routes/auth/register.js');
var login = require('./routes/auth/login.js');
var token = require('./routes/auth/token.js');
var post = require('./routes/posts/post.js');

var cookieParser = require('cookie-parser');

var cors = require('cors');


const PORT = process.env.PORT || 8000;
const dbUrl = "mongodb://localhost:27017/CVHT_database";

mongoose
.connect(dbUrl, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
    },
    (err) => {
        if (err) console.log('error');
        else console.log('db connected');
    })

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/", student);  
app.use("/", register);
app.use("/", login);       
app.use("/", post); 

app.listen(PORT, (err) => {
    if (err) console.log('error');
    else console.log(`server listening on ${PORT}`);
})

