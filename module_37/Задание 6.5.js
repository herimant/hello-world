const obj = {
    some: 'some',
    dom: 'text',
    arr: [1, 2, 3, 4, 5],
    tom: 'there'
};

const arrValues = [];

for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
        const value = obj[key];
    if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
            arrValues.push(value[i]);
        }
    } else {
        arrValues.push(value);
    }
}
}

console.log(arrValues);