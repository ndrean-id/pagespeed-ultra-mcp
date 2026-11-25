# PageSpeed Ultra MCP (WordPress, Elementor & Technical SEO)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](https://nodejs.org)
[![MCP](https://img.shields.io/badge/Protocol-MCP-purple)](https://modelcontextprotocol.io)

> **High-Performance Model Context Protocol (MCP) server engineered for WordPress & Elementor Technical SEO, zero Cumulative Layout Shift (CLS), zero Total Blocking Time (TBT), and 100/100 Google Core Web Vitals.**

Inspired by the speed benchmarks of **SastraPro** (by Mas Sugeng), this MCP server equips AI coding agents (**Claude Code, Cursor, Antigravity IDE, Cline, Claude Desktop**) with tools to audit, generate, and optimize web layouts for extreme Google PageSpeed scores.

---

## ⚡ 1-Click Easy Installation (Multi-Client)

You don't need complicated setups. Choose your preferred client below:

### 1. Claude Code CLI (1 Single Terminal Command)

Run this directly in your terminal:
```bash
claude mcp add pagespeed-ultra -- npx -y github:ndrean-id/pagespeed-ultra-mcp
```
*(No cloning or building needed! Claude Code will launch it automatically).*

---

### 2. Cursor Editor

Add to your Cursor MCP settings (`~/.cursor/mcp.json` or Cursor Settings -> Features -> MCP -> Add New MCP Server):

```json
{
  "mcpServers": {
    "pagespeed-ultra": {
      "command": "npx",
      "args": ["-y", "github:ndrean-id/pagespeed-ultra-mcp"]
    }
  }
}
```

---

### 3. Cline & Antigravity IDE

Open **Cline Settings** -> **MCP Servers** (or edit `cline_mcp_settings.json`):

```json
{
  "mcpServers": {
    "pagespeed-ultra": {
      "command": "npx",
      "args": ["-y", "github:ndrean-id/pagespeed-ultra-mcp"],
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

---

### 4. Claude Desktop

Add to your `%APPDATA%\Claude\claude_desktop_config.json` (Windows) or `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac):

```json
{
  "mcpServers": {
    "pagespeed-ultra": {
      "command": "npx",
      "args": ["-y", "github:ndrean-id/pagespeed-ultra-mcp"]
    }
  }
}
```

---

### 5. Automated 1-Click Installer (Local Repo)

If you clone the repo locally:
```bash
git clone https://github.com/ndrean-id/pagespeed-ultra-mcp.git
cd pagespeed-ultra-mcp
npm install
npm run setup
```
The setup script will auto-detect installed AI clients (Claude Desktop, Cursor, Cline) and inject the configuration automatically!

---

## 🛠️ Included Tools

| Tool Name | Description |
| :--- | :--- |
| `audit_pagespeed_rules` | Audits an HTML string or layout against Core Web Vitals (TBT, CLS, LCP) and outputs a detailed score (0-100) with fix suggestions. |
| `generate_sastra_layout` | Generates a clean semantic HTML5 layout and Elementor Flexbox Container JSON optimized for 0 CLS and mobile speed. |
| `generate_seo_schema` | Generates 100% valid Google Rich Results JSON-LD schema (`Article`, `BlogPosting`, `BreadcrumbList`, `FAQPage`, `Organization`). |
| `generate_critical_css` | Produces an ultra-lightweight (<14KB) critical inline CSS block for the initial viewport to pass TCP initial window budget. |
| `optimize_elementor_json` | Strips heavy JavaScript motion animations and enforces aspect ratios on Elementor templates. |

---

## 📄 License

MIT © [Andre Wahyu Hermawan (ndrean-id)](https://github.com/ndrean-id)
