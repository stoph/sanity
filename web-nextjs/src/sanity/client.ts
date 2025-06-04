import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "zkf9qp2j",
  dataset: "production",
  apiVersion: "2023-05-03",
  useCdn: false,
}); 