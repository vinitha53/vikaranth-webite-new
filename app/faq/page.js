import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Food Ingredient Supply FAQs | Vikranth",
  description: "Answers about bulk supply, small-quantity enquiries, documents, quotations and food ingredient availability from Vikranth in Chennai.",
  alternates: { canonical: "/faq/" },
};

const faqs = [
  ["Is Vikranth a food ingredients supplier in Chennai?", "Yes. Vikranth Chemical Corporation is a Chennai-based food ingredient supplier and distributor for manufacturers and professional buyers, covering bakery, chocolate, dairy, beverage and specialty ingredients."],
  ["Does Vikranth support bulk ingredient requirements?", "Yes. Vikranth primarily supports manufacturers, bakeries, food processors and other professional buyers with bulk and wholesale ingredient supply. Mention your approximate quantity when requesting a quotation."],
  ["Can retail or small-quantity buyers purchase from Vikranth?", "Select retail and small-quantity enquiries are considered for specific ingredients. Share the product, application and required quantity, and the team will confirm current availability."],
  ["Do you supply food ingredients outside Chennai?", "Vikranth is based in Chennai and supports business enquiries from other locations across India. Share your delivery city and quantity so the team can confirm availability and supply options."],
  ["Which food ingredients does Vikranth supply?", "Vikranth supplies ingredients for bakery, chocolate, dairy, beverages, ice cream, fruit processing, hydrocolloids, sweeteners, starches, proteins, emulsifiers and related manufacturing needs. Current availability and grade are confirmed per enquiry."],
  ["Can you help us select the right ingredient?", "Share your application, expected function, required grade and quantity. The team can help identify suitable product options for evaluation."],
  ["Can we request product specifications or certificates?", "Product specifications and supporting documents can be requested. Availability depends on the selected ingredient and manufacturer."],
  ["What information is needed for a quotation?", "Provide the ingredient name, grade or application, required quantity, delivery location, company name and contact information."],
  ["Can I request a product sample?", "Sample availability depends on the ingredient, supplier and project. Include the product, application, sample quantity and delivery location."],
  ["Are COA, TDS and SDS documents available?", "Availability varies by product, grade and supplier. State the exact document required in the enquiry."],
];

export default function FaqPage() {
  return <main className="faq-page"><section className="faq-page-hero"><div className="container"><span className="eyebrow">Buyer help centre</span><h1>Food Ingredient Supply Questions</h1><p>Clear answers for manufacturers, bakeries, processors, procurement teams and selected small-quantity buyers.</p></div></section><section className="faq-page-content"><div className="container"><div className="faq-list">{faqs.map(([question,answer]) => <details key={question}><summary><h2>{question}</h2><span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div><a className="btn primary" href="/contact/#enquiry">Send Your Requirement <ArrowRight size={16}/></a></div></section></main>;
}
