const word = 'Довод'; // Сантимент //
if (word.toLowerCase() === word.toLowerCase().split('').reverse().join('')) {
    console.log(`Cлово "${word}" является палиндромом`);
} else {
    console.log(`Cлово "${word}" не является палиндромом`);
}