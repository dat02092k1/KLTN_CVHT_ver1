var express = require('express');
var app = express();
var mongoose = require('mongoose');
app.use(express.json());

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
    
app.listen(PORT, (err) => {
    if (err) console.log('error');
    else console.log(`server listening on ${PORT}`);
})

