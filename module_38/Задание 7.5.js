function getUniqueSortedArray(numbers) {
    return [...new Set(numbers)].sort((a, b) => a - b);
}

const numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
console.log(getUniqueSortedArray(numbers)); 