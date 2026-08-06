"use client";

import { ArrowRight, ShieldCheck } from "lucide-react";
import styles from "./contact.module.css";

export default function ContactForm() {
  const submit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `VCC enquiry - ${data.get("interest")}`;
    const body = [
      `Name: ${data.get("name")}`,
      `Company: ${data.get("company")}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone")}`,
      `Enquiry type: ${data.get("interest")}`,
      `Required quantity: ${data.get("quantity") || "Not specified"}`,
      `Delivery location: ${data.get("location") || "Not specified"}`,
      "",
      data.get("message"),
    ].join("\n");

    window.location.href = `mailto:vikranth.chemicals@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className={styles.form} onSubmit={submit} id="enquiry">
      <div className={styles.formHeading}>
        <span>Tell us what you need</span>
        <h2>Start an ingredient enquiry</h2>
        <p>Share the product, application, quantity and delivery location. Your email application will open with the details ready to send.</p>
      </div>
      <div className={styles.fieldRow}>
        <label>Full name<input name="name" placeholder="Your name" required /></label>
        <label>Company<input name="company" placeholder="Company name" required /></label>
      </div>
      <div className={styles.fieldRow}>
        <label>Work email<input name="email" type="email" placeholder="name@company.com" required /></label>
        <label>Phone number<input name="phone" type="tel" placeholder="+91" required /></label>
      </div>
      <label>What can we help with?
        <select name="interest" defaultValue="Product quotation">
          <option>Product quotation</option>
          <option>Sample request</option>
          <option>Product documentation</option>
          <option>Technical or application support</option>
          <option>Supplier enquiry</option>
          <option>General enquiry</option>
        </select>
      </label>
      <div className={styles.fieldRow}>
        <label>Required quantity<input name="quantity" placeholder="e.g. 500 kg" /></label>
        <label>Delivery location<input name="location" placeholder="City / PIN code" /></label>
      </div>
      <label>Message<textarea name="message" rows="5" placeholder="Product, grade, application and documents required" required /></label>
      <button type="submit">Prepare email <ArrowRight /></button>
      <small className={styles.privacy}><ShieldCheck /> Your details are used only for this enquiry.</small>
    </form>
  );
}