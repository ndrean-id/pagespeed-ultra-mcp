export function generateSeoSchema(options) {
    let schemaData;
    const defaultDate = new Date().toISOString();
    switch (options.schemaType) {
        case "Article":
        case "BlogPosting":
            schemaData = {
                "@context": "https://schema.org",
                "@type": options.schemaType,
                headline: options.headline || "Judul Artikel",
                description: options.description || "Deskripsi lengkap artikel.",
                mainEntityOfPage: {
                    "@type": "WebPage",
                    "@id": options.url,
                },
                image: options.imageUrl ? [options.imageUrl] : [],
                datePublished: options.datePublished || defaultDate,
                dateModified: options.dateModified || defaultDate,
                author: {
                    "@type": "Person",
                    name: options.authorName || "Redaksi",
                },
                publisher: {
                    "@type": "Organization",
                    name: options.publisherName || "Situs Web",
                    ...(options.publisherLogoUrl
                        ? {
                            logo: {
                                "@type": "ImageObject",
                                url: options.publisherLogoUrl,
                            },
                        }
                        : {}),
                },
            };
            break;
        case "BreadcrumbList":
            const items = (options.breadcrumbs || [
                { name: "Home", url: "https://example.com" },
                { name: "Blog", url: "https://example.com/blog" },
            ]).map((item, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: item.name,
                item: item.url,
            }));
            schemaData = {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: items,
            };
            break;
        case "FAQPage":
            const mainEntity = (options.faqs || [
                {
                    question: "Mengapa performa Google PageSpeed itu penting?",
                    answer: "Kecepatan muat halaman dan Core Web Vitals adalah faktor peringkat langsung di Google dan meningkatkan retensi pengunjung.",
                },
            ]).map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: faq.answer,
                },
            }));
            schemaData = {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity,
            };
            break;
        case "Organization":
            schemaData = {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: options.publisherName || "Situs Web",
                url: options.url,
                ...(options.publisherLogoUrl ? { logo: options.publisherLogoUrl } : {}),
            };
            break;
        case "WebSite":
        default:
            schemaData = {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: options.publisherName || "Situs Web",
                url: options.url,
                potentialAction: {
                    "@type": "SearchAction",
                    target: `${options.url.replace(/\/$/, "")}/?s={search_term_string}`,
                    "query-input": "required name=search_term_string",
                },
            };
            break;
    }
    const jsonLd = JSON.stringify(schemaData, null, 2);
    const scriptTag = `<script type="application/ld+json">\n${jsonLd}\n</script>`;
    return { jsonLd, scriptTag };
}
//# sourceMappingURL=schema.js.map