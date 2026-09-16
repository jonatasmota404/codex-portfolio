import Link from "next/link";
import { listarRepositorios, listarEscritos } from "@/lib/github";
import { SecaoProjetosFiltrada } from "@/components/codex/SecaoProjetosFiltrada";
import { useTranslations } from "next-intl";

export default async function Home() {
  const t = useTranslations("home");
  const repos = (await listarRepositorios()).slice(0, 2);
  const posts = (await listarEscritos()).slice(0, 3);

  return (
    <div className="py-12 space-y-16">
      <section className="text-center">
        <p className="font-mono text-xs text-oxide mb-2">{t("tagline")}</p>
        <h1 className="font-voice italic text-3xl mb-4 max-w-lg mx-auto">{t("titulo")}</h1>
        <p className="text-sm opacity-70 max-w-md mx-auto mb-8">{t("descricao")}</p>
        <SecaoProjetosFiltrada repos={repos} />
      </section>

      <section>
        <div className="flex justify-between items-baseline mb-4">
          <h2 className="font-voice italic text-xl">Projetos em destaque</h2>
          <Link href="/projetos" className="text-xs font-mono">ver todos →</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {repos.map((repo: any) => (
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
      </section>

      <section>
        <div className="flex justify-between items-baseline mb-4">
          <h2 className="font-voice italic text-xl">Últimos escritos</h2>
          <Link href="/escritos" className="text-xs font-mono">ver todos →</Link>
        </div>
        <ul className="space-y-3">
          {posts.map((post: any) => (
            <li key={post.slug}>
              <Link href={`/escritos/${post.slug}`} className="font-voice italic">
                {post.titulo}
              </Link>
              <p className="text-sm opacity-70">{post.resumo}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="text-center border-t border-current/20 pt-10">
        <p className="font-voice italic text-lg mb-4">Vamos conversar</p>
        <div className="flex justify-center gap-4 text-sm font-mono">
          <a href="mailto:seu@email.com" className="border border-current/30 rounded-full px-4 py-1.5">
            Contato
          </a>
          <a href="/curriculo.pdf" download className="border border-current/30 rounded-full px-4 py-1.5">
            Baixar currículo
          </a>
        </div>
      </section>
    </div>
  );
}