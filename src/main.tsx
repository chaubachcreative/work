import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

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
