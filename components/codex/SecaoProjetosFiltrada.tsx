"use client";

import { useState } from "react";
import Link from "next/link";
import { CodexInstrument } from "@/components/codex/CodexInstrument";

type Repo = { name: string; description: string; topics?: string[] };

export function SecaoProjetosFiltrada({ repos }: { repos: Repo[] }) {
  const [zona, setZona] = useState<"infra" | "frontend" | "backend">("infra");

  const filtrados = repos.filter((r) => r.topics?.includes(zona));
  const mostrar = filtrados.length > 0 ? filtrados : repos.slice(0, 2);

  return (
    <>
      <CodexInstrument onZonaMudar={setZona} />
      <div className="grid gap-4 sm:grid-cols-2 mt-10">
        {mostrar.map((repo) => (
          <Link
            key={repo.name}
            href={`/projetos/${repo.name}`}
            className="block border border-current/20 rounded p-4 hover:border-current/50 transition-colors"
          >
            <h3 className="font-voice italic text-lg mb-1">{repo.name}</h3>
            <p className="text-sm opacity-70">{repo.description}</p>
          </Link>
        ))}
      </div>
    </>
  );
}