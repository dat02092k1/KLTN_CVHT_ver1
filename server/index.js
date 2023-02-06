var express = require('express');
var app = express();

app.use(express.json());

const PORT = process.env.PORT || 8000;
app.listen(PORT, (err) => {
    if (err) console.log('error');
    else console.log(`server listening on ${PORT}`);
})

