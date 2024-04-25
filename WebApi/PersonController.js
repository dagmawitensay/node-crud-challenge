const bodyParser = require('body-parser');
const PersonDatabase = require('../Infrastructure/PersonDb');
const PersonService = require('../Application/PersonService');
const Person = require('../Domain/Person');

function setupPersonController(app) {
    const validate = require('./validator');
    
    app.use(bodyParser.json());
    const persons = app.get('db')

    const personDatabase = new PersonDatabase(persons);
    const personService = new PersonService(personDatabase);


    app.get('/person', (req, res) => {
        const allPersons = personService.getAllPersons();
        res.json(allPersons);
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
            validate(personData);
            const {name, age, hobbies } = personData;
            const person = {
                name,
                age,
                hobbies
            }
            const createdPerson = personService.savePerson(person);
            res.status(200).json(createdPerson);
        } catch(error) {
            res.status(400).send({error: error.message});
        }
    });

    app.put('/person/:personId', (req, res) => {
        const { personId } = req.params;
        const personData = req.body;
        
        try {
            validate(personData)
            const {name, age, hobbies } = personData;
            const person = {
                name,
                age,
                hobbies
            }

            personService.updatePerson(personId, person);
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
        const err = new Error(`Path ${req.originalUrl} does not exist for ${req.method} method`);
        err.statusCode = 404;
        next(err);
    });   

    app.use((err, req, res, next) => {
        res.status(err.statusCode || 500).send({ error: err.message });
    });
}

module.exports = setupPersonController;