const categoryNames = {
  "chocolate-confectionery": "Chocolate & Confectionery",
  "bakery-ingredients": "Bakery Ingredients",
  "beverage-ingredients": "Beverage Ingredients",
  "ice-cream-ingredients": "Ice Cream Ingredients",
  "fruit-processing": "Fruit Processing",
  "dairy-ingredients": "Dairy Products",
};

const product = (brochureDisplayCategory, industrySlug, name, packs, extra = {}) => ({
  name,
  brand: "Celebre",
  range: "indian",
  industrySlug,
  category: categoryNames[industrySlug],
  usageCategory: brochureDisplayCategory,
  brochureCategory: "Bakery Ingredients",
  brochureDisplayCategory,
  packs: packs || "Pack size confirmed on enquiry",
  description: `${name} by Celebre from the ${brochureDisplayCategory} range for professional bakery, pastry, dessert and food-service applications. Ask Vikranth for the current specification, availability and B2B quotation.`,
  ...extra,
});

// Celebre Bakery Ingredients brochure, June 2026. Printed headings and source
// order are retained for the Delta supplier catalogue.
export const celebreBrochureProducts = [
  product("Eggless Cake Concentrate", "bakery-ingredients", "Eggless Cake Concentrate - Vanilla", "2 kg"),
  product("Eggless Cake Concentrate", "bakery-ingredients", "Eggless Cake Concentrate - Chocolate", "2 kg"),
  product("Eggless Cake Concentrate", "bakery-ingredients", "Eggless Muffin Concentrate", "2 kg"),
  ...["EMC 001", "EMC 002", "EMC 003"].map((name) => product("Eggless Cake Concentrate", "bakery-ingredients", name, "2 kg")),

  product("Eggless Cake Premix", "bakery-ingredients", "Eggless Cake Premix - Vanilla", "1 kg and 3 kg", { image: "/product-images/celebre/eggless-cake-premix-vanilla.png" }),
  product("Eggless Cake Premix", "bakery-ingredients", "Eggless Cake Premix - Dark", "1 kg and 3 kg", { image: "/product-images/celebre/eggless-cake-premix-dark.png" }),
  product("Eggless Cake Premix", "bakery-ingredients", "Eggless Cake Premix Vanilla (No Sugar Added)", "1 kg"),
  product("Eggless Cake Premix", "bakery-ingredients", "Eggless Cake Premix Chocolate (No Sugar Added)", "1 kg"),

  product("Red Velvet Premix", "bakery-ingredients", "Super Moist Red Velvet", "3 kg", { image: "/product-images/celebre/red-velvet-premix.png" }),
  product("Red Velvet Premix", "bakery-ingredients", "Classic Red Velvet", "3 kg", { image: "/product-images/celebre/red-velvet-premix.png" }),
  product("Eggless Molten Lava Premix", "bakery-ingredients", "Molten Choco Lava Cake Premix", "3 kg"),
  product("Eggless Molten Lava Premix", "bakery-ingredients", "Red Velvet Lava Cake Premix", "3 kg"),
  product("Celebre Cream Cheese", "dairy-ingredients", "Celebre Cream Cheese", null),

  product("Belgium Waffle Premix", "bakery-ingredients", "Belgium Waffle Premix", "3 kg", { image: "/product-images/celebre/belgium-waffle-premix.png" }),
  product("Belgium Waffle Premix", "bakery-ingredients", "Waffle Cone Premix", "3 kg", { image: "/product-images/celebre/waffle-cone-premix.png" }),
  product("Mousse Mix", "bakery-ingredients", "Charlotte Powder Neutral (Mousse Premix)", "1.5 kg"),
  product("Mousse Mix", "bakery-ingredients", "Charlotte Powder Cheese (Mousse Premix)", "1.5 kg"),
  product("Brownie Mix", "bakery-ingredients", "American Brownie Premix (Light)", "1 kg and 3 kg"),
  product("Brownie Mix", "bakery-ingredients", "Brownie Mix (Dark)", "1 kg and 3 kg"),

  ...[
    ["Neutral Glaze Gel", "neutral-glaze-gel.png", "1 kg and 2.5 kg"],
    ["Red Velvet Glaze Gel", "red-velvet-glaze-gel.png", "1 kg and 2.5 kg"],
    ["White Glaze Gel", "white-glaze-gel.png", "1 kg and 2.5 kg"],
    ["Cacao Glaze Gel", "cacao-glaze-gel.png", "1 kg and 2.5 kg"],
    ["Caramel Glaze Gel", "caramel-glaze-gel.png", "1 kg and 2.5 kg"],
    ["Butterscotch Glaze Gel", "butterscotch-glaze-gel.png", "1 kg and 2.5 kg"],
    ["Blueberry Glaze Gel", "blueberry-glaze-gel.png", "1 kg and 2.5 kg"],
    ["Mango Glaze Gel", "mango-glaze-gel.png", "1 kg and 2.5 kg"],
    ["Pineapple Glaze Gel", "pineapple-glaze-gel.png", "1 kg and 2.5 kg"],
    ["Kiwi Glaze Gel", "kiwi-glaze-gel.png", "1 kg and 2.5 kg"],
    ["Raspberry Glaze Gel", "raspberry-glaze-gel.png", "1 kg and 2.5 kg"],
    ["Strawberry Glaze Gel", "strawberry-glaze-gel.png", "1 kg and 2.5 kg"],
    ["Orange Glaze Gel", "orange-glaze-gel.png", "1 kg and 2.5 kg"],
    ["Black Currant Glaze Gel", "black-currant-glaze-gel.png", "2.5 kg"],
  ].map(([name, image, packs]) => product("Flavoured & Glazing Gels", "fruit-processing", name, packs, { image: `/product-images/celebre/${image}` })),
  product("Flavoured & Glazing Gels", "fruit-processing", "Strawberry with Seeds Glaze Gel", "2.5 kg"),

  ...[
    ["Blueberry Fruit Filling", "blueberry-fruit-filling.png"],
    ["Classic Blueberry Fruit Filling", "classic-blueberry-fruit-filling.png"],
    ["Mango Fruit Filling", "mango-fruit-filling.png"],
    ["Pineapple Fruit Filling", "pineapple-fruit-filling.png"],
    ["Orange Fruit Filling", "orange-fruit-filling.png"],
    ["Raspberry Fruit Filling", "raspberry-fruit-filling.png"],
    ["Strawberry Fruit Filling", "strawberry-fruit-filling.png"],
    ["Cherry Fruit Filling", "cherry-fruit-filling.png"],
  ].map(([name, image]) => product("Fruit Filling", "fruit-processing", name, "1 kg and 2 kg", { image: `/product-images/celebre/${image}` })),

  ...["Blueberry", "Strawberry", "Raspberry", "Mango", "Passion Fruit"].map((flavour) => product("Insert Jelly", "fruit-processing", `${flavour} Insert Jelly`, "1 kg")),
  product("Ganache", "chocolate-confectionery", "Dark Chocolate Ganache", "1 kg and 2.5 kg"),
  product("Ganache", "chocolate-confectionery", "Milk Chocolate Ganache", "1 kg and 2.5 kg"),

  ...[
    ["Strawberry", "500 ml, 1 ltr. and 5 ltr."],
    ["Apple Butter Scotch", "500 ml, 1 ltr. and 5 ltr."],
    ["Litchi", "1 ltr. and 5 ltr."],
    ["Kiwi", "500 ml, 1 ltr. and 5 ltr."],
    ["Orange", "500 ml, 1 ltr. and 5 ltr."],
    ["Pink Guava", "1 ltr."],
    ["Ras Malai", "1 ltr."],
    ["Blueberry", "500 ml, 1 ltr. and 5 ltr."],
    ["Alphonso Mango", "500 ml, 1 ltr. and 5 ltr."],
    ["Green Apple", "1 ltr."],
    ["Black Currant", "500 ml, 1 ltr. and 5 ltr."],
    ["Raspberry", "1 ltr."],
  ].map(([name, packs]) => product("Fruit Crush", "fruit-processing", `${name} Fruit Crush`, packs)),

  ...[
    "Celebre Frozen Fruits Blueberry", "Celebre Frozen Fruits Raspberry", "Celebre Frozen Fruits Strawberry",
    "Celebre Frozen Fruits Dark Cherry", "Celebre Frozen Fruits Sour Cherry", "Celebre Frozen Fruits Mango Titbit",
    "Celebre Frozen Fruits Mango Chuncks", "Celebre Frozen Fruits Pineapple Titbit", "Celebre Raspberry Puree",
    "Celebre Strawberry Puree", "Celebre Blueberry Puree", "Celebre Passion Fruit Puree",
  ].map((name) => product("IQF Frozen Fruits & Purees", "fruit-processing", name, "1 kg")),

  ...["DX-100", "DX-300", "DX-500"].map((name) => product("Bread Improver", "bakery-ingredients", name, "1 kg")),
  product("Specialities", "bakery-ingredients", "Choco Hazelnut Spread", "1 kg"),
  product("Specialities", "bakery-ingredients", "Chocofill Crunchy", "1 kg"),
  product("Specialities", "bakery-ingredients", "Toffee Caramel", "1 kg and 2.5 kg"),
  product("Specialities", "bakery-ingredients", "Pistachio Paste (No Added Sugar)", "1 kg"),
  ...["Carabisc Biscuit Spread", "Dubai Pista Filling", "Pista Praline Paste", "Orange Spread", "Coconut Spread", "Coffee Spread", "Dates & Walnut Filling", "Fig & Honey Filling"].map((name) => product("Specialities", "bakery-ingredients", name, "1 kg")),

  ...[
    "Dyo Softy Mix Vanilla Flavour", "Dyo Softy Mix Chocolate Flavour", "Dyo Softy Mix Classic Chocolate Flavour",
    "Dyo Softy Mix Cheese Flavour", "Dyo Softy Mix Kulfi Flavour", "Dyo Softy Mix Mango Flavour",
    "Dyo Softy Mix Strawberry Flavour", "Dyo Softy Mix Salted Butter Caramel Flavour",
  ].map((name) => product("Softy Ice Cream Premix", "ice-cream-ingredients", name, "1 kg")),
  product("Frozen Yoghurt Premix", "ice-cream-ingredients", "Frozen Yoghurt Premix", "1.5 kg"),
  product("Candied Fruits", "fruit-processing", "Light-Orange Candied Fruit", "1 kg and 5 kg"),
  product("Plum Cake Premix", "bakery-ingredients", "Plum Cake Premix", null),
  product("Drinking Chocolate Powder", "beverage-ingredients", "Drinking Chocolate Powder", null),
  product("Hot Glaze", "bakery-ingredients", "Hot Glaze", null),

  ...["Chocolate", "Caramel", "Salted Butter Caramel", "Spicy Butter Caramel", "Butterscotch"].map((name) => product("Dessert Toppings", "ice-cream-ingredients", `${name} Dessert Topping`, "1 kg and 5 kg")),
  product("Marzipan (Almond Paste)", "bakery-ingredients", "Marzipan - 36% Almond", "1 kg"),
  product("Croissant Mix", "bakery-ingredients", "Croissant Mix", null),
  ...["Black", "Blue", "Green", "Pink", "Red", "White", "Yellow", "Brown", "Purple", "Orange"].map((colour) => product("Sugar Paste (Rolling Fondant)", "bakery-ingredients", `${colour} Sugar Paste (Rolling Fondant)`, "1 kg")),
];
