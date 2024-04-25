const validate = (person) => {
    if (!person) {
        throw new Error('User Data is required');
    }

    if (!person.name) {
        throw new Error('Name is required');
    }

    if (!person.age) {
        throw new Error('Age is required');
    }

    if (!(typeof person.age === 'number')) {
        throw new Error('Age must be a number');
    }

    if (!person.hobbies) {
        throw new Error('Hobbies are required');
    }

    if (!Array.isArray(person.hobbies)) {
        throw new Error('Hobbies must be an array');
    }

    if (person.hobbies.length === 0) {
        throw new Error('At least one hobby is required');
    }
}

module.exports = validate;