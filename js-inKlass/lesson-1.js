// Запропонуйте користувачу ввести число за допомогою prompt().
// Збережіть введене значення у змінну number.
// Перевірте, чи дорівнює змінна number числу 10:
//    Якщо так – виведіть повідомлення 'Вірно' у alert().
//    Якщо ні – виведіть 'Невірно'.

// Підказка: prompt завжди повертає рядок (String), тому перед перевіркою
// перетворіть значення на число за допомогою Number().

/* const number = Number(prompt("Виведи число"));
/* if (number === 10) {
  alert("Вірно");
} else {
  alert("Не вірно");
} */
/* alert(number === 10 ? "Вірно" : "Невірно"); */

// У змінній min лежить випадкове число від 0 до 59.
// Визначте, в яку чверть години потрапляє
// це число (у першу, другу, третю чи четверту).
// Виведіть в alert відповідне повідомлення, наприклад:
// "10 входить в першу чверть"

// const min = Math.floor(Math.random() * 59);

/* const min = Math.floor(Math.random() * 59);

if (min < 15) {
  alert("${min} входить в першу чверть");
} else if (min < 30) {
  alert("${min} входить в другу чверть");
} else if (min < 45) {
  alert("${min} входить в третю чверть");
} else "${min} входить в четверту чверть"; */

// 3
// Змінна num може набувати 4 значення: '1', '2', '3' або '4'
// (запитуй це значення у користувача через prompt).
// Якщо вона має значення '1', то у змінну result запишіть 'зима',
// якщо має значення '2' - 'весна' і так далі.
// Розв'яжіть завдання через switch-case.
// Не забудьте про дефолтне значення, на випадок, якщо користувач
// введе в prompt щось інше. В такому випадку result має набувати значення:
// "Вибачте, але ви маєте ввести значення від 1 до 4 включно".
// Значення змінної result виведіть в консоль.

/* const num = prompt("Введіть число від 1 - 4");
let result = "";

switch (num) {
  case "1":
    result = "зима";
    break;
  case "2":
    result = "Весна";
    break;
  case "3":
    result = "Літо";
    break;
  case "4":
    result = "Осінь";
    break;
  default:
    result = "Вибачте, але ви маєте ввести значення від 1 до 4 включно";
}
console.log(result); */

//4

// Отримуйте від користувача число (кількість хвилин) через prompt
// і виводьте у консоль рядок у форматі годин та хвилин.
// Приклад: користувач вводить в prompt '70' -> в консолі відобразиться '01:10'.
// Корисне посилання для відображення годин та хвилин у потрібному форматі ('01' замість '1'):
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart#examples

/* let value = Number(prompt("add number"));
let hour = Math.floor(value / 60);
let min = value % 60;

hour = String(hour).padStart(2, "0");
min = String(min).padStart(2, "0");

console.log(`${hour}:${min}`); */

//5
// Напишіть код, який запитуватиме у користувача
// логін за допомогою prompt і виводить результат в консоль браузера

// Після цього додайте перевірку введеного користувачем значення:
// Якщо відвідувач вводить "Адмін",
// то prompt запитує пароль (не забудьте зберігти його у змінну для подальшої перевірки).
// Якщо нічого не ввели або натиснули Cancel,
// Вивести в alert строку "Скасовано"
// В іншому випадку вивести в alert рядок "Я вас не знаю"

// Пароль перевіряти так:
// Якщо введено пароль "Я головний",
// то вивести в alert рядок "Добрий день!",
// в іншому випадку вивести в alert рядок "Невірний пароль!"

/* let login = prompt("Введіть логін:  ");
if (login === "Admin") {
  let password = prompt("Введіть пароль:");
  if (password === "Password") {
    alert("Hello!)");
  } else {
    alert("Who are y ?");
  }
} else if (login === null || login === "") {
  alert("canseled");
} else {
  alert("I don't cnow y !!!");
}

console.log(login); */

//6
// Використайте цикл while, щоб вивести в console всі числа від 0 до 20 включно.

//7
// Напишіть функцію getNumbers(min, max), що приймає 2 параметри -
// мінімальне і максимальне число відповідно.
// Напишіть цикл всередині функції, який виводить у консоль
// всі числа від max до min за спаданням.
// Окрім цього, підрахуйте суму всіх парних чисел в цьому циклі
// і поверніть її з функції.

/* function getNumbers(min, max) {
  if (typeof min !== "number" || typeof max !== "number") {
    return "Not a Number!";
  }
  let sum = 0;
  for (let i = max; i >= min; i--) {
    console.log(i);
    if (i % 2 === 0) {
      sum += i;
    }
  }
  return sum;
}
console.log(getNumbers(1, 10));
console.log(getNumbers(12, 20));
console.log(getNumbers("1", 10));
 */
//8
// Напишіть функцію min(a, b), яка приймає 2 числа і повертає меньше з них.
// Потрібно додати перевірку, що функція отримує саме числа, в іншому випадку
// повертати з функції рядок - 'Not a number!'.
/* function min(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    return "Not a Number!";
  }
  /*  return (a, b ? a : b); */
//return Math.min(a, b);
//}
//console.log(min(2343, 101)); */

//9
// Напишіть функцію isAdult(age), яка  приймає число - вік користувача і повертає true,
// якщо параметр age більше чи дорівнює 18.
// В іншому випадку вона запитує підтвердження через confirm
// і повертає його результат (true/false).

/* function isAdult(age) {
  /* if (age >= 18) {
    return true;
  } else {
    return confirm(`Вам дійсно 18 ? `);
  }
  return age >= 18 || confirm(`Вам дійсно 18 ?`);
}
console.log(isAdult(23));
console.log(isAdult(12));
 */
//10
// Напишіть функцію fizzBuzz(num), яка приймає число і перевіряє кожне число від 1 до num:
// Якщо число ділитися  без остачі на 3 - виводить в консоль 'fizz',
// якщо ділиться  без остачі на 5 - виводить в консоль 'buzz',
// якщо ділиться  без остачі і на 3, і на 5 - виводить в консоль 'fizzbuzz'.

/* function fizzBuzz(num) {
  for (let index = 1; index <= num; index++) {
    if (index % 3 === 0 && index % 5 === 0) {
      console.log("fizzbuzz");
    } else if (index % 3 === 0) {
      console.log("fizz");
    } else if (index % 5 === 0) {
      console.log("buzz");
    } else {
      console.log(index);
    }
  }
}
/* fizzBuzz(12);
fizzBuzz(15);

fizzBuzz(45); */
