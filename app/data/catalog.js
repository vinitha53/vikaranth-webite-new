import { productImageByName } from "./partners";
import { approvedRangeProducts } from "./catalog-ranges";

const group = (slug, name, eyebrow, image, summary, products) => ({ slug, name, eyebrow, image, summary, products });

export const industries = [
  group("chocolate-confectionery", "Chocolate & Confectionery", "Chocolate & Confectionery Ingredients", "/industries/chocolate-confectionery.webp", "Cocoa, couverture, compounds and confectionery ingredients for dependable flavour, colour and processing performance.", ["Cocoa Butter","Cocoa Mass","Cocoa Powder","Dark Chocolate","Milk Chocolate","White Chocolate","White Chips","Dark Chips","Milk Chips","White Chocomass","Dark Chocomass","Milk Chocomass","Choco Paste","Chocolate Drink"]),
  group("bakery-ingredients", "Bakery Ingredients", "Bakery Ingredients", "/industries/bakery-ingredients.webp", "Functional bakery ingredients for consistent volume, texture, freshness and efficient commercial production.", ["Cake Gel","Cake Life","Custard Powder","Bread Yield Improver","MACP (Mono Acid Calcium Phosphate)","Baking Powder","Biscuit Enhancer","Cake Syrup","Calcium Propionate (CP)","Sodium Propionate"]),
  group("beverage-ingredients", "Beverage Ingredients", "Beverage Ingredients", "/industries/beverage-ingredients.webp", "Flavours, bases and stabilizers for consistent commercial beverage formulation.", ["Natural Food and Beverage Ingredients","Chocolate Drink","Sodium CMC Stabilizer Grade","Sodium CMC Thick Shake Grade"]),
  group("ice-cream-ingredients", "Icecream Products", "Icecream Products", "/industries/ice-cream-ingredients.webp", "Bases, flavours, toppings and stabilizers for smooth texture, body and reliable frozen-dessert batches.", ["Ice Cream Stabilizer"]),
  group("functional-ingredients", "Functional Ingredients", "Functional Ingredients", "/industries/functional-ingredients.webp", "Emulsifiers, proteins and processing aids for dependable texture, structure and production efficiency.", ["GMS Flakes","GMS Powder","Sorbitan Monostearate","Finamul 90","Distilled Monoglycerides (DMG)","Propylene Glycol Monostearate (PGMS)","SMS","PGPR","Soya Lecithin","Whey Protein","Instantized Whey Protein","Whey Powder","Soya Protein","Full-Fat Soya Flour","Vital Wheat Gluten","Skimmed Milk Powder","Calcium Carbonate","Calcium Chloride","Calcium Gluconate","Sodium Citrate","Propylene Glycol (PG)","Refined Glycerine","Amaze Ice Cream Stabilizer"]),
  group("nutraceutical-pharma", "Nutraceutical & Pharma", "Nutraceutical & Pharma Ingredients", "/industries/nutraceutical-pharma.webp", "Protein, gelatin, vitamin and mineral ingredients subject to application and grade verification.", ["Whey Protein","Instantized Whey Protein","Whey Powder","Soya Protein","Gelatin 120 Bloom","Gelatin 180 Bloom","Isomalt","SWEETPEARL® P 200 Maltitol","Aspartame Powder","Dextrose Monohydrate","Maltodextrin Powder","Skimmed Milk Powder","Calcium Carbonate","Calcium Gluconate","Ascorbic Acid","Refined Glycerine","Propylene Glycol (PG)"]),
  group("dairy-ingredients", "Dairy", "Dairy", "/industries/dairy-ingredients.webp", "Dairy ingredients for creaminess, body, flavour, protein contribution and reliable food production.", ["Skimmed Milk Powder","Whey Powder","Whole Milk Powder","Milk Powder Added Glucose"]),
  group("food-additives-preservatives", "Food Additives & Preservatives", "Food Additives & Preservatives", "/industries/food-additives-preservatives.webp", "Preservation, acidity, leavening, emulsification, texture, flavour and processing-control ingredients.", ["Potassium Sorbate","Sorbic Acid","Sodium Benzoate","Sodium Propionate","Potassium Metabisulphite (KMS)","Citric Acid Monohydrate","Citric Acid Anhydrous","Malic Acid","Acetic Acid","Vinegar","Ascorbic Acid","Fumaric Acid","Tartaric Acid","Boric Acid","Phosphoric Acid","Formic Acid","Distilled Monoglycerides (DMG)","Propylene Glycol Monostearate (PGMS)","SMS","PGPR","Soya Lecithin","Ammonium Bicarbonate","Sodium Bicarbonate","SAPP (Sodium Acid Pyrophosphate)","Calcium Carbonate","Calcium Chloride","Sodium Citrate","Malt Extract Powder","Black Cocoa Powder","Caramel","Extra Pure Vanillin","Orange Oil","Saucetec"]),
  group("hydrocolloids-stabilizers", "Hydrocolloids", "Hydrocolloids", "/industries/hydrocolloids-stabilizers.webp", "Hydrocolloids and gums for viscosity control, stability, texture and mouthfeel.", ["Genu Pectin","GENU® Pectin MRS 115","Gelatin 120 Bloom","Gelatin 160 Bloom","Gelatin 180 Bloom","Xanthan Gum","Guar Gum","Sodium CMC","Sodium Alginate FG","Ice Cream Stabilizer"]),
  group("fruit-processing", "Fruit Processing", "Fruit Processing Ingredients", "/industries/fruit-processing.webp", "Fruit fillings, preparations, pectin and glazes for bakery, beverage and dessert applications.", ["Fruit Filling","Fruit Crush","Genu Pectin","Glaze Gel"]),
  group("sweeteners-syrups-starches", "Sweeteners, Syrups & Starches", "Sweeteners, Syrups & Starches", "/industries/sweeteners-syrups-starches.webp", "Sweeteners, carbohydrates and starches for sweetness, body, solids and processing performance.", ["Liquid Glucose","Glucose D","High Maltose Syrups","Sorbitol 70% Solution","Invert Sugar","Isomalt","SWEETPEARL® P 200 Maltitol","Aspartame Powder","Sucralose","Acesulfame K","Saccharin","Maltitol","Sucrose","Maize Starch","Maize Starch Powder","Potato Starch","Dextrose Monohydrate","Cake Syrup","CLEARAM® CH 20 20"])
];

const primaryIndustrySlugByProductName = new Map();
industries.forEach((industry) => industry.products.forEach((name) => {
  if (!primaryIndustrySlugByProductName.has(name)) primaryIndustrySlugByProductName.set(name, industry.slug);
}));
approvedRangeProducts.forEach((item) => primaryIndustrySlugByProductName.set(item.name, item.industrySlug));

export const bakeryProductGroups = [
  { name: "Cake", description: "Ingredients for making cakes, cupcakes, muffins and sponge products with consistent volume, softness and shelf life.", ingredients: ["Cake Gel", "Cake Life", "Baking Powder", "MACP (Mono Acid Calcium Phosphate)", "Cake Syrup"] },
  { name: "Bread", description: "Ingredients for making bread, buns, pav and rolls with dependable dough performance, yield, texture and freshness.", ingredients: ["Bread Yield Improver", "Calcium Propionate (CP)", "Sodium Propionate", "Baking Powder"] },
  { name: "Biscuits, Cookies & Crackers", description: "Leavening and sweetening ingredients used in biscuits, cookies and cracker production.", ingredients: ["MACP (Mono Acid Calcium Phosphate)", "Baking Powder", "Biscuit Enhancer", "Cake Syrup"] },
  { name: "Pastry & Desserts", description: "Ingredients for making pastries, tarts, cream buns, fillings and desserts.", ingredients: ["Custard Powder", "Cake Syrup"] }
];

export const chocolateProductGroups = [
  { name: "Chocolate & Couverture", description: "Ingredients for making dark, milk, white and premium couverture chocolate products.", ingredients: ["Cocoa Butter", "Cocoa Mass", "Dark Chocolate", "Milk Chocolate", "White Chocolate"] },
  { name: "Chips & Inclusions", description: "Chocolate chips and inclusions for cookies, cakes, muffins, desserts and bakery toppings.", ingredients: ["White Chips", "Dark Chips", "Milk Chips"] },
  { name: "Fillings, Coatings & Paste", description: "Chocolate ingredients for bakery fillings, spreads, coatings, moulding and confectionery applications.", ingredients: ["White Chocomass", "Dark Chocomass", "Milk Chocomass", "Choco Paste"] },
  { name: "Cocoa & Chocolate Drinks", description: "Cocoa and chocolate ingredients for beverages, desserts, bakery mixes and flavour applications.", ingredients: ["Cocoa Powder", "Chocolate Drink"] }
];

export const dairyProductGroups = [
];

export const beverageProductGroups = [
  { name: "Fruit Beverages", description: "Flavour ingredients for making fruit drinks, coolers, mocktails, shakes and juice-based beverages.", ingredients: ["Natural Food and Beverage Ingredients"] },
  { name: "Chocolate Beverages", description: "Ingredients for making hot chocolate, cold chocolate, milkshakes and chocolate drink mixes.", ingredients: ["Chocolate Drink", "Natural Food and Beverage Ingredients"] },
  { name: "Flavoured Drinks", description: "Flavour systems for soft drinks, milk beverages, syrups and food-service drinks.", ingredients: ["Natural Food and Beverage Ingredients"] },
  { name: "Stabilizers & Texture", description: "Application-specific CMC grades for body, suspension and a consistent texture in beverage systems.", ingredients: ["Sodium CMC Stabilizer Grade", "Sodium CMC Thick Shake Grade"] }
];

export const iceCreamProductGroups = [
  { name: "Stabilizers & Texture", description: "Functional ingredients for improving body, creaminess, stability and melt resistance in frozen desserts.", ingredients: ["Ice Cream Stabilizer"] }
];

export const fruitProductGroups = [
  { name: "Bakery Fillings", description: "Fruit ingredients for making pie fillings, cake layers, pastries, tarts and filled bakery products.", ingredients: ["Fruit Filling", "Genu Pectin", "Glaze Gel"] },
  { name: "Fruit Beverages", description: "Fruit products for making juices, coolers, smoothies, milkshakes and mocktails.", ingredients: ["Fruit Crush"] },
  { name: "Jams & Preserves", description: "Texturizing ingredients for making jams, jellies and preserves.", ingredients: ["Genu Pectin"] },
  { name: "Desserts & Toppings", description: "Fruit ingredients for desserts, yogurt, ice cream, cheesecake toppings and decorative finishing.", ingredients: ["Fruit Filling", "Fruit Crush", "Glaze Gel"] }
];

export const hydrocolloidProductGroups = [
  { name: "Jams & Fruit Preparations", description: "Hydrocolloids for setting, thickening and stabilizing jams, jellies, fruit fillings and preparations.", ingredients: ["Genu Pectin", "GENU® Pectin MRS 115", "Xanthan Gum", "Guar Gum", "Sodium CMC"] },
  { name: "Ice Cream & Dairy", description: "Stabilizers for improving body, creaminess, suspension, melt resistance and texture in dairy products.", ingredients: ["Ice Cream Stabilizer", "Gelatin 120 Bloom", "Gelatin 160 Bloom", "Gelatin 180 Bloom", "Guar Gum", "Sodium CMC"] },
  { name: "Beverages & Sauces", description: "Gums and stabilizers for viscosity, suspension and consistent mouthfeel in beverages, sauces and dressings.", ingredients: ["Xanthan Gum", "Guar Gum", "Sodium CMC", "Sodium Alginate FG", "Genu Pectin"] },
  { name: "Confectionery & Desserts", description: "Gelling and texturizing ingredients for gummies, marshmallows, jelly desserts, mousse and confectionery.", ingredients: ["Gelatin 120 Bloom", "Gelatin 160 Bloom", "Gelatin 180 Bloom", "Genu Pectin", "GENU® Pectin MRS 115"] }
];

export const sweetenerProductGroups = [
  { name: "Bakery & Confectionery", description: "Sweeteners and syrups for cakes, cookies, fillings, candies, chocolates and confectionery products.", ingredients: ["Liquid Glucose", "Glucose D", "High Maltose Syrups", "Invert Sugar", "Dextrose Monohydrate", "Cake Syrup", "Sorbitol 70% Solution", "Sucrose"] },
  { name: "Beverages & Syrups", description: "Ingredients for sweetness, solids and body in beverages, concentrates, drink mixes and flavoured syrups.", ingredients: ["Liquid Glucose", "Glucose D", "High Maltose Syrups", "Invert Sugar", "Aspartame Powder", "Dextrose Monohydrate", "Cake Syrup"] },
  { name: "Sugar Free", description: "Alternative sweetening ingredients for reduced-sugar, sugar-free and calorie-managed formulations.", ingredients: ["Sucralose", "Acesulfame K", "Aspartame Powder", "Saccharin", "Maltitol", "Sorbitol 70% Solution", "Isomalt", "SWEETPEARL® P 200 Maltitol"] },
  { name: "Texture, Body & Thickening", description: "Starches and carbohydrates for viscosity, binding, bulking, crispness and processing performance.", ingredients: ["Maize Starch", "Maize Starch Powder", "Potato Starch", "Dextrose Monohydrate", "CLEARAM® CH 20 20"] }
];

export const functionalProductGroups = [
  { name: "Bakery & Dough", description: "Functional ingredients for dough strength, volume, softness, emulsification and consistent bakery processing.", ingredients: ["GMS Flakes", "GMS Powder", "Sorbitan Monostearate", "Finamul 90", "Distilled Monoglycerides (DMG)", "Propylene Glycol Monostearate (PGMS)", "SMS", "Soya Lecithin", "Soya Protein", "Full-Fat Soya Flour", "Vital Wheat Gluten", "Skimmed Milk Powder"] },
  { name: "Chocolate & Confectionery", description: "Emulsifiers and processing aids for chocolate flow, fat dispersion, texture, coatings and confectionery production.", ingredients: ["GMS Flakes", "GMS Powder", "Sorbitan Monostearate", "Distilled Monoglycerides (DMG)", "Propylene Glycol Monostearate (PGMS)", "SMS", "PGPR", "Soya Lecithin", "Refined Glycerine"] },
  { name: "Nutrition & Fortification", description: "Protein, mineral and carrier ingredients for nutrition products, fortified foods and specialty formulations.", ingredients: ["Whey Protein", "Instantized Whey Protein", "Whey Powder", "Soya Protein", "Full-Fat Soya Flour", "Vital Wheat Gluten", "Skimmed Milk Powder", "Calcium Carbonate", "Calcium Chloride", "Calcium Gluconate", "Sodium Citrate", "Propylene Glycol (PG)", "Refined Glycerine"] }
];

export const nutraceuticalProductGroups = [
  { name: "Protein Nutrition", description: "Protein and dairy ingredients for nutrition powders, shakes, sports products and fortified foods.", ingredients: ["Whey Protein", "Instantized Whey Protein", "Whey Powder", "Soya Protein", "Skimmed Milk Powder", "Dextrose Monohydrate", "Maltodextrin Powder"] },
  { name: "Tablets & Powder Mixes", description: "Sweeteners, carriers, binders and minerals for tablets, sachets, drink powders and dry formulations.", ingredients: ["Isomalt", "SWEETPEARL® P 200 Maltitol", "Aspartame Powder", "Dextrose Monohydrate", "Maltodextrin Powder", "Calcium Carbonate", "Calcium Gluconate", "Ascorbic Acid"] },
  { name: "Gummies & Softgels", description: "Gelling, humectant and carrier ingredients for nutraceutical gummies, softgels and related dosage formats.", ingredients: ["Gelatin 120 Bloom", "Gelatin 160 Bloom", "Gelatin 180 Bloom", "Refined Glycerine", "Propylene Glycol (PG)", "Ascorbic Acid"] },
  { name: "Vitamin & Mineral Fortification", description: "Ingredients for adding vitamin C, calcium, protein and nutritional solids to fortified formulations.", ingredients: ["Ascorbic Acid", "Calcium Carbonate", "Calcium Gluconate", "Whey Protein", "Instantized Whey Protein", "Whey Powder", "Soya Protein", "Skimmed Milk Powder"] }
];

export const additiveProductGroups = [
  { name: "Preservatives", description: "Preservatives for supporting shelf life and microbial control in bakery, beverages, sauces and processed foods.", ingredients: ["Potassium Sorbate", "Sorbic Acid", "Sodium Benzoate", "Sodium Propionate", "Potassium Metabisulphite (KMS)"] },
  { name: "Acidulants", description: "Food acids for pH adjustment, tartness, flavour balance, processing and formulation control.", ingredients: ["Citric Acid Monohydrate", "Citric Acid Anhydrous", "Malic Acid", "Acetic Acid", "Vinegar", "Ascorbic Acid", "Fumaric Acid", "Tartaric Acid", "Boric Acid", "Phosphoric Acid", "Formic Acid"] },
  { name: "Emulsifiers", description: "Emulsifiers for dispersion, texture, aeration, stability and consistent food processing.", ingredients: ["Distilled Monoglycerides (DMG)", "Propylene Glycol Monostearate (PGMS)", "SMS", "PGPR", "Soya Lecithin"] },
  { name: "Leavening & Baking Ingredients", description: "Leavening and baking ingredients for cakes, biscuits, cookies, crackers and other bakery products.", ingredients: ["Ammonium Bicarbonate", "Sodium Bicarbonate", "SAPP (Sodium Acid Pyrophosphate)"] },
  { name: "Minerals & Processing Ingredients", description: "Minerals, carriers and processing ingredients for formulation and production requirements.", ingredients: ["Calcium Carbonate", "Calcium Chloride", "Sodium Citrate"] },
  { name: "Milk Powder", description: "Milk and whey powders for dairy solids, protein contribution, body and flavour.", ingredients: ["Skimmed Milk Powder", "Whey Powder", "Whole Milk Powder", "Milk Powder Added Glucose"] }
];

export const productGroupsByIndustrySlug = {
  "bakery-ingredients": bakeryProductGroups,
  "chocolate-confectionery": chocolateProductGroups,
  "dairy-ingredients": dairyProductGroups,
  "beverage-ingredients": beverageProductGroups,
  "ice-cream-ingredients": iceCreamProductGroups,
  "fruit-processing": fruitProductGroups,
  "hydrocolloids-stabilizers": hydrocolloidProductGroups,
  "sweeteners-syrups-starches": sweetenerProductGroups,
  "functional-ingredients": functionalProductGroups,
  "nutraceutical-pharma": nutraceuticalProductGroups,
  "food-additives-preservatives": additiveProductGroups
};

export const productMenuGroupsByIndustrySlug = {
  "bakery-ingredients": [
    { name: "Cake Ingredients", ingredients: ["Cake Gel", "Cake Life", "Custard Powder"] },
    { name: "Bread Ingredients", ingredients: ["Bread Yield Improver", "Calcium Propionate (CP)", "Sodium Propionate"] },
    { name: "Leavening Agents", ingredients: ["MACP (Mono Acid Calcium Phosphate)", "Baking Powder"] },
    { name: "Biscuit Ingredients", ingredients: ["Biscuit Enhancer"] },
    { name: "Bakery Syrups", ingredients: ["Cake Syrup"] }
  ],
  "chocolate-confectionery": [
    { name: "Cocoa Products", ingredients: ["Cocoa Butter", "Cocoa Mass", "Cocoa Powder"] },
    { name: "Chocolate Range", ingredients: ["Dark Chocolate", "Milk Chocolate", "White Chocolate"] },
    { name: "Choco Chips", ingredients: ["White Chips", "Dark Chips", "Milk Chips"] },
    { name: "Chocomass", ingredients: ["White Chocomass", "Dark Chocomass", "Milk Chocomass"] },
    { name: "Chocolate Paste", ingredients: ["Choco Paste"] },
    { name: "Chocolate Beverage Solutions", ingredients: ["Chocolate Drink"] },
  ],
  "dairy-ingredients": [
  ],
  "beverage-ingredients": [
    { name: "Beverage Flavours", ingredients: ["Natural Food and Beverage Ingredients"] },
    { name: "Beverage Bases", ingredients: ["Chocolate Drink"] },
    { name: "Beverage Stabilizers", ingredients: ["Sodium CMC Stabilizer Grade", "Sodium CMC Thick Shake Grade"] }
  ],
  "ice-cream-ingredients": [
    { name: "Ice Cream Stabilizers", ingredients: ["Ice Cream Stabilizer"] }
  ],
  "fruit-processing": [
    { name: "Fruit Fillings", ingredients: ["Fruit Filling"] },
    { name: "Fruit Preparations", ingredients: ["Fruit Crush"] },
    { name: "Gelling Agents", ingredients: ["Genu Pectin"] },
    { name: "Glazes & Toppings", ingredients: ["Glaze Gel"] }
  ],
  "hydrocolloids-stabilizers": [
    { name: "Pectin", ingredients: ["Genu Pectin", "GENU® Pectin MRS 115"] },
    { name: "Gelatin", ingredients: ["Gelatin 120 Bloom", "Gelatin 160 Bloom", "Gelatin 180 Bloom"] },
    { name: "Food Gums", ingredients: ["Xanthan Gum", "Guar Gum", "Sodium CMC", "Sodium Alginate FG"] },
    { name: "Ice Cream Stabilizers", ingredients: ["Ice Cream Stabilizer"] }
  ],
  "sweeteners-syrups-starches": [
    { name: "Liquid Sweeteners", ingredients: ["Liquid Glucose", "High Maltose Syrups", "Sorbitol 70% Solution", "Invert Sugar"] },
    { name: "Sweeteners", ingredients: ["Glucose D", "Isomalt", "SWEETPEARL® P 200 Maltitol", "Sucrose"] },
    { name: "Sugar Free", ingredients: ["Sucralose", "Acesulfame K", "Aspartame Powder", "Saccharin", "Maltitol"] },
    { name: "Starches", ingredients: ["Maize Starch", "Maize Starch Powder", "Potato Starch"] },
    { name: "Carbohydrates", ingredients: ["Dextrose Monohydrate", "CLEARAM® CH 20 20"] },
    { name: "Syrups", ingredients: ["Cake Syrup"] }
  ],
  "functional-ingredients": [
    { name: "Emulsifiers", ingredients: ["GMS Flakes", "GMS Powder", "Sorbitan Monostearate", "Finamul 90", "Distilled Monoglycerides (DMG)", "Propylene Glycol Monostearate (PGMS)", "SMS", "PGPR", "Soya Lecithin"] },
    { name: "Proteins", ingredients: ["Whey Protein", "Instantized Whey Protein", "Whey Powder", "Soya Protein", "Full-Fat Soya Flour", "Vital Wheat Gluten", "Skimmed Milk Powder"] },
    { name: "Processing Ingredients", ingredients: ["Calcium Carbonate", "Calcium Chloride", "Calcium Gluconate", "Sodium Citrate", "Propylene Glycol (PG)", "Refined Glycerine", "Amaze Ice Cream Stabilizer"] }
  ],
  "nutraceutical-pharma": [
    { name: "Protein Ingredients", ingredients: ["Whey Protein", "Instantized Whey Protein", "Whey Powder", "Soya Protein"] },
    { name: "Gelatin", ingredients: ["Gelatin 120 Bloom", "Gelatin 180 Bloom"] },
    { name: "Vitamins & Minerals", ingredients: ["Ascorbic Acid", "Calcium Carbonate", "Calcium Gluconate"] },
    { name: "Sugar-Free Excipients", ingredients: ["Isomalt", "SWEETPEARL® P 200 Maltitol", "Aspartame Powder"] },
    { name: "Carriers", ingredients: ["Dextrose Monohydrate", "Maltodextrin Powder", "Skimmed Milk Powder", "Refined Glycerine", "Propylene Glycol (PG)"] }
  ],
  "food-additives-preservatives": [
    { name: "Preservatives", ingredients: ["Potassium Sorbate", "Sorbic Acid", "Sodium Benzoate", "Sodium Propionate", "Potassium Metabisulphite (KMS)"] },
    { name: "Acidulants", ingredients: ["Citric Acid Monohydrate", "Citric Acid Anhydrous", "Malic Acid", "Acetic Acid", "Vinegar", "Ascorbic Acid", "Fumaric Acid", "Tartaric Acid", "Boric Acid", "Phosphoric Acid", "Formic Acid"] },
    { name: "Emulsifiers", ingredients: ["Distilled Monoglycerides (DMG)", "Propylene Glycol Monostearate (PGMS)", "SMS", "PGPR", "Soya Lecithin"] },
    { name: "Leavening & Baking Ingredients", ingredients: ["Ammonium Bicarbonate", "Sodium Bicarbonate", "SAPP (Sodium Acid Pyrophosphate)"] },
    { name: "Minerals & Processing Ingredients", ingredients: ["Calcium Carbonate", "Calcium Chloride", "Sodium Citrate"] },
    { name: "Milk Powder", ingredients: ["Skimmed Milk Powder", "Whey Powder", "Whole Milk Powder", "Milk Powder Added Glucose"] }
  ]
};

// Many ingredients have more than one end use. Keep those secondary
// applications explicit so an item is visible on every industry page where a
// buyer would reasonably look for it, while retaining one canonical product
// page and supplier record.
export const sharedApplicationGroupsByIndustrySlug = {
  "bakery-ingredients": [
    { name: "Chocolate, Cocoa & Inclusions", description: "Cocoa and chocolate ingredients for cakes, cookies, brownies, pastries, fillings, coatings and decorations.", ingredients: ["Cocoa Butter", "Cocoa Mass", "Cocoa Powder", "Dark Chocolate", "Milk Chocolate", "White Chocolate", "White Chips", "Dark Chips", "Milk Chips", "White Chocomass", "Dark Chocomass", "Milk Chocomass", "Choco Paste"] },
    { name: "Fruit Fillings & Finishing", description: "Fruit preparations, pectin and glazes for cake layers, pies, pastries, tarts and decorative finishing.", ingredients: ["Fruit Filling", "Fruit Crush", "Genu Pectin", "Glaze Gel"] },
    { name: "Dairy Powders", description: "Milk and whey powders for flavour, browning, enrichment, body and bakery mix formulation.", ingredients: ["Skimmed Milk Powder", "Whey Powder", "Whole Milk Powder", "Milk Powder Added Glucose"] },
    { name: "Sweeteners, Syrups & Starches", description: "Sweeteners, syrups and carbohydrates for sweetness, moisture, body, binding and texture in bakery products.", ingredients: ["Liquid Glucose", "Invert Sugar", "Sorbitol 70% Solution", "Dextrose Monohydrate", "Maltodextrin Powder", "Maize Starch", "Maize Starch Powder", "Potato Starch"] },
    { name: "Emulsifiers, Gums & Dough Aids", description: "Functional ingredients for aeration, dough strength, softness, moisture retention and process consistency.", ingredients: ["GMS Flakes", "GMS Powder", "Distilled Monoglycerides (DMG)", "Propylene Glycol Monostearate (PGMS)", "SMS", "Soya Lecithin", "Vital Wheat Gluten", "Xanthan Gum", "Guar Gum", "Sodium CMC"] },
    { name: "Leavening & Preservation", description: "Leavening salts and preservatives used in cakes, biscuits, cookies, crackers, bread and related bakery products.", ingredients: ["Ammonium Bicarbonate", "Sodium Bicarbonate", "SAPP (Sodium Acid Pyrophosphate)", "Potassium Sorbate", "Sodium Benzoate"] }
  ],
  "chocolate-confectionery": [
    { name: "Sweeteners & Bulking Ingredients", description: "Sweeteners and carbohydrates for confectionery texture, solids, reduced-sugar recipes and fillings.", ingredients: ["Liquid Glucose", "High Maltose Syrups", "Invert Sugar", "Sorbitol 70% Solution", "Isomalt", "SWEETPEARL® P 200 Maltitol", "Dextrose Monohydrate", "Maltodextrin Powder"] },
    { name: "Dairy Ingredients", description: "Milk and whey powders for milk chocolate, centres, coatings and confectionery formulations.", ingredients: ["Skimmed Milk Powder", "Whey Powder", "Whole Milk Powder", "Milk Powder Added Glucose"] },
    { name: "Emulsifiers & Texture", description: "Emulsifiers and gelling ingredients for flow, dispersion, moulding, fillings, gummies and aerated confectionery.", ingredients: ["PGPR", "Soya Lecithin", "GMS Powder", "Distilled Monoglycerides (DMG)", "Gelatin 120 Bloom", "Gelatin 160 Bloom", "Gelatin 180 Bloom", "Genu Pectin"] }
  ],
  "dairy-ingredients": [
    { name: "Stabilizers & Texture", description: "Hydrocolloids and emulsifiers for body, suspension, creaminess and stability in dairy systems.", ingredients: ["Xanthan Gum", "Guar Gum", "Sodium CMC", "Sodium Alginate FG", "Genu Pectin", "GMS Powder", "Sodium Citrate"] },
    { name: "Sweeteners & Carriers", description: "Sweeteners and carbohydrates for flavoured milk, yogurt, dairy desserts and powdered mixes.", ingredients: ["Liquid Glucose", "Invert Sugar", "Sorbitol 70% Solution", "Dextrose Monohydrate", "Maltodextrin Powder"] },
    { name: "Flavours, Cocoa & Fruit", description: "Cocoa, chocolate and fruit ingredients for flavoured dairy products and desserts.", ingredients: ["Cocoa Powder", "Chocolate Drink", "Fruit Filling", "Fruit Crush", "Natural Food and Beverage Ingredients"] }
  ],
  "beverage-ingredients": [
    { name: "Sweeteners & Beverage Solids", description: "Sweeteners, syrups and carriers for drinks, concentrates, premixes and reduced-sugar beverages.", ingredients: ["Liquid Glucose", "High Maltose Syrups", "Invert Sugar", "Sorbitol 70% Solution", "Aspartame Powder", "Sucralose", "Acesulfame K", "Saccharin", "Dextrose Monohydrate", "Maltodextrin Powder"] },
    { name: "Fruit, Cocoa & Dairy", description: "Fruit, cocoa and dairy ingredients for juices, shakes, flavoured milk and drink mixes.", ingredients: ["Fruit Crush", "Cocoa Powder", "Skimmed Milk Powder", "Whey Powder", "Whole Milk Powder"] },
    { name: "Acidulants & Preservation", description: "Acids and preservatives for pH, flavour balance and shelf-life support in beverage formulations.", ingredients: ["Citric Acid Monohydrate", "Citric Acid Anhydrous", "Malic Acid", "Ascorbic Acid", "Phosphoric Acid", "Potassium Sorbate", "Sodium Benzoate", "Potassium Metabisulphite (KMS)"] },
    { name: "Gums & Stabilizers", description: "Hydrocolloids for suspension, viscosity, mouthfeel and emulsion stability in beverages.", ingredients: ["Xanthan Gum", "Guar Gum", "Sodium CMC", "Genu Pectin"] }
  ],
  "ice-cream-ingredients": [
    { name: "Dairy & Protein", description: "Milk, whey and protein ingredients for dairy solids, creaminess, body and nutrition in frozen desserts.", ingredients: ["Skimmed Milk Powder", "Whey Powder", "Whole Milk Powder", "Milk Powder Added Glucose", "Whey Protein"] },
    { name: "Sweeteners & Solids", description: "Sweeteners and carbohydrates for freezing-point control, body, solids and reduced-sugar formulations.", ingredients: ["Liquid Glucose", "Glucose D", "Invert Sugar", "Sorbitol 70% Solution", "Isomalt", "SWEETPEARL® P 200 Maltitol", "Dextrose Monohydrate", "Maltodextrin Powder"] },
    { name: "Fruit, Cocoa & Chocolate", description: "Fruit, cocoa and chocolate ingredients for flavours, ripples, coatings, inclusions and toppings.", ingredients: ["Fruit Filling", "Fruit Crush", "Cocoa Powder", "Chocolate Drink", "Dark Chocolate", "Milk Chocolate", "White Chocolate", "White Chips", "Dark Chips", "Milk Chips"] },
    { name: "Gums & Emulsifiers", description: "Hydrocolloids and emulsifiers for overrun, body, melt resistance and storage stability.", ingredients: ["Xanthan Gum", "Guar Gum", "Sodium CMC", "Sodium Alginate FG", "Genu Pectin", "GMS Flakes", "GMS Powder", "Distilled Monoglycerides (DMG)", "Sorbitan Monostearate"] }
  ],
  "fruit-processing": [
    { name: "Sweeteners, Syrups & Starches", description: "Sweeteners and carbohydrates for jams, fillings, fruit preparations, beverages and toppings.", ingredients: ["Liquid Glucose", "Invert Sugar", "Sorbitol 70% Solution", "Dextrose Monohydrate", "Maltodextrin Powder", "Maize Starch", "Potato Starch"] },
    { name: "Acidulants & Preservatives", description: "Acids and preservatives for flavour balance, pH control and shelf-life support in fruit products.", ingredients: ["Citric Acid Monohydrate", "Citric Acid Anhydrous", "Malic Acid", "Ascorbic Acid", "Potassium Sorbate", "Sodium Benzoate", "Potassium Metabisulphite (KMS)"] },
    { name: "Gums & Gelling Agents", description: "Hydrocolloids for setting, thickening, suspension and texture in fruit systems.", ingredients: ["Xanthan Gum", "Guar Gum", "Sodium CMC", "Sodium Alginate FG"] }
  ]
};

Object.entries(sharedApplicationGroupsByIndustrySlug).forEach(([industrySlug, groups]) => {
  const industry = industries.find((entry) => entry.slug === industrySlug);
  const applicationGroups = productGroupsByIndustrySlug[industrySlug];
  const menuGroups = productMenuGroupsByIndustrySlug[industrySlug];

  groups.forEach((applicationGroup) => {
    applicationGroups?.push(applicationGroup);
    menuGroups?.push({ name: applicationGroup.name, ingredients: applicationGroup.ingredients });
    applicationGroup.ingredients.forEach((name) => {
      if (industry && !industry.products.includes(name)) industry.products.push(name);
    });
  });
});

export const slugify = (value) => value
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase()
  .replace(/&/g, "and")
  .replace(/\((malchoc[^)]*)\)/g, "$1")
  .replace(/\([^)]*\)/g, "")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");

approvedRangeProducts.forEach((item) => {
  const industry = industries.find((entry) => entry.slug === item.industrySlug);
  if (industry && !industry.products.includes(item.name)) industry.products.push(item.name);
});

const productMap = new Map();
industries.forEach((industry) => industry.products.forEach((name) => {
  const slug = name === "Natural Food and Beverage Ingredients" ? "flavours-and-natural-ingredients" : name === "Aspartame Powder" ? "aspartame" : slugify(name);
  const approved = approvedRangeProducts.find((item) => item.name === name);
  const primaryIndustry = industries.find((entry) => entry.slug === primaryIndustrySlugByProductName.get(name)) || industry;
  if (!productMap.has(slug)) productMap.set(slug, {
    slug, name, industrySlug: primaryIndustry.slug, category: primaryIndustry.name, image: productImageByName[name] || primaryIndustry.image,
    brand: approved?.brand, range: approved?.range, packs: approved?.packs, itemCode: approved?.itemCode, dosage: approved?.dosage, cocoaPercentage: approved?.cocoaPercentage, brochureCategory: approved?.brochureCategory, brochureDisplayCategory: approved?.brochureDisplayCategory, usageCategory: approved?.usageCategory || productMenuGroupsByIndustrySlug[primaryIndustry.slug]?.find((group) => group.ingredients.includes(name))?.name || primaryIndustry.name,
    summary: `${name} for consistent food production`,
    description: approved?.description || `${name} is listed in Vikranth's ${industry.name} catalogue for professional B2B enquiry. Product identity and category are verified in the current structured catalogue; grade, specification, pack, documents and suitability require confirmation for the selected option.`
  });
}));

export const products = [...productMap.values()];
const normalizeProductLookup = (value) => slugify(String(value).replace(/®/g, "registered"));
const productSlugByLookup = new Map(products.map((product) => [normalizeProductLookup(product.name), product.slug]));
export const getProductHref = (name) => `/products/${productSlugByLookup.get(normalizeProductLookup(name)) || slugify(name)}`;
export const getProduct = (slug) => products.find((item) => item.slug === slug);
export const getIndustry = (slug) => industries.find((item) => item.slug === slug);
