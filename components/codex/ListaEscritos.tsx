"use client";

import { useState } from "react";
import Link from "next/link";

type Post = {
  slug: string;
  titulo: string;
  resumo: string;
  tags?: string[];
};

export function ListaEscritos({ posts }: { posts: Post[] }) {
  const [tagAtiva, setTagAtiva] = useState<string | null>(null);

  const todasAsTags = Array.from(new Set(posts.flatMap((p) => p.tags ?? [])));

  const postsFiltrados = tagAtiva
    ? posts.filter((p) => p.tags?.includes(tagAtiva))
    : posts;

  return (
    <div>
      <div className="flex gap-2 flex-wrap mb-8">
        <button
          onClick={() => setTagAtiva(null)}
          className={`text-xs font-mono rounded-full px-3 py-1 border ${
            tagAtiva === null ? "border-verdigris text-verdigris" : "border-current/30"
          }`}
        >
          todos
        </button>
        {todasAsTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setTagAtiva(tag)}
            className={`text-xs font-mono rounded-full px-3 py-1 border ${
              tagAtiva === tag ? "border-verdigris text-verdigris" : "border-current/30"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <ul className="space-y-6">
        {postsFiltrados.map((post) => (
          <li key={post.slug} className="border-b border-current/20 pb-6">
            <Link href={`/escritos/${post.slug}`} className="font-voice text-lg">
              {post.titulo}
            </Link>
            <p className="text-sm opacity-70 mt-1">{post.resumo}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}