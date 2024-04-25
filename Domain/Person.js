class Person {
    constructor(name, age, hobbies = [], id = -1) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.hobbies = hobbies;
    }  
}

module.exports = Person;