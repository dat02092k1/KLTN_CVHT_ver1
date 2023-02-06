var express = require('express');
var app = express();
var mongoose = require('mongoose');
var student = require('./routes/students/students');
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
app.use("/", student);

app.listen(PORT, (err) => {
    if (err) console.log('error');
    else console.log(`server listening on ${PORT}`);
})

