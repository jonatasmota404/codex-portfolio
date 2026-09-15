import Link from "next/link";
import { listarRepositorios } from "@/lib/github";

export default async function Projetos() {
  const repos = await listarRepositorios();

  return (
    <section className="py-12">
      <h1 className="font-voice italic text-2xl mb-8">Projetos</h1>
      <ul className="space-y-6">
        {repos.map((repo: any) => (
          <li key={repo.name} className="border-b border-current/20 pb-6">
            <Link href={`/projetos/${repo.name}`} className="font-voice text-lg">
              {repo.name}
            </Link>
            <p className="text-sm opacity-70 mt-1">{repo.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}