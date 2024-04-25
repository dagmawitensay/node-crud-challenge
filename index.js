const express = require('express');
const bodyParser = require('body-parser');
const setupPersonController = require('./WebApi/PersonController');
var cors = require('cors');


const app = express();
app.use(cors({
    origin: 'http://localhost:3000'
  }
))

let persons = [{
    id: '1',
    name: 'Sam',
    age: '26',
    hobbies: []    
}] //This is your in memory database

app.set('db', persons)

//TODO: Implement crud of person
app.use(bodyParser.json());

setupPersonController(app);

PORT = 3000

if (require.main === module) {
    app.listen(3000)
    console.log("server running on port 3000")
}

module.exports = app
