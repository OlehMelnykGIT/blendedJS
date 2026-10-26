// Створіть масив styles з елементами 'jazz' і 'blues'
// Додайте до кінця масиву елемент 'rock-n-roll' за допомогою відповідного методу масивів
// Знайдіть елемент 'blues' у масиві та замініть його на 'classic', використовуючи JavaScript-код

// import { $ } from "./common";

// Напишіть функцію logItems(array), яка приймає масив як аргумент
// і виводить у консоль кожен його елемент у форматі:
// "<номер елемента> - <значення елемента>".
// Використайте цикл for для перебору елементів масиву.
// Нумерація елементів повинна починатися з 1 (а не з 0).

const styles = ["jazz", "blues"];
styles.push("rock-n-roll");

const index = styles.indexOf("blues");
if (index !== -1) {
  styles[index] = "classic";
}
/* console.log(styles); */

function logItems(array) {
  for (let i = 0; i < array.length; i++) {
    console.log(`${i + 1} - ${array[i]}`);
  }
}
//Перший варіант більш гнучкіший для роботи з індексами та доступами до них.

//Або

for (const style of styles) {
  /* console.log(style); */
}
/* logItems(styles); */

//2

// Напишіть функцію checkLogin(array), яка:
// Приймає масив логінів як аргумент.
// Запитує ім'я користувача через prompt.
// Перевіряє, чи є введене ім'я у переданому масиві.
// Якщо ім'я є в масиві – виводить повідомлення через alert: "Welcome, <name>!"
// Якщо ім'я відсутнє – виводить повідомлення: "User not found".

const logins = ["Peter", "John", "Igor", "Sasha"];

function checkLogin(array) {
  const login = prompt("what is y name ?");
  for (const name of array) {
    if (name === login) {
      alert(`Welcome, ${name}!`);
      return;
    }
    alert("User not found");
  }
  // Другий варіант найкраще підходить для виконання даної задачі

  /* const login = prompt("what is login ?");
  if (array.includes(login)) {
    alert(`Welcome, ${login}!`);
  } else {
    alert(`User not found!`);
  } */
}
/* checkLogin(logins); */

//3

// Напишіть функцію caclculateAverage(),
// яка приймає довільну кількість
// аргументів і повертає їхнє середнє значення.
// Додайте перевірку, що аргументи - це числа.

function caclculateAverage(...args) {
  let sum = 0;
  let count = 0;
  for (let i = 0; i < args.length; i++) {
    if (typeof args[i] === "number") {
      sum += args[i];
      count++;
    }
  }
  return sum / count || 0;
}
/* console.log(caclculateAverage(1, 2, 3));
console.log(caclculateAverage("2", 2, 3));
console.log(caclculateAverage("1", "2", "3")); */

//4
// Напишіть функцію, яка сумуватиме сусідні числа
// і пушитиме їх в новий масив.

// const someArr = [22, 11, 34, 5, 12, 13, 14, 15];

// уточнення: складати необхідно перше число з другим, потім друге - з третім,
// третє - з четвертим і так до кінця.
// В результаті функція має повертати масив [33, 45, 39, 17, 25, 27, 29].

const someArr = [22, 11, 34, 5, 12, 13, 14, 15];

function pushSome(array) {
  const result = [];
  for (let i = 0; i < array.length - 1; i++) {
    result.push(array[i] + array[i + 1]);
  }
  return result;
}

//console.log(pushSome(someArr));

//5

// Напишіть функцію findSmallestNumber(numbers),
// яка шукає найменше число в масиві.
// Додайте перевірку, що функція отримує саме масив, і
// якщо функція отримує масив - поверніть з функції найменше число,
// в іншому випадку - поверніть 'Sory, it is not an array!'.

// const numbers = [2, 5, 35, 56, 12, 24, 7, 80, 3];

const numbers = [2, 5, 35, 56, 12, 24, 7, 80, 3];
function findSmallestNumber(numbers) {}

/* 6
Напишіть функцію findLongestWord(string), яка
приймає довільний рядок, що складається лише зі слів, розділених
пробілами (параметр string), і повертатиме найдовше слово у реченні.

Скористайтесь цим прикладом виклику функції для перевірки її роботи:
console.log(findLongestWord("London is the capital of Great Britain")); // 'capital'
 */

/* 7
Напишіть скрипт, який для об'єкту user, послідовно:
1 - додасть поле mood зі значенням 'happy',
2 - замінить hobby на 'skydiving',
3 - замінить значення premium на false,
4 - виведе зміст об'єкта user у форматі
'<ключ>:<значення>' використовуя Object.keys() та for...of

 const user = {
    name: "John",
    age: 20,
    hobby: "tenis",
    premium: true,
  }; */

/* const user = {
  name: "John",
  age: 20,
  hobby: "tenis",
  premium: true,
};

user.mood = "happy";
user.hobby = "skydiving";
user.premium = false;

const userKeys = Object.keys(user);
for (const key of userKeys) {
  console.log(`${key} : ${user[key]}`);
} */

/* const arrs = Object.entries(user);
//console.log(arrs);
for (const arr of arrs) {
  console.log(`${arr[0]} : ${arr[1]}`);
} */

/* Існує 3 варіанти звернення до елемента обєкту
//1
console.log(user.name);
//2
console.log(user["name"]);
//3
const key = 'name';
console.log(user[key]); */

/* //8
Є об'єкт, в якому зберігаються зарплати команди
Напишіть код для додавання усіх зарплат та
збережіть його результат в змінній sum.
Якщо об'єкт salaries пустий, то результат має бути 0

const salaries = {
    Mango: 100,
    Poly: 160,
    Ajax: 1470,
  }; */

/* const salaries = {
  Mango: 100,
  Poly: 160,
  Ajax: 1470,
};

let sum = 0;
const allSalary = Object.values(salaries);
for (const salary of allSalary) {
  sum + -salary;
}

console.log(sum); */

/* 9
Створіть об'єкт calculator з наступними методами:
read(a, b) - приймає два аргумента і зберігає їх як властивості об'єкта,
sum() - повертає сумму збереженних значень (з перевіркою на наявність властивостей в об'єкті),
mult() - перемножає збереженні значення і повертає результат (з перевіркою на наявність властивостей в об'єкті),
винесіть перевірку на наявність властивостей в об'єкті в окремий метод exist().

Якщо вказані властивості в обʼєкті відсутні (тобто метод exist повертає false),
методи sum і mult мають повертати рядок 'No such propeties'
 */

const calculator = {
  read(a, b) {
    this.num1 = a;
    this.num2 = b;
  },
  sum() {
    if (this.exist()) {
      return this.num1 + this.num2;
    }
    return `No such propeties`;
  },
  mult() {
    if (this.exist()) {
      return (this.num1 = this.num2);
    }
    return `No such propeties`;
  },
  exist() {
    return this.num1 !== undefined && this.num2 !== undefined ? true : false;
  },
};
// console.log(calculator);
// calculator.read(5, 7);
// console.log(calculator.sum());

/* 10
Напишіть функцію calcTotalPrice(fruits, fruitName),
яка приймає массив об'єктів (fruits) і рядок з назвою фрукта (fruitName).
Функція рахує і повертає загальну вартість фрукта
з таким ім'ям, ціною та кількістю з об'єкта.

Зверніть увагу, що в масиві може бути кілька обʼєктів з однаковою
назвою фрукта, це також треба урахувати.
*/
const fruits = [
  { name: "Яблуко", price: 45, quantity: 7 },
  { name: "Апельсин", price: 60, quantity: 4 },
  { name: "Банан", price: 125, quantity: 8 },
  { name: "Груша", price: 350, quantity: 2 },
  { name: "Виноград", price: 440, quantity: 3 },
  { name: "Банан", price: 125, quantity: 3 },
];

function calcTotalPrice(fruits, fruitName) {
  let totalPrice = 0;
  for (const fruit of fruits) {
    if (fruit.name === fruitName) {
      totalPrice += fruit.price * fruit.quantity;
    }
  }
  return totalPrice;
}
