import matter from "gray-matter";


const GITHUB_USER = "jonatasmota404"; 
const REPO_ESCRITOS = "escritos";

async function githubFetch(url: string) {
  const resposta = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
    },
    next: { revalidate: 3600 }, // revalida no máximo 1x por hora
  });

  if (!resposta.ok) {
    throw new Error(`GitHub API falhou: ${resposta.status}`);
  }
  return resposta.json();
}

export async function listarRepositorios() {
  const repos = await githubFetch(
    `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100`
  );
  return repos.filter((r: any) => r.topics?.includes("portfolio"));
}

async function listarArquivosMdx(repo: string) {
  const arquivos = await githubFetch(`https://api.github.com/repos/${GITHUB_USER}/${repo}/contents/`);
  return arquivos.filter((a: any) => a.name.endsWith(".mdx"));
}

export async function buscarArquivoRaw(repo: string, path: string): Promise<string> {
  const resposta = await fetch(`https://api.github.com/repos/${GITHUB_USER}/${repo}/contents/${path}`, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github.raw+json",
    },
    next: { revalidate: 3600 },
  });
  if (!resposta.ok) throw new Error(`Falha ao buscar ${path}: ${resposta.status}`);
  return resposta.text();
}

export async function listarEscritos() {
  const arquivos = await listarArquivosMdx(REPO_ESCRITOS);

  return Promise.all(
    arquivos.map(async (arquivo: any) => {
      const bruto = await buscarArquivoRaw(REPO_ESCRITOS, arquivo.name);
      const { data } = matter(bruto);
      const slug = arquivo.name.replace(/\.mdx$/, "");
      return { slug, ...(data as any) };
    })
  );
}

export async function buscarReadme(repo: string): Promise<string | null> {
  const resposta = await fetch(`https://api.github.com/repos/${GITHUB_USER}/${repo}/readme`, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github.raw+json",
    },
    next: { revalidate: 3600 },
  });

  if (!resposta.ok) return null; // repositório sem README
  return resposta.text();
}