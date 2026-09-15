import Link from "next/link";
import { ModoNoturno } from "@/components/codex/ModoNoturno";

export function Cabecalho() {
  return (
    <header className="flex justify-between items-center max-w-3xl mx-auto py-6 px-4 text-sm">
      <Link href="/" className="font-mono">jonatas.dev</Link>
      <div className="flex items-center gap-6">
        <nav className="flex gap-6">
          <Link href="/projetos">projetos</Link>
          <Link href="/escritos">escritos</Link>
          <Link href="/sobre">sobre</Link>
        </nav>
        <div className="flex items-center gap-3 text-xs">
          <a href="https://github.com/jonatasmota404" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/jonatas-jr/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="mailto:jonatasjr.019@gmail.com">Contato</a>
        </div>
        <ModoNoturno />
      </div>
    </header>
  );
}