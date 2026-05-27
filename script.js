const sections = Array.from(document.querySelectorAll(".PresentationSection"));
const dots = Array.from(document.querySelectorAll(".progress-dot"));
const pageCount = document.querySelector(".page-count span");
const timeline = document.querySelector(".timeline span");
const countNode = document.querySelector(".metric-number");
const loaderPattern = document.querySelector(".BrandLoader-pattern");
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
let loaderPatternTimer = null;
let loaderPatternPaths = [];
let loaderPatternTick = 0;
let viewportSyncTimer = null;
const loaderPatternWaveInterval = 140;
const loaderPatternGoldenRatio = 0.618033988749895;
const loaderPatternTau = Math.PI * 2;

function getViewportHeight() {
  return Math.round(window.visualViewport?.height || window.innerHeight);
}

function syncViewportHeight(shouldRealign = false) {
  const viewportHeight = getViewportHeight();
  document.documentElement.style.setProperty("--app-height", `${viewportHeight}px`);

  if (!shouldRealign || document.body.classList.contains("is-loading")) return;

  window.clearTimeout(viewportSyncTimer);
  viewportSyncTimer = window.setTimeout(() => {
    sections[currentIndex]?.scrollIntoView({ behavior: "auto", block: "start" });
  }, 90);
}

syncViewportHeight();

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

async function mountAnimatedLoaderPattern() {
  if (!loaderPattern) return;

  const mountSvg = (svgText) => {
    loaderPattern.innerHTML = svgText;
    loaderPattern.classList.add("is-inline");
    loaderPatternPaths = Array.from(loaderPattern.querySelectorAll("path"));
    loaderPatternTick = 0;

    const patternSvg = loaderPattern.querySelector("svg");
    const viewBox = patternSvg?.viewBox?.baseVal;
    const patternWidth = viewBox?.width || 489;
    const patternHeight = viewBox?.height || 489;

    loaderPatternPaths.forEach((path, index) => {
      path.dataset.fill = path.getAttribute("fill") || "";
      path.dataset.opacity = path.getAttribute("opacity") || "1";
      path.dataset.stroke = path.getAttribute("stroke") || "";
      path.dataset.strokeWidth = path.getAttribute("stroke-width") || "";

      try {
        const box = path.getBBox();
        path.dataset.cx = String((box.x + box.width / 2) / patternWidth);
        path.dataset.cy = String((box.y + box.height / 2) / patternHeight);
      } catch (error) {
        path.dataset.cx = String(((index * loaderPatternGoldenRatio) % 1 + 1) % 1);
        path.dataset.cy = String((((index + 1) * loaderPatternGoldenRatio * 0.73) % 1 + 1) % 1);
      }

      path.dataset.phase = String((index * loaderPatternGoldenRatio) % 1);
      path.style.setProperty("opacity", path.dataset.opacity || "1", "important");
    });
  };

  const loadPatternViaFrame = () =>
    new Promise((resolve, reject) => {
      const frame = document.createElement("iframe");
      frame.src = "./assets/bork-ginza-pattern-loader.svg";
      frame.hidden = true;
      frame.setAttribute("aria-hidden", "true");
      frame.style.position = "absolute";
      frame.style.width = "0";
      frame.style.height = "0";
      frame.style.border = "0";

      const cleanup = () => frame.remove();

      frame.addEventListener(
        "load",
        () => {
          try {
            const svg = frame.contentDocument?.documentElement;
            if (!svg || svg.tagName.toLowerCase() !== "svg") throw new Error("Pattern frame is empty");
            resolve(svg.outerHTML);
          } catch (error) {
            reject(error);
          } finally {
            cleanup();
          }
        },
        { once: true }
      );

      frame.addEventListener(
        "error",
        () => {
          cleanup();
          reject(new Error("Pattern frame failed"));
        },
        { once: true }
      );

      document.body.appendChild(frame);
    });

  try {
    let svgText = "";
    const inlinePatternTemplate = document.querySelector("#loader-pattern-template");

    if (inlinePatternTemplate) {
      svgText = inlinePatternTemplate.innerHTML.trim();
    }

    if (!svgText) {
      try {
        const response = await fetch("./assets/bork-ginza-pattern-loader.svg");
        if (response.ok) svgText = await response.text();
      } catch (error) {
        svgText = "";
      }
    }

    if (!svgText) {
      svgText = await loadPatternViaFrame();
    }

    mountSvg(svgText);

    const animatePatternWaves = () => {
      if (!document.body.classList.contains("is-loading") || loaderPatternPaths.length === 0) {
        if (loaderPatternTimer) window.clearInterval(loaderPatternTimer);
        return;
      }

      loaderPatternTick += 1;
      const time = loaderPatternTick * 0.085;
      const focusX = 0.5 + Math.sin(time * 0.72) * 0.34;
      const focusY = 0.5 + Math.cos(time * 0.58) * 0.28;

      loaderPatternPaths.forEach((path, index) => {
        const x = Number(path.dataset.cx || 0.5);
        const y = Number(path.dataset.cy || 0.5);
        const phase = Number(path.dataset.phase || 0);
        const fill = (path.dataset.fill || "").toLowerCase();
        const isAccent = fill === "#c6602c";
        const dx = x - focusX;
        const dy = y - focusY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const diagonalWave = Math.sin((x * 1.34 + y * 1.92 + phase * 0.65 - time * 0.36) * loaderPatternTau);
        const radialWave = Math.sin((distance * 4.8 - time * 0.42 + phase) * loaderPatternTau);
        const columnWave = Math.sin((x * 5.1 - time * 0.18 + phase * 0.38) * loaderPatternTau);
        const energy = diagonalWave * 0.52 + radialWave * 0.34 + columnWave * 0.14;
        const low = isAccent ? 0.24 : 0.34;
        const high = isAccent ? 1 : 1;
        const normalized = Math.max(0, Math.min(1, (energy + 1) / 2));
        const shaped = Math.pow(normalized, 0.82);
        const opacity = low + (high - low) * shaped;
        const brightness = isAccent ? 0.76 + shaped * 0.62 : 0.82 + shaped * 0.36;
        const contrast = isAccent ? 1 + shaped * 0.42 : 1 + shaped * 0.18;
        const saturate = isAccent ? 0.78 + shaped * 0.72 : 0.92 + shaped * 0.16;
        const glow = isAccent && shaped > 0.52;

        path.style.setProperty("fill", path.dataset.fill, "important");
        path.style.setProperty("opacity", opacity.toFixed(3), "important");
        path.style.setProperty(
          "filter",
          `${glow ? "drop-shadow(0 0 7px rgba(190, 83, 28, 0.52)) " : ""}brightness(${brightness.toFixed(
            2
          )}) contrast(${contrast.toFixed(2)}) saturate(${saturate.toFixed(2)})`,
          "important"
        );
      });
    };

    animatePatternWaves();
    loaderPatternTimer = window.setInterval(animatePatternWaves, loaderPatternWaveInterval);
  } catch (error) {
    loaderPattern.classList.remove("is-inline");
    loaderPattern.innerHTML =
      '<img class="BrandLoader-patternImage" src="./assets/bork-ginza-pattern-loader.svg" alt="" aria-hidden="true" />';
  }
}

mountAnimatedLoaderPattern();

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
            if (loaderPatternTimer) window.clearInterval(loaderPatternTimer);

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

window.addEventListener("resize", () => syncViewportHeight(true), { passive: true });
window.addEventListener("orientationchange", () => syncViewportHeight(true), { passive: true });
window.visualViewport?.addEventListener("resize", () => syncViewportHeight(true), { passive: true });
window.visualViewport?.addEventListener("scroll", () => syncViewportHeight(false), { passive: true });

setActive(0);

window.addEventListener("load", () => {
  syncViewportHeight(true);
  if (!window.location.hash) {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }
});
