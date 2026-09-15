import "./globals.css";
import { EB_Garamond, Cormorant, JetBrains_Mono } from "next/font/google";

const corpo = EB_Garamond({ subsets: ["latin"], variable: "--font-serif" });
const titulos = Cormorant({ subsets: ["latin"], style: "italic", variable: "--font-voice" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata = {
  title: "Jônatas Júnior — engenheiro fullstack",
  description: "Backend, frontend e infra — um caderno de estudo em construção.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${corpo.variable} ${titulos.variable} ${mono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}