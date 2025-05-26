function setFullName(fullName) {
    this.fullName = fullName;
}

const person = {
    name: "Иван",
    age: 30
};

const setPersonFullName = setFullName.bind(person);

setPersonFullName("John Smith");

console.log(person.fullName); // "John Smith"