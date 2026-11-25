export interface AuditResult {
    score: number;
    grade: "A+" | "A" | "B" | "C" | "D" | "F";
    summary: string;
    metrics: {
        clsRisk: "LOW" | "MEDIUM" | "HIGH";
        tbtRisk: "LOW" | "MEDIUM" | "HIGH";
        lcpRisk: "LOW" | "MEDIUM" | "HIGH";
        seoHealth: "EXCELLENT" | "GOOD" | "POOR";
    };
    passedChecks: string[];
    criticalIssues: string[];
    warnings: string[];
    actionableRecommendations: string[];
}
export declare function auditPageSpeedRules(html: string): AuditResult;
