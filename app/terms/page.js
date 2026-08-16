import LegalPage from "../components/LegalPage";

export const metadata = {
  title: "Terms of Use | Vikranth Chemical Corporation",
  description: "Review the terms governing use of the Vikranth Chemical Corporation website, product information and enquiry services.",
  alternates: { canonical: "/terms/" },
};

const sections = [
  { heading: "Using this website", content: ["By using this website, you agree to use it lawfully and not to interfere with its operation, security, content or availability.", "Website access may be changed, suspended or withdrawn when maintenance, security or business requirements make that necessary."] },
  { heading: "Product information", content: ["Product descriptions, images, applications and availability are provided for general business information. They are not a substitute for current specifications, certificates, samples, regulatory review or application testing.", "Grades, pack sizes, documentation, pricing, lead times and availability must be confirmed for each enquiry and may vary by manufacturer, quantity and location."] },
  { heading: "Quotations and orders", content: ["Submitting an enquiry does not create a purchase contract. A transaction is formed only after commercial terms, product details, quantity, delivery and acceptance are confirmed through the applicable business process.", "Customers are responsible for confirming that selected ingredients and their intended use satisfy relevant formulation, safety, labelling and regulatory requirements."] },
  { heading: "Intellectual property", content: ["Website text, layout, graphics, branding and original materials belong to Vikranth Chemical Corporation or their respective owners and may not be copied or commercially reused without permission.", "Third-party names, logos and product marks remain the property of their respective owners and are displayed for identification and portfolio information."] },
  { heading: "External links and availability", content: ["Links to WhatsApp, maps, social platforms, manufacturer resources and other external services are provided for convenience. We do not control their availability, security or content.", "We aim to keep website information accurate and available but do not guarantee uninterrupted access or that every page will always be error-free or current."] },
  { heading: "Liability, law and contact", content: ["To the extent permitted by law, Vikranth Chemical Corporation is not responsible for indirect losses arising solely from reliance on general website information or external services.", "These terms are governed by the laws of India. Questions may be sent to vikranth.chemicals@gmail.com or +91 87544 42924 in Chennai, Tamil Nadu."] },
];

export default function TermsPage() {
  return <LegalPage eyebrow="Website terms" title="Terms of Use" introduction="The practical terms that apply when you browse our product information or send Vikranth a business enquiry." updated="16 August 2026" sections={sections} />;
}