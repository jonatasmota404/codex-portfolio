import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Frontmatter = { titulo: string; resumo: string; data: string };
export type ItemDeConteudo = Frontmatter & { slug: string };

function listarPasta(pasta: "escritos" | "projetos"): ItemDeConteudo[] {
  const dir = path.join(process.cwd(), "content", pasta);
  return fs
    .readdirSync(dir)
    .filter((arquivo) => arquivo.endsWith(".mdx"))
    .map((arquivo) => {
      const slug = arquivo.replace(/\.mdx$/, "");
      const bruto = fs.readFileSync(path.join(dir, arquivo), "utf8");
      const { data } = matter(bruto);
      return { slug, ...(data as Frontmatter) };
    });
}

export const listarEscritos = () => listarPasta("escritos");
export const listarProjetos = () => listarPasta("projetos");