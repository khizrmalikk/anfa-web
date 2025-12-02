export type HeroConfig = {
  status: string;
  dropLabel: string;
  releaseWindow: string;
  title: string;
  description: string;
  ctaLabel: string;
  image: string;
};

export const defaultHeroConfig: HeroConfig = {
  status: "Now Dropping",
  dropLabel: "Blondes & Brunettes",
  releaseWindow: "Dec 02 — Jan 05",
  title: "Anfa Label",
  description:
    "Fashion that defies conformity, empowering individuals to express their true selves with every stitch.",
  ctaLabel: "Explore catalog",
  image: "/Hero2.webp",
};

