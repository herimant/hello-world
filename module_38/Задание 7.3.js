const users = [
    { name: "Иван", age: 20 },
    { name: "Мария", age: 17 },
    { name: "Петр", age: 25 },
    { name: "Анна", age: 16 }
];

const adults = users.filter(user => user.age >= 18);

const names = adults.map(user => user.name);

console.log(names); 