"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, FileUp, MessageCircle } from "lucide-react";
import styles from "../products/[slug]/product-landing.module.css";

const initialValues = {
  name: "", company: "", email: "", phone: "", city: "", application: "",
  grade: "", quantity: "", requiredDate: "", sample: "No", documents: "Specification and COA",
  message: "", attachment: "", consent: false,
};

export default function ProductQuoteForm({ product, applications = [] }) {
  const [step, setStep] = useState(1);
  const [values, setValues] = useState(initialValues);
  const [submitted, setSubmitted] = useState(false);
  const reference = useMemo(() => `VCC-${product.replace(/[^a-z0-9]/gi, "").slice(0, 5).toUpperCase()}-${Date.now().toString().slice(-6)}`, [product]);

  const update = (event) => {
    const { name, type, checked, value, files } = event.target;
    setValues((current) => ({ ...current, [name]: type === "checkbox" ? checked : type === "file" ? (files?.[0]?.name || "") : value }));
  };

  function next(event) {
    event.preventDefault();
    if (event.currentTarget.reportValidity()) setStep(2);
  }

  function submit(event) {
    event.preventDefault();
    const message = [
      `B2B enquiry reference: ${reference}`,
      `Product: ${product}`,
      `Name: ${values.name}`,
      `Company: ${values.company}`,
      `Work email: ${values.email}`,
      `Phone / WhatsApp: ${values.phone}`,
      `Application: ${values.application}`,
      `Preferred grade / brand: ${values.grade || "Please advise"}`,
      `Quantity: ${values.quantity}`,
      `Delivery city / PIN: ${values.city}`,
      `Required date: ${values.requiredDate || "To be discussed"}`,
      `Sample required: ${values.sample}`,
      `Documents: ${values.documents}`,
      `Attachment selected: ${values.attachment || "None"}`,
      `Message: ${values.message || "None"}`,
    ].join("\n");
    setSubmitted(true);
    window.open(`https://wa.me/918754442924?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  if (submitted) return (
    <div className={styles.formSuccess} role="status" aria-live="polite">
      <span><Check /></span>
      <small>Enquiry ready</small>
      <h3>Thank you. Continue in WhatsApp to send your request.</h3>
      <p>Keep this reference number for follow-up:</p>
      <strong>{reference}</strong>
      <button type="button" onClick={() => setSubmitted(false)}>Review enquiry</button>
    </div>
  );

  return (
    <form className={styles.form} onSubmit={step === 1 ? next : submit} data-product={product} data-enquiry-source="product-page">
      <div className={styles.formProgress} aria-label={`Step ${step} of 2`}>
        <div><span style={{ width: `${step * 50}%` }} /></div><b>Step {step} of 2</b>
      </div>

      {step === 1 ? <fieldset className={styles.formStep}>
        <legend>Contact and delivery details</legend>
        <label>Your name<input name="name" value={values.name} onChange={update} autoComplete="name" placeholder="Enter your name" required /></label>
        <label>Company<input name="company" value={values.company} onChange={update} autoComplete="organization" placeholder="Company name" required /></label>
        <label>Work email<input name="email" value={values.email} onChange={update} type="email" autoComplete="email" placeholder="name@company.com" required /></label>
        <label>Phone / WhatsApp<input name="phone" value={values.phone} onChange={update} type="tel" inputMode="tel" autoComplete="tel" placeholder="10-digit mobile number" required /></label>
        <label className={styles.formWide}>Delivery city / PIN<input name="city" value={values.city} onChange={update} autoComplete="postal-code" placeholder="e.g. Chennai 600001" required /></label>
        <button className={styles.formNext} type="submit">Continue to requirement <ArrowRight /></button>
      </fieldset> : <fieldset className={styles.formStep}>
        <legend>Product requirement</legend>
        <label>Product<input value={product} readOnly aria-readonly="true" /></label>
        <label>Application<select name="application" value={values.application} onChange={update} required><option value="">Select application</option>{applications.map((item) => <option key={item}>{item}</option>)}<option>Other / discuss with team</option></select></label>
        <label>Preferred grade / brand<input name="grade" value={values.grade} onChange={update} placeholder="Optional" /></label>
        <label>Quantity and unit<input name="quantity" value={values.quantity} onChange={update} placeholder="e.g. 100 kg per month" required /></label>
        <label>Required date<input name="requiredDate" value={values.requiredDate} onChange={update} type="date" /></label>
        <label>Sample required<select name="sample" value={values.sample} onChange={update}><option>No</option><option>Yes</option><option>Please advise</option></select></label>
        <label className={styles.formWide}>Documents needed<select name="documents" value={values.documents} onChange={update}><option>Specification and COA</option><option>Specification, COA and SDS</option><option>Allergen statement</option><option>Certificates as applicable</option><option>Please advise</option></select></label>
        <label className={`${styles.formWide} ${styles.fileUpload}`}><FileUp /> Optional specification or formulation brief<input name="attachment" onChange={update} type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,image/*" /><small>{values.attachment || "Choose a file; you can attach it after WhatsApp opens."}</small></label>
        <label className={styles.formWide}>Message<textarea name="message" value={values.message} onChange={update} rows="3" placeholder="Function, process, current product or technical requirement" /></label>
        <label className={`${styles.formWide} ${styles.consent}`}><input name="consent" checked={values.consent} onChange={update} type="checkbox" required /><span>I consent to Vikranth using these details to respond to this B2B enquiry.</span></label>
        <div className={`${styles.formWide} ${styles.formActions}`}><button type="button" onClick={() => setStep(1)}><ArrowLeft /> Back</button><button type="submit"><MessageCircle /> Continue in WhatsApp</button></div>
      </fieldset>}
      <small className={styles.formPrivacy}>Your details stay in this browser until you continue to WhatsApp. This website does not store the form submission.</small>
    </form>
  );
}