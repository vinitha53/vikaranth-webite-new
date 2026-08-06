export const partners = [
  {slug:"campco",name:"CAMPCO",logo:"/partners/campco.png",image:"/products/chocolate-confectionery.webp",summary:"cocoa and chocolate ingredient options for bakery, confectionery, desserts and beverage formulations",about:"CAMPCO is associated with cocoa and chocolate products. Exact catalogue, grade, pack size and commercial availability must be confirmed from current supplier documentation.",products:["Cocoa Powder","Cocoa Butter","Cocoa Mass","Dark Chocolate"],industries:["chocolate-confectionery","bakery-ingredients"]},
  {slug:"delta-nutritives",name:"Delta Nutritives",logo:"/partners/delta.png",image:"/products/ice-cream-ingredients.png",summary:"dessert, chocolate, frozen fruit, dairy, ice cream and bakery ingredient options",about:"Delta Nutritives presents a portfolio spanning chocolate, ice cream, frozen fruit, fruit filling and dairy applications. Current products and packs must be verified before quotation.",products:["Frozen Fruits","Fruit Purees","Fruit Filling","Dessert Toppings"],industries:["ice-cream-ingredients","fruit-processing","chocolate-confectionery","dairy-ingredients"]},
  {slug:"roquette",name:"Roquette",logo:"/partners/roquette.png",image:"/products/sweeteners-syrups-starches-image.png",summary:"plant-based ingredients, starches, sweeteners, proteins and selected pharmaceutical solutions",about:"Roquette is known for plant-based ingredient solutions across food, nutrition and pharmaceutical applications. Availability is confirmed against the current approved catalogue.",products:["Liquid Glucose","Sorbitol 70% Solution","Sorbitol","Maize Starch","Whey Protein"],industries:["sweeteners-syrups-starches","functional-ingredients","nutraceutical-pharma"]},
  {slug:"nitta-gelatin-india-ltd",name:"Nitta Gelatin India Ltd.",logo:"/partners/nitta.png",image:"/products/hydrocolloids-pharma.png",summary:"gelatin solutions and related functional applications",about:"Nitta Gelatin India is associated with gelatin solutions for food, nutraceutical and selected pharmaceutical uses. Bloom strength, grade and documents require product-specific confirmation.",products:["Gelatin 120 Bloom","Gelatin 180 Bloom"],industries:["hydrocolloids-stabilizers","nutraceutical-pharma"]},
  {slug:"doehler",name:"Döhler",logo:"/partners/doehler.png",image:"/products/beverage-image.png",summary:"natural ingredients, flavours and integrated food and beverage systems",about:"Döhler develops natural ingredient and application systems for food and beverage markets. Vikranth provides a Chennai enquiry route subject to current range and supply confirmation.",products:["Flavours & Natural Ingredients","Fruit Crush","Fruit Purees","Orange Oil"],industries:["beverage-ingredients","fruit-processing"]},
  {slug:"cp-kelco",name:"CP Kelco",logo:"/partners/cp-kelco.png",image:"/products/hydrocolloids-pharma.png",summary:"nature-based hydrocolloids and formulation solutions",about:"CP Kelco is associated with nature-based hydrocolloid solutions for viscosity, suspension, stabilization and texture. Exact grades and applications must be verified.",products:["Genu Pectin","Xanthan Gum","Sodium CMC"],industries:["hydrocolloids-stabilizers","fruit-processing","beverage-ingredients"]},
  {slug:"calpro-specialities-pvt-ltd",name:"Calpro Specialities Pvt. Ltd.",logo:"/partners/calpro.png",image:"/products/dairy-image.png",summary:"cocoa powders, dairy proteins and food ingredient solutions",about:"Calpro Specialities supplies food ingredient solutions across cocoa and dairy-related applications. Publish only the products supported by current catalogue and written partner documentation.",products:["Cocoa Powder","Whey Protein","Whey Powder","Skimmed Milk Powder"],industries:["chocolate-confectionery","dairy-ingredients","functional-ingredients"]},
  {slug:"gujarat-ambuja-exports-ltd",name:"Gujarat Ambuja Exports Ltd.",logo:"/partners/ambuja.png",image:"/products/sweeteners-syrups-starches-image.png",summary:"sorbitol, starch derivatives and agro-processing ingredients",about:"Gujarat Ambuja Exports is associated with starch-derived and agro-processing ingredient solutions. Product grade, pack and current availability require confirmation.",products:["Sorbitol 70% Solution","Sorbitol","Maize Starch","Liquid Glucose"],industries:["sweeteners-syrups-starches","functional-ingredients"]},
  {slug:"fine-organics",name:"Fine Organics",logo:"/partners/fine-organics.png",image:"/products/functional-ingredients-image.png",summary:"specialty additives and food emulsifier solutions",about:"Fine Organics is associated with specialty additive and emulsifier solutions for food processing. Selection depends on formulation, process, grade and documentation requirements.",products:["GMS Flakes","GMS Powder","DMG","PGMS","SMS","PGPR","Sorbitan Monostearate"],industries:["functional-ingredients","bakery-ingredients","chocolate-confectionery"]},
  {slug:"shree-gluco-biotech-pvt-ltd",name:"Shree Gluco Biotech Pvt. Ltd.",logo:"/partners/shree-gluco.png",image:"/products/sweeteners-syrups-starches-image.png",summary:"starch-derived sweeteners and carbohydrate ingredients",about:"Shree Gluco Biotech is associated with starch-derived sweeteners and carbohydrate ingredients for professional food applications. Current specifications must be confirmed.",products:["Liquid Glucose","Dextrose Monohydrate","Maltodextrin Powder","Maize Starch"],industries:["sweeteners-syrups-starches","bakery-ingredients"]},
  {slug:"paramesu-biotech-ltd",name:"Paramesu Biotech Ltd.",logo:"/partners/paramesu.png",image:"/products/sweeteners-syrups-starches-image.png",summary:"maize starch and starch derivative solutions",about:"Paramesu Biotech is associated with maize starch and derivative solutions. Current catalogue, grade, pack size and partner documentation must be checked before publication.",products:["Maize Starch","Liquid Glucose","Dextrose Monohydrate","Maltodextrin Powder"],industries:["sweeteners-syrups-starches","bakery-ingredients"]},
  {slug:"anchor",name:"Anchor",logo:null,image:"/products/bakery-image.png",summary:"Vikranth's in-house food ingredient range for bakery and food manufacturing applications",about:"Anchor is Vikranth Chemical Corporation's in-house manufacturing brand. Only products, grades, pack sizes and application notes supported by current internal specifications and production records are presented.",products:["Cake Gel","Cake Premix","Custard Powder","Baking Powder"],industries:["bakery-ingredients","functional-ingredients"]}
];

export const partnerProductImages = {
  campco: {
    hero: "/partner-products/campco-cocoa.jpg",
    products: {
      "Cocoa Powder": "/partner-products/Campco/Cocoa Powder.png",
      "Cocoa Butter": "/partner-products/Campco/Cocoa Butter.png",
      "Cocoa Mass": "/partner-products/Campco/Cocoa Mass.png",
      "Dark Chocolate": "/partner-products/campco-dark-chocolate.jpg"
    }
  },
  "delta-nutritives": {
    hero: "/partner-products/delta-frozen-fruits.png",
    products: {"Frozen Fruits":"/partner-products/delta-frozen-fruits.png","Fruit Purees":"/partner-products/delta-fruit-purees.jpg","Fruit Filling":"/partner-products/delta-fruit-filling.jpg","Dessert Toppings":"/partner-products/delta-dessert-toppings.jpg"}
  },
  roquette: {
    hero: "/partner-products/roquette-products.jpg",
    products: Object.fromEntries(["Liquid Glucose","Sorbitol 70% Solution","Sorbitol","Maize Starch","Whey Protein"].map(name=>[name,"/partner-products/roquette-products.jpg"]))
  },
  "nitta-gelatin-india-ltd": {
    hero: "/partner-products/nitta-gelatin.jpg",
    products: {"Gelatin 120 Bloom":"/partner-products/nitta-gelatin.jpg","Gelatin 180 Bloom":"/partner-products/nitta-gelatin.jpg"}
  },
  doehler: {
    hero: "/partner-products/doehler-flavours.webp",
    products: Object.fromEntries(["Flavours & Natural Ingredients","Fruit Crush","Fruit Purees","Orange Oil"].map(name=>[name,"/partner-products/doehler-flavours.webp"]))
  },
  "cp-kelco": {
    hero: "/partner-products/cp-kelco-products.jpg",
    products: Object.fromEntries(["Genu Pectin","Xanthan Gum","Sodium CMC"].map(name=>[name,"/partner-products/cp-kelco-products.jpg"]))
  },
  "calpro-specialities-pvt-ltd": {
    hero: "/partner-products/calpro-products.jpg",
    products: Object.fromEntries(["Cocoa Powder","Whey Protein","Whey Powder","Skimmed Milk Powder"].map(name=>[name,"/partner-products/calpro-products.jpg"]))
  },
  "gujarat-ambuja-exports-ltd": {
    hero: "/partner-products/gujarat-ambuja-corn-products.jpg",
    products: Object.fromEntries(["Sorbitol 70% Solution","Sorbitol","Maize Starch","Liquid Glucose"].map(name=>[name,"/partner-products/gujarat-ambuja-corn-products.jpg"]))
  },
  "fine-organics": {
    hero: "/partner-products/fine-food-ingredients.jpg",
    products: Object.fromEntries(["GMS Flakes","GMS Powder","DMG","PGMS","SMS","PGPR","Sorbitan Monostearate"].map(name=>[name,"/partner-products/fine-food-ingredients.jpg"]))
  },
  "shree-gluco-biotech-pvt-ltd": {
    hero: "/partner-products/shree-gluco-products.jpg",
    products: Object.fromEntries(["Liquid Glucose","Dextrose Monohydrate","Maltodextrin Powder","Maize Starch"].map(name=>[name,"/partner-products/shree-gluco-products.jpg"]))
  },
  "paramesu-biotech-ltd": {
    hero: "/partner-products/paramesu-maize-starch.jpg",
    products: {"Maize Starch":"/partner-products/paramesu-maize-starch.jpg","Liquid Glucose":"/partner-products/paramesu-liquid-glucose.jpg","Dextrose Monohydrate":"/partner-products/paramesu-maize-starch.jpg","Maltodextrin Powder":"/partner-products/paramesu-maize-starch.jpg"}
  }
};

export const productImageByName = {
  ...Object.fromEntries(
    Object.values(partnerProductImages).flatMap(({products}) => Object.entries(products)).reverse()
  ),
  "Choco Chips": "/partner-products/Campco/Choco Chips.png",
  "Choco Paste": "/partner-products/Campco/Choco Paste.png",
  "Chocolate Drink": "/partner-products/Campco/Chocolate Drink.png",
  "Calcium Propionate (CP)": "/partner-products/calcium-propionate-bread.png"
};

partners.forEach(partner => {
  const imagery = partnerProductImages[partner.slug];
  if (imagery) {
    partner.image = imagery.hero;
    partner.productImages = imagery.products;
  }
});

export const getPartner=(slug)=>partners.find(partner=>partner.slug===slug);
export const partnersForProduct=(name)=>partners.filter(partner=>partner.products.includes(name));
export const partnersForIndustry=(slug)=>partners.filter(partner=>partner.industries.includes(slug));

