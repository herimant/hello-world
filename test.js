// Задание 6.1

// console.log("---Проверка на палиндром---");

// // ИЗМЕНЯЕМ СТРОКУ ЗАПРОСА НА АНГЛИЙСКУЮ:
// let inputString = readlineSync.question("Input: "); // <--- ВОТ ИЗМЕНЕНИЕ

// if (inputString === null || inputString.trim() === "") {
//     console.log("Вы не ввели строку или строка пуста.");
// } else {

//     let normalizedString = inputString.toLowerCase().replace(/[^a-zа-яё0-9]/g, "");

//     if (normalizedString.length === 0) {
//         console.log(`Строка "${inputString}" после обработки не содержит букв или цифр и не является палиндромом.`);
//     } else {
//         let reversedString = normalizedString.split("").reverse().join("");
//         if (normalizedString === reversedString) {
//             console.log(`Фраза "${inputString}" является палиндромом.`);
//         } else {
//             console.log(`Фраза "${inputString}" не является палиндромом.`);
//         }
//     }
// }

// Задание 6.2 Исходный массив
// const arr = [1, 2, 3, 1, 5, 4, 2, 3, 5, 'they', 'don\'t', 'know', 'that', 'we', 'know', 'that', 'they', 'know' ];
// //  Создаем Set из массива. 
// const uniqueValuesSet = new Set(arr);
// //  Преобразуем Set обратно в массив.
// const uniqueArr = Array.from(uniqueValuesSet);
// console.log(uniqueArr);

// Задание 6.3
// //  Запросить число у пользователя с помощью prompt()
// let userInput = prompt("Пожалуйста, введите целое неотрицательное число:");
// //  Привести полученное значение к типу number
// let limitNumber = +userInput;
// // Проверяем, что это не NaN (если пользователь ввел не число) и не отрицательное число
// if (isNaN(limitNumber) || limitNumber < 0) {
//     // Если введены некорректные данные
//     console.log("Введены некорректные данные. Пожалуйста, введите неотрицательное число.");
// } else {
//     //  Создаем новый пустой массив
//     const resultArray = [];
//     //  Заполнить массив числами от 0 до limitNumber включительно
//     // Используем цикл for
//     for (let i = 0; i <= limitNumber; i++) {
//         // Добавляем текущее число i в конец массива
//         resultArray.push(i);
//     }
//     //  Вывести получившийся массив в консоль
//     console.log(resultArray);
// }

// Задание 6.4
// console.log("--- Крестики-нолики ---");
// for (let i = 0; i < 3; i++) {
//   let row = ''; // Создаем пустую строку для текущей строки поля
//   // Внутренний цикл для перебора столбцов в текущей строке (от 0 до 2)
//   for (let j = 0; j < 3; j++) {
//     // Проверяем четность или нечетность суммы индексов строки (i) и столбца (j)
//     if ((i + j) % 2 === 0) {
//       // Если сумма индексов четная, добавляем 'x'
//       row += 'x';
//     } else {
//       // Если сумма индексов нечетная, добавляем 'o'
//       row += 'o';
//     }
//     // Добавляем пробел после символа, если это не последний символ в строке
//     if (j < 2) {
//       row += ' ';
//     }
//   }
//   console.log(row);
// }

// Задание 6.5
const obj = {
    some: 'some',
    dom: 'text',
    arr: [1, 2, 3, 4, 5],
    tom: 'there'
};
//  Новый пустой массив для сбора значений
const arrValues = [];
const values = Object.values(obj);
//  Берем каждое значение из полученного массива значений
for (const value of values) {
    //  Является ли текущее значение массивом
    if (Array.isArray(value)) {
        // Если value - это массив, добавляем ВСЕ его элементы по отдельности в arrValues
        // Используем оператор расширения (...), который "разворачивает" массив value в отдельные аргументы для push()
        arrValues.push(...value);
    } else {
        // Если value - это не массив (строка, число и т.д.), просто добавляем само значение в arrValues
        arrValues.push(value);
    }
}
console.log(arrValues);