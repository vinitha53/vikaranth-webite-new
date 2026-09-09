export const business = {
  name: "Vikranth Chemical Corporation",
  url: "https://www.vikranthchemicalcorporation.com",
  description: "Chennai-based food ingredient supplier, distributor and wholesaler serving South India and pan-India. Bulk sourcing for food businesses, with small-business and personal purchase enquiries welcome.",
  coverage: "Based in Chennai. Serving South India and pan-India, with pack sizes, minimum quantities and delivery confirmed for your product and PIN code.",
};

export const buyerFaq = [
  "Can small businesses, home bakers and individual buyers order?",
  "Yes. Alongside bulk and wholesale supply, Vikranth welcomes small-business, home-baking and personal purchase enquiries. Tell us the product, quantity and delivery PIN code. Available packs, minimum order quantity and delivery options are confirmed before you order.",
];

export const serviceAreas = [
  { "@type": "City", name: "Chennai" },
  ...["Tamil Nadu", "Karnataka", "Kerala", "Andhra Pradesh", "Telangana", "Puducherry"].map(name => ({ "@type": "AdministrativeArea", name })),
  { "@type": "Country", name: "India" },
];
