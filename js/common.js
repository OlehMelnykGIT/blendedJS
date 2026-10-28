// Спільні помічники для всіх сторінок конспекту.
// Кожен урок імпортує звідси те, що потрібно: js/lesson-N.js

// --- підсвічування коду в <pre class="code"> ---
export const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const RE = /(\/\/.*$|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|\b(function|return|if|else|switch|case|break|default|const|let|for|of|while|typeof|true|false|null|undefined|class|extends|new|this|super|throw|static)\b|\b(\d+)\b|\b([A-Za-z_]\w*)(?=\()/gm;
// Без аргументу підсвічує всі блоки на сторінці, з аргументом — лише один <pre>
export function highlightCode(target) {
  const blocks = target ? [target] : document.querySelectorAll("pre.code");
  blocks.forEach((pre) => {
    const src = pre.textContent;
    let out = "", last = 0;
    src.replace(RE, (m, c, s, k, n, f, i) => {
      out += esc(src.slice(last, i));
      const cls = c ? "c" : s ? "s" : k ? "k" : n ? "n" : "f";
      out += `<span class="tk-${cls}">${esc(m)}</span>`;
      last = i + m.length;
      return m;
    });
    pre.innerHTML = out + esc(src.slice(last));
  });
}

// --- DOM і вивід у «консоль» пісочниці ---
export const $ = (id) => document.getElementById(id);
export const show = (v) => (typeof v === "string" ? JSON.stringify(v) : String(v));
export function printTo(id, lines) {
  $(id).innerHTML = lines.map(([t, v]) => `<div class="ln ${t}">${esc(v)}</div>`).join("");
}
export function live(ids, fn) {
  ids.forEach((id) => $(id).addEventListener("input", fn));
  fn();
}
// "1" in quotes → string, plain number → number, anything else → string
export function parseArg(raw) {
  const t = raw.trim();
  if (/^(["'`]).*\1$/.test(t)) return t.slice(1, -1);
  if (t !== "" && !isNaN(Number(t))) return Number(t);
  return t;
}

// --- підсвічування гілки switch ---
export function renderCases(el, cases, value, defLabel) {
  const hit = cases.findIndex(([k]) => k === value);
  $(el).innerHTML = cases.map(([k, v], i) => `<div class="${i === hit ? "hit" : ""}"><span>case ${esc(JSON.stringify(k))}:</span><span>${esc(v)}</span></div>`).join("") +
    `<div class="${hit === -1 ? "hit" : ""}"><span>default:</span><span>${esc(defLabel)}</span></div>`;
  return hit === -1 ? null : cases[hit][1];
}

// --- масиви ---
// "1, 2, \"3\"" → [1, 2, "3"]; порожній рядок → []
export function parseList(raw) {
  if (raw.trim() === "") return [];
  return raw.split(",").map(parseArg);
}

// Масив комірками з індексами. marks: { індекс: "hit" | "new" | "dim" }
export function renderArray(items, marks = {}) {
  if (items.length === 0) return '<div class="arr"><span class="arr-empty">[ ]</span></div>';
  return `<div class="arr">${items
    .map((v, i) => `<div class="cell ${marks[i] || ""}"><small>${i}</small><span>${esc(show(v))}</span></div>`)
    .join("")}</div>`;
}
