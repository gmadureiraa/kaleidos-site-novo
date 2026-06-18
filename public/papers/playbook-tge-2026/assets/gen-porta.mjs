// Gera a ilustração "porta/portal de lançamento" da capa via Gemini (nano banana).
import fs from "node:fs";
const KEY = fs.readFileSync("/Users/gabrielmadureira/GOS/code/fabrica-sintetica/.env.local","utf8")
  .split("\n").find(l=>l.startsWith("GEMINI_API_KEY=")).split("=").slice(1).join("=").trim();

const PROMPT = `A cinematic dark sci-fi illustration of a glowing portal / launch gateway, vertical composition, centered. A monolithic rocket-launch gantry tower merged with a luminous circular doorway, neon magenta-pink (#d262b2) and electric green (#7CF067) light spilling out of the portal, deep black background with subtle techy grid. A single silhouetted figure standing small at the base looking up into the portal of light, conveying "entering a new era / token launch". Volumetric light, mist, premium editorial cover art, high contrast, no text, no logos, no watermark. Style: dark premium fintech / web3 brand, dramatic, aspirational.`;

const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${KEY}`;
const body = {
  contents: [{ parts: [{ text: PROMPT }] }],
  generationConfig: { responseModalities: ["IMAGE"], imageConfig: { aspectRatio: "1:1" } }
};
const r = await fetch(url, { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(body) });
const j = await r.json();
if (!r.ok) { console.error("ERR", r.status, JSON.stringify(j).slice(0,500)); process.exit(1); }
const part = j.candidates?.[0]?.content?.parts?.find(p=>p.inlineData);
if (!part) { console.error("no image", JSON.stringify(j).slice(0,500)); process.exit(1); }
fs.mkdirSync("/Users/gabrielmadureira/GOS/code/kaleidos-papers/playbook-tge-2026/assets/generated",{recursive:true});
fs.writeFileSync("/Users/gabrielmadureira/GOS/code/kaleidos-papers/playbook-tge-2026/assets/generated/porta.png", Buffer.from(part.inlineData.data,"base64"));
console.log("OK porta.png", part.inlineData.data.length, "b64 chars");
