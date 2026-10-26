// Урок 2: пісочниці для задач заняття (js-inKlass/lesson-2.js): масиви й об'єкти.
// Розмітка: lesson-2.html, кожен блок нижче відповідає одній задачі.
import { highlightCode, esc, $, show, printTo, live, parseArg, parseList, renderArray } from "./common.js";

highlightCode();

// --- 1: styles і logItems ---
live(["t1push", "t1find", "t1repl"], () => {
  const toPush = $("t1push").value, toFind = $("t1find").value, repl = $("t1repl").value;
  const styles = ["jazz", "blues"];
  const rows = [[`const styles = ["jazz", "blues"]`, renderArray(styles)]];

  styles.push(toPush);
  rows.push([`styles.push(${show(toPush)})`, renderArray(styles, { [styles.length - 1]: "new" })]);

  const index = styles.indexOf(toFind);
  rows.push([`styles.indexOf(${show(toFind)}) → ${index}`, index === -1 ? '<span class="pill bad">-1: такого елемента немає, заміни не буде</span>' : renderArray(styles, { [index]: "hit" })]);

  if (index !== -1) {
    styles[index] = repl;
    rows.push([`styles[${index}] = ${show(repl)}`, renderArray(styles, { [index]: "new" })]);
  }

  $("t1viz").innerHTML = rows.map(([op, html]) => `<div class="op"><code>${esc(op)}</code>${html}</div>`).join("");
  printTo("t1out", styles.map((style, i) => ["log", `${i + 1} - ${style}`]));
});

// --- 2: checkLogin ---
const logins = ["Peter", "John", "Igor", "Sasha"];
live(["t2n"], () => {
  const login = $("t2n").value;
  const found = logins.includes(login);
  $("t2viz").innerHTML = `<div class="op"><code>logins</code>${renderArray(logins, { [logins.indexOf(login)]: "hit" })}</div>
    <div>logins.includes(${esc(show(login))}) <span class="arrow">→</span> <span class="pill ${found ? "ok" : "bad"}">${found}</span></div>`;

  // як у lesson-2.js: alert "User not found" на кожному незбігу
  const bad = [];
  for (const name of logins) {
    if (name === login) {
      bad.push(["alert", `Welcome, ${name}!`]);
      break;
    }
    bad.push(["alert", `User not found   (бо ${name} ≠ ${login})`]);
  }
  printTo("t2bad", bad);
  printTo("t2out", [["alert", found ? `Welcome, ${login}!` : "User not found"]]);
});

// --- 3: calculateAverage ---
live(["t3a"], () => {
  const args = parseList($("t3a").value);
  let sum = 0, count = 0;
  const marks = {};
  args.forEach((arg, i) => {
    if (typeof arg === "number") {
      sum += arg;
      count += 1;
    } else {
      marks[i] = "dim";
    }
  });
  $("t3viz").innerHTML = `<div class="op"><code>args (рядки пропускаємо)</code>${renderArray(args, marks)}</div>
    <div>sum = ${sum}, count = ${count} <span class="arrow">→</span> ${count === 0 ? '<span class="pill bad">0 / 0 = NaN, тому повертаємо 0</span>' : `${sum} / ${count}`}</div>`;
  printTo("t3out", [["ret", String(count === 0 ? 0 : sum / count)]]);
});

// --- 4: сума сусідніх ---
live(["t4a"], () => {
  const array = parseList($("t4a").value).filter((n) => typeof n === "number");
  const result = [];
  let html = "";
  for (let i = 0; i < array.length - 1; i++) {
    const s = array[i] + array[i + 1];
    result.push(s);
    html += `<div><small>i = ${i}</small>${array[i]} + ${array[i + 1]} = <b>${s}</b></div>`;
  }
  $("t4viz").innerHTML = html || '<span class="pill neutral">менше двох чисел: пар немає</span>';
  printTo("t4out", [["ret", JSON.stringify(result)]]);
});

// --- 5: найменше число ---
live(["t5a"], () => {
  const raw = $("t5a").value.trim();
  const isString = /^(["'`]).*\1$/.test(raw);
  const value = isString ? parseArg(raw) : parseList(raw);

  if (!Array.isArray(value)) {
    $("t5viz").innerHTML = `<div class="steps"><div>Array.isArray(${esc(show(value))}) <span class="arrow">→</span> <span class="pill bad">false</span></div></div>`;
    return printTo("t5out", [["ret", show("Sorry, it is not an array!")]]);
  }

  let smallest = value[0];
  const trace = [];
  value.forEach((n) => {
    if (n < smallest) {
      trace.push(`${n} < ${smallest} → smallest = ${n}`);
      smallest = n;
    }
  });
  $("t5viz").innerHTML = `${renderArray(value, { [value.indexOf(smallest)]: "hit" })}
    <div class="steps"><div>start: smallest = numbers[0] = ${esc(show(value[0]))}</div>${trace.map((t) => `<div>${esc(t)}</div>`).join("")}</div>`;
  printTo("t5out", [["ret", show(smallest)]]);
});

// --- 6: найдовше слово ---
live(["t6a"], () => {
  const words = $("t6a").value.split(" ");
  let longest = "";
  for (const word of words) {
    if (word.length > longest.length) longest = word;
  }
  const at = words.indexOf(longest);
  $("t6viz").innerHTML = words
    .map((w, i) => `<span class="num ${i === at ? "fizzbuzz" : ""}">${esc(w) || "␣"} <small>${w.length}</small></span>`)
    .join("");
  printTo("t6out", [["ret", show(longest)]]);
});

// --- 7: об'єкт user ---
const userSteps = [
  ["user.mood = \"happy\"", "mood", "happy"],
  ["user.hobby = \"skydiving\"", "hobby", "skydiving"],
  ["user.premium = false", "premium", false],
  ["for (const key of Object.keys(user))", null],
];
let userStep = 0;

function makeUser(step) {
  const user = { name: "John", age: 20, hobby: "tenis", premium: true };
  for (let i = 0; i < Math.min(step, 3); i++) user[userSteps[i][1]] = userSteps[i][2];
  return user;
}

function renderUser() {
  const user = makeUser(userStep);
  const last = userStep > 0 && userStep <= 3 ? userSteps[userStep - 1][1] : null;
  const added = last === "mood";

  $("t7flow").innerHTML = userSteps.map(([op], i) => `<div class="${i < userStep ? "on" : ""}">${i < userStep ? "✓ " : ""}${esc(op)}</div>`).join("");
  $("t7viz").innerHTML = Object.entries(user)
    .map(([k, v]) => `<div class="${k === last ? (added ? "new" : "changed") : ""}"><span class="k">${esc(k)}:</span><span>${esc(show(v))}</span>${k === last ? `<span>← ${added ? "додано" : "змінено"}</span>` : ""}</div>`)
    .join("");
  $("t7step").disabled = userStep >= userSteps.length;

  printTo("t7out", userStep >= 4
    ? Object.keys(user).map((key) => ["log", `${key}: ${user[key]}`])
    : [["log", `Object.keys(user) → ${JSON.stringify(Object.keys(user))}`]]);
  renderAccess();
}

function renderAccess() {
  const user = makeUser(userStep);
  const key = $("t7key").value;
  $("t7access").innerHTML = `
    <div>user[key] <span class="arrow">→</span> user[${esc(show(key))}] <span class="arrow">→</span> <span class="pill ${key in user ? "ok" : "bad"}">${esc(show(user[key]))}</span></div>
    <div>user.key <span class="arrow">→</span> шукає ключ "key" <span class="arrow">→</span> <span class="pill bad">${show(user.key)}</span></div>`;
}

$("t7step").addEventListener("click", () => {
  userStep += 1;
  renderUser();
});
$("t7reset").addEventListener("click", () => {
  userStep = 0;
  renderUser();
});
$("t7key").addEventListener("input", renderAccess);
renderUser();

// --- 8: сума зарплат ---
live(["t8a"], () => {
  const salaries = {};
  for (const part of $("t8a").value.split(",")) {
    const [name, value] = part.split(":").map((s) => s.trim());
    if (name) salaries[name] = Number(value) || 0;
  }
  const values = Object.values(salaries);
  $("t8viz").innerHTML = `<div class="op"><code>Object.values(salaries)</code>${renderArray(values)}</div>`;

  const bad = [];
  let badSum = 0;
  for (const salary of values) {
    bad.push(["log", `sum + -${salary} → ${badSum - salary}, але sum = ${badSum}`]);
  }
  bad.push(["log", `sum = ${badSum}`]);
  printTo("t8bad", bad);

  let sum = 0;
  const good = [];
  for (const salary of values) {
    sum += salary;
    good.push(["log", `sum += ${salary} → ${sum}`]);
  }
  good.push(["log", `sum = ${sum}`]);
  printTo("t8out", good);
});

// --- 9: calculator ---
let calc = {};

function renderCalc() {
  $("t9viz").innerHTML = ["a", "b"]
    .map((k) => `<div class="${calc[k] === undefined ? "missing" : ""}"><span class="k">this.${k}:</span><span>${show(calc[k])}</span></div>`)
    .join("");
}

function log9(line) {
  const out = $("t9out");
  const div = document.createElement("div");
  div.className = `ln ${line[0]}`;
  div.textContent = line[1];
  out.append(div);
  out.scrollTop = out.scrollHeight;
}

const exist = () => calc.a !== undefined && calc.b !== undefined;

$("t9read").addEventListener("click", () => {
  calc.a = Number($("t9a").value);
  calc.b = Number($("t9b").value);
  log9(["log", `calculator.read(${calc.a}, ${calc.b})`]);
  renderCalc();
});
$("t9sum").addEventListener("click", () => {
  log9(["ret", `sum() → ${show(exist() ? calc.a + calc.b : "No such properties")}`]);
});
$("t9mult").addEventListener("click", () => {
  log9(["ret", `mult() → ${show(exist() ? calc.a * calc.b : "No such properties")}`]);
});
$("t9badmult").addEventListener("click", () => {
  if (!exist()) return log9(["ret", `mult() → "No such propeties"`]);
  const result = (calc.a = calc.b); // так написано в lesson-2.js
  log9(["err", `this.a = this.b → повернуло ${result}, і this.a тепер ${calc.a}`]);
  renderCalc();
});
$("t9reset").addEventListener("click", () => {
  calc = {};
  $("t9out").replaceChildren();
  log9(["log", "новий об'єкт: read ще не викликали"]);
  renderCalc();
});
log9(["log", "натисни sum() до read(), а потім після"]);
renderCalc();

// --- 10: calcTotalPrice ---
const fruits = [
  { name: "Яблуко", price: 45, quantity: 7 },
  { name: "Апельсин", price: 60, quantity: 4 },
  { name: "Банан", price: 125, quantity: 8 },
  { name: "Груша", price: 350, quantity: 2 },
  { name: "Виноград", price: 440, quantity: 3 },
  { name: "Банан", price: 125, quantity: 3 },
];
live(["t10n"], () => {
  const fruitName = $("t10n").value;
  let totalPrice = 0;
  const rows = fruits.map((fruit, i) => {
    const hit = fruit.name === fruitName;
    const cost = fruit.price * fruit.quantity;
    if (hit) totalPrice += cost;
    return `<tr class="${hit ? "hit" : "dim"}"><td class="num-col">${i}</td><td>${esc(fruit.name)}</td><td class="num-col">${fruit.price}</td><td class="num-col">${fruit.quantity}</td><td class="num-col">${hit ? `+${cost}` : "—"}</td></tr>`;
  });
  $("t10viz").innerHTML = `<thead><tr><th class="num-col">i</th><th>name</th><th class="num-col">price</th><th class="num-col">quantity</th><th class="num-col">totalPrice +=</th></tr></thead>
    <tbody>${rows.join("")}</tbody>
    <tfoot><tr><td colspan="4">return totalPrice</td><td class="num-col">${totalPrice}</td></tr></tfoot>`;
  printTo("t10out", [["ret", String(totalPrice)]]);
});
