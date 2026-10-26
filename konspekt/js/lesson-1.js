// Урок 1: пісочниці для задач домашки (task-1…4) і заняття (lesson-1.js).
// Розмітка: lesson-1.html, кожен блок нижче відповідає одній задачі.
import {
  highlightCode,
  esc,
  $,
  show,
  printTo,
  live,
  parseArg,
  renderCases,
} from "./common.js";

highlightCode();

// --- H1 ---
function makeTransaction(q, p, c) {
  const total = q * p;
  if (total > c) return "Insufficient funds!";
  return `You ordered ${q} droids worth ${total} credits!`;
}
live(["h1q", "h1p", "h1c"], () => {
  const q = Number($("h1q").value),
    p = Number($("h1p").value),
    c = Number($("h1c").value);
  const total = q * p,
    max = Math.max(total, c, 1),
    over = total > c;
  $("h1viz").innerHTML = `
    <div class="bar-row"><span>totalPrice</span><div class="bar ${over ? "over" : ""}"><i style="width:${(total / max) * 100}%"></i></div><b>${total}</b></div>
    <div class="bar-row"><span>credits</span><div class="bar base"><i style="width:${(c / max) * 100}%"></i></div><b>${c}</b></div>
    <div class="steps"><div>${total} &gt; ${c} <span class="arrow">→</span> <span class="pill ${over ? "bad" : "ok"}">${over}</span> ${over ? "ранній return" : "йдемо далі"}</div></div>`;
  printTo("h1out", [["ret", show(makeTransaction(q, p, c))]]);
});

// --- H2 ---
live(["h2m", "h2l"], () => {
  const m = $("h2m").value,
    l = Number($("h2l").value);
  $("h2lv").textContent = l;
  const fits = m.length <= l;
  $("h2viz").innerHTML =
    `<span class="kept">${esc(m.slice(0, l))}</span><span class="cut">${esc(m.slice(l))}</span>
    <div class="steps"><div>message.length = ${m.length} &lt;= ${l} <span class="arrow">→</span> <span class="pill ${fits ? "ok" : "bad"}">${fits}</span> ${fits ? "повертаємо як є" : `slice(0, ${l}) + "..."`}</div></div>`;
  printTo("h2out", [["ret", show(fits ? m : m.slice(0, l) + "...")]]);
});

// --- H3 ---
const spamSamples = [
  "Latest technology news",
  "Get best sale offers now!",
  "Trust me, this is not a spam message",
  "[SPAM] How to earn fast money?",
];
$("h3presets").innerHTML = spamSamples
  .map(
    (s, i) =>
      `<button type="button" class="ghost" data-i="${i}">${esc(s)}</button>`,
  )
  .join("");
$("h3presets").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  $("h3m").value = spamSamples[b.dataset.i];
  $("h3m").dispatchEvent(new Event("input"));
});
live(["h3m"], () => {
  const m = $("h3m").value,
    n = m.toLowerCase();
  const hasSpam = n.includes("spam"),
    hasSale = n.includes("sale");
  $("h3viz").innerHTML =
    esc(m).replace(/(spam|sale)/gi, "<mark>$1</mark>") +
    `<div class="steps">
      <div>"${esc(n)}"</div>
      <div>.includes("spam") <span class="arrow">→</span> <span class="pill ${hasSpam ? "ok" : "bad"}">${hasSpam}</span></div>
      <div>.includes("sale") <span class="arrow">→</span> ${hasSpam ? '<span class="pill neutral">не перевіряється, || вже отримав true</span>' : `<span class="pill ${hasSale ? "ok" : "bad"}">${hasSale}</span>`}</div></div>`;
  printTo("h3out", [["ret", show(hasSpam || hasSale)]]);
});

// --- L1 ---
live(["l1n"], () => {
  const raw = $("l1n").value,
    num = Number(raw),
    ok = num === 10;
  $("l1viz").innerHTML = `
    <div>prompt <span class="arrow">→</span> ${esc(JSON.stringify(raw))} <span class="pill neutral">string</span></div>
    <div>Number(${esc(JSON.stringify(raw))}) <span class="arrow">→</span> ${num} <span class="pill neutral">${typeof num}</span></div>
    <div>${num} === 10 <span class="arrow">→</span> <span class="pill ${ok ? "ok" : "bad"}">${ok}</span></div>
    <div>без Number(): ${esc(JSON.stringify(raw))} === 10 <span class="arrow">→</span> <span class="pill bad">false</span></div>`;
  printTo("l1out", [["alert", ok ? "Вірно" : "Невірно"]]);
});

// --- L2 clock ---
const quarters = ["першу", "другу", "третю", "четверту"];
function drawClock(m) {
  const q = Math.min(3, Math.floor(m / 15)),
    cx = 100,
    cy = 100,
    r = 80;
  const pt = (deg, rad) => [
    cx + rad * Math.sin((deg * Math.PI) / 180),
    cy - rad * Math.cos((deg * Math.PI) / 180),
  ];
  let svg = "";
  for (let i = 0; i < 4; i++) {
    const [x1, y1] = pt(i * 90, r),
      [x2, y2] = pt((i + 1) * 90, r);
    svg += `<path d="M${cx},${cy} L${x1},${y1} A${r},${r} 0 0 1 ${x2},${y2} Z" fill="${i === q ? "var(--accent)" : "var(--surface)"}" fill-opacity="${i === q ? 0.25 : 1}" stroke="var(--line)" stroke-width="1.5"/>`;
  }
  for (let t = 0; t < 60; t += 5) {
    const [a, b] = pt(t * 6, r - 4),
      [c, d] = pt(t * 6, r - (t % 15 === 0 ? 14 : 9));
    svg += `<line x1="${a}" y1="${b}" x2="${c}" y2="${d}" stroke="var(--muted)" stroke-width="${t % 15 === 0 ? 2.5 : 1}"/>`;
  }
  [0, 15, 30, 45].forEach((t) => {
    const [x, y] = pt(t * 6, r + 12);
    svg += `<text x="${x}" y="${y + 4}" text-anchor="middle" font-size="11" font-family="JetBrains Mono, monospace" fill="var(--muted)">${t}</text>`;
  });
  const [hx, hy] = pt(m * 6, r - 18);
  svg += `<line x1="${cx}" y1="${cy}" x2="${hx}" y2="${hy}" stroke="var(--ink)" stroke-width="3" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="5" fill="var(--ink)"/>`;
  $("l2clock").innerHTML = svg;
  return q;
}
function updL2() {
  const m = Number($("l2m").value);
  $("l2mv").textContent = m;
  const q = drawClock(m);
  const conds = ["min < 15", "min < 30", "min < 45", "else"];
  printTo("l2out", [
    ["log", `спрацювала гілка: ${conds[q]}`],
    ["alert", `${m} входить в ${quarters[q]} чверть`],
  ]);
}
live(["l2m"], updL2);
$("l2rnd").addEventListener("click", () => {
  $("l2m").value = Math.floor(Math.random() * 60);
  updL2();
});

// --- L3 ---
const seasons = [
  ["1", "зима"],
  ["2", "весна"],
  ["3", "літо"],
  ["4", "осінь"],
];
live(["l3n"], () => {
  const r = renderCases(
    "l3viz",
    seasons,
    $("l3n").value,
    "Вибачте, але ви маєте ввести…",
  );
  printTo("l3out", [
    ["log", r ?? "Вибачте, але ви маєте ввести значення від 1 до 4 включно"],
  ]);
});

// --- L4 ---
live(["l4n"], () => {
  const v = Number($("l4n").value);
  const h = Math.floor(v / 60),
    m = v % 60;
  const hs = String(h).padStart(2, "0"),
    ms = String(m).padStart(2, "0");
  $("l4viz").innerHTML = `
    <div>${v} / 60 = ${+(v / 60).toFixed(3)} <span class="arrow">→ Math.floor →</span> ${h} <span class="arrow">→ padStart →</span> <span class="pill neutral">"${hs}"</span></div>
    <div>${v} % 60 = ${m} <span class="arrow">→ padStart →</span> <span class="pill neutral">"${ms}"</span></div>
    <div>перевірка: ${h} × 60 + ${m} = ${h * 60 + m}</div>`;
  printTo("l4out", [["log", `${hs}:${ms}`]]);
});

// --- L5 ---
let l5cancel = false;
function updL5() {
  const login = l5cancel ? null : $("l5l").value,
    pass = $("l5p").value;
  $("l5p").disabled = login !== "Адмін";
  $("l5l").disabled = l5cancel;
  $("l5cancel").setAttribute("aria-pressed", l5cancel);
  $("l5cancel").textContent = l5cancel ? "Повернути логін" : "Cancel у логіні";
  let path, msg;
  if (login === "Адмін") {
    path = pass === "Я головний" ? 1 : 2;
    msg = path === 1 ? "Добрий день!" : "Невірний пароль!";
  } else if (login === null || login === "") {
    path = 3;
    msg = "Скасовано";
  } else {
    path = 4;
    msg = "Я вас не знаю";
  }
  const rows = [
    [0, 'login === "Адмін"', path <= 2],
    [1, 'password === "Я головний" → "Добрий день!"', path === 1, "sub"],
    [2, 'else → "Невірний пароль!"', path === 2, "sub"],
    [3, 'login === null || login === "" → "Скасовано"', path === 3],
    [4, 'else → "Я вас не знаю"', path === 4],
  ];
  $("l5viz").innerHTML = rows
    .map(
      ([, t, on, sub]) =>
        `<div class="${on ? "on" : ""} ${sub || ""}">${esc(t)}</div>`,
    )
    .join("");
  printTo("l5out", [
    ["log", show(login)],
    ["alert", msg],
  ]);
}
live(["l5l", "l5p"], updL5);
$("l5cancel").addEventListener("click", () => {
  l5cancel = !l5cancel;
  updL5();
});

// --- L6 ---
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function drawL6(upto) {
  let h = "";
  for (let i = 0; i <= 20; i++)
    h += `<span class="num ${i > upto ? "dim" : ""} ${i === upto ? "now" : ""}">${i}</span>`;
  $("l6viz").innerHTML = h;
  const i = upto + 1;
  $("l6state").innerHTML =
    upto < 0
      ? "<div>i = 0, натисни кнопку</div>"
      : `<div>i = ${i} <span class="arrow">→</span> ${i} &lt;= 20 <span class="arrow">→</span> <span class="pill ${i <= 20 ? "ok" : "bad"}">${i <= 20}</span> ${i <= 20 ? "" : "цикл завершено"}</div>`;
}
drawL6(20);
let l6timer;
$("l6run").addEventListener("click", () => {
  clearInterval(l6timer);
  if (reduce) return drawL6(20);
  let k = -1;
  drawL6(k);
  l6timer = setInterval(() => {
    k++;
    drawL6(k);
    if (k >= 20) clearInterval(l6timer);
  }, 220);
});

// --- L7 ---
live(["l7a", "l7b"], () => {
  const a = parseArg($("l7a").value),
    b = parseArg($("l7b").value);
  if (typeof a !== "number" || typeof b !== "number") {
    $("l7viz").innerHTML =
      `<span class="pill bad">typeof min = "${typeof a}", typeof max = "${typeof b}"</span>`;
    return printTo("l7out", [["ret", show("Not a Number!")]]);
  }
  if (b - a > 300) {
    $("l7viz").innerHTML = "";
    return printTo("l7out", [
      ["err", "Для наочності діапазон обмежено 300 числами"],
    ]);
  }
  let h = "",
    sum = 0,
    evens = [];
  for (let i = b; i >= a; i--) {
    const e = i % 2 === 0;
    if (e) {
      sum += i;
      evens.push(i);
    }
    h += `<span class="num ${e ? "even" : ""}">${i}</span>`;
  }
  $("l7viz").innerHTML =
    h ||
    '<span class="pill neutral">max &lt; min, цикл не виконався жодного разу</span>';
  printTo("l7out", [
    ["log", `парні: ${evens.join(" + ") || "немає"}`],
    ["ret", String(sum)],
  ]);
});

// --- L8 ---
live(["l8a", "l8b"], () => {
  const a = parseArg($("l8a").value),
    b = parseArg($("l8b").value);
  const valid = typeof a === "number" && typeof b === "number";
  $("l8viz").innerHTML = `
    <div>typeof a = <span class="pill ${typeof a === "number" ? "ok" : "bad"}">"${typeof a}"</span> typeof b = <span class="pill ${typeof b === "number" ? "ok" : "bad"}">"${typeof b}"</span></div>
    ${
      valid
        ? `<div>${a} &lt; ${b} <span class="arrow">→</span> <span class="pill neutral">${a < b}</span> <span class="arrow">→</span> повертаємо ${a < b ? "a" : "b"}</div>
    <div>помилковий варіант (a, b ? a : b) <span class="arrow">→</span> ${show(b ? a : b)}</div>`
        : ""
    }`;
  printTo("l8out", [
    ["ret", valid ? String(a < b ? a : b) : show("Not a number!")],
  ]);
});

// --- L9 ---
live(["l9a"], () => {
  const age = Number($("l9a").value),
    adult = age >= 18;
  $("l9viz").innerHTML =
    `<div>${age} >= 18 <span class="arrow">→</span> <span class="pill ${adult ? "ok" : "bad"}">${adult}</span> ${adult ? "<span class='arrow'>→</span> confirm не викликається" : "<span class='arrow'>→</span> викликаємо confirm"}</div>`;
  if (adult) {
    $("l9dialog").innerHTML = "";
    printTo("l9out", [["ret", "true"]]);
  } else {
    $("l9dialog").innerHTML =
      `<div class="dialog"><p>Вам дійсно 18?</p><button type="button" data-v="true">OK</button><button type="button" class="ghost" data-v="false">Скасувати</button></div>`;
    printTo("l9out", [["log", "чекаємо відповіді на confirm…"]]);
  }
});
$("l9dialog").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  printTo("l9out", [
    ["log", `confirm повернув ${b.dataset.v}`],
    ["ret", b.dataset.v],
  ]);
});

// --- L10 ---
live(["l10n"], () => {
  const n = Number($("l10n").value);
  $("l10nv").textContent = n;
  let h = "";
  for (let i = 1; i <= n; i++) {
    const t =
      i % 15 === 0
        ? "fizzbuzz"
        : i % 3 === 0
          ? "fizz"
          : i % 5 === 0
            ? "buzz"
            : "";
    h += `<span class="num ${t}" title="${i}">${t || i}</span>`;
  }
  $("l10viz").innerHTML = h;
});
