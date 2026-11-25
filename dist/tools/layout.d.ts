export interface LayoutOptions {
    title: string;
    type: "article" | "landing_page" | "homepage";
    description?: string;
    featuredImageUrl?: string;
    authorName?: string;
    publishDate?: string;
}
export interface GeneratedLayout {
    semanticHtml: string;
    elementorContainerJson: Record<string, unknown>;
    inlineCriticalStyles: string;
    notes: string[];
}
export declare function generateSastraLayout(options: LayoutOptions): GeneratedLayout;
