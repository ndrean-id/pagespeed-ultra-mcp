#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import { auditPageSpeedRules } from "./tools/audit.js";
import { generateSastraLayout } from "./tools/layout.js";
import { generateSeoSchema } from "./tools/schema.js";
import { generateCriticalCss } from "./tools/css.js";
import { optimizeElementorJson } from "./tools/optimize.js";
import { generateNovamiraWpOptimizer } from "./tools/interop.js";

// Initialize PageSpeed Ultra MCP Server
const server = new McpServer({
  name: "pagespeed-ultra-mcp",
  version: "1.1.0",
});

// Tool 1: audit_pagespeed_rules
server.tool(
  "audit_pagespeed_rules",
  "Audit HTML code or layout snippet against Google Core Web Vitals (TBT, CLS, LCP) and SastraPro speed standards.",
  {
    html: z.string().describe("The raw HTML string or layout code to audit for performance and SEO."),
  },
  async ({ html }) => {
    try {
      const result = auditPageSpeedRules(html);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      return {
        content: [{ type: "text", text: `Audit error: ${message}` }],
        isError: true,
      };
    }
  }
);

// Tool 2: generate_sastra_layout
server.tool(
  "generate_sastra_layout",
  "Generate an ultra-fast, semantic HTML5 layout and Elementor Flexbox Container JSON guaranteed for 0 CLS and 0ms TBT.",
  {
    title: z.string().describe("The title of the page or article."),
    type: z.enum(["article", "landing_page", "homepage"]).default("article").describe("Layout type."),
    description: z.string().optional().describe("Meta description or article excerpt."),
    featuredImageUrl: z.string().optional().describe("URL of the hero/featured image."),
    authorName: z.string().optional().describe("Author name for metadata and byline."),
  },
  async (args) => {
    try {
      const layout = generateSastraLayout(args);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(layout, null, 2),
          },
        ],
      };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      return {
        content: [{ type: "text", text: `Layout generation error: ${message}` }],
        isError: true,
      };
    }
  }
);

// Tool 3: generate_seo_schema
server.tool(
  "generate_seo_schema",
  "Generate 100% valid Google Rich Results JSON-LD schema (Article, BlogPosting, BreadcrumbList, FAQPage, Organization).",
  {
    schemaType: z
      .enum(["Article", "BlogPosting", "Organization", "BreadcrumbList", "FAQPage", "WebSite"])
      .describe("The schema type to generate."),
    url: z.string().url().describe("The canonical URL of the page."),
    headline: z.string().optional().describe("Article headline or page title."),
    description: z.string().optional().describe("Page description."),
    authorName: z.string().optional().describe("Author name for articles."),
    publisherName: z.string().optional().describe("Publisher/Brand name."),
    publisherLogoUrl: z.string().optional().describe("Publisher logo image URL."),
    imageUrl: z.string().optional().describe("Featured image URL for rich snippets."),
    breadcrumbs: z
      .array(
        z.object({
          name: z.string(),
          url: z.string(),
        })
      )
      .optional()
      .describe("Breadcrumb trail items."),
    faqs: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        })
      )
      .optional()
      .describe("FAQ Q&A pairs for FAQPage schema."),
  },
  async (args) => {
    try {
      const schema = generateSeoSchema(args);
      return {
        content: [
          {
            type: "text",
            text: schema.scriptTag,
          },
        ],
      };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      return {
        content: [{ type: "text", text: `Schema generation error: ${message}` }],
        isError: true,
      };
    }
  }
);

// Tool 4: generate_critical_css
server.tool(
  "generate_critical_css",
  "Generate lightweight (<14KB) above-the-fold inline Critical CSS to eliminate render-blocking stylesheet delays.",
  {
    theme: z.enum(["sastra_light", "sastra_dark", "clean_slate"]).default("sastra_light"),
    maxWidthPx: z.number().default(800).describe("Max container width in pixels."),
    primaryColor: z.string().default("#2563eb").describe("Primary accent hex color."),
    fontFamily: z.string().optional().describe("Custom system font stack."),
  },
  async (args) => {
    try {
      const critical = generateCriticalCss(args);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(critical, null, 2),
          },
        ],
      };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      return {
        content: [{ type: "text", text: `Critical CSS error: ${message}` }],
        isError: true,
      };
    }
  }
);

// Tool 5: optimize_elementor_json (Interop with Official Elementor & Elementor Ultra MCP)
server.tool(
  "optimize_elementor_json",
  "Sanitize and optimize Elementor export JSON (from Elementor Official MCP or Elementor Ultra MCP) by stripping heavy JS motion effects and enforcing zero-CLS image dimensions.",
  {
    elementorJson: z.string().describe("The raw JSON string exported from Elementor."),
  },
  async ({ elementorJson }) => {
    try {
      const optimized = optimizeElementorJson(elementorJson);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(optimized, null, 2),
          },
        ],
      };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      return {
        content: [{ type: "text", text: `Elementor optimization error: ${message}` }],
        isError: true,
      };
    }
  }
);

// Tool 6: generate_novamira_wp_optimizer (Interop with Novamira MCP)
server.tool(
  "generate_novamira_wp_optimizer",
  "Generate a high-performance WordPress MU-Plugin PHP snippet and WP-CLI commands designed for Novamira MCP to inject into WordPress (disables emojis, block CSS, dashicons, and injects critical CSS/schema).",
  {
    siteType: z.enum(["blog", "corporate", "ecommerce", "landing_page"]).default("blog"),
    disableEmojis: z.boolean().default(true),
    disableGutenbergCss: z.boolean().default(true),
    disableDashicons: z.boolean().default(true),
    deferNonCriticalJs: z.boolean().default(true),
    inlineCriticalCss: z.string().optional().default(""),
    jsonLdSchema: z.string().optional().default(""),
  },
  async (args) => {
    try {
      const result = generateNovamiraWpOptimizer(args);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      return {
        content: [{ type: "text", text: `Novamira optimizer error: ${message}` }],
        isError: true,
      };
    }
  }
);

// Run the MCP server over Stdio
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Fatal error starting PageSpeed Ultra MCP Server:", error);
  process.exit(1);
});
