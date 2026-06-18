import { redirect } from "next/navigation";

/**
 * O pitch deck da Kaleidos virou um documento HTML self-contained
 * (slides horizontais com animação) em `public/apresentacao/deck.html`.
 * Esta rota apenas redireciona pra ele — a versão React antiga ficou
 * preservada em `page.tsx.bak`.
 */
export default function ApresentacaoPage() {
  redirect("/apresentacao/deck.html");
}
