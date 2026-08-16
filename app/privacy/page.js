import LegalPage from "../components/LegalPage";

export const metadata = {
  title: "Privacy Policy | Vikranth Chemical Corporation",
  description: "Learn how Vikranth Chemical Corporation handles website enquiries, contact details and business information.",
  alternates: { canonical: "/privacy/" },
};

const sections = [
  { heading: "Information we receive", content: ["We may receive your name, company name, email address, telephone number, delivery location, ingredient requirement and any information you choose to include in an enquiry.", "We may also receive basic technical information supplied by your browser or hosting provider, such as device type, browser type, pages visited and approximate location."] },
  { heading: "How we use information", content: ["We use enquiry information to understand your requirement, respond to quotation or sample requests, coordinate product information and communicate about relevant business services.", "We may use aggregated website information to improve page performance, accessibility, navigation and the usefulness of our product content."] },
  { heading: "WhatsApp and external services", content: ["Some forms continue through WhatsApp or open external services such as Google Maps, email or social media. Information shared through those services is also governed by their own privacy terms.", "The website does not ask for payment card details or account passwords through its enquiry forms."] },
  { heading: "Sharing and retention", content: ["We do not sell personal information. Information may be shared with relevant team members, service providers or ingredient partners only when reasonably necessary to respond to your business requirement.", "We retain enquiry records only for as long as needed for business communication, legal obligations, supply coordination and legitimate record keeping."] },
  { heading: "Security and your choices", content: ["We use reasonable administrative and technical safeguards, but no internet transmission or storage method can be guaranteed to be completely secure.", "You may ask us to correct or delete information you previously supplied, subject to legal and legitimate business-record requirements."] },
  { heading: "Contact and policy updates", content: ["For privacy questions, contact vikranth.chemicals@gmail.com or call +91 87544 42924.", "We may update this policy when our website, services or legal requirements change. The latest revision date will appear at the top of this page."] },
];

export default function PrivacyPage() {
  return <LegalPage eyebrow="Your information" title="Privacy Policy" introduction="A clear explanation of the information we receive through this website and how it supports your ingredient enquiries." updated="16 August 2026" sections={sections} />;
}