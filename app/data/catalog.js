const group = (slug, name, eyebrow, image, summary, products) => ({ slug, name, eyebrow, image, summary, products });

export const industries = [
  group("bakery-ingredients", "Bakery Ingredients", "Bakery Ingredients", "/products/bakery-image.png", "Functional bakery ingredients for consistent volume, texture, freshness and efficient commercial production.", ["Cake Gel","Cake Life","Cake Premix","Custard Powder","Bread Yield Improver","MACP (Mono Acid Calcium Phosphate)","Baking Powder","Corn Syrup","Calcium Propionate (CP)","Frozen Croissant"]),
  group("chocolate-confectionery", "Chocolate & Confectionery", "Chocolate & Confectionery Ingredients", "/products/chocolate-confectionery.webp", "Cocoa, couverture, compounds and confectionery ingredients for dependable flavour, colour and processing performance.", ["Cocoa Butter","Cocoa Mass","Cocoa Powder","Dark Chocolate","Milk Chocolate","White Chocolate","White Chips","Dark Chips","Milk Chips","White Chocomass","Dark Chocomass","Milk Chocomass","Choco Paste","Chocolate Drink","Callebaut 811","Callebaut 823","Callebaut W2","Bitter Chocolate 70-3","CB Plein Aroma Cocoa Powder"]),
  group("dairy-ingredients", "Dairy Ingredients", "Dairy Ingredients", "/products/dairy-image.png", "Dairy ingredients for creaminess, body, flavour, protein contribution and reliable food production.", ["Whipping Cream","Cream Cheese","Butter","Good Day Milk Powder","Krishna Milk Powder","Amul Whey Powder"]),
  group("beverage-ingredients", "Beverage Ingredients", "Beverage Ingredients", "/products/beverage-image.png", "Flavours, bases and fruit ingredients for consistent commercial beverage formulation.", ["Flavours & Natural Ingredients","Chocolate Drink","Fruit Crush"]),
  group("ice-cream-ingredients", "Ice Cream Ingredients", "Ice Cream Ingredients", "/products/ice-cream-ingredients.png", "Bases, flavours, toppings and stabilizers for smooth texture, body and reliable frozen-dessert batches.", ["Frozen Yogurt Premix","Panna Base","French Vanilla","Cocoa Miscela","Dessert Toppings","Ice Cream Stabilizer"]),
  group("fruit-processing", "Fruit Processing", "Fruit Processing Ingredients", "/products/fruit-processing-image.png", "Fruit fillings, preparations, purees, pectin and glazes for bakery, beverage and dessert applications.", ["Fruit Filling","Fruit Crush","Frozen Fruits","Fruit Purees","Genu Pectin","Glaze Gel"]),
  group("hydrocolloids-stabilizers", "Hydrocolloids & Stabilizers", "Hydrocolloids, Gums & Stabilizers", "/products/hydrocolloids-pharma.png", "Hydrocolloids and gums for viscosity control, stability, texture and mouthfeel.", ["Genu Pectin","Gelatin 120 Bloom","Gelatin 180 Bloom","Xanthan Gum","Guar Gum","Sodium CMC","Ice Cream Stabilizer"]),
  group("sweeteners-syrups-starches", "Sweeteners, Syrups & Starches", "Sweeteners, Syrups & Starches", "/products/sweeteners-syrups-starches-image.png", "Sweeteners, carbohydrates and starches for sweetness, body, solids and processing performance.", ["Liquid Glucose","Sorbitol 70% Solution","Invert Sugar","Sorbitol","Aspartame","Maize Starch","Potato Starch","Dextrose Monohydrate","Maltodextrin Powder","Corn Syrup"]),
  group("functional-ingredients", "Functional Ingredients", "Functional Ingredients", "/products/functional-ingredients-image.png", "Emulsifiers, proteins and processing aids for dependable texture, structure and production efficiency.", ["GMS Flakes","GMS Powder","Sorbitan Monostearate","Finamul 90","DMG","PGMS","SMS","PGPR","Soya Lecithin","Whey Protein","Whey Powder","Soya Protein","Vital Wheat Gluten","Skimmed Milk Powder","Calcium Carbonate","Calcium Chloride","Sodium Citrate","Propylene Glycol (PG)","Refined Glycerine"]),
  group("nutraceutical-pharma", "Nutraceutical & Pharma", "Nutraceutical & Pharma Ingredients", "/products/nutraceutical-pharma-image.png", "Protein, gelatin, vitamin and mineral ingredients subject to application and grade verification.", ["Whey Protein","Whey Powder","Soya Protein","Gelatin 120 Bloom","Gelatin 180 Bloom","Sorbitol","Aspartame","Dextrose Monohydrate","Maltodextrin Powder","Skimmed Milk Powder","Calcium Carbonate","Ascorbic Acid","Refined Glycerine","Propylene Glycol (PG)"]),
  group("food-additives-preservatives", "Food Additives & Preservatives", "Food Additives & Preservatives", "/products/food-additives-preservatives-image.png", "Preservation, acidity, leavening, emulsification, texture, flavour and processing-control ingredients.", ["Potassium Sorbate","Sorbic Acid","Sodium Benzoate","Potassium Metabisulphite (KMS)","Citric Acid Monohydrate","Citric Acid Anhydrous","Malic Acid","Acetic Acid","Ascorbic Acid","Malt Extract Powder","Ammonium Bicarbonate","Baking Powder","Sodium Bicarbonate","SAPP (Sodium Acid Pyrophosphate)","Black Cocoa Powder","Caramel","Extra Pure Vanillin","Orange Oil","Saucetec"])
];

export const slugify = (value) => value.toLowerCase().replace(/&/g, "and").replace(/\([^)]*\)/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const productMap = new Map();
industries.forEach((industry) => industry.products.forEach((name) => {
  const slug = slugify(name);
  if (!productMap.has(slug)) productMap.set(slug, {
    slug, name, industrySlug: industry.slug, category: industry.name, image: industry.image,
    summary: `${name} for consistent food production`,
    description: `Vikranth Chemical Corporation supplies ${name} in Chennai for professional food businesses seeking dependable sourcing and application-fit guidance. Tell our team your product, process, required grade, monthly quantity and documentation needs so we can confirm a suitable available option.`
  });
}));

export const products = [...productMap.values()];
export const getProduct = (slug) => products.find((item) => item.slug === slug);
export const getIndustry = (slug) => industries.find((item) => item.slug === slug);
