import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface SensiSettings {
  general: number;
  redDot: number;
  scope2x: number;
  scope4x: number;
  sniperScope: number;
  freeLook: number;
  dpi?: number;
  buttonSize?: number;
  tips: string[];
}

export async function generateSensitivity(device: string, dpi: string, style: string): Promise<SensiSettings> {
  const prompt = `Gere uma configuração de sensibilidade otimizada para Free Fire.
  Dispositivo: ${device}
  DPI Atual: ${dpi}
  Estilo de Jogo: ${style}
  
  Retorne um JSON com os valores de 0 a 100 para: geral, ponto vermelho, mira 2x, mira 4x, mira awm (sniper), olhadinha.
  Também sugira um DPI ideal e tamanho de botão de atirar.
  Inclua 3 dicas curtas e profissionais para melhorar o capa (headshot).`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          general: { type: Type.INTEGER },
          redDot: { type: Type.INTEGER },
          scope2x: { type: Type.INTEGER },
          scope4x: { type: Type.INTEGER },
          sniperScope: { type: Type.INTEGER },
          freeLook: { type: Type.INTEGER },
          dpi: { type: Type.INTEGER },
          buttonSize: { type: Type.INTEGER },
          tips: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["general", "redDot", "scope2x", "scope4x", "sniperScope", "freeLook", "tips"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
}
