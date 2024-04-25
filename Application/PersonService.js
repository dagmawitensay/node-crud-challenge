class PersonService {
    constructor(personsDatabase) {
        this.personsDatabase = personsDatabase;
    }

    getPersonById(id) {
        const person = this.personsDatabase.getPersonById(id);
        if (!person) {
            throw new Error('Person not found');
        }

        return person;
    }

    getAllPersons() {
        return this.personsDatabase.getAllPersons();
    }

    savePerson(person) {
        return this.personsDatabase.createPerson(person);
    }

    updatePerson(personId, person) {
        this.personsDatabase.updatePerson(personId, person);
    }

    deletePerson(id) {
        this.personsDatabase.deletePerson(id);
    }
}

module.exports = PersonService;