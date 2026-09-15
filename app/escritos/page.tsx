import Link from "next/link";
import { listarEscritos } from "@/lib/github";

export default async function Escritos() {
  const posts = await listarEscritos();

  return (
    <section className="py-12">
      <h1 className="font-voice italic text-2xl mb-8">Escritos</h1>
      <ul className="space-y-6">
        {posts.map((post: any) => (
          <li key={post.slug} className="border-b border-current/20 pb-6">
            <Link href={`/escritos/${post.slug}`} className="font-voice text-lg">
              {post.titulo}
            </Link>
            <p className="text-sm opacity-70 mt-1">{post.resumo}</p>
            <div className="flex gap-2 mt-2">
              {post.tags?.map((tag: string) => (
                <span key={tag} className="font-mono text-xs border border-current/30 rounded-full px-2 py-0.5">
                  {tag}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}