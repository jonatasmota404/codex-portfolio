import { listarEscritos } from "@/lib/github";
import { ListaEscritos } from "@/components/codex/ListaEscritos";

export default async function Escritos() {
  const posts = await listarEscritos();

  return (
    <section className="py-12">
      <h1 className="font-voice italic text-2xl mb-8">Escritos</h1>
      <ListaEscritos posts={posts} />
    </section>
  );
}