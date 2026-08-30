export const WHATSAPP_NUMBERS = {
  anchor: "918754429922",
  delta: "919841068559",
  general: "918754442924",
};

export function whatsappNumberForSupplier(slug) {
  if (slug === "anchor") return WHATSAPP_NUMBERS.anchor;
  if (slug === "delta-nutritives") return WHATSAPP_NUMBERS.delta;
  return WHATSAPP_NUMBERS.general;
}

export function whatsappNumberForProduct(product, partnerSlugs = []) {
  if (partnerSlugs.includes("anchor")) return WHATSAPP_NUMBERS.anchor;
  if (product?.range === "imported" || product?.brand === "MEC3" || partnerSlugs.includes("delta-nutritives")) return WHATSAPP_NUMBERS.delta;
  return WHATSAPP_NUMBERS.general;
}

export function whatsappUrl(number, message = "") {
  const query = message ? "?text=" + encodeURIComponent(message) : "";
  return "https://wa.me/" + number + query;
}