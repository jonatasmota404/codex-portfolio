"use client";

import { useEffect, useState } from "react";

// ============ MODO NOITE: céu estrelado ============

function gerarCampoEstrelas(qtd: number, seed: number) {
  const estrelas = [];
  let s = seed;
  for (let i = 0; i < qtd; i++) {
    s = (s * 9301 + 49297) % 233280;
    const r1 = s / 233280;
    s = (s * 9301 + 49297) % 233280;
    const r2 = s / 233280;
    
    // REDUZIDO: Antes era 0.1 + (i % 5) * 0.1
    // Agora vai gerar estrelas com metade do tamanho (de 0.05 a 0.25)
    estrelas.push({ x: r1 * 100, y: r2 * 100, r: 0.05 + (i % 5) * 0.05 });
  }
  return estrelas;
}
const ESTRELAS_FUNDO = gerarCampoEstrelas(140, 42);

// REDUZIDO: Os valores de 'r' nas constelações também foram diminuídos
const URSA_MAIOR = [
  { x: 12, y: 22, r: 0.3 }, { x: 20, y: 16, r: 0.25 }, { x: 29, y: 14, r: 0.2 },
  { x: 36, y: 18, r: 0.15 }, { x: 34, y: 26, r: 0.25 }, { x: 25, y: 28, r: 0.2 }, { x: 16, y: 30, r: 0.3 },
];
const URSA_LIGACOES = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 3]];

const ORION = [
  { x: 65, y: 8, r: 0.35 }, { x: 78, y: 10, r: 0.25 },
  { x: 69, y: 20, r: 0.18 }, { x: 72, y: 21, r: 0.2 }, { x: 75, y: 22, r: 0.18 },
  { x: 66, y: 34, r: 0.3 }, { x: 79, y: 33, r: 0.35 },
];
const ORION_LIGACOES = [[0, 2], [1, 4], [2, 3], [3, 4], [2, 5], [4, 6]];

function Constelacao({ estrelas, ligacoes }: { estrelas: { x: number; y: number; r: number }[]; ligacoes: number[][] }) {
  return (
    <g>
      {ligacoes.map(([a, b], i) => (
        <line key={i} x1={estrelas[a].x} y1={estrelas[a].y} x2={estrelas[b].x} y2={estrelas[b].y}
          stroke="var(--pagina-texto)" strokeWidth={0.06} opacity={0.3} />
      ))}
      {estrelas.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="var(--pagina-texto)" opacity={0.95} />
      ))}
    </g>
  );
}

function CampoDeEstrelas() {
  return (
    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
      <g style={{ transformOrigin: "50% 15%", animation: "girar-ceu 240s linear infinite" }}>
        {ESTRELAS_FUNDO.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="var(--pagina-texto)"
            style={{ animation: `piscar ${5 + (i % 6)}s ease-in-out ${i * 0.15}s infinite` }} />
        ))}
        <Constelacao estrelas={URSA_MAIOR} ligacoes={URSA_LIGACOES} />
        <Constelacao estrelas={ORION} ligacoes={ORION_LIGACOES} />
      </g>
    </svg>
  );
}

function MapaCelestialCodex() {
  return (
    <svg 
      className="w-full h-full" 
      viewBox="0 0 100 100" 
      preserveAspectRatio="xMidYMid slice"
      shapeRendering="geometricPrecision" /* <-- O segredo para acabar com o cerrilhado */
    >
      <g style={{ transformOrigin: "50% 15%", animation: "girar-ceu 240s linear infinite" }}>
        
        {/* Órbitas celestes - Mais finas e elegantes */}
        {[15, 30, 45, 60, 75, 90, 110].map((raio, i) => (
          <circle 
            key={`orbita-${i}`} 
            cx="50" cy="15" r={raio} 
            fill="none" 
            stroke="var(--pagina-texto)" 
            strokeWidth="0.06" 
            opacity="0.18" /* Reduzido para ficar sutil */
            strokeDasharray={i % 2 === 0 ? "0.5 1" : "none"} 
          />
        ))}

        {/* Meridianos */}
        {Array.from({ length: 24 }).map((_, i) => (
          <line 
            key={`meridiano-${i}`} 
            x1="50" y1="15" x2="50" y2="150" 
            transform={`rotate(${i * 15} 50 15)`} 
            stroke="var(--pagina-texto)" 
            strokeWidth="0.04" 
            opacity="0.12" 
          />
        ))}

        {/* Estrelas de fundo como cruzes de medição */}
        {ESTRELAS_FUNDO.map((s, i) => (
          <g key={`estrela-mapa-${i}`} transform={`translate(${s.x}, ${s.y})`} opacity="0.35">
            <line x1="-0.2" y1="0" x2="0.2" y2="0" stroke="var(--pagina-texto)" strokeWidth="0.05" />
            <line x1="0" y1="-0.2" x2="0" y2="0.2" stroke="var(--pagina-texto)" strokeWidth="0.05" />
          </g>
        ))}

        {/* Ursa Maior */}
        <g opacity="0.5"> {/* O sweet-spot da opacidade: nem 0.4, nem 0.7 */}
          {URSA_LIGACOES.map(([a, b], i) => (
            <line key={`ursa-linha-${i}`} x1={URSA_MAIOR[a].x} y1={URSA_MAIOR[a].y} x2={URSA_MAIOR[b].x} y2={URSA_MAIOR[b].y}
              stroke="var(--pagina-texto)" strokeWidth={0.08} strokeDasharray="0.5 0.8" />
          ))}
          {URSA_MAIOR.map((s, i) => (
            <circle key={`ursa-ponto-${i}`} cx={s.x} cy={s.y} r={s.r * 1.5} fill="none" stroke="var(--pagina-texto)" strokeWidth="0.07" />
          ))}
        </g>

        {/* Orion */}
        <g opacity="0.5">
          {ORION_LIGACOES.map(([a, b], i) => (
            <line key={`orion-linha-${i}`} x1={ORION[a].x} y1={ORION[a].y} x2={ORION[b].x} y2={ORION[b].y}
              stroke="var(--pagina-texto)" strokeWidth={0.08} strokeDasharray="0.5 0.8" />
          ))}
          {ORION.map((s, i) => (
            <rect 
              key={`orion-ponto-${i}`} 
              x={s.x - (s.r*1.2)} y={s.y - (s.r*1.2)} 
              width={s.r * 2.4} height={s.r * 2.4} 
              fill="none" 
              stroke="var(--pagina-texto)" 
              strokeWidth="0.07" 
              transform={`rotate(45 ${s.x} ${s.y})`} 
            />
          ))}
        </g>
      </g>
    </svg>
  );
}
// ============ Componente principal ============

export function AmbienteFundo() {
  const [noite, setNoite] = useState(false);

  useEffect(() => {
    setNoite(document.documentElement.classList.contains("night"));
    const observer = new MutationObserver(() => {
      setNoite(document.documentElement.classList.contains("night"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      {noite ? <CampoDeEstrelas /> : <MapaCelestialCodex />}
      <style>{`
        @keyframes piscar { 0%, 100% { opacity: 0.15; } 50% { opacity: 0.95; } }
        @keyframes girar-ceu { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        
      `}</style>
    </div>
  );
}