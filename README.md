# PageSpeed Ultra MCP (WordPress, Elementor & Technical SEO)

> **High-Performance Model Context Protocol (MCP) server engineered for WordPress & Elementor Technical SEO, zero Cumulative Layout Shift (CLS), zero Total Blocking Time (TBT), and 100/100 Google Core Web Vitals.**

Inspired by the speed and architectural benchmarks of **SastraPro** (by Mas Sugeng), this MCP server equips AI coding agents (Cline, Claude Code, Cursor, Antigravity IDE) with direct tools to audit, generate, and optimize web layouts for extreme Google PageSpeed scores.

---

## ⚡ Key Highlights

- **Zero-CLS Guarantee:** Enforces explicit image dimensions, aspect-ratio wrappers, and container layouts.
- **Zero-TBT Friendly:** Audits render-blocking external JavaScript and eliminates unneeded motion effects.
- **Semantic HTML5 First:** Replaces heavy builder div-soup with semantic `<header>`, `<main>`, `<article>`, and `<footer>` elements.
- **Inlined Critical CSS:** Generates sub-14KB initial viewport styles to pass the first TCP packet budget and achieve LCP < 1.2s and FCP < 0.8s on mobile.
- **Google Rich Results Ready:** Generates 100% valid Schema.org JSON-LD scripts for Articles, Breadcrumbs, FAQs, and Organizations.

---

## 🛠️ Included Tools

| Tool Name | Description |
| :--- | :--- |
| `audit_pagespeed_rules` | Audits an HTML string or layout against Core Web Vitals (TBT, CLS, LCP) and outputs a detailed score (0-100) with fix suggestions. |
| `generate_sastra_layout` | Generates a clean semantic HTML5 layout and Elementor Flexbox Container JSON optimized for 0 CLS and mobile speed. |
| `generate_seo_schema` | Generates 100% valid Google Rich Results JSON-LD schema (`Article`, `BlogPosting`, `BreadcrumbList`, `FAQPage`, `Organization`). |
| `generate_critical_css` | Produces an ultra-lightweight (<14KB) critical inline CSS block for the initial viewport. |
| `optimize_elementor_json` | Strips heavy JavaScript motion animations and enforces aspect ratios on Elementor templates. |

---

## 🚀 Quick Start

### 1. Installation & Build

```bash
cd D:\Antigravity\pagespeed-ultra-mcp
npm install
npm run build
```

### 2. Connect to Cline / Antigravity IDE

Add the following to your `cline_mcp_settings.json` (accessible via Cline Settings -> MCP Servers):

```json
{
  "mcpServers": {
    "pagespeed-ultra": {
      "command": "node",
      "args": ["D:/Antigravity/pagespeed-ultra-mcp/dist/index.js"],
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

### 3. Connect to Claude Desktop

Add to `%APPDATA%\Claude\claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "pagespeed-ultra": {
      "command": "node",
      "args": ["D:/Antigravity/pagespeed-ultra-mcp/dist/index.js"]
    }
  }
}
```

---

## 📄 License

MIT © [ndrean-id](https://github.com/ndrean-id)
