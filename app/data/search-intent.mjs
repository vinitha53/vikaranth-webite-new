// Service-area and purchase words should not hide the ingredient being sought.
export function ingredientQuery(query) {
  const cleaned = query
    .replace(/\b(?:south india|pan india|tamil nadu|andhra pradesh|near me|small business|small quantity|personal use)\b/g, " ")
    .replace(/\b(?:supplier|suppliers|distributor|distributors|wholesaler|wholesalers|wholesale|distributer|bulk|buy|buying|purchase|price|pricing|chennai|india|b2b|b2c|retail|online|in|from|for|a|the)\b/g, " ")
    .replace(/\s+/g, " ").trim();
  return cleaned || "ingredients";
}
