import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer } from "vite";
import { type Server } from "http";

const viteLogger = {
  info: (msg: string) => log(msg),
  warn: (msg: string) => log(msg),
  error: (msg: string) => log(msg),
  warnOnce: () => {},
  clearScreen: () => {},
  hasErrorLogged: () => false,
  hasWarned: false,
};

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const vite = await createViteServer({
    configFile: path.resolve(import.meta.dirname, "..", "vite.config.ts"),
    server: { middlewareMode: true, hmr: { server } },
    appType: "spa",
    customLogger: viteLogger,
  });
  app.use(vite.middlewares);
  return vite;
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(import.meta.dirname, "../dist/public");
  if (!fs.existsSync(distPath)) throw new Error(`Could not find the build directory: ${distPath}`);
  app.use(express.static(distPath));
  app.use("*", (_req, res) => { res.sendFile(path.resolve(distPath, "index.html")); });
}
