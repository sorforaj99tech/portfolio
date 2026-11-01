const $ = (id) => document.getElementById(id);
const D = DATA;
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const list = (a) => `<ul class="chk">${a.map((x) => `<li>${x}</li>`).join("")}</ul>`;
const chips = (a) => `<div class="chips">${a.map((x) => `<span class="chip">${x}</span>`).join("")}</div>`;
const set = (id, h) => ($(id).innerHTML = h);
const toast = (m, bad) => { const t = $("toast"); t.textContent = m; t.className = "show" + (bad ? " err" : ""); clearTimeout(toast.t); toast.t = setTimeout(() => (t.className = ""), 3500); };

/* ---------- loader (types the logo, runs on every refresh) ---------- */
(function () {
  const L = $("loader"), t = $("ldText"), pct = $("ldPct"), bar = L.querySelector(".ld-bar i");
  const name = D.name.toLowerCase().replace(/\s+/g, "_");
  let p = 0, k = 0, loaded = document.readyState === "complete";
  addEventListener("load", () => (loaded = true));
  const iv = setInterval(() => {
    if (k < name.length) t.textContent = name.slice(0, ++k);
    p = Math.min(p + (loaded ? 8 : 2.5), loaded ? 100 : 90);
    bar.style.width = p + "%"; pct.textContent = Math.floor(p) + "%";
    if (p >= 100 && k >= name.length) {
      clearInterval(iv);
      setTimeout(() => { L.classList.add("done"); document.body.classList.remove("loading"); }, 300);
    }
  }, 60);
})();

/* ---------- basics ---------- */
document.title = `${D.name} | ${D.role}`;
$("logoName").textContent = D.name.toLowerCase().replace(/\s+/g, "_");
$("hName").textContent = D.name;
$("hRole").textContent = D.role;
$("hTag").textContent = D.tagline;
["dlResume", "dlResume2", "viewResume"].forEach((i) => ($(i).href = D.resume));
const links = `<a href="${D.github}" target="_blank" rel="noopener">[GitHub]</a><a href="${D.linkedin}" target="_blank" rel="noopener">[LinkedIn]</a><a href="mailto:${D.email}">[Email]</a>`;
set("hSocial", links);

/* ---------- round photo (data.js path, or click to preview another) ---------- */
const photo = $("photo");
const fallback = "data:image/svg+xml;utf8," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320"><rect width="320" height="320" fill="#041109"/><text x="50%" y="52%" fill="#00ff66" font-family="monospace" font-size="64" text-anchor="middle">&lt;/&gt;</text></svg>`);
photo.onerror = () => { photo.onerror = null; photo.src = fallback; };
let saved = null;
try { saved = localStorage.getItem("photo"); } catch (e) {}
photo.src = saved || D.photo;
$("file").addEventListener("change", (e) => {
  const f = e.target.files[0];
  if (!f) return;
  const r = new FileReader();
  r.onload = () => { photo.src = r.result; try { localStorage.setItem("photo", r.result); } catch (e) {} };
  r.readAsDataURL(f);
});

/* ---------- typing effect ---------- */
(function () {
  const el = $("typed"); let i = 0, j = 0, del = false;
  if (reduce) { el.textContent = D.typed[0]; return; }
  (function tick() {
    const w = D.typed[i];
    el.textContent = w.slice(0, j);
    if (!del && j === w.length) { del = true; return setTimeout(tick, 1600); }
    if (del && j === 0) { del = false; i = (i + 1) % D.typed.length; }
    j += del ? -1 : 1;
    setTimeout(tick, del ? 25 : 55);
  })();
})();

/* ---------- matrix rain (light, pauses when tab hidden) ---------- */
(function () {
  if (reduce) return;
  const c = $("rain"), x = c.getContext("2d"), chars = "01{}[]<>/=+;$#abcdef".split("");
  let cols, drops;
  const size = () => { c.width = innerWidth; c.height = innerHeight; cols = Math.floor(c.width / 16); drops = Array(cols).fill(0).map(() => Math.random() * -50); };
  size(); addEventListener("resize", size);
  setInterval(() => {
    if (document.hidden) return;
    x.fillStyle = "rgba(0,0,0,.08)"; x.fillRect(0, 0, c.width, c.height);
    x.fillStyle = "#00ff66"; x.font = "14px monospace";
    drops.forEach((y, i) => {
      x.fillText(chars[(Math.random() * chars.length) | 0], i * 16, y * 16);
      drops[i] = y * 16 > c.height && Math.random() > 0.975 ? 0 : y + 1;
    });
  }, 70);
})();

/* ---------- render sections from data ---------- */
set("bio", D.bio.map((p) => `<p style="margin-bottom:14px">${p}</p>`).join("") + chips(["Frontend", "Backend", "REST API", "Web Scraping", "R&D", "Automation"]));
const statCard = (s) => `<div class="stat rv"><b data-n="${s[0]}">${s[0]}</b>${s[1]}</div>`;
set("stats", D.stats.map(statCard).join(""));
set("expGrid", D.expertise.map((e) => `<article class="card hov rv"><div class="ico">${e.icon}</div><h3>${e.title}</h3><p>${e.text}</p>${list(e.items)}</article>`).join(""));
set("stack", `<div class="stk">${Object.entries(D.stack).map(([k, v]) => `<h4>${k}</h4><div class="chips">${v.map((t) => `<span class="chip lg">${t}</span>`).join("")}</div>`).join("")}</div>`);

/* projects + filters + case-study modal */
const types = ["All", "Frontend", "Backend", "Full-Stack", "R&D"];
set("filters", types.map((t, i) => `<button class="btn" aria-pressed="${i === 0}" data-f="${t}">${t}</button>`).join(""));
const pcard = (p, i) => `<article class="pcard rv" data-t="${p.type}">
  <div class="pimg">${p.img ? `<img src="${p.img}" alt="${p.name} screenshot" loading="lazy">` : `<pre aria-hidden="true">┌──────────┐\n│ ${p.type.padEnd(8)} │\n│  &lt;/&gt;     │\n└──────────┘</pre>`}</div>
  <div class="pbody"><div class="meta">${p.type}</div><h3>${p.name}</h3><p>${p.desc}</p>
  <dl><dt>Problem</dt><dd>${p.problem}</dd><dt>Solution</dt><dd>${p.solution}</dd><dt>Features</dt><dd>${p.features.join(", ")}</dd>${p.results.length ? `<dt>Results</dt><dd>${p.results.join("; ")}</dd>` : ""}</dl>
  ${chips(p.tech)}<div class="row">${p.live ? `<a class="btn" href="${p.live}" target="_blank" rel="noopener">Live Demo</a>` : ""}${p.repo ? `<a class="btn" href="${p.repo}" target="_blank" rel="noopener">GitHub</a>` : ""}<button class="btn" data-case="${i}">${p.study ? "Case Study" : "Details"}</button></div></div></article>`;
set("projects", D.projects.map(pcard).join(""));
$("filters").addEventListener("click", (e) => {
  const b = e.target.closest("button"); if (!b) return;
  document.querySelectorAll("#filters button").forEach((x) => x.setAttribute("aria-pressed", x === b));
  document.querySelectorAll(".pcard").forEach((c) => (c.hidden = b.dataset.f !== "All" && c.dataset.t !== b.dataset.f));
});
const steps = ["problem", "research", "strategy", "architecture", "development", "testing", "optimization", "result", "challenges", "lessons"];
const modal = $("modal");
modal.addEventListener("close", () => (document.body.style.overflow = ""));
$("projects").addEventListener("click", (e) => {
  const b = e.target.closest("[data-case]"); if (!b) return;
  const p = D.projects[b.dataset.case], s = p.study;
  const body = s ? steps.map((k) => `<h4>${k[0].toUpperCase() + k.slice(1)}</h4><p>${s[k]}</p>`).join("")
    : `<div class="meta">${p.type}</div><p>${p.desc}</p><h4>Problem</h4><p>${p.problem}</p><h4>Solution</h4><p>${p.solution}</p><h4>Features</h4>${list(p.features)}${p.results.length ? `<h4>Results</h4>${list(p.results)}` : ""}<h4>Tech</h4>${chips(p.tech)}`;
  set("modalBody", `<div class="cs"><h3>${p.name}${s ? ": case study" : ""}</h3>${body}</div>`);
  modal.showModal(); document.body.style.overflow = "hidden";
});
$("closeModal").onclick = () => modal.close();
modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); });

/* R&D lab */
const labKeys = [["objective", "Research Objective"], ["problem", "Problem"], ["hypothesis", "Hypothesis"], ["approach", "Approach"], ["technology", "Technology"], ["experiment", "Experiment"], ["results", "Results"], ["findings", "Findings"], ["future", "Future Work"]];
set("lab", D.lab.map((l, i) => `<article class="lcard rv"><header><h3>exp_${String(i + 1).padStart(2, "0")}: ${l.title}</h3><span class="st">${l.status}</span></header><dl>${labKeys.map(([k, n]) => `<dt>${n}</dt><dd>${l[k]}</dd>`).join("")}</dl><button class="btn more" aria-expanded="false">Read more</button></article>`).join(""));

$("lab").addEventListener("click", (e) => {
  const b = e.target.closest(".more"); if (!b) return;
  const o = b.closest(".lcard").classList.toggle("open");
  b.textContent = o ? "Show less" : "Read more"; b.setAttribute("aria-expanded", o);
});

set("timeline", D.experience.map((x) => `<article class="tl rv"><div class="when">${x.duration}</div><h3>${x.position} @ ${x.company}</h3>${list(x.duties)}${x.impact.length ? `<h4 style="margin-top:12px">Impact</h4>${list(x.impact)}` : ""}${chips(x.tech)}</article>`).join(""));
set("svc", D.services.map((s) => `<div class="card hov rv"><div class="ico">${s[0]}</div><h3>${s[1]}</h3><p>${s[2]}</p></div>`).join(""));
const r = D.resumeData;
set("resumeBox", `<h3>Professional summary</h3><p>${r.summary}</p><h3 style="margin-top:16px">Skills</h3><p>${r.skills}</p><h3 style="margin-top:16px">Experience</h3><p>${D.experience.map((x) => `${x.position}, ${x.company} (${x.duration})`).join("<br>")}</p><h3 style="margin-top:16px">Projects</h3><p>${D.projects.map((p) => p.name).join(", ")}</p><h3 style="margin-top:16px">Education</h3><p>${r.education}</p>`);
set("contactInfo", `<h3>Reach me directly</h3><p style="margin:12px 0">Email: <a href="mailto:${D.email}">${D.email}</a></p><p>GitHub: <a href="${D.github}" target="_blank" rel="noopener">${D.github.replace("https://", "")}</a></p><p>LinkedIn: <a href="${D.linkedin}" target="_blank" rel="noopener">${D.linkedin.replace("https://", "")}</a></p>`);
set("foot", `<div><b class="logo">&gt; ${D.name}</b><p>${D.role}. Engineering, experimentation, research.</p></div><nav aria-label="Footer">${[...document.querySelectorAll("#menu a")].map((a) => a.outerHTML).join("")}</nav><div>${links}</div><p style="width:100%">© ${new Date().getFullYear()} ${D.name}. All rights reserved.</p>`);

/* ---------- contact form ---------- */
$("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const f = e.target, m = $("formMsg"), btn = f.querySelector("button[type=submit]"), v = Object.fromEntries(new FormData(f));
  const bad = (t) => { m.className = "err"; m.textContent = t; toast(t, true); };
  if (!v.name.trim() || !/^\S+@\S+\.\S+$/.test(v.email) || !v.message.trim()) return bad("Error: enter your name, a valid email and a message.");
  if (!D.formEndpoint) {
    location.href = `mailto:${D.email}?subject=${encodeURIComponent(v.type + " inquiry from " + v.name)}&body=${encodeURIComponent(v.message + "\n\n" + v.email)}`;
    m.className = "ok"; m.textContent = "Opening your email app to send this message."; return;
  }
  btn.disabled = true; btn.textContent = "Sending...";
  try {
    const res = await fetch(D.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json", "X-CSRFToken": v.csrfmiddlewaretoken }, body: JSON.stringify(v) });
    if (!res.ok) throw res.status;
    f.reset(); m.className = "ok"; m.textContent = "Message sent. I will reply within 48 hours."; toast("Message sent successfully");
  } catch (err) { bad(`Error${err ? " (" + err + ")" : ""}: message not sent. Please email ${D.email} directly.`); }
  btn.disabled = false; btn.textContent = "Send Message";
});

/* ---------- nav: burger, scrolled state, active link, reveal, counters ---------- */
const menu = $("menu");
$("burger").onclick = () => { const o = menu.classList.toggle("open"); $("burger").setAttribute("aria-expanded", o); };
menu.addEventListener("click", () => { menu.classList.remove("open"); $("burger").setAttribute("aria-expanded", false); });
addEventListener("scroll", () => { $("nav").classList.toggle("scrolled", scrollY > 10); $("toTop").classList.toggle("show", scrollY > 600); }, { passive: true });
$("toTop").onclick = () => scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
const spy = () => {
  let id = "home";
  document.querySelectorAll("section[id]").forEach((x) => { if (x.getBoundingClientRect().top <= 140) id = x.id; });
  document.querySelectorAll("#menu a").forEach((a) => a.classList.toggle("on", a.getAttribute("href") === "#" + id));
};
addEventListener("scroll", spy, { passive: true }); spy();
function count(el) {
  const m = el.dataset.n.match(/^(\d+)(.*)$/); if (!m || reduce) return;
  const end = +m[1], t0 = performance.now();
  (function step(t) { const p = Math.min((t - t0) / 1200, 1); el.textContent = Math.round(end * p) + m[2]; if (p < 1) requestAnimationFrame(step); })(t0);
}
const rv = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); const b = e.target.querySelector("[data-n]"); if (b) count(b); rv.unobserve(e.target); } }), { threshold: 0.12 });
document.querySelectorAll(".rv").forEach((el) => { el.style.animationDelay = ([...el.parentNode.children].indexOf(el) % 3) * 90 + "ms"; rv.observe(el); });