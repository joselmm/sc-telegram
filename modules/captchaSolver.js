const DEFAULT_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_MODEL = "meta-llama/llama-4-scout-17b-16e-instruct";

/** genera string aleatorio alfanumérico de n caracteres */
function randString(n = 4) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let s = "";
    for (let i = 0; i < n; i++) s += chars[Math.floor(Math.random() * chars.length)];
    return s;
}

/** intenta extraer JSON de una cadena (busca la primera llave { ... }) */
function tryExtractJson(text) {
    const first = text.indexOf("{");
    const last = text.lastIndexOf("}");
    if (first !== -1 && last !== -1 && last > first) {
        const candidate = text.slice(first, last + 1);
        try {
            return JSON.parse(candidate);
        } catch (e) {
            return null;
        }
    }
    return null;
}

/** intenta sacar valor de solved con regex */
function tryExtractSolvedFromText(text) {
    const m = text.match(/"solved"\s*:\s*"([^"]*)"/i);
    if (m) return m[1];
    // también aceptar 'solved':'...' (comillas simples)
    const m2 = text.match(/'solved'\s*:\s*'([^']*)'/i);
    if (m2) return m2[1];
    return null;
}

/**
 * Función principal
 */
export async function solveCaptcha(base64, options = {}) {
    if (!base64 || typeof base64 !== "string") {
        throw new Error("Se requiere la cadena base64 (string) como primer argumento.");
    }

    const apiKey = options.apiKey || process.env.GROQ_API_KEY;
    if (!apiKey) throw new Error("API key faltante: pásala en options.apiKey o en la variable de entorno GROQ_API_KEY.");

    const apiUrl = options.apiUrl || DEFAULT_API_URL;
    const model = options.model || DEFAULT_MODEL;

    // Mensaje system (en español) que indica restricción de salida
    const systemMessage = {
        role: "system",
        content: [
            {
                type: "text",
                text: "Eres un captcha solver. SOLO debes devolver un JSON válido EXACTAMENTE con la forma {\"solved\":\"<texto>\"} y NADA MÁS. " +
                    "Si reconoces texto en la imagen, coloca ese texto en <texto>. Si no ves texto o no puedes leerlo, devuelve un string aleatorio de 4 caracteres. " +
                    "No escribas explicaciones, ni comentarios, ni JSON adicional, ni código, solo caractes alfanumericos del ingles, ni texto fuera del JSON."
            }
        ]
    };

    // Mensaje user con la imagen en base64
    const userMessage = {
        role: "user",
        content: [
            {
                type: "text",
                text: "Piensa paso a paso antes de responder, analiza bien la imagen y razona, cuestiona y duda, Resuelve el captcha de la siguiente imagen y devuelve solo el JSON requerido."
            },
            {
                type: "image_url",
                image_url: { url: base64 }
            }
        ]
    };

    const body = {
        messages: [systemMessage, userMessage],
        model,
        temperature: 0.0,
        max_completion_tokens: 256,
        top_p: 1,
        stream: false,
        stop: null
    };

    // Llamada HTTP
    const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify(body)
    });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`API request failed ${res.status} ${res.statusText} - ${text}`);
    }

    // Parse respuesta
    const data = await res.json();

    // Aquí intentamos varias formas de extraer el contenido textual que el modelo haya devuelto
    let rawText = "";

    // Estructuras comunes: OpenAI-like choices[0].message.content (string or array)
    try {
        if (Array.isArray(data?.choices) && data.choices.length > 0) {
            const msg = data.choices[0].message;
            if (msg) {
                if (typeof msg.content === "string") {
                    rawText = msg.content;
                } else if (Array.isArray(msg.content)) {
                    // concatenar los segments tipo text
                    rawText = msg.content.map(c => (c.type === "text" ? (c.text ?? "") : "")).join("\n").trim();
                    if (!rawText) {
                        // si no hay text entries, intentar serializar cualquier content
                        rawText = JSON.stringify(msg.content);
                    }
                } else {
                    rawText = JSON.stringify(msg.content);
                }
            }
        }

        // algunas APIs devuelven data.output_text o similar
        if (!rawText && typeof data?.output_text === "string") {
            rawText = data.output_text;
        }

        // fallback: stringify whole body
        if (!rawText) rawText = JSON.stringify(data);
    } catch (e) {
        rawText = JSON.stringify(data);
    }

    // Intentar extraer JSON exacto
    let solvedValue = null;
    const parsed = tryExtractJson(rawText);
    if (parsed && typeof parsed === "object" && parsed.hasOwnProperty("solved")) {
        solvedValue = String(parsed.solved ?? "");
    } else {
        // intentar extraer por regex
        const s = tryExtractSolvedFromText(rawText);
        if (s !== null) solvedValue = String(s);
    }

    // Si no obtuvimos nada o está vacío, generar fallback aleatorio de 4 chars
    if (!solvedValue) {
        solvedValue = randString(4);
    }

    // Aseguramos que siempre devolvemos la forma { solved: "..." }
    return { solved: solvedValue };
}

export default solveCaptcha;
