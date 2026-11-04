import type { MetadataRoute } from "next";
import { ALL_TOOLS } from "@/tools/registry";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Zoyku — free browser tools",
    short_name: "Zoyku",
    description: `${ALL_TOOLS.length} free online tools that run entirely in your browser. Files never leave your device.`,
    start_url: "/en",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
