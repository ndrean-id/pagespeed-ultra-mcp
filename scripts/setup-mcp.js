#!/usr/bin/env node

/**
 * PageSpeed Ultra MCP - Automatic 1-Click Multi-Client Installer
 * Automatically detects and configures:
 *  - Claude Desktop
 *  - Cursor
 *  - Cline / Antigravity IDE
 *  - Claude Code
 */

import fs from "fs";
import path from "path";
import os from "os";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const serverPath = path.resolve(projectRoot, "dist", "index.js").replace(/\\/g, "/");

console.log("\n==========================================================");
console.log("  ⚡ PageSpeed Ultra MCP - 1-Click Multi-Client Installer ⚡");
console.log("==========================================================\n");
console.log(`Detected Server Path: ${serverPath}\n`);

const isWin = os.platform() === "win32";
const homeDir = os.homedir();
const appData = isWin ? process.env.APPDATA || path.join(homeDir, "AppData", "Roaming") : "";

const mcpConfigEntry = {
  command: "node",
  args: [serverPath],
};

let installedCount = 0;

// Helper to safely read and update JSON
function updateJsonConfig(filePath, clientName, mcpKey = "mcpServers") {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    let config = {};
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf8");
      try {
        config = JSON.parse(raw);
      } catch {
        console.warn(`[!] Existing config in ${filePath} was corrupted. Initializing fresh object.`);
        config = {};
      }
    }

    if (!config[mcpKey]) {
      config[mcpKey] = {};
    }

    config[mcpKey]["pagespeed-ultra"] = mcpConfigEntry;

    fs.writeFileSync(filePath, JSON.stringify(config, null, 2), "utf8");
    console.log(`✅ [${clientName}] Successfully configured in:\n   ${filePath}`);
    installedCount++;
  } catch (err) {
    console.error(`❌ [${clientName}] Error updating configuration:`, err.message);
  }
}

// 1. Configure Claude Desktop
let claudeConfigPath = "";
if (isWin && appData) {
  claudeConfigPath = path.join(appData, "Claude", "claude_desktop_config.json");
} else if (os.platform() === "darwin") {
  claudeConfigPath = path.join(homeDir, "Library", "Application Support", "Claude", "claude_desktop_config.json");
} else {
  claudeConfigPath = path.join(homeDir, ".config", "Claude", "claude_desktop_config.json");
}

updateJsonConfig(claudeConfigPath, "Claude Desktop", "mcpServers");

// 2. Configure Cursor
const cursorConfigPath = path.join(homeDir, ".cursor", "mcp.json");
updateJsonConfig(cursorConfigPath, "Cursor Editor", "mcpServers");

// 3. Configure Cline (VS Code & Antigravity IDE)
const possibleClineDirs = [
  path.join(appData, "Code", "User", "globalStorage", "saoudrizwan.claude-dev", "settings"),
  path.join(appData, "Antigravity IDE", "User", "globalStorage", "saoudrizwan.claude-dev", "settings"),
  path.join(appData, "Code - Insiders", "User", "globalStorage", "saoudrizwan.claude-dev", "settings"),
];

for (const cDir of possibleClineDirs) {
  if (fs.existsSync(path.dirname(cDir))) {
    const clineFile = path.join(cDir, "cline_mcp_settings.json");
    updateJsonConfig(clineFile, "Cline (VS Code / Antigravity)", "mcpServers");
  }
}

console.log("\n----------------------------------------------------------");
console.log(`🎉 Auto-configuration complete for ${installedCount} client(s)!`);
console.log("----------------------------------------------------------\n");

console.log("👉 FOR CLAUDE CODE CLI:");
console.log("Run this single command in your terminal:");
console.log(`claude mcp add pagespeed-ultra -- node "${serverPath}"\n`);

console.log("👉 FOR NPX ZERO-INSTALL (GLOBAL):");
console.log("You can also add via GitHub npx without cloning:");
console.log(`npx -y github:ndrean-id/pagespeed-ultra-mcp\n`);
