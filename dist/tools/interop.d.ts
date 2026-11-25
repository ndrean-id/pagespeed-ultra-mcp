export interface NovamiraOptimizerOptions {
    siteType?: "blog" | "corporate" | "ecommerce" | "landing_page";
    disableEmojis?: boolean;
    disableGutenbergCss?: boolean;
    disableDashicons?: boolean;
    deferNonCriticalJs?: boolean;
    inlineCriticalCss?: string;
    jsonLdSchema?: string;
}
export declare function generateNovamiraWpOptimizer(options?: NovamiraOptimizerOptions): {
    muPluginPhp: string;
    wpCliCommands: string[];
    recommendations: string[];
};
/**
 * Format Ayo SEO Content into SastraPro Clean Layout with Zero-JS Accordion and Schemas
 */
export interface AyoSeoPostOptions {
    title: string;
    articleBodyHtml: string;
    canonicalUrl: string;
    keyTakeaways?: string[];
    faqs?: Array<{
        question: string;
        answer: string;
    }>;
    featuredImageUrl?: string;
    authorName?: string;
    publisherName?: string;
}
export declare function formatAyoSeoPost(options: AyoSeoPostOptions): {
    html: string;
    jsonLdScript: string;
    elementorJson: Record<string, unknown>;
};
