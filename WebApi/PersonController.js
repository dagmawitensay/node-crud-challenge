const express = require('express');
const bodyParser = require('body-parser');
const PersonDatabase = require('../Infrastructure/PersonDb');
const PersonService = require('../Application/PersonService');

const app = express();

app.use(bodyParser.json());

const personDatabase = new PersonDatabase();
const personService = new PersonService(personDatabase);


app.get('/person', (req, res) => {
    const persons = personService.getAllPersons();
    res.json(persons);
});

app.get('/person/:personId', (req, res) => {
    const { personId } = req.params;

    try {
        const person = personService.getPersonById(personId);
        res.json(person);
    } catch(error) {
        res.status(404).send({error: error.message});
    }
});

app.post('/person', (req, res) => {
    const personData = req.body;
    
    try {
        personService.savePerson(personData);
        res.status(201).send();
    } catch(error) {
        res.status(400).send({error: error.message});
    }
});

app.patch('/person/:personId', (req, res) => {
    const { personId } = req.params;
    const personData = req.body;
    
    try {
        personService.updatePerson(personId, personData);
        res.status(204).send();
    } catch(error) {
        res.status(400).send({error: error.message});
    }
});

app.delete('/person/:personId', (req, res) => {
    const { personId } = req.params

    try {
        personService.deletePerson(personId);
        res.status(204).send();
    } catch(error) {
        res.status(404).send({error: error.message});
    }
});

app.all("*", (req, _, next) => {
    next(new AppError(`Path ${req.originalUrl} does not exist for ${req.method} method`, 404));
  });

module.exports = app;