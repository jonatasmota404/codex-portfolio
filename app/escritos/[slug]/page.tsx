import { MDXRemote } from "next-mdx-remote/rsc";
import { buscarReadme } from "@/lib/github";
import { CodexPlate, CodexTraco, CodexAnnotation } from "@/components/codex/CodexPlate";

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
        components={{ CodexPlate, CodexTraco, CodexAnnotation }}
        options={{ blockJS: false }}
      />
    </article>
  );
}