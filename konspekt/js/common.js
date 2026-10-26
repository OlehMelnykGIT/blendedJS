// Спільні помічники для всіх сторінок конспекту.
// Кожен урок імпортує звідси те, що потрібно: js/lesson-N.js

// --- підсвічування коду в <pre class="code"> ---
export const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const RE = /(\/\/.*$|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|\b(function|return|if|else|switch|case|break|default|const|let|for|while|typeof|true|false|null)\b|\b(\d+)\b|\b([A-Za-z_]\w*)(?=\()/gm;
export function highlightCode() {
  document.querySelectorAll("pre.code").forEach((pre) => {
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
const shipping = [["China", 100], ["Chile", 250], ["Australia", 170], ["Jamaica", 120]];
live(["h4c"], () => {
  const c = $("h4c").value;
  const price = renderCases("h4viz", shipping, c, "return \"Sorry…\"");
  printTo("h4out", [["ret", show(price === null ? "Sorry, there is no delivery to your country" : `Shipping to ${c} will cost ${price} credits`)]]);
});
