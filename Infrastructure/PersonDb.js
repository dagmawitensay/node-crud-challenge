const { v4: uuidv4 } = require('uuid');

class PersonDatabase {
    constructor() {
        this.validate = require('./validator');
        this.persons = [{
            id: '1',
            name: 'Sam',
            age: '26',
            hobbies: []    
        }]
    }
    
    getPersonById(id) {
        const person = this.persons.find(person => person.id === id);
        return person;
    }

    getAllPersons() {
        return this.persons;
    }

    createPerson(person) {
        this.validate(person);

        const id = uuidv4();
        const existingUser = this.persons.find(p => p.id === id);

        if (existingUser) {
            throw new Error('Person already exists');
        }

        person.id = id;

        this.persons.push(person);
    }

    updatePerson(personId, person) {
        this.validate(person);

        const existingUserId = this.persons.find(p => p.id === personId);

        if (existingUserId === -1) {
            throw new Error('Person not found');
        }

        this.persons[existingUserId] = person;
    }

    deletePerson(id) {
        const existingUserIndex = this.persons.findIndex(p => p.id === id);

        if (existingUserIndex === -1) {
            throw new Error('Person not found');
        }

        this.persons.splice(existingUserIndex, 1);
    }
}

module.exports = PersonDatabase