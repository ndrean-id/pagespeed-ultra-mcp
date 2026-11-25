export interface NovamiraOptimizerOptions {
  siteType?: "blog" | "corporate" | "ecommerce" | "landing_page";
  disableEmojis?: boolean;
  disableGutenbergCss?: boolean;
  disableDashicons?: boolean;
  deferNonCriticalJs?: boolean;
  inlineCriticalCss?: string;
  jsonLdSchema?: string;
}

export function generateNovamiraWpOptimizer(options: NovamiraOptimizerOptions = {}): {
  muPluginPhp: string;
  wpCliCommands: string[];
  recommendations: string[];
} {
  const {
    disableEmojis = true,
    disableGutenbergCss = true,
    disableDashicons = true,
    deferNonCriticalJs = true,
    inlineCriticalCss = "",
    jsonLdSchema = "",
  } = options;

  // Clean, high-performance Must-Use (MU) WordPress Plugin
  const muPluginPhp = `<?php
/**
 * Plugin Name: PageSpeed Ultra WordPress Optimizer
 * Description: Lightweight core performance optimizations for Core Web Vitals (Zero TBT, Zero CLS). Compatible with Elementor & SastraPro standards.
 * Version: 1.0.0
 * Author: ndrean-id
 */

if (!defined('ABSPATH')) {
    exit;
}

${disableEmojis ? `
// 1. Disable WordPress Emojis (Saves 1 HTTP Request & reduces main-thread JS execution)
add_action('init', function() {
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('admin_print_scripts', 'print_emoji_detection_script');
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_action('admin_print_styles', 'print_emoji_styles');
    remove_filter('the_content_feed', 'wp_staticize_emoji');
    remove_filter('comment_text_rss', 'wp_staticize_emoji');
    remove_filter('wp_mail', 'wp_staticize_emoji_for_email');
});
` : ""}

${disableGutenbergCss ? `
// 2. Remove Block Library CSS on pages powered by Elementor
add_action('wp_enqueue_scripts', function() {
    wp_dequeue_style('wp-block-library');
    wp_dequeue_style('wp-block-library-theme');
    wp_dequeue_style('wc-blocks-style'); // WooCommerce block styles if present
}, 100);
` : ""}

${disableDashicons ? `
// 3. Disable Dashicons on frontend for non-logged-in visitors
add_action('wp_enqueue_scripts', function() {
    if (!is_user_logged_in()) {
        wp_deregister_style('dashicons');
    }
});
` : ""}

${deferNonCriticalJs ? `
// 4. Defer non-critical scripts (Preserves 0ms TBT score)
add_filter('script_loader_tag', function($tag, $handle, $src) {
    if (is_admin()) return $tag;
    // Keep essential WordPress inline scripts untouched
    if (strpos($tag, 'defer') !== false || strpos($tag, 'async') !== false) return $tag;
    // Defer frontend scripts
    return str_replace(' src=', ' defer src=', $tag);
}, 10, 3);
` : ""}

${inlineCriticalCss ? `
// 5. Inject Critical CSS above-the-fold
add_action('wp_head', function() {
    echo '<style id="pagespeed-ultra-critical-css">' . ${JSON.stringify(inlineCriticalCss)} . '</style>' . PHP_EOL;
}, 1);
` : ""}

${jsonLdSchema ? `
// 6. Inject Google Rich Results JSON-LD Schema
add_action('wp_head', function() {
    echo ${JSON.stringify(jsonLdSchema)} . PHP_EOL;
}, 2);
` : ""}
`.trim();

  const wpCliCommands = [
    "# Optimize WordPress options and database via WP-CLI (Novamira Tool)",
    "wp option update elementor_css_print_method 'internal'",
    "wp option update elementor_experiment-e_font_icon_svg 'active'",
    "wp option update elementor_experiment-e_optimized_assets_loading 'active'",
    "wp option update elementor_experiment-container 'active'",
  ];

  const recommendations = [
    "Save the generated PHP code as 'wp-content/mu-plugins/pagespeed-ultra-optimizer.php'.",
    "Novamira can write this file directly using its filesystem or WP-CLI tools.",
    "This MU-plugin automatically runs on every page load with zero performance overhead.",
  ];

  return {
    muPluginPhp,
    wpCliCommands,
    recommendations,
  };
}
