"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, FileUp } from "lucide-react";
import styles from "./associate-detail.module.css";

const initial = { name: "", company: "", email: "", phone: "", city: "", product: "", application: "", grade: "", quantity: "", requiredDate: "", documents: "", sample: "No", message: "", consent: false };

export default function AssociateEnquiryForm({ supplier, products, whatsappNumber = "918754442924" }) {
  const [step, setStep] = useState(1);
  const [values, setValues] = useState(initial);
  const [fileName, setFileName] = useState("");
  const [sent, setSent] = useState(false);
  const update = ({ target }) => setValues((current) => ({ ...current, [target.name]: target.type === "checkbox" ? target.checked : target.value }));

  function next(event) {
    event.preventDefault();
    const form = event.currentTarget.form;
    if (!form.reportValidity()) return;
    setStep((current) => Math.min(3, current + 1));
  }

  function submit(event) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    const message = [
      `Supplier enquiry: ${supplier}`,
      `Name: ${values.name}`,
      `Company: ${values.company}`,
      `Work email: ${values.email}`,
      `Phone: ${values.phone}`,
      `Delivery city: ${values.city}`,
      `Product: ${values.product}`,
      `Application: ${values.application}`,
      `Preferred grade: ${values.grade || "To be discussed"}`,
      `Quantity: ${values.quantity}`,
      `Required date: ${values.requiredDate || "To be discussed"}`,
      `Documents: ${values.documents || "To be discussed"}`,
      `Sample required: ${values.sample}`,
      `Message: ${values.message || "None"}`,
      fileName ? `Reference file selected: ${fileName} (I will attach it in WhatsApp)` : "",
    ].filter(Boolean).join("\n");
    setSent(true);
    window.open("https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(message), "_blank", "noopener,noreferrer");
  }

  return (
    <form className={styles.enquiryForm} onSubmit={submit} data-associate-reveal="right">
      <input type="hidden" name="supplier" value={supplier} />
      <input type="hidden" name="analytics_source" value="associate-detail-page" />
      <div className={styles.formProgress} aria-label={`Step ${step} of 3`}><span style={{ width: `${step * 33.333}%` }} /><b>Step {step} of 3</b></div>

      {step === 1 && <fieldset><legend>Your business details</legend><div className={styles.fieldGrid}>
        <label>Name<input name="name" value={values.name} onChange={update} autoComplete="name" required /></label>
        <label>Company<input name="company" value={values.company} onChange={update} autoComplete="organization" required /></label>
        <label>Work email<input name="email" type="email" value={values.email} onChange={update} autoComplete="email" required /></label>
        <label>Phone<input name="phone" type="tel" value={values.phone} onChange={update} autoComplete="tel" required /></label>
        <label className={styles.fullField}>Delivery city<input name="city" value={values.city} onChange={update} autoComplete="address-level2" required /></label>
      </div><button className={styles.nextButton} type="button" onClick={next}>Product requirement <ArrowRight /></button></fieldset>}

      {step === 2 && <fieldset><legend>Product requirement</legend><div className={styles.fieldGrid}>
        <label>Supplier or brand<input value={supplier} readOnly /></label>
        <label>Product<select name="product" value={values.product} onChange={update} required><option value="">Select a product</option>{products.map((product) => <option key={product} value={product}>{product}</option>)}</select></label>
        <label>Application<input name="application" value={values.application} onChange={update} placeholder="e.g. cake, beverage, gelato" required /></label>
        <label>Preferred grade<input name="grade" value={values.grade} onChange={update} placeholder="If known" /></label>
        <label>Required quantity<input name="quantity" value={values.quantity} onChange={update} placeholder="e.g. 100 kg/month" required /></label>
        <label>Required date<input name="requiredDate" type="date" value={values.requiredDate} onChange={update} /></label>
      </div><div className={styles.formButtons}><button type="button" onClick={() => setStep(1)}><ArrowLeft /> Back</button><button className={styles.nextButton} type="button" onClick={next}>Documents & submit <ArrowRight /></button></div></fieldset>}

      {step === 3 && <fieldset><legend>Documents and sample</legend><div className={styles.fieldGrid}>
        <label>Documentation needed<input name="documents" value={values.documents} onChange={update} placeholder="Specification, COA, SDS, allergen..." /></label>
        <label>Sample requirement<select name="sample" value={values.sample} onChange={update}><option>No</option><option>Yes</option><option>To be discussed</option></select></label>
        <label className={styles.fullField}>Message<textarea name="message" value={values.message} onChange={update} rows="4" /></label>
        <label className={`${styles.fullField} ${styles.fileField}`}><FileUp /> Reference file<input type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png" onChange={(event) => setFileName(event.target.files?.[0]?.name || "")} /><span>{fileName || "Choose a specification or reference file"}</span><small>The file stays on your device. Attach it manually after WhatsApp opens.</small></label>
        <label className={`${styles.fullField} ${styles.consent}`}><input name="consent" type="checkbox" checked={values.consent} onChange={update} required /><span>I consent to Vikranth using these details to respond to this B2B enquiry.</span></label>
      </div><div className={styles.formButtons}><button type="button" onClick={() => setStep(2)}><ArrowLeft /> Back</button><button className={styles.submitButton} type="submit">Send on WhatsApp <ArrowRight /></button></div></fieldset>}
      <div className={`${styles.success} ${sent ? styles.successVisible : ""}`} role="status" aria-live="polite"><Check /> Enquiry prepared. WhatsApp is opening.</div>
    </form>
  );
}
