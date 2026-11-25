# PageSpeed Ultra MCP (WordPress, Elementor & Technical SEO)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](https://nodejs.org)
[![MCP](https://img.shields.io/badge/Protocol-MCP-purple)](https://modelcontextprotocol.io)
[![Release](https://img.shields.io/github/v/release/ndrean-id/pagespeed-ultra-mcp?color=brightgreen)](https://github.com/ndrean-id/pagespeed-ultra-mcp/releases)

> **High-Performance Model Context Protocol (MCP) server engineered for WordPress, Elementor & Modern Web Technical SEO. Enforces zero Cumulative Layout Shift (CLS), zero Total Blocking Time (TBT), and 100/100 Google Core Web Vitals.**

Inspired by the speed and architectural benchmarks of **SastraPro** (by Mas Sugeng), this MCP server equips AI coding agents (**Claude Code, Cursor, Antigravity IDE, Cline, Claude Desktop**) with tools to audit, generate, and optimize web layouts for extreme Google PageSpeed scores.

---

## 🌐 Universal Builder Support (Beyond Elementor)

`pagespeed-ultra-mcp` is **platform-agnostic** and works across the entire web ecosystem:

- **Elementor & Elementor Pro:** Cleans motion effects, flattens container div-soup, enforces aspect ratios on image widgets.
- **Gutenberg (WordPress Core Block Editor):** Audits HTML comments (`<!-- wp:... -->`), enforces mobile-first semantics.
- **Bricks Builder & Breakdance:** Audits output HTML and optimizes CSS payload delivery.
- **Headless & Jamstack (Astro, Next.js, HTML5):** Universal Core Web Vitals audit, JSON-LD Schema generation, and sub-14KB Critical CSS inlining.

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

1. **Novamira MCP (Infrastructure Engine):** Prepares WordPress multisite, executes WP-CLI, and writes MU-plugins directly to `wp-content/mu-plugins/` for server-level optimization.
2. **Elementor MCP / Elementor Ultra MCP (Visual Builders):** Constructs pages, containers, widgets, and templates.
3. **PageSpeed Ultra MCP (The Gatekeeper):** Sanitizes JSON payloads, guarantees 0 CLS, injects `<14KB` Critical CSS, and embeds Google Rich Results JSON-LD Schemas.

---

## 🧠 Master Prompt for AI Coding Agents

Copy and paste this master prompt directly into **Cline**, **Claude Code**, or **Cursor**:

```markdown
You are a World-Class Full-Stack WordPress & Technical SEO Architect.

Your objective is to build a high-converting, accessible WordPress page achieving 95-100 on Mobile Google PageSpeed Insights (0ms TBT, 0 CLS, FCP < 0.8s, LCP < 1.2s) following SastraPro speed standards.

Execute the 3-Phase Workflow in order:

### PHASE 1: LAYOUT & BUILDER DRAFTING
1. If using Elementor: Use Elementor MCP / Elementor Ultra MCP to build modern Flexbox Containers (max 2 levels deep).
2. If using Gutenberg / HTML: Use semantic milestone elements (<header>, <main>, <article>, <footer>).
3. Explicit Image Dimensions: Every <img> element MUST include explicit width, height, and CSS aspect-ratio.
4. LCP Priority: The primary above-the-fold hero image MUST have fetchpriority="high" and loading="eager".

### PHASE 2: QUALITY & PERFORMANCE GATEWAY (PAGESPEED ULTRA MCP)
Before publishing, invoke tools from `pagespeed-ultra-mcp`:
1. Call `audit_pagespeed_rules` on the generated HTML. Fix any flagged CLS risks or render-blocking scripts.
2. If using Elementor, call `optimize_elementor_json` to strip heavy JavaScript motion animations.
3. Call `generate_critical_css` to produce sub-14KB inline styles and embed them inside <head>.
4. Call `generate_seo_schema` to generate valid Google Rich Results JSON-LD (Article, Breadcrumbs, FAQ).

### PHASE 3: SERVER ENGINE OPTIMIZATION (NOVAMIRA)
1. Use `generate_novamira_wp_optimizer` to generate a lightweight MU-Plugin (wp-content/mu-plugins/pagespeed-ultra.php).
2. Defer non-critical JavaScript and dequeue unneeded block stylesheets or emoji scripts.
```

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
| `audit_pagespeed_rules` | Audits HTML layout against Core Web Vitals (TBT, CLS, LCP) with 0-100 score. | Universal (Any Builder/Framework) |
| `generate_sastra_layout` | Generates semantic HTML5 and Elementor Flexbox Container JSON. | **Elementor / Gutenberg / HTML** |
| `optimize_elementor_json` | Strips heavy JS animation triggers and enforces image aspect ratios. | **Elementor MCP / Ultra** |
| `generate_novamira_wp_optimizer` | Generates WordPress MU-Plugin PHP and WP-CLI commands. | **Novamira MCP / WordPress** |
| `generate_critical_css` | Produces sub-14KB inline Critical CSS for the initial mobile viewport. | Universal / Novamira |
| `generate_seo_schema` | Generates 100% valid Google Rich Results JSON-LD schema scripts. | Universal (Any Site) |

---

## 📄 License

MIT © [Andre Wahyu Hermawan (ndrean-id)](https://github.com/ndrean-id)
