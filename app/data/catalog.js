import { productImageByName } from "./partners";

const group = (slug, name, eyebrow, image, summary, products) => ({ slug, name, eyebrow, image, summary, products });

export const industries = [
  group("bakery-ingredients", "Bakery Ingredients", "Bakery Ingredients", "/products/bakery-image.png", "Functional bakery ingredients for consistent volume, texture, freshness and efficient commercial production.", ["Cake Gel","Cake Life","Cake Premix","Custard Powder","Bread Yield Improver","MACP (Mono Acid Calcium Phosphate)","Baking Powder","Corn Syrup","Calcium Propionate (CP)","Sodium Propionate","Frozen Croissant"]),
  group("chocolate-confectionery", "Chocolate & Confectionery", "Chocolate & Confectionery Ingredients", "/products/chocolate-confectionery.webp", "Cocoa, couverture, compounds and confectionery ingredients for dependable flavour, colour and processing performance.", ["Cocoa Butter","Cocoa Mass","Cocoa Powder","Dark Chocolate","Milk Chocolate","White Chocolate","White Chips","Dark Chips","Milk Chips","White Chocomass","Dark Chocomass","Milk Chocomass","Choco Paste","Chocolate Drink","Callebaut 811","Callebaut 823","Callebaut W2","Bitter Chocolate 70-3","CB Plein Aroma Cocoa Powder"]),
  group("dairy-ingredients", "Dairy Ingredients", "Dairy Ingredients", "/products/dairy-image.png", "Dairy ingredients for creaminess, body, flavour, protein contribution and reliable food production.", ["Whipping Cream","Cream Cheese","Butter","Good Day Milk Powder","Krishna Milk Powder","Amul Whey Powder"]),
  group("beverage-ingredients", "Beverage Ingredients", "Beverage Ingredients", "/products/beverage-image.png", "Flavours, bases and fruit ingredients for consistent commercial beverage formulation.", ["Flavours & Natural Ingredients","Fruit Ingredients","Fruit Sweetness","Juice Concentrates","NFC Juices","Chocolate Drink","Fruit Crush","Sodium CMC Stabilizer Grade","Sodium CMC Thick Shake Grade"]),
  group("ice-cream-ingredients", "Ice Cream Ingredients", "Ice Cream Ingredients", "/products/ice-cream-ingredients.png", "Bases, flavours, toppings and stabilizers for smooth texture, body and reliable frozen-dessert batches.", ["Frozen Yogurt Premix","Panna Base","French Vanilla","Cocoa Miscela","Dessert Toppings","Ice Cream Stabilizer","Amaze Ice Cream Stabilizer"]),
  group("fruit-processing", "Fruit Processing", "Fruit Processing Ingredients", "/products/fruit-processing-image.png", "Fruit fillings, preparations, purees, pectin and glazes for bakery, beverage and dessert applications.", ["Fruit Filling","Fruit Ingredients","Fruit Sweetness","Juice Concentrates","NFC Juices","Fruit Crush","Frozen Fruits","Fruit Purees","Genu Pectin","Glaze Gel"]),
  group("hydrocolloids-stabilizers", "Hydrocolloids & Stabilizers", "Hydrocolloids, Gums & Stabilizers", "/products/hydrocolloids-pharma.png", "Hydrocolloids and gums for viscosity control, stability, texture and mouthfeel.", ["Genu Pectin","GENU® Pectin MRS 115","Gelatin 120 Bloom","Gelatin 160 Bloom","Gelatin 180 Bloom","Xanthan Gum","Guar Gum","Sodium CMC","Sodium Alginate FG","Ice Cream Stabilizer"]),
  group("sweeteners-syrups-starches", "Sweeteners, Syrups & Starches", "Sweeteners, Syrups & Starches", "/products/sweeteners-syrups-starches-image.png", "Sweeteners, carbohydrates and starches for sweetness, body, solids and processing performance.", ["Liquid Glucose","Glucose D","High Maltose Syrups","Sorbitol 70% Solution","Invert Sugar","Sorbitol","Isomalt","SWEETPEARL® P 200 Maltitol","Aspartame","Maize Starch","Maize Starch Powder","Potato Starch","Dextrose Monohydrate","Maltodextrin Powder","Corn Syrup","CLEARAM® CH 20 20"]),
  group("functional-ingredients", "Functional Ingredients", "Functional Ingredients", "/products/functional-ingredients-image.png", "Emulsifiers, proteins and processing aids for dependable texture, structure and production efficiency.", ["GMS Flakes","GMS Powder","Sorbitan Monostearate","Finamul 90","Distilled Monoglycerides (DMG)","Propylene Glycol Monostearate (PGMS)","SMS","PGPR","Soya Lecithin","Whey Protein","Instantized Whey Protein","Whey Powder","Soya Protein","Full-Fat Soya Flour","Vital Wheat Gluten","Skimmed Milk Powder","Calcium Carbonate","Calcium Chloride","Calcium Gluconate","Sodium Citrate","Propylene Glycol (PG)","Refined Glycerine"]),
  group("nutraceutical-pharma", "Nutraceutical & Pharma", "Nutraceutical & Pharma Ingredients", "/products/nutraceutical-pharma-image.png", "Protein, gelatin, vitamin and mineral ingredients subject to application and grade verification.", ["Whey Protein","Instantized Whey Protein","Whey Powder","Soya Protein","Gelatin 120 Bloom","Gelatin 180 Bloom","Sorbitol","Isomalt","SWEETPEARL® P 200 Maltitol","Aspartame","Dextrose Monohydrate","Maltodextrin Powder","Skimmed Milk Powder","Calcium Carbonate","Calcium Gluconate","Ascorbic Acid","Refined Glycerine","Propylene Glycol (PG)"]),
  group("food-additives-preservatives", "Food Additives & Preservatives", "Food Additives & Preservatives", "/products/food-additives-preservatives-image.png", "Preservation, acidity, leavening, emulsification, texture, flavour and processing-control ingredients.", ["Potassium Sorbate","Sorbic Acid","Sodium Benzoate","Sodium Propionate","Potassium Metabisulphite (KMS)","Citric Acid Monohydrate","Citric Acid Anhydrous","Malic Acid","Acetic Acid","Ascorbic Acid","Malt Extract Powder","Ammonium Bicarbonate","Baking Powder","Sodium Bicarbonate","SAPP (Sodium Acid Pyrophosphate)","Black Cocoa Powder","Caramel","Extra Pure Vanillin","Orange Oil","Saucetec"])
];

export const bakeryProductGroups = [
  { name: "Cake", description: "Ingredients for making cakes, cupcakes, muffins and sponge products with consistent volume, softness and shelf life.", ingredients: ["Cake Gel", "Cake Life", "Cake Premix", "Baking Powder", "MACP (Mono Acid Calcium Phosphate)", "Corn Syrup"] },
  { name: "Bread", description: "Ingredients for making bread, buns, pav and rolls with dependable dough performance, yield, texture and freshness.", ingredients: ["Bread Yield Improver", "Calcium Propionate (CP)", "Sodium Propionate", "Baking Powder"] },
  { name: "Biscuits, Cookies & Crackers", description: "Leavening and sweetening ingredients used in biscuits, cookies and cracker production.", ingredients: ["MACP (Mono Acid Calcium Phosphate)", "Baking Powder", "Corn Syrup"] },
  { name: "Pastry & Desserts", description: "Ingredients for making pastries, tarts, cream buns, fillings and desserts.", ingredients: ["Frozen Croissant", "Custard Powder", "Corn Syrup"] }
];

export const chocolateProductGroups = [
  { name: "Chocolate & Couverture", description: "Ingredients for making dark, milk, white and premium couverture chocolate products.", ingredients: ["Cocoa Butter", "Cocoa Mass", "Dark Chocolate", "Milk Chocolate", "White Chocolate", "Callebaut 811", "Callebaut 823", "Callebaut W2", "Bitter Chocolate 70-3"] },
  { name: "Chips & Inclusions", description: "Chocolate chips and inclusions for cookies, cakes, muffins, desserts and bakery toppings.", ingredients: ["White Chips", "Dark Chips", "Milk Chips"] },
  { name: "Fillings, Coatings & Paste", description: "Chocolate ingredients for bakery fillings, spreads, coatings, moulding and confectionery applications.", ingredients: ["White Chocomass", "Dark Chocomass", "Milk Chocomass", "Choco Paste"] },
  { name: "Cocoa & Chocolate Drinks", description: "Cocoa and chocolate ingredients for beverages, desserts, bakery mixes and flavour applications.", ingredients: ["Cocoa Powder", "Chocolate Drink", "CB Plein Aroma Cocoa Powder"] }
];

export const dairyProductGroups = [
  { name: "Cakes & Desserts", description: "Dairy ingredients for making cakes, cheesecakes, mousse, puddings and chilled desserts.", ingredients: ["Whipping Cream", "Cream Cheese", "Butter", "Good Day Milk Powder"] },
  { name: "Bakery Products", description: "Ingredients for richness, flavour, browning, softness and dairy solids in breads, cakes, cookies and pastries.", ingredients: ["Butter", "Good Day Milk Powder", "Krishna Milk Powder", "Amul Whey Powder"] },
  { name: "Creams & Fillings", description: "Dairy ingredients for making cake frosting, cream fillings, cheesecake filling and dessert toppings.", ingredients: ["Whipping Cream", "Cream Cheese", "Butter"] },
  { name: "Dairy Drinks & Mixes", description: "Milk and whey ingredients for beverages, premixes, nutrition products and dairy-based formulations.", ingredients: ["Good Day Milk Powder", "Krishna Milk Powder", "Amul Whey Powder"] }
];

export const beverageProductGroups = [
  { name: "Fruit Beverages", description: "Ingredients for making fruit drinks, coolers, mocktails, shakes and juice-based beverages.", ingredients: ["Fruit Ingredients", "Fruit Sweetness", "Juice Concentrates", "NFC Juices", "Fruit Crush", "Flavours & Natural Ingredients"] },
  { name: "Chocolate Beverages", description: "Ingredients for making hot chocolate, cold chocolate, milkshakes and chocolate drink mixes.", ingredients: ["Chocolate Drink", "Flavours & Natural Ingredients"] },
  { name: "Flavoured Drinks", description: "Flavour systems and fruit ingredients for soft drinks, milk beverages, syrups and food-service drinks.", ingredients: ["Flavours & Natural Ingredients", "Fruit Ingredients", "Fruit Sweetness", "Juice Concentrates", "NFC Juices", "Fruit Crush"] },
  { name: "Stabilizers & Texture", description: "Application-specific CMC grades for body, suspension and a consistent texture in beverage systems.", ingredients: ["Sodium CMC Stabilizer Grade", "Sodium CMC Thick Shake Grade"] }
];

export const iceCreamProductGroups = [
  { name: "Ice Cream & Gelato", description: "Ingredients for making smooth ice cream and gelato with consistent flavour, body and texture.", ingredients: ["Panna Base", "French Vanilla", "Cocoa Miscela", "Ice Cream Stabilizer", "Amaze Ice Cream Stabilizer"] },
  { name: "Frozen Yogurt", description: "Premix and supporting ingredients for making creamy frozen yogurt and soft-serve products.", ingredients: ["Frozen Yogurt Premix", "Dessert Toppings", "Ice Cream Stabilizer"] },
  { name: "Sundaes & Desserts", description: "Flavour bases and toppings for sundaes, plated desserts, shakes and frozen dessert service.", ingredients: ["Dessert Toppings", "French Vanilla", "Cocoa Miscela"] },
  { name: "Bases & Texture", description: "Functional ingredients for improving body, creaminess, stability and melt resistance in frozen desserts.", ingredients: ["Panna Base", "Frozen Yogurt Premix", "Ice Cream Stabilizer"] }
];

export const fruitProductGroups = [
  { name: "Bakery Fillings", description: "Fruit ingredients for making pie fillings, cake layers, pastries, tarts and filled bakery products.", ingredients: ["Fruit Filling", "Fruit Ingredients", "Fruit Purees", "Genu Pectin", "Glaze Gel"] },
  { name: "Fruit Beverages", description: "Fruit bases for making juices, coolers, smoothies, milkshakes, mocktails and beverage concentrates.", ingredients: ["Fruit Ingredients", "Fruit Sweetness", "Juice Concentrates", "NFC Juices", "Fruit Crush", "Fruit Purees", "Frozen Fruits"] },
  { name: "Jams & Preserves", description: "Fruit and texturizing ingredients for making jams, jellies, preserves and fruit preparations.", ingredients: ["Fruit Purees", "Frozen Fruits", "Genu Pectin"] },
  { name: "Desserts & Toppings", description: "Fruit ingredients for desserts, yogurt, ice cream, cheesecake toppings and decorative finishing.", ingredients: ["Fruit Filling", "Fruit Crush", "Frozen Fruits", "Fruit Purees", "Glaze Gel"] }
];

export const hydrocolloidProductGroups = [
  { name: "Jams & Fruit Preparations", description: "Hydrocolloids for setting, thickening and stabilizing jams, jellies, fruit fillings and preparations.", ingredients: ["Genu Pectin", "GENU® Pectin MRS 115", "Xanthan Gum", "Guar Gum", "Sodium CMC"] },
  { name: "Ice Cream & Dairy", description: "Stabilizers for improving body, creaminess, suspension, melt resistance and texture in dairy products.", ingredients: ["Ice Cream Stabilizer", "Gelatin 120 Bloom", "Gelatin 160 Bloom", "Gelatin 180 Bloom", "Guar Gum", "Sodium CMC"] },
  { name: "Beverages & Sauces", description: "Gums and stabilizers for viscosity, suspension and consistent mouthfeel in beverages, sauces and dressings.", ingredients: ["Xanthan Gum", "Guar Gum", "Sodium CMC", "Sodium Alginate FG", "Genu Pectin"] },
  { name: "Confectionery & Desserts", description: "Gelling and texturizing ingredients for gummies, marshmallows, jelly desserts, mousse and confectionery.", ingredients: ["Gelatin 120 Bloom", "Gelatin 160 Bloom", "Gelatin 180 Bloom", "Genu Pectin", "GENU® Pectin MRS 115"] }
];

export const sweetenerProductGroups = [
  { name: "Bakery & Confectionery", description: "Sweeteners and syrups for cakes, cookies, fillings, candies, chocolates and confectionery products.", ingredients: ["Liquid Glucose", "Glucose D", "High Maltose Syrups", "Invert Sugar", "Dextrose Monohydrate", "Corn Syrup", "Sorbitol 70% Solution"] },
  { name: "Beverages & Syrups", description: "Ingredients for sweetness, solids and body in beverages, concentrates, drink mixes and flavoured syrups.", ingredients: ["Liquid Glucose", "Glucose D", "High Maltose Syrups", "Invert Sugar", "Aspartame", "Dextrose Monohydrate", "Maltodextrin Powder", "Corn Syrup"] },
  { name: "Sugar-Free & Reduced Sugar", description: "Alternative sweetening ingredients for reduced-sugar, sugar-free and calorie-managed formulations.", ingredients: ["Sorbitol", "Sorbitol 70% Solution", "Isomalt", "SWEETPEARL® P 200 Maltitol", "Aspartame", "Maltodextrin Powder"] },
  { name: "Texture, Body & Thickening", description: "Starches and carbohydrates for viscosity, binding, bulking, crispness and processing performance.", ingredients: ["Maize Starch", "Maize Starch Powder", "Potato Starch", "Maltodextrin Powder", "Dextrose Monohydrate", "CLEARAM® CH 20 20"] }
];

export const functionalProductGroups = [
  { name: "Bakery & Dough", description: "Functional ingredients for dough strength, volume, softness, emulsification and consistent bakery processing.", ingredients: ["GMS Flakes", "GMS Powder", "Sorbitan Monostearate", "Finamul 90", "Distilled Monoglycerides (DMG)", "Propylene Glycol Monostearate (PGMS)", "SMS", "Soya Lecithin", "Soya Protein", "Full-Fat Soya Flour", "Vital Wheat Gluten", "Skimmed Milk Powder"] },
  { name: "Chocolate & Confectionery", description: "Emulsifiers and processing aids for chocolate flow, fat dispersion, texture, coatings and confectionery production.", ingredients: ["GMS Flakes", "GMS Powder", "Sorbitan Monostearate", "Distilled Monoglycerides (DMG)", "Propylene Glycol Monostearate (PGMS)", "SMS", "PGPR", "Soya Lecithin", "Refined Glycerine"] },
  { name: "Dairy & Beverages", description: "Proteins, emulsifiers, minerals and processing ingredients for dairy products, drinks and powdered mixes.", ingredients: ["GMS Powder", "Whey Protein", "Whey Powder", "Soya Protein", "Skimmed Milk Powder", "Calcium Chloride", "Sodium Citrate", "Propylene Glycol (PG)"] },
  { name: "Nutrition & Fortification", description: "Protein, mineral and carrier ingredients for nutrition products, fortified foods and specialty formulations.", ingredients: ["Whey Protein", "Instantized Whey Protein", "Whey Powder", "Soya Protein", "Full-Fat Soya Flour", "Vital Wheat Gluten", "Skimmed Milk Powder", "Calcium Carbonate", "Calcium Chloride", "Calcium Gluconate", "Sodium Citrate", "Propylene Glycol (PG)", "Refined Glycerine"] }
];

export const nutraceuticalProductGroups = [
  { name: "Protein Nutrition", description: "Protein and dairy ingredients for nutrition powders, shakes, sports products and fortified foods.", ingredients: ["Whey Protein", "Instantized Whey Protein", "Whey Powder", "Soya Protein", "Skimmed Milk Powder", "Dextrose Monohydrate", "Maltodextrin Powder"] },
  { name: "Tablets & Powder Mixes", description: "Sweeteners, carriers, binders and minerals for tablets, sachets, drink powders and dry formulations.", ingredients: ["Sorbitol", "Isomalt", "SWEETPEARL® P 200 Maltitol", "Aspartame", "Dextrose Monohydrate", "Maltodextrin Powder", "Calcium Carbonate", "Calcium Gluconate", "Ascorbic Acid"] },
  { name: "Gummies & Softgels", description: "Gelling, humectant and carrier ingredients for nutraceutical gummies, softgels and related dosage formats.", ingredients: ["Gelatin 120 Bloom", "Gelatin 160 Bloom", "Gelatin 180 Bloom", "Sorbitol", "Refined Glycerine", "Propylene Glycol (PG)", "Ascorbic Acid"] },
  { name: "Vitamin & Mineral Fortification", description: "Ingredients for adding vitamin C, calcium, protein and nutritional solids to fortified formulations.", ingredients: ["Ascorbic Acid", "Calcium Carbonate", "Calcium Gluconate", "Whey Protein", "Instantized Whey Protein", "Whey Powder", "Soya Protein", "Skimmed Milk Powder"] }
];

export const additiveProductGroups = [
  { name: "Food Preservation", description: "Preservatives for supporting shelf life and microbial control in bakery, beverages, sauces and processed foods.", ingredients: ["Potassium Sorbate", "Sorbic Acid", "Sodium Benzoate", "Sodium Propionate", "Potassium Metabisulphite (KMS)"] },
  { name: "Acidity & Antioxidant Control", description: "Food acids and antioxidants for pH adjustment, tartness, flavour balance and oxidation control.", ingredients: ["Citric Acid Monohydrate", "Citric Acid Anhydrous", "Malic Acid", "Acetic Acid", "Ascorbic Acid"] },
  { name: "Bakery & Leavening", description: "Leavening and processing ingredients for cakes, biscuits, cookies, crackers and other bakery products.", ingredients: ["Ammonium Bicarbonate", "Baking Powder", "Sodium Bicarbonate", "SAPP (Sodium Acid Pyrophosphate)", "Malt Extract Powder"] },
  { name: "Colour, Flavour & Sauces", description: "Ingredients for adding colour, aroma, flavour depth and application-ready character to foods and sauces.", ingredients: ["Black Cocoa Powder", "Caramel", "Extra Pure Vanillin", "Orange Oil", "Saucetec"] }
];

export const slugify = (value) => value.toLowerCase().replace(/&/g, "and").replace(/\([^)]*\)/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const productMap = new Map();
industries.forEach((industry) => industry.products.forEach((name) => {
  const slug = slugify(name);
  if (!productMap.has(slug)) productMap.set(slug, {
    slug, name, industrySlug: industry.slug, category: industry.name, image: productImageByName[name] || industry.image,
    summary: `${name} for consistent food production`,
    description: `Vikranth Chemical Corporation supplies ${name} in Chennai for professional food businesses seeking dependable sourcing and application-fit guidance. Tell our team your product, process, required grade, monthly quantity and documentation needs so we can confirm a suitable available option.`
  });
}));

export const products = [...productMap.values()];
export const getProduct = (slug) => products.find((item) => item.slug === slug);
export const getIndustry = (slug) => industries.find((item) => item.slug === slug);
