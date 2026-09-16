"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { ModoNoturno } from "@/components/codex/ModoNoturno";

export function Cabecalho() {
  const t = useTranslations("nav");

  return (
    <header className="flex justify-between items-center max-w-3xl mx-auto py-6 px-4 text-sm">
      <Link href="/" className="font-mono">jonatas.dev</Link>
      <div className="flex items-center gap-6">
        <nav className="flex gap-6">
          <Link href="/projetos">{t("projetos")}</Link>
          <Link href="/escritos">{t("escritos")}</Link>
          <Link href="/sobre">{t("sobre")}</Link>
        </nav>
        <div className="flex items-center gap-3 text-xs">
          <a href="https://github.com/jonatasmota404" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/SEU_USUARIO" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="mailto:seu@email.com">Contato</a>
        </div>
        <ModoNoturno />
      </div>
    </header>
  );
}