function calculate(a, b, operator) {
    switch (operator) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            return a / b;
        default:
            return NaN;
    }
}

const args = [2, 3, "+"];
const result = calculate.apply({ a: 2, b: 3, operator: "+" }, args);
console.log(result); 