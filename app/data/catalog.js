import { productImageByName } from "./partners";
import { approvedRangeProducts } from "./catalog-ranges";

const group = (slug, name, eyebrow, image, summary, products) => ({ slug, name, eyebrow, image, summary, products });

export const industries = [
  group("bakery-ingredients", "Bakery Ingredients", "Bakery Ingredients", "/industries/bakery-ingredients.webp", "Functional bakery ingredients for consistent volume, texture, freshness and efficient commercial production.", ["Cake Gel","Cake Life","Eggless Cake Premix","Custard Powder","Bread Yield Improver","MACP (Mono Acid Calcium Phosphate)","Baking Powder","Cake Syrup","Calcium Propionate (CP)","Sodium Propionate"]),
  group("chocolate-confectionery", "Chocolate & Confectionery", "Chocolate & Confectionery Ingredients", "/industries/chocolate-confectionery.webp", "Cocoa, couverture, compounds and confectionery ingredients for dependable flavour, colour and processing performance.", ["Cocoa Butter","Cocoa Mass","Cocoa Powder","Dark Chocolate","Milk Chocolate","White Chocolate","White Chips","Dark Chips","Milk Chips","White Chocomass","Dark Chocomass","Milk Chocomass","Choco Paste","Chocolate Drink"]),
  group("dairy-ingredients", "Dairy Ingredients", "Dairy Ingredients", "/industries/dairy-ingredients.webp", "Dairy ingredients for creaminess, body, flavour, protein contribution and reliable food production.", ["Skimmed Milk Powder","Whey Powder","Whole Milk Powder","Milk Powder Added Glucose","Good Day Milk Powder","Krishna Milk Powder","Amul Whey Powder"]),
  group("beverage-ingredients", "Beverage Ingredients", "Beverage Ingredients", "/industries/beverage-ingredients.webp", "Flavours, bases and stabilizers for consistent commercial beverage formulation.", ["Flavours & Natural Ingredients","Chocolate Drink","Sodium CMC Stabilizer Grade","Sodium CMC Thick Shake Grade"]),
  group("ice-cream-ingredients", "Ice Cream Ingredients", "Ice Cream Ingredients", "/industries/ice-cream-ingredients.webp", "Bases, flavours, toppings and stabilizers for smooth texture, body and reliable frozen-dessert batches.", ["Ice Cream Stabilizer","Amaze Ice Cream Stabilizer"]),
  group("fruit-processing", "Fruit Processing", "Fruit Processing Ingredients", "/industries/fruit-processing.webp", "Fruit fillings, preparations, pectin and glazes for bakery, beverage and dessert applications.", ["Fruit Filling","Fruit Crush","Genu Pectin","Glaze Gel"]),
  group("hydrocolloids-stabilizers", "Hydrocolloids & Stabilizers", "Hydrocolloids, Gums & Stabilizers", "/industries/hydrocolloids-stabilizers.webp", "Hydrocolloids and gums for viscosity control, stability, texture and mouthfeel.", ["Genu Pectin","GENU® Pectin MRS 115","Gelatin 120 Bloom","Gelatin 160 Bloom","Gelatin 180 Bloom","Xanthan Gum","Guar Gum","Sodium CMC","Sodium Alginate FG","Ice Cream Stabilizer"]),
  group("sweeteners-syrups-starches", "Sweeteners, Syrups & Starches", "Sweeteners, Syrups & Starches", "/industries/sweeteners-syrups-starches.webp", "Sweeteners, carbohydrates and starches for sweetness, body, solids and processing performance.", ["Liquid Glucose","Glucose D","High Maltose Syrups","Sorbitol 70% Solution","Invert Sugar","Sorbitol","Isomalt","SWEETPEARL® P 200 Maltitol","Aspartame","Maize Starch","Maize Starch Powder","Potato Starch","Dextrose Monohydrate","Maltodextrin Powder","Cake Syrup","CLEARAM® CH 20 20"]),
  group("functional-ingredients", "Functional Ingredients", "Functional Ingredients", "/industries/functional-ingredients.webp", "Emulsifiers, proteins and processing aids for dependable texture, structure and production efficiency.", ["GMS Flakes","GMS Powder","Sorbitan Monostearate","Finamul 90","Distilled Monoglycerides (DMG)","Propylene Glycol Monostearate (PGMS)","SMS","PGPR","Soya Lecithin","Whey Protein","Instantized Whey Protein","Whey Powder","Soya Protein","Full-Fat Soya Flour","Vital Wheat Gluten","Skimmed Milk Powder","Calcium Carbonate","Calcium Chloride","Calcium Gluconate","Sodium Citrate","Propylene Glycol (PG)","Refined Glycerine"]),
  group("nutraceutical-pharma", "Nutraceutical & Pharma", "Nutraceutical & Pharma Ingredients", "/industries/nutraceutical-pharma.webp", "Protein, gelatin, vitamin and mineral ingredients subject to application and grade verification.", ["Whey Protein","Instantized Whey Protein","Whey Powder","Soya Protein","Gelatin 120 Bloom","Gelatin 180 Bloom","Sorbitol","Isomalt","SWEETPEARL® P 200 Maltitol","Aspartame","Dextrose Monohydrate","Maltodextrin Powder","Skimmed Milk Powder","Calcium Carbonate","Calcium Gluconate","Ascorbic Acid","Refined Glycerine","Propylene Glycol (PG)"]),
  group("food-additives-preservatives", "Food Additives & Preservatives", "Food Additives & Preservatives", "/industries/food-additives-preservatives.webp", "Preservation, acidity, leavening, emulsification, texture, flavour and processing-control ingredients.", ["Potassium Sorbate","Sorbic Acid","Sodium Benzoate","Sodium Propionate","Potassium Metabisulphite (KMS)","Citric Acid Monohydrate","Citric Acid Anhydrous","Malic Acid","Acetic Acid","Ascorbic Acid","Fumaric Acid","Tartaric Acid","Boric Acid","Phosphoric Acid","Formic Acid","Distilled Monoglycerides (DMG)","Propylene Glycol Monostearate (PGMS)","SMS","PGPR","Soya Lecithin","Xanthan Gum","Guar Gum","Sodium CMC","Sorbitol 70% Solution","Invert Sugar","Aspartame","Sucralose","Acesulfame K","Saccharin","Isomalt","Maltitol","Sucrose","Potato Starch","Vital Wheat Gluten","Whey Protein","Soya Protein","Ammonium Bicarbonate","Baking Powder","Sodium Bicarbonate","SAPP (Sodium Acid Pyrophosphate)","Calcium Carbonate","Calcium Chloride","Sodium Citrate","Propylene Glycol (PG)","Refined Glycerine","Skimmed Milk Powder","Whey Powder","Whole Milk Powder","Milk Powder Added Glucose","Malt Extract Powder","Black Cocoa Powder","Caramel","Extra Pure Vanillin","Orange Oil","Saucetec"])
];

export const bakeryProductGroups = [
  { name: "Cake", description: "Ingredients for making cakes, cupcakes, muffins and sponge products with consistent volume, softness and shelf life.", ingredients: ["Cake Gel", "Cake Life", "Eggless Cake Premix", "Baking Powder", "MACP (Mono Acid Calcium Phosphate)", "Cake Syrup"] },
  { name: "Bread", description: "Ingredients for making bread, buns, pav and rolls with dependable dough performance, yield, texture and freshness.", ingredients: ["Bread Yield Improver", "Calcium Propionate (CP)", "Sodium Propionate", "Baking Powder"] },
  { name: "Biscuits, Cookies & Crackers", description: "Leavening and sweetening ingredients used in biscuits, cookies and cracker production.", ingredients: ["MACP (Mono Acid Calcium Phosphate)", "Baking Powder", "Cake Syrup"] },
  { name: "Pastry & Desserts", description: "Ingredients for making pastries, tarts, cream buns, fillings and desserts.", ingredients: ["Custard Powder", "Cake Syrup"] }
];

export const chocolateProductGroups = [
  { name: "Chocolate & Couverture", description: "Ingredients for making dark, milk, white and premium couverture chocolate products.", ingredients: ["Cocoa Butter", "Cocoa Mass", "Dark Chocolate", "Milk Chocolate", "White Chocolate"] },
  { name: "Chips & Inclusions", description: "Chocolate chips and inclusions for cookies, cakes, muffins, desserts and bakery toppings.", ingredients: ["White Chips", "Dark Chips", "Milk Chips"] },
  { name: "Fillings, Coatings & Paste", description: "Chocolate ingredients for bakery fillings, spreads, coatings, moulding and confectionery applications.", ingredients: ["White Chocomass", "Dark Chocomass", "Milk Chocomass", "Choco Paste"] },
  { name: "Cocoa & Chocolate Drinks", description: "Cocoa and chocolate ingredients for beverages, desserts, bakery mixes and flavour applications.", ingredients: ["Cocoa Powder", "Chocolate Drink"] }
];

export const dairyProductGroups = [
  { name: "Milk Powder", description: "Milk and whey powders for dairy solids, protein contribution, body and flavour.", ingredients: ["Skimmed Milk Powder", "Whey Powder", "Whole Milk Powder", "Milk Powder Added Glucose"] },
  { name: "Cakes & Desserts", description: "Dairy ingredients for making cakes, cheesecakes, mousse, puddings and chilled desserts.", ingredients: ["Good Day Milk Powder"] },
  { name: "Bakery Products", description: "Ingredients for richness, flavour, browning, softness and dairy solids in breads, cakes, cookies and pastries.", ingredients: ["Good Day Milk Powder", "Krishna Milk Powder", "Amul Whey Powder"] },
  { name: "Dairy Drinks & Mixes", description: "Milk and whey ingredients for beverages, premixes, nutrition products and dairy-based formulations.", ingredients: ["Good Day Milk Powder", "Krishna Milk Powder", "Amul Whey Powder"] }
];

export const beverageProductGroups = [
  { name: "Fruit Beverages", description: "Flavour ingredients for making fruit drinks, coolers, mocktails, shakes and juice-based beverages.", ingredients: ["Flavours & Natural Ingredients"] },
  { name: "Chocolate Beverages", description: "Ingredients for making hot chocolate, cold chocolate, milkshakes and chocolate drink mixes.", ingredients: ["Chocolate Drink", "Flavours & Natural Ingredients"] },
  { name: "Flavoured Drinks", description: "Flavour systems for soft drinks, milk beverages, syrups and food-service drinks.", ingredients: ["Flavours & Natural Ingredients"] },
  { name: "Stabilizers & Texture", description: "Application-specific CMC grades for body, suspension and a consistent texture in beverage systems.", ingredients: ["Sodium CMC Stabilizer Grade", "Sodium CMC Thick Shake Grade"] }
];

export const iceCreamProductGroups = [
  { name: "Stabilizers & Texture", description: "Functional ingredients for improving body, creaminess, stability and melt resistance in frozen desserts.", ingredients: ["Ice Cream Stabilizer", "Amaze Ice Cream Stabilizer"] }
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
  { name: "Bakery & Confectionery", description: "Sweeteners and syrups for cakes, cookies, fillings, candies, chocolates and confectionery products.", ingredients: ["Liquid Glucose", "Glucose D", "High Maltose Syrups", "Invert Sugar", "Dextrose Monohydrate", "Cake Syrup", "Sorbitol 70% Solution"] },
  { name: "Beverages & Syrups", description: "Ingredients for sweetness, solids and body in beverages, concentrates, drink mixes and flavoured syrups.", ingredients: ["Liquid Glucose", "Glucose D", "High Maltose Syrups", "Invert Sugar", "Aspartame", "Dextrose Monohydrate", "Maltodextrin Powder", "Cake Syrup"] },
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
  { name: "Preservatives", description: "Preservatives for supporting shelf life and microbial control in bakery, beverages, sauces and processed foods.", ingredients: ["Potassium Sorbate", "Sorbic Acid", "Sodium Benzoate", "Potassium Metabisulphite (KMS)"] },
  { name: "Acidulants", description: "Food acids for pH adjustment, tartness, flavour balance, processing and formulation control.", ingredients: ["Citric Acid Monohydrate", "Citric Acid Anhydrous", "Malic Acid", "Acetic Acid", "Ascorbic Acid", "Fumaric Acid", "Tartaric Acid", "Boric Acid", "Phosphoric Acid", "Formic Acid"] },
  { name: "Emulsifiers", description: "Emulsifiers for dispersion, texture, aeration, stability and consistent food processing.", ingredients: ["Distilled Monoglycerides (DMG)", "Propylene Glycol Monostearate (PGMS)", "SMS", "PGPR", "Soya Lecithin"] },
  { name: "Hydrocolloids & Stabilizers", description: "Gums and stabilizers for viscosity, suspension, moisture management and texture control.", ingredients: ["Xanthan Gum", "Guar Gum", "Sodium CMC"] },
  { name: "Sweeteners & Syrups", description: "Sweeteners and syrup ingredients for sweetness, solids, body and reduced-sugar formulations.", ingredients: ["Sorbitol 70% Solution", "Invert Sugar", "Aspartame", "Sucralose", "Acesulfame K", "Saccharin", "Isomalt", "Maltitol", "Sucrose"] },
  { name: "Starches & Functional Ingredients", description: "Starches, proteins and functional ingredients for structure, binding, nutrition and processing performance.", ingredients: ["Potato Starch", "Vital Wheat Gluten", "Whey Protein", "Soya Protein"] },
  { name: "Leavening & Baking Ingredients", description: "Leavening and baking ingredients for cakes, biscuits, cookies, crackers and other bakery products.", ingredients: ["Ammonium Bicarbonate", "Baking Powder", "Sodium Bicarbonate", "SAPP (Sodium Acid Pyrophosphate)"] },
  { name: "Minerals & Processing Ingredients", description: "Minerals, carriers and processing ingredients for formulation and production requirements.", ingredients: ["Calcium Carbonate", "Calcium Chloride", "Sodium Citrate", "Propylene Glycol (PG)", "Refined Glycerine"] },
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
    { name: "Cake Ingredients", ingredients: ["Cake Gel", "Cake Life", "Eggless Cake Premix", "Custard Powder"] },
    { name: "Bread Ingredients", ingredients: ["Bread Yield Improver", "Calcium Propionate (CP)", "Sodium Propionate"] },
    { name: "Leavening Agents", ingredients: ["MACP (Mono Acid Calcium Phosphate)", "Baking Powder"] },
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
    { name: "Milk Powder", ingredients: ["Skimmed Milk Powder", "Whey Powder", "Whole Milk Powder", "Milk Powder Added Glucose"] },
    { name: "Milk Powders", ingredients: ["Good Day Milk Powder", "Krishna Milk Powder"] },
    { name: "Whey Products", ingredients: ["Amul Whey Powder"] }
  ],
  "beverage-ingredients": [
    { name: "Beverage Flavours", ingredients: ["Flavours & Natural Ingredients"] },
    { name: "Beverage Bases", ingredients: ["Chocolate Drink"] },
    { name: "Beverage Stabilizers", ingredients: ["Sodium CMC Stabilizer Grade", "Sodium CMC Thick Shake Grade"] }
  ],
  "ice-cream-ingredients": [
    { name: "Ice Cream Stabilizers", ingredients: ["Ice Cream Stabilizer", "Amaze Ice Cream Stabilizer"] }
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
    { name: "Sweeteners", ingredients: ["Glucose D", "Sorbitol", "Isomalt", "SWEETPEARL® P 200 Maltitol", "Aspartame"] },
    { name: "Starches", ingredients: ["Maize Starch", "Maize Starch Powder", "Potato Starch"] },
    { name: "Carbohydrates", ingredients: ["Dextrose Monohydrate", "Maltodextrin Powder", "CLEARAM® CH 20 20"] },
    { name: "Syrups", ingredients: ["Cake Syrup"] }
  ],
  "functional-ingredients": [
    { name: "Emulsifiers", ingredients: ["GMS Flakes", "GMS Powder", "Sorbitan Monostearate", "Finamul 90", "Distilled Monoglycerides (DMG)", "Propylene Glycol Monostearate (PGMS)", "SMS", "PGPR", "Soya Lecithin"] },
    { name: "Proteins", ingredients: ["Whey Protein", "Instantized Whey Protein", "Whey Powder", "Soya Protein", "Full-Fat Soya Flour", "Vital Wheat Gluten", "Skimmed Milk Powder"] },
    { name: "Processing Ingredients", ingredients: ["Calcium Carbonate", "Calcium Chloride", "Calcium Gluconate", "Sodium Citrate", "Propylene Glycol (PG)", "Refined Glycerine"] }
  ],
  "nutraceutical-pharma": [
    { name: "Protein Ingredients", ingredients: ["Whey Protein", "Instantized Whey Protein", "Whey Powder", "Soya Protein"] },
    { name: "Gelatin", ingredients: ["Gelatin 120 Bloom", "Gelatin 180 Bloom"] },
    { name: "Vitamins & Minerals", ingredients: ["Ascorbic Acid", "Calcium Carbonate", "Calcium Gluconate"] },
    { name: "Sugar-Free Excipients", ingredients: ["Sorbitol", "Isomalt", "SWEETPEARL® P 200 Maltitol", "Aspartame"] },
    { name: "Carriers", ingredients: ["Dextrose Monohydrate", "Maltodextrin Powder", "Skimmed Milk Powder", "Refined Glycerine", "Propylene Glycol (PG)"] }
  ],
  "food-additives-preservatives": [
    { name: "Preservatives", ingredients: ["Potassium Sorbate", "Sorbic Acid", "Sodium Benzoate", "Potassium Metabisulphite (KMS)"] },
    { name: "Acidulants", ingredients: ["Citric Acid Monohydrate", "Citric Acid Anhydrous", "Malic Acid", "Acetic Acid", "Ascorbic Acid", "Fumaric Acid", "Tartaric Acid", "Boric Acid", "Phosphoric Acid", "Formic Acid"] },
    { name: "Emulsifiers", ingredients: ["Distilled Monoglycerides (DMG)", "Propylene Glycol Monostearate (PGMS)", "SMS", "PGPR", "Soya Lecithin"] },
    { name: "Hydrocolloids & Stabilizers", ingredients: ["Xanthan Gum", "Guar Gum", "Sodium CMC"] },
    { name: "Sweeteners & Syrups", ingredients: ["Sorbitol 70% Solution", "Invert Sugar", "Aspartame", "Sucralose", "Acesulfame K", "Saccharin", "Isomalt", "Maltitol", "Sucrose"] },
    { name: "Starches & Functional Ingredients", ingredients: ["Potato Starch", "Vital Wheat Gluten", "Whey Protein", "Soya Protein"] },
    { name: "Leavening & Baking Ingredients", ingredients: ["Ammonium Bicarbonate", "Baking Powder", "Sodium Bicarbonate", "SAPP (Sodium Acid Pyrophosphate)"] },
    { name: "Minerals & Processing Ingredients", ingredients: ["Calcium Carbonate", "Calcium Chloride", "Sodium Citrate", "Propylene Glycol (PG)", "Refined Glycerine"] },
    { name: "Milk Powder", ingredients: ["Skimmed Milk Powder", "Whey Powder", "Whole Milk Powder", "Milk Powder Added Glucose"] }
  ]
};

export const slugify = (value) => value.toLowerCase().replace(/&/g, "and").replace(/\([^)]*\)/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

approvedRangeProducts.forEach((item) => {
  const industry = industries.find((entry) => entry.slug === item.industrySlug);
  if (industry && !industry.products.includes(item.name)) industry.products.push(item.name);
});

const productMap = new Map();
industries.forEach((industry) => industry.products.forEach((name) => {
  const slug = slugify(name);
  const approved = approvedRangeProducts.find((item) => item.name === name);
  if (!productMap.has(slug)) productMap.set(slug, {
    slug, name, industrySlug: industry.slug, category: industry.name, image: productImageByName[name] || industry.image,
    brand: approved?.brand, range: approved?.range, packs: approved?.packs, usageCategory: approved?.usageCategory || productMenuGroupsByIndustrySlug[industry.slug]?.find((group) => group.ingredients.includes(name))?.name || industry.name,
    summary: `${name} for consistent food production`,
    description: approved?.description || `Vikranth Chemical Corporation supplies ${name} in Chennai for professional food businesses seeking dependable sourcing and application-fit guidance. Tell our team your product, process, required grade, monthly quantity and documentation needs so we can confirm a suitable available option.`
  });
}));

export const products = [...productMap.values()];
const normalizeProductLookup = (value) => slugify(String(value).replace(/®/g, "registered"));
const productSlugByLookup = new Map(products.map((product) => [normalizeProductLookup(product.name), product.slug]));
export const getProductHref = (name) => `/products/${productSlugByLookup.get(normalizeProductLookup(name)) || slugify(name)}`;
export const getProduct = (slug) => products.find((item) => item.slug === slug);
export const getIndustry = (slug) => industries.find((item) => item.slug === slug);
