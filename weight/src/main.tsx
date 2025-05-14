import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App
      height={800}
      radiusLeft={30 + Math.random() * 100}
      radiusRight={200 + Math.random() * 100}
    />
  </StrictMode>
);

