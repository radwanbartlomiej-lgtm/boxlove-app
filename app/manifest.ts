import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BOXLOVE",
    short_name: "BOXLOVE",
    description: "Boxy eventowe z dostawą",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/app-icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/app-icon.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  };
}