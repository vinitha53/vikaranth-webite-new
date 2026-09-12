"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import styles from "../products/[slug]/product-landing.module.css";

const initialValues = {
  name: "",
  company: "",
  buyerType: "Business / bulk",
  email: "",
  phone: "",
  city: "",
};

export default function ProductQuoteForm({ product }) {
  const [values, setValues] = useState(initialValues);
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const reference = useMemo(() => `VCC-${product.replace(/[^a-z0-9]/gi, "").slice(0, 5).toUpperCase()}-${Date.now().toString().slice(-6)}`, [product]);

  const update = ({ target }) => {
    setValues((current) => ({ ...current, [target.name]: target.value }));
  };

  async function submit(event) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setIsSending(true);
    setSubmitError("");
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: `Product quote - ${product}`,
          name: values.name,
          email: values.email,
          details: {
            Reference: reference,
            Product: product,
            "Buyer type": values.buyerType,
            Company: values.company || "Personal purchase",
            "Phone / WhatsApp": values.phone,
            "Delivery city / PIN": values.city,
          },
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to send enquiry");
      setSubmitted(true);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSending(false);
    }
  }

  if (submitted) return (
    <div className={styles.formSuccess} role="status" aria-live="polite">
      <span><Check /></span>
      <small>Enquiry sent</small>
      <h3>Thank you. Your product enquiry has been emailed to our team.</h3>
      <p>Keep this reference number for follow-up:</p>
      <strong>{reference}</strong>
      <button type="button" onClick={() => setSubmitted(false)}>Send another enquiry</button>
    </div>
  );

  return (
    <form className={styles.form} onSubmit={submit} data-product={product} data-enquiry-source="product-page">
      <div className={styles.formProgress} aria-label="Single-step enquiry form">
        <div><span style={{ width: "100%" }} /></div><b>Enquiry form</b>
      </div>

      <fieldset className={styles.formStep}>
        <legend>Contact and delivery details</legend>
        <label className={styles.formWide}>Buying for<select name="buyerType" value={values.buyerType} onChange={update}><option>Business / bulk</option><option>Small business / home bakery</option><option>Personal use / small quantity</option></select></label>
        <label>Your name<input name="name" value={values.name} onChange={update} autoComplete="name" placeholder="Enter your name" required /></label>
        <label>Company / business (optional)<input name="company" value={values.company} onChange={update} autoComplete="organization" placeholder="Business name, if applicable" /></label>
        <label>Email address<input name="email" value={values.email} onChange={update} type="email" autoComplete="email" placeholder="Your email address" required /></label>
        <label>Phone / WhatsApp<input name="phone" value={values.phone} onChange={update} type="tel" inputMode="tel" autoComplete="tel" placeholder="10-digit mobile number" required /></label>
        <label className={styles.formWide}>Delivery city / PIN<input name="city" value={values.city} onChange={update} autoComplete="postal-code" placeholder="e.g. Chennai 600001" required /></label>
        {submitError && <p className={styles.formWide} role="alert">{submitError}</p>}
        <button className={styles.formNext} type="submit" disabled={isSending}>{isSending ? "Sending..." : "Submit enquiry"} <ArrowRight /></button>
      </fieldset>
      <small className={styles.formPrivacy}>Your details are emailed securely to the Vikranth team and are used only to respond to this enquiry.</small>
    </form>
  );
}
