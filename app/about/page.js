import { DetailFooter, DetailHeader } from "../components/DetailChrome";
import AboutStory from "./AboutStory";

export const metadata = {
  title: "About Vikranth Chemical Corporation | Chennai Food Ingredient Supplier",
  description: "Learn how Vikranth supports food manufacturers, bakeries and professional buyers with dependable ingredient sourcing from Chennai.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return <main><DetailHeader/><AboutStory/><DetailFooter/></main>;
}
