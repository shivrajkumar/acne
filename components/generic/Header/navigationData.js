export const navigationItems = [
  {
    title: "Products",
    name: "Products",
    href: "/",
    hasDropdown: true,
    dropdownContent: {
      sections: [
        {
          mainLink: {
            title: "Shop",
            name: "Shop",
          },
          items: [
            {
              name: "View All Products",
              href: "/view-all-products",
              // badge: "Coming Soon",
            },
            {
              name: "Oil Control Facewash",
              href: "/view-all-products/OIL_CTRL_FW?type=COSMETIC_CLEANSER",
              // badge: "Coming Soon",
            },
            {
              name: "Hydrating Facewash",
              href: "/view-all-products/HYDR_FW?type=COSMETIC_CLEANSER",
              // badge: "Coming Soon",
            },
            {
              name: "Acne-Safe Moisturiser",
              href: "/view-all-products/ACSAFE_MOIS?type=COSMETIC_MOISTURISER",
              // badge: "Coming Soon",
            },
            {
              name: "Deep Hydration Moisturiser",
              href: "/view-all-products/DEEP_HYD_MOIS?type=COSMETIC_MOISTURISER",
              // badge: "Coming Soon",
            },
            {
              name: "Lightweight Sunscreen",
              href: "/view-all-products/LIGHT_SPF50?type=COSMETIC_PROTECTION",
              // badge: "Coming Soon",
            },
            {
              name: "Skin Food Range 01 - 08",
              href: "/skin-food",
              // badge: "Coming Soon",
            },
            {
              name: "Skin Food 09",
              href: "/skin-food/SF09?type=SUPPLEMENT",
              // badge: "Coming Soon",
            },
          ],
        },
      ],
      showCTA: true,
    },
  },
  {
    title: "About Us",
    name: "AboutUs",
    href: "/about-us",
    hasDropdown: true,
    dropdownContent: {
      sections: [
        {
          mainLink: {
            title: "About Us",
            name: "AboutUs",
          },
          items: [
            { name: "Who are We?", href: "/about-us" },
            { name: "Our Experts", href: "/experts" },
          ],
        },
      ],
      showCTA: false,
    },
  },
  {
    title: "Results",
    name: "Results",
    href: "/reviews",
    hasDropdown: true,
    dropdownContent: {
      sections: [
        {
          mainLink: {
            title: "Results",
            name: "Results",
          },
          items: [{ name: "Reviews", href: "/reviews" }],
        },
      ],
      showCTA: false,
    },
  },
  {
    title: "Ritual Reports",
    name: "RitualReports",
    href: "/",
    hasDropdown: true,
    dropdownContent: {
      sections: [
        {
          mainLink: {
            title: "Ritual Reports",
            name: "RitualReports",
          },
          items: [
            { name: "Ritual Blogs", href: "/blog",/*  badge: "Coming Soon"  */},
            {
              name: "Know your Ingredients",
              href: "/",
              badge: "Coming Soon",
            },
            {
              name: "Editorial Standards",
              href: "/editorial-standards",
            },
          ],
        },
      ],
      showCTA: true,
    },
  },
];
