import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "yx3xhsjf",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});
