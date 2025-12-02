import { getCatalogProducts } from "@/lib/shopify";
import { CatalogClient } from "./catalog-client";

export default async function CatalogPage() {
  const products = await getCatalogProducts();
  return <CatalogClient initialProducts={products} />;
}
