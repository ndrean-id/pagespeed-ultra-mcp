export interface ElementorNode {
    id?: string;
    elType?: string;
    isInner?: boolean;
    widgetType?: string;
    settings?: Record<string, unknown>;
    elements?: ElementorNode[];
}
export declare function optimizeElementorJson(rawJsonString: string): {
    optimizedJson: string;
    removedItemsCount: number;
    improvements: string[];
};
