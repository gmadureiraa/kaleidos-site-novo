import { NextRequest, NextResponse } from "next/server";

// HTTP Basic Auth no painel interno /app. Senha via env (APP_DASHBOARD_PASSWORD),
// com fallback pro valor combinado. Usuário: kaleidos. noindex é aplicado na página.
const USER = "kaleidos";
const PASS = process.env.APP_DASHBOARD_PASSWORD || "Digital2505@";

export function middleware(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth) {
    const [scheme, encoded] = auth.split(" ");
    if (scheme === "Basic" && encoded) {
      const decoded = Buffer.from(encoded, "base64").toString("utf8");
      const idx = decoded.indexOf(":");
      const user = decoded.slice(0, idx);
      const pass = decoded.slice(idx + 1);
      if (user === USER && pass === PASS) {
        return NextResponse.next();
      }
    }
  }
  return new NextResponse("Auth necessária", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Kaleidos App", charset="UTF-8"' },
  });
}

export const config = {
  matcher: ["/app", "/app/:path*"],
};
