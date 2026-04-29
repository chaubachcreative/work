import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const motionStyles = `
  @media (prefers-reduced-motion: no-preference) {
    .motion-nav {
      animation: motionNavIn 520ms cubic-bezier(.2,.8,.2,1) both;
    }

    .motion-reveal {
      opacity: 0;
      transform: translateY(22px);
      transition: opacity 640ms cubic-bezier(.2,.8,.2,1), transform 640ms cubic-bezier(.2,.8,.2,1);
      transition-delay: var(--motion-delay, 0ms);
    }

    .motion-reveal.motion-visible {
      opacity: 1;
      transform: translateY(0);
    }

    .motion-interactive {
      transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease, background-color 180ms ease, color 180ms ease;
    }

    .motion-interactive:hover {
      transform: translateY(-2px);
    }

    .motion-card {
      transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease;
    }

    .motion-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 18px 42px rgba(0, 0, 0, 0.08);
      border-color: rgba(0, 0, 0, 0.28) !important;
    }

    @keyframes motionNavIn {
      from { opacity: 0; transform: translateY(-12px); }
      to { opacity: 1; transform: translateY(0); }
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .motion-reveal {
      opacity: 1;
      transform: none;
    }
  }
`;

function installMotionStyles() {
  if (document.getElementById("site-motion-styles")) return;
  const style = document.createElement("style");
  style.id = "site-motion-styles";
  style.textContent = motionStyles;
  document.head.appendChild(style);
}

function setupMotion() {
  installMotionStyles();

  const root = document.getElementById("root");
  if (!root) return;

  root.querySelectorAll("nav").forEach((nav) => nav.classList.add("motion-nav"));

  root.querySelectorAll("a, button").forEach((item) => {
    item.classList.add("motion-interactive");
  });

  root.querySelectorAll<HTMLElement>(".card, section > div > div, form section button").forEach((item) => {
    const text = item.textContent?.trim() || "";
    if (text.length > 12) item.classList.add("motion-card");
  });

  const revealItems = Array.from(
    root.querySelectorAll<HTMLElement>("main > section, main > div, form section, table tr, footer"),
  ).filter((item) => !item.dataset.motionReady);

  revealItems.forEach((item, index) => {
    item.dataset.motionReady = "true";
    item.classList.add("motion-reveal");
    item.style.setProperty("--motion-delay", `${Math.min(index % 6, 5) * 55}ms`);
  });

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("motion-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("motion-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
  );

  revealItems.forEach((item) => observer.observe(item));
}

function bootMotion() {
  setupMotion();
  window.setTimeout(setupMotion, 350);
  window.setTimeout(setupMotion, 900);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootMotion, { once: true });
} else {
  bootMotion();
}

function ViteReactRuntime() {
  return null;
}

const mount = document.getElementById("vite-react-root");

if (mount) {
  createRoot(mount).render(
    <React.StrictMode>
      <ViteReactRuntime />
    </React.StrictMode>,
  );
}
