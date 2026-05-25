const sections = Array.from(document.querySelectorAll(".PresentationSection"));
const dots = Array.from(document.querySelectorAll(".progress-dot"));
const pageCount = document.querySelector(".page-count span");
const timeline = document.querySelector(".timeline span");
const countNode = document.querySelector(".metric-number");
const loaderClock = document.querySelector("#loader-clock");
const loaderDate = document.querySelector(".loader-date");
const loaderTime = document.querySelector(".loader-time");
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
let loaderDismissed = false;
let loaderTransitioning = false;
const loaderLineDelay = 320;
const loaderLineDuration = 2200;
const loaderLineCycleStart = performance.now() + loaderLineDelay;
let loaderClockTimer = null;

function updateLoaderClock() {
  if (!loaderClock) return;

  const now = new Date();
  const date = new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(now);
  const time = new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(now);

  if (loaderDate) loaderDate.textContent = date;
  if (loaderTime) loaderTime.textContent = time;
  loaderClock.setAttribute("datetime", now.toISOString());
}

updateLoaderClock();
if (loaderClock) {
  loaderClockTimer = window.setInterval(updateLoaderClock, 1000);
}

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
  if (!document.body.classList.contains("is-loading")) {
    timeline.style.width = `${((index + 1) / sections.length) * 100}%`;
  }
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

function finishLoader() {
  if (loaderDismissed || loaderTransitioning || !document.body.classList.contains("is-loading")) return;
  loaderTransitioning = true;
  loaderDismissed = true;

  const elapsed = performance.now() - loaderLineCycleStart;
  const normalized = elapsed < 0 ? elapsed : elapsed % loaderLineDuration;
  const waitForEmptyLine =
    elapsed < 0 ? Math.abs(elapsed) + loaderLineDuration : loaderLineDuration - normalized;

  window.setTimeout(() => {
    document.body.classList.add("loader-idle");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.body.classList.add("loader-expanding");

        window.setTimeout(() => {
          if (timeline) timeline.style.width = "0%";
          document.body.classList.add("loader-dismissing");

          window.setTimeout(() => {
            document.body.classList.add("loader-done");
            document.body.classList.remove("is-loading");
            document.body.classList.remove("loader-idle");
            document.body.classList.remove("loader-expanding");
            document.body.classList.remove("loader-dismissing");
            loaderTransitioning = false;
            if (loaderClockTimer) window.clearInterval(loaderClockTimer);

            window.setTimeout(() => {
              setActive(0);
            }, 260);
          }, 980);
        }, 1520);
      });
    });
  }, Math.max(0, waitForEmptyLine));
}

function isLoaderActive() {
  return document.body.classList.contains("is-loading");
}

dots.forEach((dot) => {
  dot.addEventListener("click", () => goTo(Number(dot.dataset.target)));
});

document.querySelectorAll("[data-target]").forEach((button) => {
  button.addEventListener("click", () => goTo(Number(button.dataset.target)));
});

window.addEventListener(
  "wheel",
  (event) => {
    if (Math.max(Math.abs(event.deltaY), Math.abs(event.deltaX)) < 18) return;
    if (isLoaderActive()) {
      event.preventDefault();
      finishLoader();
      return;
    }
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
    if (isLoaderActive()) {
      finishLoader();
      return;
    }
    stepTo(currentIndex + 1);
  }

  if (prevKeys.includes(event.key)) {
    event.preventDefault();
    if (isLoaderActive()) {
      finishLoader();
      return;
    }
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
    if (isLoaderActive()) {
      finishLoader();
      return;
    }
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
