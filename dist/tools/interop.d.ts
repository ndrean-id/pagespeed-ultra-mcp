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
