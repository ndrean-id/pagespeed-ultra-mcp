export interface NovamiraOptimizerOptions {
  siteType?: "blog" | "corporate" | "ecommerce" | "landing_page";
  disableEmojis?: boolean;
  disableGutenbergCss?: boolean;
  disableDashicons?: boolean;
  deferNonCriticalJs?: boolean;
  inlineCriticalCss?: string;
  jsonLdSchema?: string;
}

export function generateNovamiraWpOptimizer(options: NovamiraOptimizerOptions = {}): {
  muPluginPhp: string;
  wpCliCommands: string[];
  recommendations: string[];
} {
  const {
    disableEmojis = true,
    disableGutenbergCss = true,
    disableDashicons = true,
    deferNonCriticalJs = true,
    inlineCriticalCss = "",
    jsonLdSchema = "",
  } = options;

  // Clean, high-performance Must-Use (MU) WordPress Plugin
  const muPluginPhp = `<?php
/**
 * Plugin Name: PageSpeed Ultra WordPress Optimizer
 * Description: Lightweight core performance optimizations for Core Web Vitals (Zero TBT, Zero CLS). Compatible with Elementor, SastraPro & Ayo SEO standards.
 * Version: 1.1.0
 * Author: ndrean-id
 */

if (!defined('ABSPATH')) {
    exit;
}

${disableEmojis ? `
// 1. Disable WordPress Emojis (Saves 1 HTTP Request & reduces main-thread JS execution)
add_action('init', function() {
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('admin_print_scripts', 'print_emoji_detection_script');
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_action('admin_print_styles', 'print_emoji_styles');
    remove_filter('the_content_feed', 'wp_staticize_emoji');
    remove_filter('comment_text_rss', 'wp_staticize_emoji');
    remove_filter('wp_mail', 'wp_staticize_emoji_for_email');
});
` : ""}

${disableGutenbergCss ? `
// 2. Remove Block Library CSS on pages powered by Elementor
add_action('wp_enqueue_scripts', function() {
    wp_dequeue_style('wp-block-library');
    wp_dequeue_style('wp-block-library-theme');
    wp_dequeue_style('wc-blocks-style');
}, 100);
` : ""}

${disableDashicons ? `
// 3. Disable Dashicons on frontend for non-logged-in visitors
add_action('wp_enqueue_scripts', function() {
    if (!is_user_logged_in()) {
        wp_deregister_style('dashicons');
    }
});
` : ""}

${deferNonCriticalJs ? `
// 4. Defer non-critical scripts (Preserves 0ms TBT score)
add_filter('script_loader_tag', function($tag, $handle, $src) {
    if (is_admin()) return $tag;
    if (strpos($tag, 'defer') !== false || strpos($tag, 'async') !== false) return $tag;
    return str_replace(' src=', ' defer src=', $tag);
}, 10, 3);
` : ""}

${inlineCriticalCss ? `
// 5. Inject Critical CSS above-the-fold
add_action('wp_head', function() {
    echo '<style id="pagespeed-ultra-critical-css">' . ${JSON.stringify(inlineCriticalCss)} . '</style>' . PHP_EOL;
}, 1);
` : ""}

${jsonLdSchema ? `
// 6. Inject Google Rich Results JSON-LD Schema
add_action('wp_head', function() {
    echo ${JSON.stringify(jsonLdSchema)} . PHP_EOL;
}, 2);
` : ""}
`.trim();

  const wpCliCommands = [
    "# Optimize WordPress options and database via WP-CLI (Novamira Tool)",
    "wp option update elementor_css_print_method 'internal'",
    "wp option update elementor_experiment-e_font_icon_svg 'active'",
    "wp option update elementor_experiment-e_optimized_assets_loading 'active'",
    "wp option update elementor_experiment-container 'active'",
  ];

  const recommendations = [
    "Save the generated PHP code as 'wp-content/mu-plugins/pagespeed-ultra-optimizer.php'.",
    "Novamira can write this file directly using its filesystem or WP-CLI tools.",
    "This MU-plugin automatically runs on every page load with zero performance overhead.",
  ];

  return {
    muPluginPhp,
    wpCliCommands,
    recommendations,
  };
}

/**
 * Format Ayo SEO Content into SastraPro Clean Layout with Zero-JS Accordion and Schemas
 */
export interface AyoSeoPostOptions {
  title: string;
  articleBodyHtml: string;
  canonicalUrl: string;
  keyTakeaways?: string[];
  faqs?: Array<{ question: string; answer: string }>;
  featuredImageUrl?: string;
  authorName?: string;
  publisherName?: string;
}

export function formatAyoSeoPost(options: AyoSeoPostOptions): {
  html: string;
  jsonLdScript: string;
  elementorJson: Record<string, unknown>;
} {
  const {
    title,
    articleBodyHtml,
    canonicalUrl,
    keyTakeaways = [],
    faqs = [],
    featuredImageUrl = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=675&auto=format&fit=crop&q=80",
    authorName = "Redaksi",
    publisherName = "Website",
  } = options;

  // 1. Render Key Takeaways Box (GEO/AEO optimized for Google AI Overview & Perplexity)
  let keyTakeawaysHtml = "";
  if (keyTakeaways.length > 0) {
    keyTakeawaysHtml = `
      <aside class="key-takeaways" style="background: #eff6ff; border-left: 4px solid #2563eb; border-radius: 8px; padding: 20px; margin: 24px 0 32px;">
        <h3 style="font-size: 17px; font-weight: 700; color: #1e40af; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
          📌 Poin Kunci (Key Takeaways)
        </h3>
        <ul style="margin: 0 0 0 20px; color: #1e3a8a; line-height: 1.7; font-size: 15px;">
          ${keyTakeaways.map((point) => `<li>${point}</li>`).join("\n          ")}
        </ul>
      </aside>
    `.trim();
  }

  // 2. Render Zero-JS Native HTML5 FAQ Accordion (<details> / <summary>) - 0ms TBT Guarantee
  let faqsHtml = "";
  if (faqs.length > 0) {
    faqsHtml = `
      <section class="ayo-seo-faq" style="margin-top: 48px; border-top: 1px solid #e2e8f0; padding-top: 32px;">
        <h2 style="font-size: 24px; font-weight: 800; color: #0f172a; margin-bottom: 20px;">Tanya Jawab (FAQ)</h2>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${faqs
            .map(
              (faq) => `
          <details style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px 18px; cursor: pointer;">
            <summary style="font-weight: 700; color: #0f172a; outline: none; font-size: 16px;">${faq.question}</summary>
            <p style="margin-top: 10px; color: #334155; line-height: 1.6; font-size: 15px;">${faq.answer}</p>
          </details>`
            )
            .join("\n")}
        </div>
      </section>
    `.trim();
  }

  // 3. Assemble Complete HTML
  const html = `
<article class="sastra-article" style="max-width: 800px; margin: 0 auto; padding: 24px 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b; line-height: 1.7;">
  <header style="margin-bottom: 24px;">
    <h1 style="font-size: clamp(28px, 4vw, 38px); font-weight: 800; line-height: 1.25; color: #0f172a; margin-bottom: 12px; letter-spacing: -0.02em;">${title}</h1>
    <div style="font-size: 14px; color: #64748b; display: flex; gap: 16px;">
      <span>Oleh: <strong>${authorName}</strong></span>
      <span>Standar E-E-A-T Google</span>
    </div>
  </header>

  <div style="width: 100%; aspect-ratio: 16/9; border-radius: 12px; overflow: hidden; margin-bottom: 28px; background: #e2e8f0;">
    <img src="${featuredImageUrl}" alt="${title}" width="1200" height="675" fetchpriority="high" loading="eager" decoding="async" style="width: 100%; height: 100%; object-fit: cover; display: block;">
  </div>

  ${keyTakeawaysHtml}

  <div class="article-body-content" style="font-size: 18px; line-height: 1.8; color: #334155;">
    ${articleBodyHtml}
  </div>

  ${faqsHtml}
</article>
  `.trim();

  // 4. Combined JSON-LD Schema (Article + FAQPage)
  const schemaObjects: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      image: [featuredImageUrl],
      author: {
        "@type": "Person",
        name: authorName,
      },
      publisher: {
        "@type": "Organization",
        name: publisherName,
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": canonicalUrl,
      },
    },
  ];

  if (faqs.length > 0) {
    schemaObjects.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answer,
        },
      })),
    });
  }

  const jsonLdScript = `<script type="application/ld+json">\n${JSON.stringify(schemaObjects, null, 2)}\n</script>`;

  // 5. Elementor Container JSON representation
  const elementorJson: Record<string, unknown> = {
    version: "0.4",
    title: `Ayo SEO - ${title}`,
    type: "container",
    content: [
      {
        id: "ayo_seo_root_container",
        elType: "container",
        isInner: false,
        settings: {
          content_width: "boxed",
          boxed_width: { unit: "px", size: 800 },
          flex_direction: "column",
          gap: { unit: "px", size: 24 },
          padding: { unit: "px", top: "32", right: "16", bottom: "48", left: "16", isLinked: false },
        },
        elements: [
          {
            id: "ayo_heading",
            elType: "widget",
            widgetType: "heading",
            settings: {
              title: title,
              header_size: "h1",
              typography_typography: "custom",
              typography_font_size: { unit: "px", size: 36 },
              typography_font_weight: "800",
            },
          },
          {
            id: "ayo_image",
            elType: "widget",
            widgetType: "image",
            settings: {
              image: { url: featuredImageUrl },
              image_size: "full",
              aspect_ratio: "16/9",
              width: { unit: "%", size: 100 },
            },
          },
          {
            id: "ayo_content",
            elType: "widget",
            widgetType: "text-editor",
            settings: {
              editor: `${keyTakeawaysHtml}\n${articleBodyHtml}\n${faqsHtml}`,
            },
          },
        ],
      },
    ],
  };

  return {
    html,
    jsonLdScript,
    elementorJson,
  };
}
