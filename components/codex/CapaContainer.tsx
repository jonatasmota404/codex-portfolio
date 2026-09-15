"use client";

import { useEffect, useState } from "react";

export function CapaContainer({ children }: { children: React.ReactNode }) {
  const [tocar, setTocar] = useState(false);
  const [capaVisivel, setCapaVisivel] = useState(true);

  useEffect(() => {
    const iniciar = setTimeout(() => setTocar(true), 200);
    const remover = setTimeout(() => setCapaVisivel(false), 3400);
    return () => {
      clearTimeout(iniciar);
      clearTimeout(remover);
    };
  }, []);

  return (
    <div className="relative" style={{ perspective: "2200px" }}>
      {children}

      {capaVisivel && (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-50 rounded-sm"
          style={{
            transformOrigin: "left center",
            transformStyle: "preserve-3d",
            animation: tocar
              ? "abrirCapa 3s cubic-bezier(0.65, 0, 0.35, 1) forwards"
              : "none",
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.06), transparent 60%), " +
              "repeating-linear-gradient(115deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 5px), " +
              "#211D16",
            boxShadow:
              "inset 0 0 0 2px rgba(217,210,191,0.25), inset 0 0 0 7px rgba(0,0,0,0.3), 8px 8px 24px rgba(0,0,0,0.5)",
          }}
        >
          <div className="h-full flex flex-col items-center justify-center gap-4">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ border: "1.5px solid #5B8770" }}
            >
              <div className="w-2 h-2 rounded-full bg-verdigris" />
            </div>
            <span className="font-voice italic text-lg text-parchment px-6 text-center leading-snug">
              o caderno do engenheiro
            </span>
          </div>
        </div>
      )}

      <style>{`
        @keyframes abrirCapa {
          0%   { transform: rotateY(0deg); }
          65%  { transform: rotateY(-130deg); }
          100% { transform: rotateY(-118deg); }
        }
      `}</style>
    </div>
  );
}