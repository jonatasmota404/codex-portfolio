import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { buscarArquivoRaw, listarEscritos } from "@/lib/github";
import { CodexPlate, CodexTraco, CodexAnnotation } from "@/components/codex/CodexPlate";
import { CodexEsboco } from "@/components/codex/CodexEsboco";
import { Mermaid } from "@/components/codex/Mermaid";

export async function generateStaticParams() {
  const posts = await listarEscritos();
  return posts.map((post: any) => ({ slug: post.slug }));
}

export default async function Artigo({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const bruto = await buscarArquivoRaw("escritos", `${slug}.mdx`);
  const { content, data } = matter(bruto);

  return (
    <article className="py-12">
      <p className="font-mono text-xs opacity-60 mb-2">{data.data}</p>
      <h1 className="font-voice italic text-3xl mb-8">{data.titulo}</h1>
      <MDXRemote
        source={content}
        components={{ CodexPlate, CodexTraco, CodexAnnotation, CodexEsboco, Mermaid }}
        options={{ blockJS: false }}
      />
    </article>
  );
}