import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";

import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "default",
  title: "Servicol Studio",
  projectId: "yx3xhsjf",
  dataset: "production",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
