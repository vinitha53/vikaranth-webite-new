import assert from "node:assert/strict";
import { ingredientQuery } from "../app/data/search-intent.mjs";

for (const [input, expected] of [
  ["cocoa powder supplier in chennai", "cocoa powder"],
  ["bakery ingredients wholesale south india", "bakery ingredients"],
  ["roquette distributor pan india", "roquette"],
  ["cake gel small quantity near me", "cake gel"],
  ["calcium propionate", "calcium propionate"],
  ["wholesale chennai", "ingredients"],
]) assert.equal(ingredientQuery(input), expected, input);
console.log("Search intent checks passed (6 queries).");
