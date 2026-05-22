const sections = Array.from(document.querySelectorAll(".PresentationSection"));
const dots = Array.from(document.querySelectorAll(".progress-dot"));
const pageCount = document.querySelector(".page-count span");
const timeline = document.querySelector(".timeline span");
const countNode = document.querySelector(".metric-number");
const cascadeTextNodes = Array.from(document.querySelectorAll(".hero-title span:first-child, .section-title"));

if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

if (!window.location.hash) {
  window.scrollTo(0, 0);
  requestAnimationFrame(() => window.scrollTo(0, 0));
}

let currentIndex = 0;
let countAnimated = false;
let wheelLocked = false;
let touchStartY = 0;

function padPage(value) {
  return String(value + 1).padStart(2, "0");
}

function animateMetric() {
  if (countAnimated || !countNode) return;
  countAnimated = true;

  const target = Number(countNode.dataset.count || 60);
  const start = performance.now();
  const duration = 1300;

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    countNode.textContent = Math.round(target * eased);
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

function setActive(index) {
  currentIndex = index;

  sections.forEach((section, sectionIndex) => {
    section.classList.toggle("active", sectionIndex === index);
  });

  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === index);
  });

  pageCount.textContent = padPage(index);
  timeline.style.width = `${((index + 1) / sections.length) * 100}%`;
  document.body.classList.toggle("light-ui", index === 1);

  if (index === 3) {
    window.setTimeout(animateMetric, 260);
  }
}

function goTo(index) {
  const nextIndex = Math.max(0, Math.min(index, sections.length - 1));
  sections[nextIndex].scrollIntoView({ behavior: "smooth", block: "start" });
}

function stepTo(index) {
  if (wheelLocked) return;
  wheelLocked = true;
  goTo(index);
  window.setTimeout(() => {
    wheelLocked = false;
  }, 900);
}

function mountTextCascade() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  cascadeTextNodes.forEach((node) => {
    const text = node.textContent;
    if (!text || node.dataset.cascadeReady === "true") return;

    node.dataset.cascadeReady = "true";
    node.classList.add("TextCascade");
    node.setAttribute("aria-label", text.trim());
    node.textContent = "";

    let charIndex = 0;

    text.split(/(\s+)/).forEach((part) => {
      if (!part) return;

      if (/^\s+$/.test(part)) {
        const space = document.createElement("span");
        space.className = "cascade-space";
        space.textContent = " ";
        space.setAttribute("aria-hidden", "true");
        node.appendChild(space);
        return;
      }

      const word = document.createElement("span");
      word.className = "cascade-word";
      word.setAttribute("aria-hidden", "true");

      Array.from(part).forEach((char) => {
        const span = document.createElement("span");
        span.className = "char";
        span.style.setProperty("--char-index", String(Math.min(charIndex, 42)));
        span.textContent = char;
        word.appendChild(span);
        charIndex += 1;
      });

      node.appendChild(word);
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;
    setActive(Number(visible.target.dataset.index));
  },
  {
    threshold: [0.42, 0.58, 0.72],
  }
);

sections.forEach((section) => observer.observe(section));
mountTextCascade();

dots.forEach((dot) => {
  dot.addEventListener("click", () => goTo(Number(dot.dataset.target)));
});

document.querySelectorAll("[data-target]").forEach((button) => {
  button.addEventListener("click", () => goTo(Number(button.dataset.target)));
});

window.addEventListener(
  "wheel",
  (event) => {
    if (Math.abs(event.deltaY) < 18) return;
    event.preventDefault();
    stepTo(currentIndex + (event.deltaY > 0 ? 1 : -1));
  },
  { passive: false }
);

window.addEventListener("keydown", (event) => {
  const nextKeys = ["ArrowDown", "ArrowRight", "PageDown", " "];
  const prevKeys = ["ArrowUp", "ArrowLeft", "PageUp"];

  if (nextKeys.includes(event.key)) {
    event.preventDefault();
    stepTo(currentIndex + 1);
  }

  if (prevKeys.includes(event.key)) {
    event.preventDefault();
    stepTo(currentIndex - 1);
  }

  if (event.key === "Home") {
    event.preventDefault();
    goTo(0);
  }

  if (event.key === "End") {
    event.preventDefault();
    goTo(sections.length - 1);
  }
});

window.addEventListener(
  "touchstart",
  (event) => {
    touchStartY = event.touches[0].clientY;
  },
  { passive: true }
);

window.addEventListener(
  "touchend",
  (event) => {
    const delta = touchStartY - event.changedTouches[0].clientY;
    if (Math.abs(delta) < 42) return;
    stepTo(currentIndex + (delta > 0 ? 1 : -1));
  },
  { passive: true }
);

window.addEventListener(
  "scroll",
  () => {
    const progress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    document.documentElement.style.setProperty("--scroll-progress", String(Math.max(0, Math.min(1, progress))));
  },
  { passive: true }
);

setActive(0);

window.addEventListener("load", () => {
  if (!window.location.hash) {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }
});
