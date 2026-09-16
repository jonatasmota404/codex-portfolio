import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt", "en"],
  defaultLocale: "pt",
  localePrefix: "as-needed", // português sem prefixo (/escritos), inglês com prefixo (/en/escritos)
});