// =====================================================================
// konspekt.js — збирає сторінку уроку з короткої розмітки.
// У HTML достатньо написати:
//
//   <main data-lesson="3" data-title="Назва уроку" data-file="js-inKlass/lesson-3.js">
//     <p class="lede">Вступ (необов'язково)</p>
//     <h2 class="part-title">Назва групи задач</h2>
//     <article class="task" data-title="Назва задачі" data-chips="map, =>">
//       <p class="cond">Умова</p>
//       <script type="text/plain" class="code" data-run>
//         console.log([1, 2, 3].map((n) => n * 2));
//       </script>
//       <ul class="how"><li>Пояснення</li></ul>
//       <div class="note"><ul><li>Зауваження</li></ul></div>
//     </article>
//   </main>
//
// Решту (шапку, зміст, номери, мітки, підсвічування коду,
// кнопку «Запустити» і футер) скрипт додасть сам.
//
// DOM-задачі: <main data-sandbox="lesson-4-practice.html"> і data-run="sandbox"
// у блоці коду. Тоді під кодом з'являється та сторінка, і код виконується в ній,
// а не в конспекті. data-focus=".contact-form" прокручує пісочницю до елемента.
// Шаблони для VS Code: .vscode/konspekt.code-snippets (klesson, ktask, …).
// =====================================================================
import { highlightCode, esc } from "./common.js";

const main = document.querySelector("main");
const lesson = main.dataset;
let sandboxHtml; // кеш сторінки-пісочниці (див. getSandboxHtml)

buildCodeBlocks();
buildHeader();
buildTasks();
buildToc();
buildFooter();
highlightCode();
setupRunners();

// ---------- Код ----------

// <script type="text/plain" class="code"> → <pre class="code">.
// У script не треба екранувати < і &, тому код можна вставляти як є.
function buildCodeBlocks() {
  document.querySelectorAll("script.code, pre.code").forEach((block) => {
    const pre = document.createElement("pre");
    pre.className = "code";
    if (block.hasAttribute("data-run")) pre.dataset.run = block.dataset.run;
    if (block.dataset.focus) pre.dataset.focus = block.dataset.focus;
    pre.textContent = dedent(block.textContent);
    block.replaceWith(pre);
  });
}

// Прибирає спільний відступ, який з'являється через вкладеність у HTML
function dedent(text) {
  const lines = text.replace(/\t/g, "  ").split("\n");
  while (lines.length && !lines[0].trim()) lines.shift();
  while (lines.length && !lines.at(-1).trim()) lines.pop();
  const indent = Math.min(...lines.filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length));
  return lines.map((l) => l.slice(indent)).join("\n");
}

// ---------- Шапка ----------

function buildHeader() {
  if (main.querySelector(".intro")) return;

  document.title = `Blended JS · Заняття ${lesson.lesson}`;
  const lede = main.querySelector(".lede");

  const header = document.createElement("header");
  header.className = "intro";
  header.innerHTML = `
    <div class="eyebrow"><a href="index.html">← Усі уроки</a> · blendedJS${lesson.file ? ` · ${esc(lesson.file)}` : ""}</div>
    <h1>JavaScript: заняття ${esc(lesson.lesson)}. ${esc(lesson.title)}</h1>`;
  if (lede) header.append(lede);
  header.insertAdjacentHTML(
    "beforeend",
    `<div class="legend">
      <span class="pill neutral">› console.log</span>
      <span class="pill neutral">return › значення функції</span>
      <span class="pill neutral">▶ Запустити / Ctrl+Enter — виконати код</span>
      ${lesson.sandbox ? `<span class="pill neutral">пісочниця — <a href="${esc(lesson.sandbox)}">${esc(lesson.sandbox)}</a></span>` : ""}
    </div>`,
  );
  main.prepend(header);
}

// ---------- Задачі ----------

function buildTasks() {
  let counter = 0;

  main.querySelectorAll("article.task").forEach((task) => {
    if (task.querySelector(".task-head")) return; // вже зібрана вручну

    const no = task.dataset.no ?? String(++counter);
    task.id ||= `t${no}`;
    task.dataset.no = no;

    const chips = (task.dataset.chips ?? "")
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean)
      .map((c) => `<span class="chip">${esc(c)}</span>`);
    const file = task.dataset.file ?? lesson.file;
    if (file) chips.push(`<span class="chip file">${esc(file)}</span>`);

    task.insertAdjacentHTML(
      "afterbegin",
      `<div class="task-head"><span class="task-no">${esc(no)}</span><h3>${esc(task.dataset.title ?? "")}</h3>
        ${chips.length ? `<div class="chips">${chips.join("")}</div>` : ""}</div>`,
    );

    addLabel(task.querySelector(".cond"), "Умова");
    addLabel(task.querySelector(".how"), "Як це працює");

    task.querySelectorAll(".note").forEach((note) => {
      if (!note.querySelector("strong")) {
        note.insertAdjacentHTML("afterbegin", `<strong>${esc(note.dataset.label ?? "Зауваження до коду")}</strong>`);
      }
    });
  });
}

function addLabel(el, text) {
  if (!el || el.parentElement.querySelector(":scope > .label")) return;
  const wrap = document.createElement("div");
  el.replaceWith(wrap);
  wrap.innerHTML = `<p class="label">${text}</p>`;
  wrap.append(el);
}

// ---------- Зміст ----------

function buildToc() {
  if (main.querySelector(".toc")) return;

  const groups = [];
  main.querySelectorAll(".part-title, article.task").forEach((el) => {
    if (el.matches(".part-title")) {
      groups.push({ title: el.textContent, items: [] });
      return;
    }
    if (!groups.length) groups.push({ title: "Огляд", items: [] });
    groups.at(-1).items.push(el);
  });

  const nav = document.createElement("nav");
  nav.className = "toc";
  nav.setAttribute("aria-label", "Зміст");
  nav.innerHTML = groups
    .map(
      (g) => `<div><h2>${esc(g.title)}</h2><ol>${g.items
        .map((t) => `<li><a href="#${t.id}"><span>${esc(t.dataset.no)}</span>${esc(t.dataset.title ?? "")}</a></li>`)
        .join("")}</ol></div>`,
    )
    .join("");
  main.querySelector(".intro").after(nav);
}

// ---------- Футер ----------

function buildFooter() {
  if (main.querySelector("footer")) return;
  const footer = document.createElement("footer");
  footer.textContent =
    "Код у блоках можна редагувати: зміни щось і натисни «Запустити» (або Ctrl+Enter). «Скинути» повертає початковий варіант." +
    (lesson.file ? ` Зауваження стосуються версії в ${lesson.file}.` : "");
  main.append(footer);
}

// ---------- Запуск коду ----------

function setupRunners() {
  document.querySelectorAll("pre.code[data-run]").forEach((pre) => {
    const original = pre.textContent;
    pre.contentEditable = "plaintext-only";
    pre.spellcheck = false;
    pre.setAttribute("aria-label", "Редагований код");

    const sandbox = pre.dataset.run === "sandbox" && lesson.sandbox;

    const box = document.createElement("div");
    box.className = "runner";
    box.innerHTML = `
      <div class="controls">
        <button type="button" data-act="run">▶ Запустити</button>
        <button type="button" class="ghost" data-act="reset">↺ Скинути</button>
      </div>
      <div class="console" aria-live="polite" hidden></div>
      ${sandbox ? `<div class="sandbox"><iframe title="Пісочниця: ${esc(lesson.sandbox)}" loading="lazy"></iframe></div>` : ""}`;
    pre.after(box);

    const out = box.querySelector(".console");
    const frame = box.querySelector("iframe");
    const run = () => (frame ? runInSandbox(pre.textContent, out, frame, pre.dataset.focus) : runCode(pre.textContent, out));
    // Пісочницю вантажимо, лише коли вона підʼїжджає до екрана: 13 iframe одразу підвішують сторінку
    if (frame) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();
          if (!frame.srcdoc) loadSandbox(frame, pre.dataset.focus).catch((error) => sandboxError(out, error));
        },
        { rootMargin: "300px" },
      );
      observer.observe(box);
    }

    box.addEventListener("click", (e) => {
      const act = e.target.closest("button")?.dataset.act;
      if (act === "run") run();
      if (act === "reset") {
        pre.textContent = original;
        highlightCode(pre);
        out.hidden = true;
        if (frame) loadSandbox(frame, pre.dataset.focus).catch((error) => sandboxError(out, error));
      }
    });
    pre.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        run();
      }
    });
    pre.addEventListener("blur", () => highlightCode(pre));
  });
}

// Виконує код як окремий модуль і перехоплює console.log / console.error.
// Запуски йдуть по черзі, щоб вивід різних блоків не перемішався.
let queue = Promise.resolve();

function runCode(code, out) {
  queue = queue.then(async () => {
    out.hidden = false;
    out.replaceChildren();
    const print = (type) => (...args) => line(out, type, args.map((a) => format(a)).join(" "));
    const original = { log: console.log, error: console.error, table: console.table };
    console.log = console.table = print("log");
    console.error = print("err");

    const url = URL.createObjectURL(new Blob([code], { type: "text/javascript" }));
    try {
      await import(url);
    } catch (error) {
      line(out, "err", `${error.name}: ${error.message}`);
    } finally {
      URL.revokeObjectURL(url);
      Object.assign(console, original);
    }
    if (!out.hasChildNodes()) line(out, "log", "(у консоль нічого не виведено)");
  });
}

// ---------- Пісочниця для DOM-задач ----------

// Сторінку пісочниці беремо без її <script>, щоб там не виконувався класний код
function getSandboxHtml() {
  sandboxHtml ??= fetch(lesson.sandbox)
    .then((response) => {
      if (!response.ok) throw new Error(`${lesson.sandbox}: ${response.status}`);
      return response.text();
    })
    .then((text) => {
      const doc = new DOMParser().parseFromString(text, "text/html");
      doc.querySelectorAll("script").forEach((script) => script.remove());
      const base = doc.createElement("base");
      base.href = new URL(lesson.sandbox, location.href).href;
      doc.head.prepend(base);
      return `<!doctype html>${doc.documentElement.outerHTML}`;
    });
  return sandboxHtml;
}

// Кожен запуск починається з чистої сторінки
async function loadSandbox(frame, focus) {
  const html = await getSandboxHtml();
  await new Promise((resolve) => {
    frame.addEventListener("load", resolve, { once: true });
    frame.srcdoc = html;
  });
  const win = frame.contentWindow;
  // Інакше браузер «тримає» видиме місце і прокручує сторінку, коли код додає елементи
  win.document.documentElement.style.overflowAnchor = "none";
  const target = focus && win.document.querySelector(focus);
  // scrollIntoView прокрутив би й сам конспект, тому крутимо тільки iframe
  if (target) win.scrollTo(0, target.getBoundingClientRect().top + win.scrollY - 12);
  return win;
}

async function runInSandbox(code, out, frame, focus) {
  out.hidden = false;
  out.replaceChildren();

  let win;
  try {
    win = await loadSandbox(frame, focus);
  } catch (error) {
    sandboxError(out, error);
    return;
  }

  // Обробники подій пишуть у консоль і після запуску — тому підміна лишається до наступного
  const print = (type) => (...args) => {
    out.querySelector(".hint")?.remove();
    line(out, type, args.map((a) => format(a)).join(" "));
  };
  win.console.log = win.console.table = win.console.info = print("log");
  win.console.error = win.console.warn = print("err");
  win.alert = (message) => line(out, "alert", String(message));

  await new Promise((resolve) => {
    win.addEventListener("error", (e) => {
      line(out, "err", e.error ? `${e.error.name}: ${e.error.message}` : e.message);
      resolve();
    });
    win.__konspektDone = resolve;
    const script = win.document.createElement("script");
    script.type = "module";
    script.textContent = `${code}\n;window.__konspektDone();`;
    win.document.body.append(script);
  });
  if (!out.hasChildNodes()) line(out, "log hint", "(у консоль поки нічого не виведено — дивись на сторінку нижче)");
}

function sandboxError(out, error) {
  out.hidden = false;
  out.replaceChildren();
  line(out, "err", `Пісочниця не завантажилась (${error.message}). Відкрий конспект через Live Server, а не як файл.`);
}

function line(out, type, text) {
  const div = document.createElement("div");
  div.className = `ln ${type}`;
  div.textContent = text;
  out.append(div);
}

// Значення виводимо приблизно так, як їх показує консоль браузера
function format(value, depth = 0, nested = false) {
  if (typeof value === "string") return nested ? JSON.stringify(value) : value;
  if (typeof value === "function") return value.toString().startsWith("class") ? `class ${value.name}` : `ƒ ${value.name || "anonymous"}()`;
  if (value === null || typeof value !== "object") return String(value);
  if (value.nodeType) return formatNode(value);
  if (typeof value.item === "function" && typeof value.length === "number") {
    return `${value.constructor.name}(${value.length}) [${Array.from(value, (n) => formatNode(n)).join(", ")}]`;
  }
  if (depth > 3) return Array.isArray(value) ? "[…]" : "{…}";
  if (Array.isArray(value)) return `[${value.map((v) => format(v, depth + 1, true)).join(", ")}]`;
  if (Object.prototype.toString.call(value) === "[object Error]") return `${value.name}: ${value.message}`;
  const name = value.constructor && value.constructor.name !== "Object" ? `${value.constructor.name} ` : "";
  const entries = Object.entries(value).map(([k, v]) => `${k}: ${format(v, depth + 1, true)}`);
  return `${name}{ ${entries.join(", ")} }`.replace("{  }", "{}");
}

// DOM-елемент — як у консолі браузера: <h1 id="title">Текст</h1>
function formatNode(node) {
  if (node.nodeType === 3) return JSON.stringify(node.textContent);
  if (node.nodeType === 9) return "#document";
  if (node.nodeType !== 1) return node.nodeName;
  const tag = node.tagName.toLowerCase();
  const attrs = Array.from(node.attributes, (a) => ` ${a.name}="${a.value}"`).join("");
  const text = node.textContent.trim().replace(/\s+/g, " ");
  const inner = node.children.length || text.length > 40 ? "…" : text;
  return `<${tag}${attrs}>${inner}</${tag}>`;
}
