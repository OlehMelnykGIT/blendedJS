//!SECTION - 1HW
/*
Дано масив чисел [1, 2, 3, 4, 5]. Створіть новий масив, що містить
квадрати кожного елементу вхідного масиву.
Очікуваний результат: [1, 4, 9, 16, 25].
*/
/* const numbers = [1, 2, 3, 4, 5];
//1 Metod
const dubleNumbers = numbers.map((number) => {
  return number ** 2;
});
const dubleNumbers = numbers.map((number) => number ** 2);
console.log(dubleNumbers);
*/
//2 Metod
const numbers = [1, 2, 3, 4, 5];

/* const getDoubleNumbers = (array) => {
  return array.map((el) => {
    return el ** 2;
  });
}; */

// const getDoubleNumbers = (array) => array.map((el) => el ** 2);
// console.log(getDoubleNumbers(numbers));
// console.log(getDoubleNumbers([2, 12, 34, 321, 11]));

//!SECTION - 2 HW
/* Дано масив об'єктів. Створіть новий масив, що містить всі значення
з масивів values кожного об'єкту, збережених в одному масиві.
Очікуваний результат: [1, 2, 3, 4, 5, 6, 7, 8, 9].
 */
const data = [
  { id: 1, values: [1, 2, 3] },
  { id: 2, values: [4, 5, 6] },
  { id: 3, values: [7, 8, 9] },
];
//NOTE - 1 metod
/*
const valueData = data.flatMap((element) => {
  element.values;
});
console.log(valueData);
*/

//NOTE - 2 metod
/* const valueData = (array) => array.flatMap((element) => element.values);
console.log(valueData(data)); */

//!SECTION - 3 HW

/* Дано масив об'єктів.
Перевірте, чи є хоча б один об'єкт з віком менше 20 років.
Очікуваний результат: true.
 */
const people = [
  { name: "John", age: 27 },
  { name: "Jane", age: 31 },
  { name: "Bob", age: 19 },
];

//NOTE - 1 metod
/* const ageUnder = people.some((person) => person.age < 20);
console.log(ageUnder); */

//NOTE - 2 metod
/* const ageUnder = (array) => array.some((person) => person.age < 20);
console.log(ageUnder(people)); */

//!SECTION 4 HW

/* Дано масив чисел [2, 4, 6, 8, 10].
Перевірте, чи є кожен елемент масиву парним. Очікуваний результат: true.
 */

const numBers = [2, 4, 6, 8, 10];

//NOTE - 1 metod
/* const evenNum = numBers.every((numBers) => numBers % 2 === 0);
console.log(evenNum); */

//NOTE - 2 metod
/* const evenNum = (array) => array.every((numBers) => numBers % 2 === 0);
console.log(evenNum(numBers)); */

//!SECTION 5 HW

/* Знайдіть перше непарне число */

const numbErs = [2, 1, 6, 8, 9, 10, 12];

//NOTE - 1 metod
const findNumber = numbErs.find((el) => el % 2 === 0);
const getFindNumber = (arry) => {
  return numbErs.find((el) => {
    return el % 2 === 0;
  });
};

//console.log(getFindNumber(numbErs));

//NOTE - 2 metod

//!SECTION 6 HW

/* Відсортуйте масив чисел [4, 2, 5, 1, 3]
у порядку зростання. Очікуваний результат: [1, 2, 3, 4, 5].
 */
const numbersArray = [4, 2, 5, 1, 3];

//NOTE - 1 metod
const sortNum = numbersArray.toSorted((a, b) => a - b);

//NOTE - 2 metod
const getSotredNum = (arry) => {
  return numbersArray.toSorted((a, b) => {
    return a - b;
  });
};

// console.log(sortNum);
// console.log(getSotredNum(numbersArray));

//!SECTION 7 HW

/* Відсортуйте масив рядків ["banana", "orange", "apple", "pear"]
 у порядку алфавіту.
Очікуваний результат: ["apple", "banana", "orange", "pear"].
 */
const stringArray = ["banana", "orange", "apple", "pear"];

//NOTE - 1 metod
const stringCompare = stringArray.toSorted((a, b) => a.localeCompare(b));

//NOTE - 2 metod
const getStringCompare = (array) => {
  return stringArray.toSorted((a, b) => {
    return a.localeCompare(b);
  });
};
// console.log(stringCompare);

// console.log(getStringCompare(stringArray));

//!SECTION 8 HW
/*  Відсортуйте масив об'єктів за віком у порядку зростання.
Очікуваний результат: [{name: "Bob", age: 19}, {name: "John", age: 27}, {name: "Jane", age: 31}].
*/
const users = [
  { name: "John", age: 27 },
  { name: "Jane", age: 31 },
  { name: "Bob", age: 19 },
];

//NOTE - 1 metod
const newSort = users.toSorted((user1, user2) => user1.age - user2.age);

//NOTE - 2 metod
const sortBy = (people) =>
  people.toSorted((user1, user2) => user1.age - user2.age);

//
// console.log(newSort);
// console.log(sortBy(users));

//!SECTION 9 HW
/* Дано масив об'єктів.
Створіть новий масив, що містить тільки об'єкти, в яких
вік більше 20 років.
Очікуваний результат: [{name: "John", age: 27}, {name: "Jane", age: 31}]
 */
const user = [
  { name: "John", age: 27 },
  { name: "Jane", age: 31 },
  { name: "Bob", age: 19 },
];
//NOTE - 1 metod
const filtUser = user.filter((us) => us.age > 20);

//NOTE - 2 metod
const getFiltUser = (people) => people.filter((us) => us.age > 20);

//
// console.log(filtUser);
// console.log(getFiltUser(user));

//!SECTION  10 HW
/*  Дано масив чисел [1, 2, 3, 4, 5].
Застосуйте метод для обчислення суми елементів масиву. */

const nUmbers = [1, 2, 3, 4, 5];

//NOTE - 1 metod

//NOTE - 2 metod

//TODO - Пояснення про класи від викладача
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.hobbies = [];
  }
  getInfo() {
    return ` I'm ${this.name}, I have ${this.hobbies.length} hobbies :)`;
  }
  addHobby(newHobby) {
    this.hobbies.push(newHobby);
  }
}
const user1 = new User("Alex", 23);
user1.addHobby("reading");
// console.log(user1.getInfo());
// console.log(user1);

const user2 = new User("Mariia", 24);
// console.log(user2.getInfo());
// console.log(user2);

//!SECTION 11 HW
/* Розроби клас Calculator, який дозволяє виконувати арифметичні
  операції над числом за допомогою методів класу, підтримуючи
ланцюжковий виклик (method chaining).

Вимоги до класу Calculator
- Метод number(value)
Встановлює початкове значення для наступних обчислень.
Повертає сам об'єкт (this) для підтримки ланцюжкових викликів.
- метод getResult, Повертає поточний результат усіх операцій.
Не змінює значення, просто повертає його.
- метод add - Додає value до поточного значення.
Повертає сам об'єкт (this) для підтримки ланцюжкових викликів.
- метод subtract - Віднімає value від поточного значення. Повертає this.
- метод divide - Ділить поточне значення на value, якщо value не дорівнює 0.
Якщо value === 0, викидає помилку з повідомленням про неможливість ділення.
Повертає сам об'єкт (this) для підтримки ланцюжкових викликів.
- метод multiply -Множить поточне значення на value. Повертає this.
Об'єкт класу може проводити послідовні операції у вигляді ланцюжка
 */
//NOTE - 1 metod
class Calculator {
  constructor() {
    this.result = 0;
  }
  number(value) {
    this.result = value;
    return this;
  }
  getResult() {
    return this.result;
  }
  add(value) {
    this.result += value;
    return this;
  }
  subtract(value) {
    this.result -= value;
    return this;
  }
  multiply(value) {
    this.result *= value;
    return this;
  }
  divide(value) {
    if (value === 0) {
      console.log("Error!");
    } else {
      this.result /= value;
    }
    return this;
  }
}
const calc = new Calculator();
const result = calc
  .number(10) // Встановлюємо початкове значення 10
  .add(5) // Додаємо 5 (10 + 5 = 15)
  .subtract(3) // Віднімаємо 3 (15 - 3 = 12)
  .multiply(4) // Множимо на 4 (12 * 4 = 48)
  .divide(2) // Ділимо на 2 (48 / 2 = 24)
  .getResult(); // Отримуємо результат: 24

//console.log(result); // 24

//!SECTION 12HW
/*  Напиши клас Client який створює об'єкт з властивостями login email.
 Оголоси приватні властивості #login #email, доступ до яких зроби
 через геттер та сеттер login email */

//NOTE - 1 metod
class Client {
  #login;
  #email;
  constructor(login, email) {
    this.#login = login;
    this.#email = email;
  }
  get login() {
    return this.#login;
  }
  set login(newLogin) {
    this.#login = newLogin;
  }
  get email() {
    return this.#email;
  }
  set email(newEmail) {
    this.#email = newEmail;
  }
}
const client = new Client("Dimon", "sss@gmail.com");

// console.log(client.login);
// console.log(client.email);

//!SECTION 13 HW
/*  Наслідування у класах!
  Cтворіть клас `Person`, який містить наступні властивості:
   - `name` - ім'я людини;
   - `age`- вік людини;
   - `gender` - стать людини;
   - `email`- електронна пошта людини.

  Крім того, клас `Person` має мати метод `getDetails()`,
  який повертає об'єкт з ім'ям, віком, статтю
  та електронною поштою людини.


  Потім Створіть клас `Employee`, який розширює клас `Person` і містить наступні властивості:
   - salary - зарплата співробітника;
   - department - відділ, в якому працює співробітник.
  Крім того, клас `Employee` має мати метод `getEmployeeDetails()`, який повертає об'єкт з зарплатою співробітника та відділом, в якому він працює.
 */

//NOTE - 1 metod
class Person {
  constructor(params) {
    this.name = params.name;
    this.age = params.age;
    this.gender = params.gender;
    this.email = params.email;
  }

  getDetails() {
    const { name, age, gender, email } = this;
    return { name, age, gender, email };
    /* return{
      name: this.name,
      age: this.age,
      gender: this.gender,
      email:this.email
    } */
  }
}

class Employee extends Person {
  constructor({ salary, department, ...params }) {
    super(params);
    this.salary = salary;
    this.department = department;
  }
  /* constructor(params){
    super(params);
    this.salary = params.salary;
    this.department =  params.department;
  } */
  getEmployeeDetails() {
    const { salary, department } = this;
    return { ...super.getDetails(), salary, department };
    /*   return {
      salary : this.salary,
      department:this.department
    } */
  }
}

const useR = new Person({
  name: "Oleh",
  age: 22,
  gender: "male",
  email: "oleh@GMAIL.COM",
});

console.log(useR);
