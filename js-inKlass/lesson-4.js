// Код із заняття 4. Відкрий lesson-4-practice.html через Live Server —
// цей файл підключений саме туди, а не в конспект.

//!SECTION - Завдання 1

// 1 - отримай body елемент і виведи його в консоль;
const bodyEl = document.querySelector("body");
console.log(bodyEl);

//bodyEl.classList.add("active");
//bodyEl.style.backgroundColor = "tomato";
//bodyEl.textContent = "olehss";
//bodyEl.innerHTML = "herrro";
//bodyEl.insertAdjacentElement("beforeend", "Oleh");
// 2 - отримай елемент id="title" і виведи його в консоль;

const titleElement = document.querySelector("#title");
console.log(titleElement);

// 3 - отримай елемент class="list" і виведи його в консоль;

const listElement = document.querySelector(".list");
console.log(listElement);

// 4 - отримай всі елементи з атрибутом data-topic і виведи їх в консоль;

//NOTE - metod 1
/* const dataSetArr = document.querySelectorAll('[data-topic]');
dataSetArr.forEach(el =>{
  console.log(el);
}); */

const dataSetArr = Array.from(listElement.children);
dataSetArr.forEach((el) => {
  console.log(el);
});

// 5 - отримай перший елемент з списку всіх елементів з атрибутом data-topic і виведи його в консоль;
//NOTE - metod 1
const firstLi = document.querySelector("[data-topic]");
console.log(firstLi);

/* const firstLi  = listElement.firstElementChild;
console.log(firstLi); */

// 6 - отримай останній елемент з списку всіх елементів з атрибутом data-topic і виведи його в консоль;

const lastLi = listElement.lastElementChild;
console.log(lastLi);

// 7 - який елемент є сусідом для h1? Знайти і виведи його в консоль;

const nextOf = titleElement.nextElementSibling;
const prevtOf = titleElement.previousElementSibling;
console.log(nextOf);

// 8 - по тегу h3 знайти всі заголовки та виведи їх у консоль;

const titleArr = document.querySelectorAll("h3");
titleArr.forEach((el) => {
  console.log(el);
});
// 9 - для кожного елмента h3 додай class="active", який змінить колір заголовка на червоний колір

titleArr.forEach((el) => el.classList.add("active"));
/* 10 - знайти елемент li який має атрибут data-topic з значенням "navigation" і виведи його в консоль;
11 - додай для знайденого елемента data-topic="navigation" атрибут style і зроби його backgroundColor жовтим
12 - у елемента data-topic="navigation" знайди елемент р і зміни його текст на "Я змінив тут текст!". */
const navItem = document.querySelector('li[data-topic="navigation"]');
console.log(navItem);
navItem.style.backgroundColor = "yellow";
const paragraph = navItem.querySelector("p");
paragraph.textContent = "змінив тут текст!";

// 13 - створи const currentTopic = "manipulation"; після цього знайди елемент у якогоо атрибут data-topic має значення, яке зберігається у змінній currentTopic і виведи його в консоль;
const currentTopic = "manipulation";
const findEl = document.querySelector(`[data-topic="${currentTopic}"]`);
console.log(findEl);

// 14 - додай до знайденого елемента атрибут style і зроби його backgroundColor блакитним;
findEl.style.backgroundColor = "blue";
// 15 - знайти в документі заголовок, який має class="completed" і виведи його в консоль;
const completedHed = document.querySelector(".completed");
console.log(completedHed);

// 16 - видали елемент li в якому знаходиться заголовок, який має class="completed"
const parenLi = completedHed.parentElement;
parenLi.remove();
// 17 - після заголовка h1 (перед списком) додай новий елемент p і задай йому наступний текст: "Об'єктна модель документа (Document Object Model)"

const title = document.querySelector("#title");
const list = document.querySelector(".list");

const subtitle = document.createElement("p");
subtitle.textContent = "Об'єктна модель документа (Document Object Model)";
title.after(subtitle);

// 18 - додай новий елемент списку у кінець списка, його заголовок це - "Властивість innerHTML" а опис (р) - "Ще один спосіб створити DOM-елементи і помістити їх в дерево - це використовувати рядки з тегами і дозволити браузеру зробити всю важку роботу". тобто, потрібно створити елемент LI потім наповнити H3 та P і готову LI закинути у кінець списку
/* const item = document.createElement("li");

const itemTitle = document.createElement("h3");
itemTitle.textContent = "Властивість innerHTML";

const itemText = document.createElement("p");
itemText.textContent =
  "Ще один спосіб створити DOM-елементи і помістити їх в дерево - це використовувати рядки з тегами і дозволити браузеру зробити всю важку роботу";

item.append(itemTitle, itemText);
list.append(item);

console.log(list.lastElementChild); */
// 19 - зроби це саме, але використовуй шаблонні рядки та метод insertAdjacentHTML()
const htmlMark = `<li>
  <h3>
  Властивість innerHTML
  </h3>
  <p>Ще один спосіб створити DOM-елементи і помістити їх в дерево - це використовувати рядки з тегами і дозволити браузеру зробити всю важку роботу;</p>
</li>`;
list.insertAdjacentHTML("beforeend", htmlMark);
// 20 - очисти список
// list.innerHTML = "";

//!SECTION - Завдання 2
/* Створіть контейнер div (з класом number-container) в HTML-документі
та динамічно створіть 100 блоків (з класом number) наповнивши їх рандомними
числами від 1 до 100 і додайте їх до контейнера div(numberContainer).
Парні числа повинні мати зелений фон (додати клас even),
Непарні числа - жовтий фон (додати клас odd).

const randomNumber = () => Math.floor(Math.random() * 100) + 1;
 */

/* const randomNumber = () => Math.floor(Math.random() * 100) + 1;

const numberContainer = document.querySelector(".number-container");
const items = [];

for (let i = 0; i < 100; i += 1) {
  const number = randomNumber();
  const item = document.createElement("div");
  item.classList.add("number", number % 2 === 0 ? "even" : "odd");
  item.textContent = number;
  items.push(item);
}

numberContainer.append(...items);
console.log(numberContainer.children.length); */
const randomNumber = () => Math.floor(Math.random() * 100) + 1;

const numberContainer = document.querySelector(".number-container");

const markup = Array.from({ length: 100 }, () => {
  const number = randomNumber();
  const type = number % 2 === 0 ? "even" : "odd";
  return `<div class="number ${type}">${number}</div>`;
}).join("");

numberContainer.insertAdjacentHTML("beforeend", markup);

//!SECTION - Завдання 3
/* Form Events, Input, Focus, Blur and Submit.

Використовуй шаблон форми з файлу html.

1 - При події `input`, якщо користувач ввів в поле більше
6 символів то додати клас `success`. Якщо ж символів менше аніж 6,
то клас `error`

2 - При події `focus` зроби перевірку на пустоту поля інпута,
якщо ж поле пусте, то зроби `outline` => `'3px solid red'`,
якщо при фокусі поле непусте, то `outline` => `'3px solid green'`

3 - При події `blur` зроби перевірку на пустоту поля інпута,
якщо ж поле пусте, то зроби `outline` => `'3px solid red'`,
якщо при фокусі поле непусте, то `outline` => `'3px solid lime'`

4 - При події `submit`. Відміни поведінку браузера по змовчуванню.
Дістань данні з інпуту і чек боксу, зроби перевірку,
що інпут не порожній, також, що нажатий чек бокс у положення true,
якщо користувач все виконав вірно, збери данні (userName)
у обьект і виведи у консоль. У разі, якщо користувач не виконав
одну із умов, виведи повідомлення. Також при події інпут реалізуй додавання
ім`я користувача у span, замість слова "Anonymous".
Якщо користувач ввів ім`я, а потім видалив, зроби так,
щоб на місце повернулось дефолтне знаяення "Anonymous".
При відправці форми, очисти інпут, верни чек бокс у положення
false, верни дефолтне значення "Anonymous" у span.
 */
//NOTE - 1
const inputEl = document.querySelector(".js-username-input");

inputEl.addEventListener("input", (event) => {
  const inputValue = event.target.value;
  if (inputValue.length > 6) {
    event.target.classList.add("success");
    event.target.classList.remove("error");
  } else {
    event.target.classList.add("error");
    event.target.classList.remove("success");
  }
});
//NOTE - 2
const input = document.querySelector(".js-username-input");

input.addEventListener("focus", () => {
  input.style.outline =
    input.value.trim() === "" ? "3px solid red" : "3px solid green";
});

input.addEventListener("blur", () => {
  input.style.outline =
    input.value.trim() === "" ? "3px solid red" : "3px solid lime";
});

//NOTE - 3
const DEFAULT_NAME = "Anonymous";

const form = document.querySelector(".js-contact-form");
const inputUser = document.querySelector(".js-username-input");
const output = document.querySelector(".js-username-output");

inputUser.addEventListener("input", (event) => {
  output.textContent = event.currentTarget.value.trim() || DEFAULT_NAME;
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const { userName, accept } = event.currentTarget.elements;
  const name = userName.value.trim();

  if (!name || !accept.checked) {
    alert("Введіть ім'я і погодьтесь із політикою конфіденційності");
    return;
  }

  const data = { userName: name };
  console.log(data);

  form.reset();
  output.textContent = DEFAULT_NAME;
});

//NOTE - 4
const formEl = document.querySelector(".js-contact-form");

formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = e.target.elements.userName.value.trim();
  const isChecked = e.target.elements.accept.checked;
  console.log(isChecked);

  `/*   if (inputValue === "" || !isChecked) {
    alert("Fill all !!");
    return;
  } */`;
  console.log(inputValue);
  e.target.reset();
});
//!SECTION - Завдання 4
/* Використовуй шаблон розмітки з файлу html та напиши наступний функціонал:
При кліку на кнопку "Зменшити" квадрат стає меньшим на 20 пікселів,
При кліку на кнопку "Збільшити" - квадрат стає більшим на 20 пікселів.
 */
const STEP = 20;

const box = document.querySelector(".box");
const decreaseBtn = document.querySelector("#decrease");
const increaseBtn = document.querySelector("#increase");

let size = box.offsetWidth; // 50

const setSize = (newSize) => {
  size = Math.max(newSize, STEP); // не менше 20px, щоб квадрат не зник
  box.style.width = `${size}px`;
  box.style.height = `${size}px`;
  console.log(size);
};

decreaseBtn.addEventListener("click", () => setSize(size - STEP));
increaseBtn.addEventListener("click", () => setSize(size + STEP));
