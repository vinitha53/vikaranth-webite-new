const selectionFocus = (name) => {
  const value = name.toLowerCase();
  if (value.includes("cocoa")) return "colour, flavour profile, application and processing conditions";
  if (value.includes("chocolate") || value.includes("choco") || value.includes("couverture")) return "cocoa profile, sweetness, format, application and processing method";
  if (value.includes("gelatin")) return "Bloom strength, intended texture, process temperature and required documents";
  if (value.includes("pectin") || value.includes("gum") || value.includes("cmc") || value.includes("stabilizer")) return "required viscosity or gel, hydration method, pH, process temperature and texture target";
  if (value.includes("protein") || value.includes("whey") || value.includes("gluten") || value.includes("milk powder")) return "required functional role, process conditions, grade and document needs";
  if (value.includes("acid") || value.includes("sorb") || value.includes("benzo") || value.includes("bicarbonate") || value.includes("propionate")) return "food application, required function, process conditions, grade and supporting documents";
  if (value.includes("starch") || value.includes("glucose") || value.includes("dextrose") || value.includes("syrup") || value.includes("sweet")) return "sweetness or body target, solids, process conditions, form and grade";
  return "required function, application, grade, process conditions and supporting documents";
};

export function buildProductFaqs(product, industry, applications) {
  const name = product.name;
  const focus = selectionFocus(name);
  const primaryUses = applications.slice(0, 3).join(", ").toLowerCase();
  return [
    [`What is ${name} evaluated for?`, `${name} may be evaluated for ${primaryUses}. Share the ${focus}; final suitability must be confirmed against the selected product documents and the buyer's own formulation trial.`],
    [`Can I submit a wholesale or bulk ${name} enquiry?`, `Yes. Share the application, required grade, quantity, preferred pack and documents. Available packs, minimum quantity and commercial terms are confirmed for the selected product before quotation.`],
    [`Can ${name} be supplied outside Chennai?`, `South India and India enquiries are reviewed according to the selected product, quantity, pack, freight and destination serviceability. No delivery or stock position is confirmed until quotation.`],
  ];
}