const selectionFocus = (name) => {
  const value = name.toLowerCase();
  if (value.includes("frozen yogurt") || value.includes("premix") || value.includes("panna base")) return "preparation method, target flavour and texture, serving format, trial quantity and equipment used";
  if (value.includes("cocoa")) return "colour, flavour profile, cocoa-fat range, alkalization where relevant, application and processing conditions";
  if (value.includes("chocolate") || value.includes("choco") || value.includes("couverture") || value.includes("callebaut")) return "cocoa profile, sweetness, viscosity, application, processing method and pack format";
  if (value.includes("gelatin")) return "Bloom strength, source, particle form, intended gel texture, process temperature and documentation";
  if (value.includes("pectin") || value.includes("gum") || value.includes("cmc") || value.includes("stabilizer")) return "required viscosity or gel, hydration method, pH, process temperature, dosage trial and finished-product texture";
  if (value.includes("protein") || value.includes("whey") || value.includes("gluten") || value.includes("milk powder")) return "protein or solids target, flavour, solubility, functional role, process conditions and certification needs";
  if (value.includes("preserv") || value.includes("sorb") || value.includes("benzo") || value.includes("acid") || value.includes("bicarbonate") || value.includes("sapp") || value.includes("propionate")) return "food application, applicable regulation, process pH, dosage trial, target shelf life and supporting documents";
  if (value.includes("starch") || value.includes("glucose") || value.includes("dextrose") || value.includes("maltodextr") || value.includes("sugar") || value.includes("syrup") || value.includes("aspartame")) return "sweetness or body target, solids, process conditions, handling format, required grade and finished-product performance";
  if (value.includes("emuls") || ["gms flakes","gms powder","dmg","pgms","sms","pgpr","soya lecithin","sorbitan monostearate","finamul 90"].includes(value)) return "emulsification target, fat and water system, processing temperature, dosage trial, grade and finished-product texture";
  if (value.includes("fruit") || value.includes("orange oil") || value.includes("flavour") || value.includes("vanillin")) return "flavour profile, fruit or flavour strength, format, heat process, dosage trial and finished-product target";
  return "required function, grade, process conditions, pack size, trial quantity and supporting documents";
};

export function buildProductFaqs(product, industry, applications) {
  const name = product.name;
  const category = industry.name.toLowerCase();
  const focus = selectionFocus(name);
  const primaryUses = applications.slice(0, 3).join(", ").toLowerCase();

  return [
    [
      `What is ${name} commonly used for?`,
      `${name} is commonly evaluated for ${primaryUses} and related professional food applications. Suitability depends on the selected grade, formulation, process and finished-product target.`,
    ],
    [
      `How do I choose the right ${name} grade for ${category}?`,
      `Share your ${focus}. Vikranth can review the available options, but the final selection should be confirmed through your own formulation trial and quality process.`,
    ],
    [
      `What specifications should I check before buying ${name}?`,
      `Check the product specification, grade-defining parameters, ingredient declaration, allergen information where applicable, shelf life, storage instructions, pack size and compliance documents relevant to your market.`,
    ],
    [
      `Can I request a ${name} sample, specification sheet or COA?`,
      `You can request a sample, specification sheet and certificate of analysis. Availability depends on the product, grade, manufacturer and requested trial quantity.`,
    ],
    [
      `Is ${name} available for bulk B2B supply in Chennai?`,
      `Vikranth handles Chennai B2B enquiries for ${name}. Share the required quantity, delivery area and timeline so current stock, minimum quantity, pack size and lead time can be confirmed.`,
    ],
    [
      `Can Vikranth supply ${name} outside Chennai and across India?`,
      `Pan-India business enquiries are welcome. Delivery coverage, freight, lead time and minimum order quantity are confirmed for the destination and available product before quotation.`,
    ],
    [
      `How should ${name} be stored and what is its shelf life?`,
      `Follow the storage conditions and shelf-life statement on the selected manufacturer's label and specification. Ask for the current product documents before ordering because requirements can differ by grade and pack.`,
    ],
  ];
}
