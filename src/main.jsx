import React from "react";
import ReactDOM from "react-dom/client";
import EpsPro from "./App.jsx";

// Filet de sécurité contre le "pull-to-refresh" : certains navigateurs/webviews
// ignorent encore overscroll-behavior (défini dans index.html). On bloque le geste
// nous-mêmes quand la page est déjà tout en haut et que le doigt tire vers le bas,
// sans gêner le scroll normal du contenu.
let departToucheY = 0;
document.addEventListener("touchstart", (e) => {
  departToucheY = e.touches[0].clientY;
}, { passive: true });
document.addEventListener("touchmove", (e) => {
  const yActuel = e.touches[0].clientY;
  if (window.scrollY === 0 && yActuel > departToucheY) {
    e.preventDefault();
  }
}, { passive: false });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <EpsPro />
  </React.StrictMode>
);
