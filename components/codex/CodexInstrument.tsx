"use client";

import { useEffect, useRef, useState } from "react";

type Zona = "infra" | "frontend" | "backend";

const ZONAS: Record<Zona, { titulo: string; cor: string; chips: string[]; caso: string }> = {
    infra: {
        titulo: "Infra & confiabilidade",
        cor: "#C1571F",
        chips: ["Docker", "CI/CD"],
        caso: "Prova ao vivo: uptime e horário de deploy deste site.",
    },
    frontend: {
        titulo: "Frontend",
        cor: "#4C7A9E",
        chips: ["React", "Next.js", "Tailwind"],
        caso: "Projetos práticos em construção.",
    },
    backend: {
        titulo: "Backend",
        cor: "#8A6E4B",
        chips: ["Node.js", "TypeScript", "Nest.js"],
        caso: "Caso real: Sistema Retífica Exacta, em produção desde 2023.",
    },
};

function anguloDoEvento(e: MouseEvent | TouchEvent, svg: SVGSVGElement) {
    const rect = svg.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const ponto = "touches" in e ? e.touches[0] : e;
    const x = ponto.clientX - cx;
    const y = ponto.clientY - cy;
    return (Math.atan2(y, x) * 180) / Math.PI + 90;
}

function zonaPorAngulo(deg: number): Zona {
    const norm = ((deg % 360) + 360) % 360;
    if (norm > 60 && norm <= 180) return "frontend";
    if (norm > 180 && norm <= 300) return "backend";
    return "infra";
}

export function CodexInstrument() {
    const svgRef = useRef<SVGSVGElement>(null);
    const [angulo, setAngulo] = useState(0);
    const [arrastando, setArrastando] = useState(false);
    const zona = zonaPorAngulo(angulo);
    const dados = ZONAS[zona];

    useEffect(() => {
        if (!arrastando) return;

        function mover(e: MouseEvent | TouchEvent) {
            if (!svgRef.current) return;
            setAngulo(anguloDoEvento(e, svgRef.current));
        }
        function soltar() {
            setArrastando(false);
        }

        window.addEventListener("mousemove", mover);
        window.addEventListener("mouseup", soltar);
        window.addEventListener("touchmove", mover);
        window.addEventListener("touchend", soltar);

        return () => {
            window.removeEventListener("mousemove", mover);
            window.removeEventListener("mouseup", soltar);
            window.removeEventListener("touchmove", mover);
            window.removeEventListener("touchend", soltar);
        };
    }, [arrastando]);

    return (
        <div className="max-w-sm mx-auto text-center">
            <svg
                ref={svgRef}
                width="260"
                height="260"
                viewBox="0 0 260 260"
                className="mx-auto"
                onMouseDown={() => setArrastando(true)}
                onTouchStart={() => setArrastando(true)}
                style={{ touchAction: "none", cursor: arrastando ? "grabbing" : "grab" }}
            >
                <circle cx="130" cy="130" r="112" fill="none" stroke="var(--pagina-texto)" strokeWidth={0.6} />
                <g style={{ transformOrigin: "130px 130px", transform: `rotate(${angulo}deg)` }}>
                    <line x1="130" y1="130" x2="130" y2="30" stroke={dados.cor} strokeWidth={1.6} strokeLinecap="round" />
                    <circle cx="130" cy="130" r="4" fill="var(--pagina-texto)" />
                </g>
            </svg>

            <div className="mt-3 min-h-[70px]">
                <p className="font-voice italic text-lg" style={{ color: dados.cor }}>
                    {dados.titulo}
                </p>
                <div className="flex gap-1.5 justify-center flex-wrap my-1.5">
                    {dados.chips.map((c) => (
                        <span key={c} className="text-xs border border-current/30 rounded-full px-2 py-0.5 font-mono">
                            {c}
                        </span>
                    ))}
                </div>
                <p className="text-xs opacity-70">{dados.caso}</p>
            </div>
        </div>
    );
}