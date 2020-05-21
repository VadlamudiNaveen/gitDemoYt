const express = require('express');
const app = express();
require('./routes')(app)
console.log("new branch is created");
app.listen(5000, () =>{
    console.log("listening on port 5000");
});