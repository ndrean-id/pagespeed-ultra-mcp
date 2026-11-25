export function generateCriticalCss(options = {}) {
    const { theme = "sastra_light", maxWidthPx = 800, primaryColor = "#2563eb", fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', } = options;
    const isDark = theme === "sastra_dark";
    const bgColor = isDark ? "#0f172a" : "#f8fafc";
    const cardBg = isDark ? "#1e293b" : "#ffffff";
    const textColor = isDark ? "#f1f5f9" : "#1e293b";
    const mutedColor = isDark ? "#94a3b8" : "#64748b";
    const borderColor = isDark ? "#334155" : "#e2e8f0";
    // Minified, highly efficient above-the-fold Critical CSS (< 4KB)
    const css = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{-webkit-text-size-adjust:100%;tab-size:4;scroll-behavior:smooth}
body{min-height:100vh;background-color:${bgColor};color:${textColor};font-family:${fontFamily};font-size:1rem;line-height:1.65;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased}
img,picture,video,canvas,svg{display:block;max-width:100%;height:auto}
input,button,textarea,select{font:inherit}
p,h1,h2,h3,h4,h5,h6{overflow-wrap:break-word}
a{color:${primaryColor};text-decoration:none}
a:hover{text-decoration:underline}
.site-container{width:100%;max-width:${maxWidthPx}px;margin-left:auto;margin-right:auto;padding-left:1rem;padding-right:1rem}
.site-header{background:${cardBg};border-bottom:1px solid ${borderColor};position:sticky;top:0;z-index:40;padding:0.75rem 0}
.site-header-inner{display:flex;align-items:center;justify-content:space-between}
.site-logo{font-size:1.25rem;font-weight:700;color:${textColor};letter-spacing:-0.02em}
.hero-wrapper{margin-top:1.5rem;margin-bottom:2rem}
.hero-title{font-size:clamp(1.75rem,5vw,2.5rem);font-weight:800;line-height:1.2;color:${textColor};letter-spacing:-0.025em;margin-bottom:0.75rem}
.hero-meta{font-size:0.875rem;color:${mutedColor};display:flex;gap:1rem;align-items:center;margin-bottom:1.25rem}
.media-container{width:100%;aspect-ratio:16/9;background-color:${borderColor};border-radius:0.75rem;overflow:hidden;position:relative}
.media-container img{width:100%;height:100%;object-fit:cover}
.prose{font-size:1.125rem;line-height:1.75;color:${isDark ? "#cbd5e1" : "#334155"}}
.prose p{margin-bottom:1.5rem}
.prose h2{font-size:1.5rem;font-weight:700;color:${textColor};margin:2.5rem 0 1rem;line-height:1.3}
.prose ul,.prose ol{margin:0 0 1.5rem 1.5rem}
.prose li{margin-bottom:0.5rem}
@media(prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}
`.trim();
    const sizeBytes = Buffer.byteLength(css, "utf8");
    // Ideal budget for inlined critical CSS is < 14,336 bytes (14KB - typical initial TCP congestion window limit)
    const isUnderBudget = sizeBytes < 14336;
    return {
        css,
        sizeBytes,
        isUnderBudget,
        recommendations: [
            `CSS Size: ${(sizeBytes / 1024).toFixed(2)} KB (Under 14KB TCP initial window budget: ${isUnderBudget ? "YES (Pass)" : "NO (Exceeded)"}).`,
            "Inline this CSS directly within <style>...</style> in <head> to eliminate render-blocking CSS requests.",
            "Defer non-critical stylesheets using <link rel='preload' as='style' onload='this.rel=\"stylesheet\"'>.",
        ],
    };
}
//# sourceMappingURL=css.js.map