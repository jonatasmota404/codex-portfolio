"use client";

import { useEffect, useState } from "react";

export function ModoNoturno() {
  const [noite, setNoite] = useState(false);

  // Roda uma vez, só no cliente: lê a preferência salva e aplica.
  useEffect(() => {
    const salvo = localStorage.getItem("codex-modo") === "noite";
    setNoite(salvo);
    document.documentElement.classList.toggle("night", salvo);
  }, []);

  function alternar() {
    const novoValor = !noite;
    setNoite(novoValor);
    document.documentElement.classList.toggle("night", novoValor);
    localStorage.setItem("codex-modo", novoValor ? "noite" : "dia");
  }

  return (
    <button onClick={alternar} className="text-xs font-mono border border-current/30 rounded-full px-3 py-1">
      {noite ? "☾ noite" : "☀ dia"}
    </button>
  );
}