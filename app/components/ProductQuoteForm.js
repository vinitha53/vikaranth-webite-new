"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import styles from "../products/[slug]/product-landing.module.css";

export default function ProductQuoteForm({ product }) {
  const [values, setValues] = useState({ name: "", phone: "", quantity: "", city: "" });
  const update = (event) => setValues((current) => ({ ...current, [event.target.name]: event.target.value }));

  function submit(event) {
    event.preventDefault();
    const message = [
      `Hi, I need a quotation for ${product}.`,
      `Name: ${values.name}`,
      `Phone: ${values.phone}`,
      `Quantity: ${values.quantity || "To be discussed"}`,
      `Delivery city: ${values.city || "To be discussed"}`,
    ].join("\n");
    window.open(`https://wa.me/918754442924?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      <label>Your name<input name="name" value={values.name} onChange={update} autoComplete="name" placeholder="Enter your name" required /></label>
      <label>Phone / WhatsApp number<input name="phone" value={values.phone} onChange={update} type="tel" inputMode="tel" autoComplete="tel" placeholder="10-digit mobile number" required /></label>
      <label>Required quantity<input name="quantity" value={values.quantity} onChange={update} placeholder="e.g. 100 kg per month" /></label>
      <label>Delivery city<input name="city" value={values.city} onChange={update} autoComplete="address-level2" placeholder="e.g. Chennai" /></label>
      <button type="submit">Send request on WhatsApp <ArrowRight /></button>
      <small>This opens WhatsApp with your enquiry. The website does not store your form information.</small>
    </form>
  );
}
