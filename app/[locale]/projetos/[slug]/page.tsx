import { MDXRemote } from "next-mdx-remote/rsc";
import { buscarReadme } from "@/lib/github";
import { CodexPlate, CodexTraco, CodexAnnotation } from "@/components/codex/CodexPlate";
import { CodexEsboco } from "@/components/codex/CodexEsboco";
import { listarRepositorios } from "@/lib/github";
import { Mermaid } from "@/components/codex/Mermaid";

export async function generateStaticParams() {
  const repos = await listarRepositorios();
  return repos.map((repo: any) => ({ slug: repo.name }));
}

export default async function Projeto({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const readme = await buscarReadme(slug);

  if (!readme) {
    return <p className="py-12">Este projeto não tem README.</p>;
  }

  return (
    <article className="py-12">
      <h1 className="font-voice italic text-3xl mb-8">{slug}</h1>
      <MDXRemote
        source={readme}
        components={{ CodexPlate, CodexTraco, CodexAnnotation, CodexEsboco, Mermaid }}
        options={{ blockJS: false }}
      />
    </article>
  );
}