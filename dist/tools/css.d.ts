export interface CriticalCssOptions {
    theme?: "sastra_light" | "sastra_dark" | "clean_slate";
    maxWidthPx?: number;
    primaryColor?: string;
    fontFamily?: string;
}
export declare function generateCriticalCss(options?: CriticalCssOptions): {
    css: string;
    sizeBytes: number;
    isUnderBudget: boolean;
    recommendations: string[];
};
