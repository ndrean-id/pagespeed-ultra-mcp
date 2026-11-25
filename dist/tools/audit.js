export function auditPageSpeedRules(html) {
    const criticalIssues = [];
    const warnings = [];
    const passedChecks = [];
    const actionableRecommendations = [];
    let score = 100;
    // 1. Check Images for Width and Height (CLS Audit)
    const imgRegex = /<img\b([^>]*?)>/gi;
    let imgMatch;
    let totalImages = 0;
    let missingDimensions = 0;
    let missingAlt = 0;
    let missingLazy = 0;
    let hasFetchPriorityHigh = false;
    while ((imgMatch = imgRegex.exec(html)) !== null) {
        totalImages++;
        const attrs = imgMatch[1];
        const hasWidth = /\bwidth\s*=\s*['"]?[0-9]+['"]?/i.test(attrs) || /style\s*=\s*['"][^'"]*width:[^'"]*['"]/i.test(attrs);
        const hasHeight = /\bheight\s*=\s*['"]?[0-9]+['"]?/i.test(attrs) || /style\s*=\s*['"][^'"]*height:[^'"]*['"]/i.test(attrs);
        const hasAspectRatio = /aspect-ratio\s*:/i.test(attrs);
        if (!hasWidth && !hasHeight && !hasAspectRatio) {
            missingDimensions++;
        }
        if (!/\balt\s*=/i.test(attrs)) {
            missingAlt++;
        }
        if (!/\bloading\s*=\s*['"]lazy['"]/i.test(attrs) && !/\bfetchpriority\s*=\s*['"]high['"]/i.test(attrs)) {
            missingLazy++;
        }
        if (/\bfetchpriority\s*=\s*['"]high['"]/i.test(attrs)) {
            hasFetchPriorityHigh = true;
        }
    }
    if (totalImages > 0) {
        if (missingDimensions > 0) {
            score -= Math.min(25, missingDimensions * 10);
            criticalIssues.push(`Found ${missingDimensions} <img> tag(s) without explicit width/height or aspect-ratio. This causes severe Cumulative Layout Shift (CLS).`);
            actionableRecommendations.push(`Add width="" and height="" attributes or CSS 'aspect-ratio: 16/9' to all image elements.`);
        }
        else {
            passedChecks.push(`All ${totalImages} image(s) define dimensions or aspect-ratio (Zero CLS guarantee).`);
        }
        if (missingAlt > 0) {
            score -= Math.min(10, missingAlt * 3);
            warnings.push(`Found ${missingAlt} <img> tag(s) missing 'alt' attributes (Harms Google Image SEO & Accessibility).`);
            actionableRecommendations.push(`Add descriptive alt text to all informative images.`);
        }
        else {
            passedChecks.push(`All images have descriptive 'alt' attributes.`);
        }
        if (totalImages > 2 && !hasFetchPriorityHigh) {
            warnings.push(`Hero / Above-the-fold image does not use 'fetchpriority="high"'.`);
            actionableRecommendations.push(`Add fetchpriority="high" and loading="eager" to the primary hero/featured image to achieve LCP < 1.2s.`);
        }
    }
    else {
        passedChecks.push(`No unoptimized raster images detected.`);
    }
    // 2. Check Render-blocking Scripts (TBT & FCP Audit)
    const scriptRegex = /<script\b([^>]*?)>([\s\S]*?)<\/script>/gi;
    let scriptMatch;
    let renderBlockingScripts = 0;
    while ((scriptMatch = scriptRegex.exec(html)) !== null) {
        const attrs = scriptMatch[1];
        const isExternal = /\bsrc\s*=/i.test(attrs);
        const hasDefer = /\bdefer\b/i.test(attrs);
        const hasAsync = /\basync\b/i.test(attrs);
        const isModule = /\btype\s*=\s*['"]module['"]/i.test(attrs);
        const isLdJson = /\btype\s*=\s*['"]application\/ld\+json['"]/i.test(attrs);
        if (isExternal && !hasDefer && !hasAsync && !isModule && !isLdJson) {
            renderBlockingScripts++;
        }
    }
    if (renderBlockingScripts > 0) {
        score -= Math.min(30, renderBlockingScripts * 15);
        criticalIssues.push(`Found ${renderBlockingScripts} render-blocking external <script> tag(s) without 'defer' or 'async'. This kills Total Blocking Time (TBT).`);
        actionableRecommendations.push(`Add 'defer' to non-critical external JavaScript files or load them asynchronously.`);
    }
    else {
        passedChecks.push(`No render-blocking external scripts detected in the main thread (0ms TBT friendly).`);
    }
    // 3. Check Google Web Fonts (FOIT / FOUT Audit)
    if (/fonts\.googleapis\.com/i.test(html)) {
        if (!/display=swap/i.test(html)) {
            score -= 10;
            warnings.push(`Google Fonts loaded without '&display=swap'. Text may disappear during load (Flash of Invisible Text / FOIT).`);
            actionableRecommendations.push(`Append '&display=swap' to Google Fonts stylesheet links.`);
        }
        else {
            passedChecks.push(`Google Fonts uses 'display=swap' for seamless font rendering.`);
        }
        if (!/rel=['"]preconnect['"]\s+href=['"]https:\/\/fonts\.gstatic\.com['"]/i.test(html) &&
            !/href=['"]https:\/\/fonts\.gstatic\.com['"]\s+rel=['"]preconnect['"]/i.test(html)) {
            warnings.push(`Missing preconnect to 'https://fonts.gstatic.com'. Adds 100-300ms DNS/TLS delay on mobile.`);
            actionableRecommendations.push(`Add <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> to <head>.`);
        }
        else {
            passedChecks.push(`Fonts origin preconnect properly configured.`);
        }
    }
    // 4. Semantic HTML5 & Architecture Audit (SastraPro Standard)
    const hasHeader = /<header\b/i.test(html);
    const hasMain = /<main\b/i.test(html);
    const hasArticle = /<article\b/i.test(html);
    const hasFooter = /<footer\b/i.test(html);
    if (!hasHeader || !hasMain || !hasFooter) {
        score -= 10;
        warnings.push(`Missing standard semantic HTML5 milestone tags (<header>, <main>, <footer>).`);
        actionableRecommendations.push(`Replace generic <div> wrappers with semantic tags: <header>, <main>, <article>, and <footer>.`);
    }
    else {
        passedChecks.push(`Semantic HTML5 tags detected (<header>, <main>, <footer>).`);
    }
    // 5. DOM Depth & Div Soup Check
    const divCount = (html.match(/<div\b/gi) || []).length;
    if (divCount > 60) {
        score -= 15;
        criticalIssues.push(`Excessive <div> tags detected (${divCount} divs). Heavy DOM tree leads to high memory usage and slow layout recalculation.`);
        actionableRecommendations.push(`Flatten nested container wrappers. Use modern CSS Grid or single-level Flexbox containers instead of nested divs.`);
    }
    else {
        passedChecks.push(`Lightweight DOM structure (${divCount} divs, optimal for mobile devices).`);
    }
    // 6. Viewport Meta Tag Check
    if (!/<meta\s+[^>]*name=['"]viewport['"]/i.test(html)) {
        score -= 20;
        criticalIssues.push(`Missing mobile <meta name="viewport" content="width=device-width, initial-scale=1"> tag.`);
        actionableRecommendations.push(`Add standard responsive viewport meta tag to <head>.`);
    }
    else {
        passedChecks.push(`Responsive mobile viewport tag present.`);
    }
    score = Math.max(0, Math.min(100, score));
    let grade = "F";
    if (score >= 95)
        grade = "A+";
    else if (score >= 90)
        grade = "A";
    else if (score >= 80)
        grade = "B";
    else if (score >= 70)
        grade = "C";
    else if (score >= 60)
        grade = "D";
    return {
        score,
        grade,
        summary: `PageSpeed Technical Audit: Score ${score}/100 (Grade ${grade}). Found ${criticalIssues.length} critical issue(s) and ${warnings.length} warning(s).`,
        metrics: {
            clsRisk: missingDimensions > 0 ? "HIGH" : "LOW",
            tbtRisk: renderBlockingScripts > 0 ? "HIGH" : "LOW",
            lcpRisk: totalImages > 0 && !hasFetchPriorityHigh ? "MEDIUM" : "LOW",
            seoHealth: missingAlt === 0 && hasHeader && hasMain ? "EXCELLENT" : "GOOD",
        },
        passedChecks,
        criticalIssues,
        warnings,
        actionableRecommendations,
    };
}
//# sourceMappingURL=audit.js.map