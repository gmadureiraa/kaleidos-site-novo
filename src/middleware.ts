import { NextRequest, NextResponse } from "next/server";

// HTTP Basic Auth no painel interno /app. Senha SÓ via env (APP_DASHBOARD_PASSWORD).
// Sem fallback: se a env não estiver setada, nega tudo (fail-closed) em vez de
// cair numa senha commitada no repo. Usuário: kaleidos.
const USER = "kaleidos";

// Compare em tempo constante (edge runtime não tem crypto.timingSafeEqual).
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

function unauthorized() {
  return new NextResponse("Auth necessária", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Kaleidos App", charset="UTF-8"' },
  });
}

export function middleware(req: NextRequest) {
  const expected = process.env.APP_DASHBOARD_PASSWORD;
  if (!expected) return unauthorized(); // fail-closed sem senha configurada

  const auth = req.headers.get("authorization");
  if (auth) {
    const [scheme, encoded] = auth.split(" ");
    if (scheme === "Basic" && encoded) {
      const decoded = Buffer.from(encoded, "base64").toString("utf8");
      const idx = decoded.indexOf(":");
      const user = decoded.slice(0, idx);
      const pass = decoded.slice(idx + 1);
      if (safeEqual(user, USER) && safeEqual(pass, expected)) {
        return NextResponse.next();
      }
    }
  }
  return unauthorized();
}

export const config = {
  matcher: ["/app", "/app/:path*"],
};
