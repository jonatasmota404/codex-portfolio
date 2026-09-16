import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import crypto from "crypto";

function assinaturaValida(corpo: string, assinaturaRecebida: string | null): boolean {
    if (!assinaturaRecebida) return false;
    const esperada =
        "sha256=" +
        crypto.createHmac("sha256", process.env.GITHUB_WEBHOOK_SECRET!).update(corpo).digest("hex");
    return crypto.timingSafeEqual(Buffer.from(esperada), Buffer.from(assinaturaRecebida));
}

export async function POST(req: NextRequest) {
    const corpo = await req.text();
    const assinatura = req.headers.get("x-hub-signature-256");

    if (!assinaturaValida(corpo, assinatura)) {
        return NextResponse.json({ erro: "assinatura inválida" }, { status: 401 });
    }

    const payload = JSON.parse(corpo);
    const nomeRepo = payload.repository?.name;

    if (nomeRepo) {
        revalidateTag(`repo:${nomeRepo}`, { expire: 0 });
        if (nomeRepo !== "escritos") revalidateTag("repo:lista", { expire: 0 });
    }
    return NextResponse.json({ recebido: true });
}