const { v4: uuidv4 } = require('uuid');

class PersonDatabase {
    constructor(database) {
        this.persons = database;
    }
    
    getPersonById(id) {
        const person = this.persons.find(person => person.id === id);
        return person;
    }

    getAllPersons() {
        return this.persons;
    }

    createPerson(person) {
        const id = uuidv4();
        const existingUser = this.persons.find(p => p.id === id);

        if (existingUser) {
            throw new Error('Person already exists');
        }

        person.id = id;

        this.persons.push(person);
        return person;
    }

    updatePerson(personId, person) {

        const existingUserIndex = this.persons.findIndex(p => p.id === personId)

        if (existingUserIndex === -1) {
            throw new Error('Person not found');
        }
        person.id = personId;

        this.persons[existingUserIndex] = person;
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