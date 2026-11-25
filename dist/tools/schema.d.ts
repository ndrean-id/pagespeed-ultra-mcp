export interface SchemaOptions {
    schemaType: "Article" | "BlogPosting" | "Organization" | "BreadcrumbList" | "FAQPage" | "WebSite";
    headline?: string;
    description?: string;
    url: string;
    authorName?: string;
    publisherName?: string;
    publisherLogoUrl?: string;
    imageUrl?: string;
    datePublished?: string;
    dateModified?: string;
    breadcrumbs?: Array<{
        name: string;
        url: string;
    }>;
    faqs?: Array<{
        question: string;
        answer: string;
    }>;
}
export declare function generateSeoSchema(options: SchemaOptions): {
    jsonLd: string;
    scriptTag: string;
};
