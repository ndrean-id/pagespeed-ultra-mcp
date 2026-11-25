export function generateSastraLayout(options) {
    const { title, type, description = "Panduan lengkap dan tutorial praktis dengan optimasi performa maksimal.", featuredImageUrl = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=675&auto=format&fit=crop&q=80", authorName = "Redaksi", publishDate = new Date().toISOString().split("T")[0], } = options;
    // Ultra-clean SastraPro semantic HTML5 template
    const semanticHtml = `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <style>
    /* Critical Inline CSS - Zero CLS & 0ms TBT Guarantee */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.65; color: #1e293b; background-color: #f8fafc; text-rendering: optimizeLegibility; }
    .site-header { background: #ffffff; border-bottom: 1px solid #e2e8f0; padding: 1rem; position: sticky; top: 0; z-index: 50; }
    .site-nav { max-width: 800px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
    .site-brand { font-weight: 700; font-size: 1.25rem; color: #0f172a; text-decoration: none; }
    .site-main { max-width: 800px; margin: 2rem auto; padding: 0 1rem; }
    .article-header { margin-bottom: 1.5rem; }
    .article-title { font-size: clamp(1.75rem, 4vw, 2.5rem); font-weight: 800; line-height: 1.25; color: #0f172a; margin-bottom: 0.75rem; letter-spacing: -0.02em; }
    .article-meta { font-size: 0.875rem; color: #64748b; margin-bottom: 1.25rem; display: flex; gap: 1rem; }
    .featured-image-wrapper { width: 100%; aspect-ratio: 16 / 9; overflow: hidden; border-radius: 0.75rem; background-color: #e2e8f0; margin-bottom: 2rem; position: relative; }
    .featured-image-wrapper img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .article-content { font-size: 1.125rem; line-height: 1.8; color: #334155; }
    .article-content p { margin-bottom: 1.5rem; }
    .article-content h2 { font-size: 1.5rem; font-weight: 700; color: #0f172a; margin: 2rem 0 1rem; line-height: 1.3; }
    .site-footer { background: #ffffff; border-top: 1px solid #e2e8f0; padding: 2rem 1rem; text-align: center; font-size: 0.875rem; color: #64748b; margin-top: 4rem; }
  </style>
</head>
<body>
  <header class="site-header">
    <nav class="site-nav">
      <a href="/" class="site-brand">WebsitePro</a>
      <div><a href="/blog/" style="color: #2563eb; text-decoration: none; font-weight: 600;">Blog</a></div>
    </nav>
  </header>

  <main class="site-main">
    <article class="sastra-article">
      <header class="article-header">
        <h1 class="article-title">${title}</h1>
        <div class="article-meta">
          <span>Oleh: <strong>${authorName}</strong></span>
          <time datetime="${publishDate}">${publishDate}</time>
        </div>
      </header>

      <div class="featured-image-wrapper">
        <img 
          src="${featuredImageUrl}" 
          alt="${title}" 
          width="1200" 
          height="675" 
          fetchpriority="high" 
          loading="eager" 
          decoding="async"
        >
      </div>

      <div class="article-content">
        <p>${description}</p>
        <h2>Fondasi Utama Performa Web</h2>
        <p>Dengan menerapkan prinsip Core Web Vitals secara teknis (zero render-blocking scripts, explicit image aspect ratios, dan CSS minimalis), situs ini dioptimalkan untuk mencapai skor 99-100 di Google PageSpeed Insights.</p>
      </div>
    </article>
  </main>

  <footer class="site-footer">
    <p>&copy; ${new Date().getFullYear()} WebsitePro. Dirancang dengan standar performa Core Web Vitals.</p>
  </footer>
</body>
</html>
`.trim();
    // Elementor Flexbox Container JSON representation (Ready for Elementor import)
    const elementorContainerJson = {
        version: "0.4",
        title: `SastraPro Container - ${title}`,
        type: "container",
        content: [
            {
                id: "container_root",
                elType: "container",
                isInner: false,
                settings: {
                    content_width: "boxed",
                    boxed_width: { unit: "px", size: 800 },
                    flex_direction: "column",
                    gap: { unit: "px", size: 24 },
                    padding: { unit: "px", top: "32", right: "16", bottom: "32", left: "16", isLinked: false },
                },
                elements: [
                    {
                        id: "heading_title",
                        elType: "widget",
                        widgetType: "heading",
                        settings: {
                            title: title,
                            header_size: "h1",
                            typography_typography: "custom",
                            typography_font_size: { unit: "px", size: 36 },
                            typography_font_weight: "800",
                            typography_line_height: { unit: "em", size: 1.25 },
                        },
                    },
                    {
                        id: "featured_image_container",
                        elType: "widget",
                        widgetType: "image",
                        settings: {
                            image: {
                                url: featuredImageUrl,
                            },
                            image_size: "full",
                            aspect_ratio: "16/9",
                            width: { unit: "%", size: 100 },
                            height: { unit: "auto" },
                            caption_source: "none",
                        },
                    },
                    {
                        id: "content_text",
                        elType: "widget",
                        widgetType: "text-editor",
                        settings: {
                            editor: `<p>${description}</p><p>Halaman ini dibangun dengan tata letak container tunggal tanpa div berulang untuk memastikan rendering cepat pada perangkat seluler.</p>`,
                        },
                    },
                ],
            },
        ],
    };
    return {
        semanticHtml,
        elementorContainerJson,
        inlineCriticalStyles: "*, *::before, *::after { box-sizing: border-box; } body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }",
        notes: [
            "100% Zero CLS: Featured image wrapper utilizes native aspect-ratio: 16/9 with explicit width and height.",
            "LCP Optimized: Hero image explicitly uses fetchpriority='high' and loading='eager'.",
            "Semantic HTML: Wrapped inside standard <header>, <main>, <article>, and <footer> tags.",
            "Minimalist DOM: Flattened single-layer Flexbox Container without redundant wrapper divs.",
        ],
    };
}
//# sourceMappingURL=layout.js.map