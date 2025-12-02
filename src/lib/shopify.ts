const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;
const apiVersion = "2024-01";

export type ShopifyImage = {
  url: string;
  altText?: string | null;
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  category: string;
  price: number;
  image: ShopifyImage;
  gallery: ShopifyImage[];
};

const mockProducts: ShopifyProduct[] = [
  {
    id: "gid://shopify/Product/mock-1",
    handle: "contour-bustier-dress",
    title: "Contour Bustier Dress",
    description: "Sculpted boning, low back, liquid satin finish.",
    price: 1620,
    category: "Dresses",
    image: {
      url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
      altText: "Contour Bustier Dress",
    },
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
      },
      {
        url: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
  {
    id: "gid://shopify/Product/mock-2",
    handle: "nomad-trouser",
    title: "Nomad Trouser",
    description: "Bone linen, double-pleat front, adjustable belt.",
    price: 980,
    category: "Separates",
    image: {
      url: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=80",
      altText: "Nomad Trouser",
    },
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=80",
      },
      {
        url: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
  {
    id: "gid://shopify/Product/mock-3",
    handle: "monolith-jacket",
    title: "Monolith Jacket",
    description: "Architectural shoulders with horn button detailing.",
    price: 2150,
    category: "Outerwear",
    image: {
      url: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80",
      altText: "Monolith Jacket",
    },
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80",
      },
      {
        url: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
];

async function storefrontFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T | null> {
  if (!domain || !token) {
    return null;
  }

  const res = await fetch(`https://${domain}/api/${apiVersion}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed Shopify request:", await res.text());
    return null;
  }

  return (await res.json()) as T;
}

export async function getCatalogProducts(): Promise<ShopifyProduct[]> {
  const query = /* GraphQL */ `
    query ProductsQuery($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            handle
            title
            description
            productType
            featuredImage {
              url
              altText
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
              }
            }
          }
        }
      }
    }
  `;

  const json = await storefrontFetch<{
    data?: {
      products?: {
        edges: Array<{
          node: {
            id: string;
            handle: string;
            title: string;
            description: string;
            productType?: string | null;
            featuredImage?: ShopifyImage | null;
            images: { edges: Array<{ node: ShopifyImage }> };
            priceRange: { minVariantPrice: { amount: string } };
          };
        }>;
      };
    };
  }>(query, { first: 20 });

  if (!json?.data?.products?.edges) {
    console.warn(
      "Shopify credentials missing or invalid. Falling back to mock catalog data. Set NEXT_PUBLIC_SHOPIFY_DOMAIN and NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN.",
    );
    return mockProducts;
  }

  return json.data.products.edges.map((edge) => ({
    id: edge.node.id,
    handle: edge.node.handle,
    title: edge.node.title,
    description: edge.node.description,
    category: edge.node.productType || "Collection",
    price: Number(edge.node.priceRange.minVariantPrice.amount ?? 0),
    image: edge.node.featuredImage ?? {
      url: "/placeholder.png",
      altText: edge.node.title,
    },
    gallery:
      edge.node.images?.edges?.map(({ node }) => ({
        url: node.url,
        altText: node.altText,
      })) ?? [],
  }));
}

export async function getProductByHandle(
  handle: string,
): Promise<ShopifyProduct | null> {
  const products = await getCatalogProducts();
  return products.find((product) => product.handle === handle) ?? null;
}

