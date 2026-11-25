# PageSpeed Ultra MCP (WordPress, Elementor & Technical SEO)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](https://nodejs.org)
[![MCP](https://img.shields.io/badge/Protocol-MCP-purple)](https://modelcontextprotocol.io)

> **High-Performance Model Context Protocol (MCP) server engineered for WordPress & Elementor Technical SEO, zero Cumulative Layout Shift (CLS), zero Total Blocking Time (TBT), and 100/100 Google Core Web Vitals.**

Inspired by the speed benchmarks of **SastraPro** (by Mas Sugeng), this MCP server equips AI coding agents (**Claude Code, Cursor, Antigravity IDE, Cline, Claude Desktop**) with tools to audit, generate, and optimize web layouts for extreme Google PageSpeed scores.

---

## 🤝 The Dream Team: Synergy with Elementor & Novamira

`pagespeed-ultra-mcp` is designed to work in synergy with the WordPress AI MCP ecosystem:

```
┌────────────────────────────────────────────────────────┐
│                   AI AGENT WORKFLOW                    │
└────────────────────────────────────────────────────────┘
                           │
       ┌───────────────────┼───────────────────┐
       ▼                   ▼                   ▼
 [ Novamira MCP ]  [ Elementor Ultra ]  [ PageSpeed Ultra ]
  Infrastructure     Page & Widgets       Performance & SEO
  - WP-CLI           - Layout building    - Zero-CLS image rules
  - PHP runtime      - Pro widgets        - Zero-TBT JS optimizer
  - Database         - Visual editing     - Inline Critical CSS
  - MU-Plugin writer - Rollback/backups   - Rich Results Schemas
```

1. **Novamira MCP (The Infrastructure Engine):** Prepares WordPress multisite, executes WP-CLI, and uses `generate_novamira_wp_optimizer` to write MU-plugins directly to `wp-content/mu-plugins/` for server-level optimization.
2. **Elementor MCP Resmi & Elementor Ultra MCP (The Visual Builders):** Constructs the pages, widgets, and templates.
3. **PageSpeed Ultra MCP (The Quality & SEO Gatekeeper):** Sanitizes Elementor JSON payloads with `optimize_elementor_json`, guarantees 0 CLS, injects `<14KB` Critical CSS, and embeds Google Rich Results JSON-LD Schemas.

---

## ⚡ 1-Click Easy Installation (Multi-Client)

### 1. Claude Code CLI (1 Single Terminal Command)

```bash
claude mcp add pagespeed-ultra -- npx -y github:ndrean-id/pagespeed-ultra-mcp
```

### 2. Cursor Editor

Add to `~/.cursor/mcp.json`:

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

### 3. Cline & Antigravity IDE

Add to `cline_mcp_settings.json`:

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

### 4. Claude Desktop

Add to `%APPDATA%\Claude\claude_desktop_config.json`:

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

## 🛠️ Included Tools

| Tool Name | Purpose | Interoperability |
| :--- | :--- | :--- |
| `audit_pagespeed_rules` | Audits HTML layout against Core Web Vitals (TBT, CLS, LCP) with 0-100 score. | Standalone / Universal |
| `generate_sastra_layout` | Generates semantic HTML5 and Elementor Flexbox Container JSON. | **Elementor MCP / Ultra** |
| `optimize_elementor_json` | Strips heavy JS animation triggers and enforces image aspect ratios. | **Elementor MCP / Ultra** |
| `generate_novamira_wp_optimizer` | Generates WordPress MU-Plugin PHP and WP-CLI commands. | **Novamira MCP** |
| `generate_critical_css` | Produces sub-14KB inline Critical CSS for the initial mobile viewport. | Standalone / Novamira |
| `generate_seo_schema` | Generates 100% valid Google Rich Results JSON-LD schema scripts. | Standalone / Novamira |

---

## 📄 License

MIT © [Andre Wahyu Hermawan (ndrean-id)](https://github.com/ndrean-id)
