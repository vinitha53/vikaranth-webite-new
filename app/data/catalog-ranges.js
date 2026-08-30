import { mec3Categories } from "./mec3-catalog";

const rows = [
  ["Callebaut","imported","chocolate-confectionery","Dark Couverture 811 (54.5%)|Milk Couverture 823 (33.6%)|White Couverture W2 (28.0%)|Dark Couverture 70-30 (70.5%)|Gold Chocolate (30.4%)|Ruby Chocolate (47.3%)|Ecuador Single Origin (70.4%)|Sao Thome Single Origin (70%)|Madagascar Single Origin (67.4%)|Arriba Single Origin (39%)|Java Single Origin (32.5%)|Milk Chocolate (MALCHOC - Milk 33.9%)|White Chocolate (MALCHOC - White 30.6%)|Dark Chocolate (MALCHOC - Dark 53.9%)|Dark Truffle Shells|Milk Truffle Shells|White Truffle Shells|Hazelnut Praline PRA 663|Hazelnut Praline PRA 660|Caramel Fill|Pale Gianduja (Milk Chocolate + Hazelnut)|Paillete Feuilletine - M7 French Biscuit Crunch|Pure Hazelnut Paste|Pure Pistachio Paste|Cocoa Nibs|Mycryo Cocoa Butter"],
  ["Mona Lisa","imported","chocolate-confectionery","Dark Chocolate Coated Cereals|Milk Chocolate Coated Cereals|White Chocolate Coated Cereals|Salted Caramel Flavored Cocoa Based Cereals|Ruby Chocolate Coated Cereals|Minimix (Dark, Milk, White Mini Crispearls)"],
  ["Cacao Barry","imported","chocolate-confectionery","Tanzanie (75%)|Saint Domingue (70%)|Venezuela (72%)|Ghana (40%)|Alunga Milk Organic (41%)|Alto El Sol (65%)|Ocoa (70%)|Inaya (65%)|Lactée Barry (35.3%)|Zephyr Caramel (35%)|Excellence (55%)|Extrabitter Guayaquil (64%)|Favorites Mi-Amere (58%)|Blanc Satin (29.2%)|Plein Arôme Cocoa Powder (22/24% Fat)|CB Grand Caraque 100% Cocoa Mass|Extra Brute Cocoa Powder (22/24% Fat)|Cara Crakine|Praline Feuilletine"],
  ["Molino Dallagiovanna","imported","bakery-ingredients","Neapolitan Pizza Flour|T55 Strong Flour for Ciabatta|T45 Special Flour for Baguette"],
  ["DLA Naturals","imported","fruit-processing","Apple Filling|Apple Cinnamon Filling|Bakers Cream Vanilla|Bakers Cream Cinnamon|Banana Filling|Blueberry Filling|Coconut Filling|Dark Cherry Filling|Passion Fruit Filling|Pineapple Filling|Raspberry Filling|Red Cherry Filling|Strawberry Filling|Tropical Filling"],
  ["MEC3","imported","ice-cream-ingredients","Baklava Paste|Baklava Pistachio Cream|Baklava Walnut Cream|Barazek Cream|Instacrumble Pistacchio|Instacrumble Limone GF|Kulfi Cream|Mastic Paste|Cappuccino Paste|Crema Chocomilky|Sticky Toffee|Quella Amarena Crunchy|Quella Mango & Passion Crunchy|Saffron Cream|Variegato Dubai Chocolate|Variegato Blond Brownie|Variegato Caramel Butterscotch|Variegato Crispy Peanut|Variegato Coffee Fudge|Variegato Milk & Cream|Velvet Blueberry|Pistacchio Copa D'Oro|Pure Sicily Pistachio|Cookies Black|Cookies Spicy|Mandorla|Vanilla Madagaskar|French Vanilla|Base 6|Neutralin|Panna Base MEC3|Base 50|Base Alba|Base Frutta Frutta|Gelmix|Mec Fibra Plus|Softin|Base Divina|Copertura Caramello|Copertura Fondente|Copertura Fragola|Copertura Limone|Copertura Nocciola|Copertura Pistachio|Covering Stracciatella|Quella|Quella Crunchy|Quella Dark|Quella Ruby|Quella Pistacchio Crunchy|Quella Vaniglia|Quella Arancia E Mandorle"],
  ["Elle & Vire Professionnel","imported","dairy-ingredients","Excellence Whipping Cream 35.3%|Extra Dry Butter 84%|UHT Mascarpone"],
  ["Corman","imported","dairy-ingredients","Corman Dairy Butter 82%|Corman Sculpture Whipping Speciality"],
  ["DIRA","imported","fruit-processing","Passion Fruit Puree|Mango Puree|Coconut Puree|Raspberry Puree|Apple Puree|Lime Puree|Pineapple Puree|Banana Puree|Mandarine Puree|Apricot Puree|Blackberry Puree|Acai Puree|Strawberry Puree|Blueberry Puree|Strawberry Frozen|Blackberry Frozen|Red Currant Frozen|Black Currant Frozen|Blueberry Frozen|Cranberries Frozen|Fruit of the Forest Frozen|Raspberry Frozen|Sour Cherry Frozen|Rhubarb Frozen"],
  ["Switz","imported","bakery-ingredients","Spring Roll Sheets 6x6|Spring Roll Sheets 8x8|Spring Roll Sheets 10x10|Samosa Patti 250 g|Samosa Patti 500 g|Shredded Filo (Kunafa)|Thin Filo (Baklava)|Puff Paratha|Puff Dough Square"],
  ["CSM / Ulmer Spatz","imported","bakery-ingredients","Kraftkorn|Grainex|Dia Baguette|VX2T Improver|Sima Cake Mix|Roggenfix|Pane Luciane|Neropan|Best Brown Bread Mix|Red Fruit Croquant"],
  ["ARYZTA","imported","bakery-ingredients","Croissant Eggless 30 g|Croissant Eggless 50 g|Croissant Eggless 70 g|Mini Chocolate Roll Eggless 33 g|Mini Cinnamon Whirl Eggless 33 g"],
  ["Sosa","imported","functional-ingredients","Whole Freeze-Dried Raspberries|Raspberry Crispy|Strawberry Crispy|Pineapple Crispy|Passion Fruit Crispy|Yocrispy|Potatowhip|Fruit Pectin NH|Pectina 325 NH 95"],
  ["Les Vergers Boiron","imported","fruit-processing","Boiron Blackberry Puree|Boiron Coconut Puree|Boiron Mango Puree|Boiron Pineapple Puree|Boiron Raspberry Puree|Boiron Strawberry Puree"],
  ["Celebre","indian","bakery-ingredients","Red Velvet Cake Mix|Classic Cake Mix Range|Eggless Molten Lava Cake Mix|Waffle Mix|Plum Cake Premix|Sugar Paste / Rolling Fondant|Hot Glaze Neutral|Hot Glaze Fruit"],
  ["Celebre","indian","ice-cream-ingredients","Softy Ice Cream Mix"],
  ["Celebre","indian","fruit-processing","Celebre IQF Fruits|Celebre Fruit Purees"],
];
const categories={"chocolate-confectionery":"Chocolate & Confectionery","bakery-ingredients":"Bakery Ingredients","fruit-processing":"Fruit Processing","ice-cream-ingredients":"Ice Cream Ingredients","dairy-ingredients":"Dairy Ingredients","functional-ingredients":"Functional Ingredients"};
// One main Delta category per product. These are the category names used by
// Delta's ingredient navigation and represented by the matching PDF sections.
const brochureCategoryFor = (brand) => ({
  Callebaut: "Premium Chocolate",
  "Mona Lisa": "Premium Chocolate",
  "Cacao Barry": "Premium Chocolate",
  "Molino Dallagiovanna": "Italian Pizza Flour",
  "DLA Naturals": "Fruit Fillings",
  MEC3: "Premium Ice Cream",
  "Elle & Vire Professionnel": "Dairy",
  Corman: "Dairy",
  DIRA: "Frozen Fruits & Purees",
  Switz: "Bakery Ingredients",
  "CSM / Ulmer Spatz": "European Bread Concentrates",
  ARYZTA: "Bakery Ingredients",
  Sosa: "Modern Gastronomy Ingredients",
  "Les Vergers Boiron": "Frozen Fruits & Purees",
})[brand];

// Delta's brochure sometimes provides a subcategory (or a brand heading)
// beneath the main category. Use that more specific heading when it exists;
// otherwise retain the main brochure category as the catalogue heading.
const novita2026SpecialtiesPattern = /^(?:baklava paste|baklava pistachio cream|baklava walnut cream|barazek cream|instacrumble pistacchio|instacrumble limone gf|kulfi cream|mastic paste|cappuccino paste|crema chocomilky|sticky toffee|quella amarena crunchy|quella mango & passion crunchy|saffron cream|variegato dubai chocolate|variegato blond brownie|variegato caramel butterscotch|variegato crispy peanut|variegato coffee fudge|variegato milk & cream|velvet blueberry)$/i;

const brochureDisplayCategoryFor = (brand, name) => {
  const mainCategory = brochureCategoryFor(brand);
  const rulesByBrand = {
    Callebaut: [
      ["Finest Belgian Chocolate", /dark couverture 811|milk couverture 823|white couverture w2|dark couverture 70-30/i],
      ["Flavoured Chocolate", /gold chocolate|ruby chocolate/i],
      ["Praline Fillings", /hazelnut praline|caramel fill|pale gianduja/i],
      ["Specialities", /paillete feuilletine|pure hazelnut paste|pure pistachio paste|cocoa nibs|mycryo cocoa butter/i],
      ["Truffle Shells", /truffle shells/i],
      ["No Added Sugar Chocolate (Maltitol)", /malchoc/i],
      ["Single-Origin Couverture", /ecuador|sao thome|madagascar|arriba|java/i],
      ["Milk & White Couverture", /milk couverture|white couverture/i],
      ["Dark Couverture", /dark couverture/i],
      ["Speciality Couverture", /gold chocolate|ruby chocolate/i],
    ],
    "Mona Lisa": [["Crispearls™", /.*/]],
    "DLA Naturals": [["DLA Naturals Bake Stable Fruit & Pie Fillings", /.*/]],
    "Cacao Barry": [
      ["Chocolate d'Origine", /^(?:tanzanie|saint domingue|venezuela|ghana|alunga milk organic|alto el sol|ocoa|inaya)\b/i],
      ["Milk, Dark & White Couverture Chocolate", /lactée barry|zephyr caramel|excellence|extrabitter guayaquil|favorites mi-amere|blanc satin/i],
      ["Pure Cocoa Products", /plein arôme cocoa powder|cb grand caraque|extra brute cocoa powder/i],
      ["Cacao Barry Specialities", /cara crakine|praline feuilletine/i],
    ],
    MEC3: [
      ["Novità 2026 Specialties", novita2026SpecialtiesPattern],
      ["Gelato Bases & Functional Ingredients", /base 6|neutralin|panna base|base 50|base alba|base frutta|gelmix|mec fibra plus|softin|base divina/i],
      ["Copertura Dips & Coverings", /copertura|covering stracciatella/i],
      ["Creams, Pastes & Specialities", /quella amarena|quella mango|variegato dubai/i],
      ["Quella Toppings", /^quella/i],
      ["Nut Pastes & Cookies Range", /pistacchio copa|pure sicily pistachio|cookies black|cookies spicy|mandorla|vanilla madagaskar|french vanilla/i],
      ["Creams, Pastes & Specialities", /.*/],
    ],
    DIRA: [
      ["Frozen Fruits IQF", /frozen/i],
      ["Frozen Fruit Purees", /puree/i],
    ],
    "Les Vergers Boiron": [["Les Vergers Boiron Purees", /.*/]],
    Switz: [["Switz Frozen Dough & Sheets", /.*/]],
    ARYZTA: [["ARYZTA Frozen Bakery Products", /.*/]],
    Sosa: [["Sosa Ingredients", /.*/]],
    "Elle & Vire Professionnel": [["Elle & Vire Professionnel", /.*/]],
    Corman: [["Corman", /.*/]],
    "Molino Dallagiovanna": [["Molino Dallagiovanna", /.*/]],
  };

  return rulesByBrand[brand]?.find(([, pattern]) => pattern.test(name))?.[0] || mainCategory;
};
const usageCategoryFor = (industrySlug, name, range) => {
  const indianRules = {
    "bakery-ingredients": [["Cake & Bakery Premixes", /cake mix|waffle mix|plum cake premix/i], ["Fondants & Glazes", /fondant|glaze/i]],
    "ice-cream-ingredients": [["Ice Cream Premixes", /.*/]],
    "fruit-processing": [["Frozen Fruits", /iqf|frozen/i], ["Fruit Purees", /puree/i]],
  };
  const rules = {
    "chocolate-confectionery": [["Pure Cocoa Products", /plein arôme cocoa powder|cb grand caraque|extra brute cocoa powder/i], ["Cocoa Ingredients", /cocoa powder|cocoa mass/i], ["Praline Fillings", /hazelnut praline|caramel fill|pale gianduja/i], ["Cacao Barry Specialities", /cara crakine|praline feuilletine/i], ["Specialities", /paillete feuilletine|pure hazelnut paste|pure pistachio paste|cocoa nibs|mycryo cocoa butter/i], ["Decorations & Inclusions", /crispearls|truffle shells/i], ["No Added Sugar Chocolate (Maltitol)", /malchoc/i], ["Milk, Dark & White Couverture Chocolate", /lactée barry|zephyr caramel|^excellence \(|extrabitter guayaquil|favorites mi-amere|blanc satin/i], ["Single-Origin Couverture", /ecuador|sao thome|madagascar|arriba|java|tanzanie|saint domingue|venezuela|ghana|alto el sol/i], ["Milk & White Couverture", /milk couverture|white couverture|alunga milk/i], ["Dark Couverture", /dark couverture/i], ["Speciality Couverture", /.*/]],
    "bakery-ingredients": [["Flours", /flour/i], ["Pastry Sheets & Dough", /sheet|patti|filo|paratha|dough/i], ["Frozen & Ready-to-Bake", /croissant|chocolate roll|cinnamon whirl/i], ["Mixes, Grains & Improvers", /.*/]],
    "fruit-processing": [["DLA Naturals Bake Stable Fruit & Pie Fillings", /apple (?:cinnamon )?filling|bakers cream (?:vanilla|cinnamon)|banana filling|blueberry filling|coconut filling|dark cherry filling|passion fruit filling|pineapple filling|raspberry filling|red cherry filling|strawberry filling|tropical filling/i], ["Bakery Cream Fillings", /bakers cream/i], ["Apple Fillings", /apple filling/i], ["Berry & Cherry Fillings", /blueberry filling|cherry filling|raspberry filling|strawberry filling/i], ["Tropical Fruit Fillings", /filling/i], ["Frozen Fruits", /frozen/i], ["Boiron Fruit Purees", /boiron.*puree/i], ["Tropical Fruit Purees", /passion fruit puree|mango puree|coconut puree|lime puree|pineapple puree|banana puree|mandarine puree|acai puree/i], ["Berry Fruit Purees", /raspberry puree|blackberry puree|strawberry puree|blueberry puree/i], ["Orchard Fruit Purees", /apple puree|apricot puree/i], ["Fruit Preparations", /.*/]],
    "ice-cream-ingredients": [["Novità 2026 Specialties", novita2026SpecialtiesPattern], ["Bases & Stabilizers", /base|neutralin|gelmix|fibra|softin/i], ["Quella & Variegato Toppings", /quella|variegato/i], ["Gelato Coatings", /copertura|covering/i], ["Inclusions & Crunch", /instacrumble|cookies/i], ["Nut & Traditional Flavours", /baklava|barazek|pistacchio|pistachio|mandorla/i], ["Classic Flavour Pastes", /kulfi|mastic|cappuccino|chocomilky|sticky toffee|saffron/i], ["Fruit & Vanilla Flavours", /.*/]],
    "dairy-ingredients": [["Dairy & Ice Cream Products", /cream|mascarpone|sculpture/i], ["Professional Butter", /butter/i], ["Other Dairy Ingredients", /.*/]],
    "functional-ingredients": [["Fruit Inclusions", /raspberr|strawberr|pineapple|passion fruit|yocrispy/i], ["Whipping & Aeration", /potatowhip/i], ["Pectins & Texture", /pectin/i], ["Functional Ingredients", /.*/]],
  };
  const selectedRules = range === "indian" ? indianRules[industrySlug] : rules[industrySlug];
  return (selectedRules || [[categories[industrySlug] || "Other Ingredients", /.*/]]).find(([, pattern]) => pattern.test(name))?.[0] || "Other Ingredients";
};

const featuredChocolateDetails = {
  "Dark Chocolate Coated Cereals": { packs: "800 g", description: "Mona Lisa Crispearls with a toasted biscuit cereal heart coated in Belgian dark chocolate for adding a crisp finishing touch to desserts and pastries." },
  "Milk Chocolate Coated Cereals": { packs: "800 g", description: "Mona Lisa Crispearls with a toasted biscuit cereal heart coated in Belgian milk chocolate for professional dessert, pastry and ice-cream applications." },
  "White Chocolate Coated Cereals": { packs: "800 g", description: "Mona Lisa Crispearls with a toasted biscuit cereal heart coated in Belgian white chocolate for professional dessert, pastry and ice-cream applications." },
  "Salted Caramel Flavored Cocoa Based Cereals": { packs: "800 g", description: "Mona Lisa salted caramel flavoured Crispearls for adding a crisp texture and caramel-chocolate finish to desserts and pastries." },
  "Ruby Chocolate Coated Cereals": { packs: "800 g", description: "Mona Lisa Crispearls with a toasted biscuit cereal heart coated in ruby chocolate for professional dessert and pastry decoration." },
  "Minimix (Dark, Milk, White Mini Crispearls)": { packs: "425 g", description: "A Mona Lisa mix of dark, milk and white Mini Crispearls for adding varied chocolate colour, flavour and crisp texture to desserts." },
  "Dark Couverture 811 (54.5%)": { cocoaPercentage: "54.5% cocoa", packs: "10 kg and 2.5 kg", description: "Smooth, well-balanced Belgian dark chocolate with a vanilla note for professional confectionery and bakery applications." },
  "Milk Couverture 823 (33.6%)": { cocoaPercentage: "33.6% cocoa", packs: "10 kg and 2.5 kg", description: "Belgian milk couverture combining cocoa, milk and caramel notes for professional chocolate applications." },
  "White Couverture W2 (28.0%)": { cocoaPercentage: "28% cocoa", packs: "10 kg and 2.5 kg", description: "Balanced Belgian white couverture with a creamy milk taste and vanilla notes." },
  "Dark Couverture 70-30 (70.5%)": { cocoaPercentage: "70.5% cocoa", packs: "2.5 kg", description: "Extra-bitter Belgian dark chocolate with an intense roasted cocoa character." },
  "Gold Chocolate (30.4%)": { cocoaPercentage: "30.4% cocoa", packs: "2.5 kg", description: "Caramel Belgian chocolate with rich notes of toffee, butter, cream and a dash of salt." },
  "Ruby Chocolate (47.3%)": { cocoaPercentage: "47.3% cocoa", packs: "2.5 kg", description: "Ruby Belgian chocolate with intense fruitiness and a fresh sour note." },
  "Hazelnut Praline PRA 663": { packs: "5 kg", description: "Callebaut hazelnut praline filling for professional chocolate, confectionery, pastry and dessert applications." },
  "Hazelnut Praline PRA 660": { packs: "1 kg", description: "Callebaut hazelnut praline filling for professional chocolate, confectionery, pastry and dessert applications." },
  "Caramel Fill": { packs: "5 kg", description: "Callebaut caramel filling for professional chocolate, confectionery, pastry and dessert applications." },
  "Pale Gianduja (Milk Chocolate + Hazelnut)": { packs: "5 kg", description: "Callebaut pale gianduja combining milk chocolate and hazelnut for professional confectionery and pastry applications." },
  "Paillete Feuilletine - M7 French Biscuit Crunch": { packs: "2.5 kg", description: "Callebaut French biscuit crunch for adding crisp texture to chocolates, pralines, pastries and desserts." },
  "Pure Hazelnut Paste": { packs: "5 kg", description: "Pure hazelnut paste for professional chocolate, confectionery, pastry and dessert applications." },
  "Pure Pistachio Paste": { packs: "1 kg", description: "Pure pistachio paste for professional chocolate, confectionery, pastry and dessert applications." },
  "Cocoa Nibs": { packs: "800 g", description: "Cocoa nibs for flavour, texture and decoration in professional chocolate, bakery and dessert applications." },
  "Mycryo Cocoa Butter": { packs: "600 g", description: "Callebaut Mycryo cocoa butter for professional chocolate, culinary and confectionery applications." },
  "Cara Crakine": { packs: "1 kg and 5 kg", description: "Cacao Barry crunchy speciality for professional chocolate, confectionery, pastry and dessert applications." },
  "Praline Feuilletine": { packs: "1 kg and 5 kg", description: "Cacao Barry praline feuilletine speciality for professional chocolate, confectionery, pastry and dessert applications." },
  "Plein Arôme Cocoa Powder (22/24% Fat)": { packs: "1 kg and 5 kg", description: "Cacao Barry Plein Arôme cocoa powder with 22/24% fat for professional chocolate, bakery, beverage and dessert applications." },
  "CB Grand Caraque 100% Cocoa Mass": { packs: "3 kg", description: "Cacao Barry Grand Caraque 100% cocoa mass for professional chocolate, confectionery, bakery and dessert applications." },
  "Extra Brute Cocoa Powder (22/24% Fat)": { packs: "1 kg", description: "Cacao Barry Extra Brute cocoa powder with 22/24% fat for professional chocolate, bakery, beverage and dessert applications." },
  "Apple Filling": { packs: "610 g and 2.7 kg" },
  "Apple Cinnamon Filling": { packs: "2.7 kg" },
  "Bakers Cream Vanilla": { packs: "2.7 kg" },
  "Bakers Cream Cinnamon": { packs: "2.7 kg" },
  "Banana Filling": { packs: "2.7 kg" },
  "Blueberry Filling": { packs: "610 g and 2.7 kg" },
  "Coconut Filling": { packs: "2.7 kg" },
  "Dark Cherry Filling": { packs: "610 g and 2.7 kg" },
  "Passion Fruit Filling": { packs: "610 g and 2.7 kg" },
  "Pineapple Filling": { packs: "610 g and 2.7 kg" },
  "Raspberry Filling": { packs: "610 g and 2.7 kg" },
  "Red Cherry Filling": { packs: "610 g and 2.7 kg" },
  "Strawberry Filling": { packs: "610 g and 2.7 kg" },
  "Tropical Filling": { packs: "2.7 kg" },
};

const rowRangeProducts = rows.flatMap(([brand, range, industrySlug, names]) => names.split("|").map(name => {
  const featuredDetails = featuredChocolateDetails[name];
  return {
    name,
    brand,
    range,
    industrySlug,
    category: categories[industrySlug],
    usageCategory: usageCategoryFor(industrySlug, name, range),
    brochureCategory: range === "imported" ? brochureCategoryFor(brand) : undefined,
    brochureDisplayCategory: range === "imported" ? brochureDisplayCategoryFor(brand, name) : undefined,
    cocoaPercentage: featuredDetails?.cocoaPercentage,
    packs: featuredDetails?.packs || "Pack size confirmed on enquiry",
    description: featuredDetails?.description || `${name} by ${brand} for professional ${categories[industrySlug].toLowerCase()} applications. Ask Vikranth for the current format, pack, specification, availability and B2B quotation.`,
  };
}));

const mec3RangeProducts = mec3Categories.flatMap((catalogueCategory) => catalogueCategory.products.map((item) => ({
  name: item.name,
  brand: "MEC3",
  range: "imported",
  industrySlug: "ice-cream-ingredients",
  category: categories["ice-cream-ingredients"],
  usageCategory: catalogueCategory.title,
  brochureCategory: "Premium Ice Cream",
  brochureDisplayCategory: catalogueCategory.title,
  packs: item.pack,
  itemCode: item.code,
  dosage: item.dosage,
  description: `${item.name} by MEC3 from the ${catalogueCategory.title} range for professional gelato, ice-cream, pastry and dessert applications. Confirm dosage, specification and current availability for the intended formulation.`,
})));

// The June 2026 MEC3 catalogue is the single source of truth for matching
// products. Its category, pack, code and description override older row data,
// while newer MEC3 products not present in that brochure remain available.
export const approvedRangeProducts = [...new Map([...rowRangeProducts, ...mec3RangeProducts].map((item) => [item.name, item])).values()];
export const productsForRangeSupplier = (slug) =>
  slug === "delta-nutritives"
    ? approvedRangeProducts.filter((item) => item.range === "imported" && item.brochureCategory)
    : [];
