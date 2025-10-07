// app.js
import { exec } from "child_process";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import { WebSocketServer } from "ws";

const port = process.env.PORT || 3000;
//,.
const app = express();
app.use(cors());
app.use(express.json());

import { startChecking, stopNextTime } from "./modules/checkerActions.js";

// --------------------- ENDPOINTS HTTP ---------------------

app.post("/start-checking", async (req, res) => {
  try {
    console.log("[HTTP] /start-checking body:", req.body);
    await startChecking(req?.body || exam);
    res.json({ noError: true });
  } catch (error) {
    console.error("[HTTP] /start-checking error:", error);
    res.json({ noError: false, message: error.message });
  }
});

app.get("/", (req, res) => {
  res.sendFile("interfaz.html", { root: "." });
});

app.get("/clear-buffer", (req, res) => {
  try {
    logsBuffer.length = 0;    // vacía el array
    if (logsBuffer.length !== 0) {
      throw new Error("No se vacio el buffer por alguna razon");
    }
    res.json({
      noError: true,
      bufferValue:logsBuffer
    })
  } catch (err) {
    res.json({
      noError: false,
      message: err.message
    })
  }
});

app.get("/stop-checking", (req, res) => {
  try {
    const force = Object.keys(req?.query || {}).includes("force");
    stopNextTime(force);
    res.json({ noError: true });
  } catch (error) {
    console.error("[HTTP] /stop-checking error:", error);
    res.json({ noError: false, message: error.message });
  }
});

// --------------------- HTTP SERVER + WS /ws ---------------------

// 1) Levantamos el servidor HTTP (Render: un solo puerto)
const server = app.listen(port, () => {
  _log(`Escuchando en el puerto ${port}`);

  // "abrir" (opcional en local)
  if (process.argv[2] === "abrir") {
    const url = `http://localhost:${port}/`;
    const start =
      process.platform == "darwin"
        ? "open"
        : process.platform == "win32"
          ? "start"
          : "xdg-open";
    exec(`${start} ${url}`);
  }
});

// 2) WebSocket en /ws
const wss = new WebSocketServer({ server, path: "/ws" });

// Buffer circular de últimos N logs
const MAX_BUFFER = 100;
const logsBuffer = []; // array de strings (líneas simples)

function pushLog(line) {
  if (typeof line !== "string") line = String(line);
  logsBuffer.push(line);
  if (logsBuffer.length > MAX_BUFFER) logsBuffer.shift();
}

// Helper broadcast JSON
function broadcast(obj) {
  const data = JSON.stringify(obj);
  for (const ws of wss.clients) {
    if (ws.readyState === 1) ws.send(data);
  }
}

// Exponer por si lo necesitas en otros módulos
app.locals.broadcast = (msg) => broadcast({ type: "log", line: String(msg), ts: Date.now(), level: "log" });

// Conexiones WS (solo lectura para clientes)
wss.on("connection", (ws) => {
  // Handshake: anuncia soporte & buffer
  ws.send(JSON.stringify({
    type: "hello",
    recording: true,           // indicamos que el servidor "guarda" logs
    bufferSize: MAX_BUFFER,
    stored: logsBuffer.length,
    ts: Date.now()
  }));

  // Enviar histórico (hasta 100)
  ws.send(JSON.stringify({
    type: "history",
    logs: logsBuffer
  }));
  //j
  // Nota: No aceptamos mensajes entrantes (es solo lectura)
  ws.on("message", () => { /* ignorado */ });

  // Keep-alive (ping/pong) para proxies
  ws.isAlive = true;
  ws.on("pong", () => (ws.isAlive = true));
});

// Keep-alive global
const heartbeat = setInterval(() => {
  for (const ws of wss.clients) {
    if (ws.isAlive === false) {
      try { ws.terminate(); } catch { }
      continue;
    }
    ws.isAlive = false;
    try { ws.ping(); } catch { }
  }
}, 30000);

wss.on("close", () => clearInterval(heartbeat));

// --------------------- REDIRECCIÓN DE console.* A WS + BUFFER ---------------------

const _log = console.log.bind(console);
const _error = console.error.bind(console);

function argsToLine(args) {
  return args.map(a => {
    if (typeof a === "string") return a;
    try { return JSON.stringify(a); } catch { return String(a); }
  }).join(" ");
}

console.log = (...args) => {
  const line = argsToLine(args);
  pushLog(line);
  broadcast({ type: "log", level: "log", line, ts: Date.now() });
  _log(...args); // sigue saliendo en consola
};

console.error = (...args) => {
  const line = argsToLine(args);
  pushLog(line);
  broadcast({ type: "log", level: "error", line, ts: Date.now() });
  _error(...args);
};

// Emitir errores no atrapados también
process.on("uncaughtException", (err) => {
  const line = `[uncaughtException] ${err?.stack || err}`;
  pushLog(line);
  broadcast({ type: "log", level: "error", line, ts: Date.now() });
  _error(err);
});
process.on("unhandledRejection", (reason) => {
  const line = `[unhandledRejection] ${reason}`;
  pushLog(line);
  broadcast({ type: "log", level: "error", line, ts: Date.now() });
  _error(reason);
});
