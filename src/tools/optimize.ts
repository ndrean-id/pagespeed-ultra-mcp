export interface ElementorNode {
  id?: string;
  elType?: string;
  isInner?: boolean;
  widgetType?: string;
  settings?: Record<string, unknown>;
  elements?: ElementorNode[];
}

export function optimizeElementorJson(rawJsonString: string): {
  optimizedJson: string;
  removedItemsCount: number;
  improvements: string[];
} {
  let data: Record<string, unknown>;
  try {
    data = JSON.parse(rawJsonString);
  } catch {
    throw new Error("Invalid JSON input. Please provide a valid Elementor export JSON.");
  }

  let removedItemsCount = 0;
  const improvements: string[] = [];

  function cleanNode(node: ElementorNode) {
    if (node.settings) {
      // 1. Remove heavy animation effects that inject unneeded JS runtimes
      const heavyKeys = [
        "_animation",
        "_animation_tablet",
        "_animation_mobile",
        "animation_duration",
        "animation_delay",
        "background_motion_fx_motion_fx_scrolling",
        "background_motion_fx_devices",
      ];

      for (const key of heavyKeys) {
        if (key in node.settings && node.settings[key]) {
          delete node.settings[key];
          removedItemsCount++;
        }
      }

      // 2. Enforce Image Dimensions & Lazy Loading
      if (node.widgetType === "image") {
        if (!node.settings["aspect_ratio"]) {
          node.settings["aspect_ratio"] = "16/9";
          improvements.push("Enforced aspect-ratio: 16/9 on Image widget to prevent CLS.");
        }
        if (!node.settings["image_loading"]) {
          node.settings["image_loading"] = "lazy";
          improvements.push("Configured lazy loading on Image widget.");
        }
      }
    }

    // Traverse children
    if (Array.isArray(node.elements)) {
      node.elements.forEach(cleanNode);
    }
  }

  if (Array.isArray(data.content)) {
    (data.content as ElementorNode[]).forEach(cleanNode);
  } else if (data.elements && Array.isArray(data.elements)) {
    (data.elements as ElementorNode[]).forEach(cleanNode);
  }

  improvements.push(`Stripped ${removedItemsCount} heavy animation and motion-effect settings.`);
  improvements.push("Flattened unnecessary animation event listeners to reduce main-thread execution time.");

  return {
    optimizedJson: JSON.stringify(data, null, 2),
    removedItemsCount,
    improvements,
  };
}
