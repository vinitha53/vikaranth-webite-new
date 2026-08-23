"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  CircleHelp,
  LoaderCircle,
  LockKeyhole,
  Mail,
  MessageSquareText,
  Phone,
  UserRound,
} from "lucide-react";
import { useForm } from "react-hook-form";
import styles from "./contact.module.css";

const prompts = {
  name: "Nice to meet you! What should we call you?",
  email: "We'll keep this safe, promise.",
  phone: "Add a number if you'd like us to call.",
  subject: "What can our ingredient team help with?",
  message: "Take your time, I'm listening.",
};

export default function ContactForm({ onMascotState = () => {}, onSubmit: submitHandler }) {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, setValue, trigger, formState: { errors, isValid, isSubmitting } } = useForm({
    mode: "onChange",
    defaultValues: { name: "", company: "", email: "", phone: "", subject: "", product: "", grade: "", application: "", quantity: "", packSize: "", delivery: "", requiredDate: "", sample: false, documents: "", message: "", consent: false },
  });

  useEffect(() => {
    const product = new URLSearchParams(window.location.search).get("product")?.trim().slice(0, 80);
    if (product) {
      setValue("subject", "Product / quotation", { shouldValidate: true });
      setValue("message", `I would like to enquire about ${product}.`, { shouldValidate: true });
    }
  }, [setValue]);

  useEffect(() => {
    if (isSubmitting) onMascotState("thinking", "One moment, I'm preparing your message.");
  }, [isSubmitting, onMascotState]);

  const focus = (field) => onMascotState(field === "message" ? "listening" : field === "name" ? "name" : "trackingRight", prompts[field]);
  const type = (field, value) => onMascotState(value.length % 8 < 4 ? "trackingLeft" : "trackingRight", prompts[field]);
  const blur = async (field) => {
    const valid = await trigger(field);
    onMascotState(valid ? "approved" : "error", valid ? "Perfect, that looks good!" : field === "email" ? "Hmm, that email looks a little off." : "Could you check that field for me?");
  };

  const bind = (name, rules) => {
    const registration = register(name, rules);
    return {
      ...registration,
      onFocus: () => focus(name),
      onBlur: async (event) => { registration.onBlur(event); await blur(name); },
      onChange: (event) => { registration.onChange(event); type(name, event.target.value); },
      "aria-invalid": Boolean(errors[name]),
      "aria-describedby": errors[name] ? `${name}-error` : undefined,
    };
  };

  const submit = async (data) => {
    try {
      if (submitHandler) await submitHandler(data);
      else await new Promise((resolve) => window.setTimeout(resolve, 650));
      setSubmitted(true);
      onMascotState("success", "Got it! We'll be in touch soon.");
      if (!submitHandler) {
        const subject = `VCC contact enquiry - ${data.subject}`;
        const body = [`Name: ${data.name}`, `Company: ${data.company}`, `Email: ${data.email}`, `Phone: ${data.phone || "Not provided"}`, `Reason: ${data.subject}`, `Ingredient: ${data.product}`, `Manufacturer / grade: ${data.grade || "Not specified"}`, `Application: ${data.application}`, `Quantity: ${data.quantity}`, `Preferred pack: ${data.packSize || "Not specified"}`, `Delivery location: ${data.delivery}`, `Required date: ${data.requiredDate || "Not specified"}`, `Sample requested: ${data.sample ? "Yes" : "No"}`, `Documents: ${data.documents || "Not specified"}`, "", data.message].join("\n");
        window.setTimeout(() => { window.location.href = `mailto:vikranth.chemicals@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`; }, 650);
      }
    } catch {
      onMascotState("error", "Something interrupted us. Please retry or call the Vikranth team.");
    }
  };

  return (
    <div className={styles.enquiryFormShell}>
      <form suppressHydrationWarning className={`${styles.form} ${styles.professionalForm}`} onSubmit={handleSubmit(submit)} id="enquiry" noValidate>
        {submitted && (
          <div className={styles.successNotice} role="status" aria-live="polite">
            <CheckCircle2 />
            <span><b>Enquiry received</b>We&apos;ll be in touch soon.</span>
          </div>
        )}

        <section className={styles.enquiryFields} aria-labelledby="contact-details-heading">
          <div className={styles.formSectionTitle}>
            <span>01</span>
            <div><b id="contact-details-heading">Contact details</b><small>Tell us how we can reach you</small></div>
          </div>

          <div className={styles.professionalFieldGrid}>
            <label className={styles.professionalField}>
              <span className={styles.fieldLabel}>Full name <sup>*</sup></span>
              <span className={styles.fieldControl}>
                <UserRound aria-hidden="true" />
                <input suppressHydrationWarning id="contact-name" autoComplete="name" placeholder="Your name" {...bind("name", { required: "Please enter your name", minLength: { value: 2, message: "Please enter at least 2 characters" } })} />
                <Check className={styles.validTick} aria-hidden="true" />
              </span>
              {errors.name && <small id="name-error" className={styles.fieldError}>{errors.name.message}</small>}
            </label>

            <label className={styles.professionalField}>
              <span className={styles.fieldLabel}>Company name <sup>*</sup></span>
              <span className={styles.fieldControl}>
                <UserRound aria-hidden="true" />
                <input id="contact-company" autoComplete="organization" placeholder="Your company" {...bind("company", { required: "Please enter your company name", minLength: { value: 2, message: "Please enter at least 2 characters" } })} />
                <Check className={styles.validTick} aria-hidden="true" />
              </span>
              {errors.company && <small id="company-error" className={styles.fieldError}>{errors.company.message}</small>}
            </label>

            <label className={styles.professionalField}>
              <span className={styles.fieldLabel}>Email address <sup>*</sup></span>
              <span className={styles.fieldControl}>
                <Mail aria-hidden="true" />
                <input suppressHydrationWarning id="contact-email" type="email" autoComplete="email" placeholder="name@company.com" {...bind("email", { required: "Please enter your email", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Please enter a valid email address" } })} />
                <Check className={styles.validTick} aria-hidden="true" />
              </span>
              {errors.email && <small id="email-error" className={styles.fieldError}>{errors.email.message}</small>}
            </label>

            <label className={styles.professionalField}>
              <span className={styles.fieldLabel}>Phone number <small>Optional</small></span>
              <span className={styles.fieldControl}>
                <Phone aria-hidden="true" />
                <input suppressHydrationWarning id="contact-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+91 98765 43210" {...bind("phone", { pattern: { value: /^[0-9 ()+-]{7,18}$|^$/, message: "Please enter a valid phone number" } })} />
              </span>
              {errors.phone && <small id="phone-error" className={styles.fieldError}>{errors.phone.message}</small>}
            </label>

            <label className={styles.professionalField}>
              <span className={styles.fieldLabel}>Reason for contact <sup>*</sup></span>
              <span className={styles.fieldControl}>
                <CircleHelp aria-hidden="true" />
                <select suppressHydrationWarning id="contact-subject" defaultValue="" {...bind("subject", { required: "Please choose a reason" })}>
                  <option value="" disabled>Select a reason</option>
                  <option>General enquiry</option>
                  <option>Product / quotation</option>
                  <option>Technical support</option>
                  <option>Feedback</option>
                </select>
                <Check className={styles.validTick} aria-hidden="true" />
              </span>
              {errors.subject && <small id="subject-error" className={styles.fieldError}>{errors.subject.message}</small>}
            </label>
          </div>
        </section>

        <section className={styles.enquiryFields} aria-labelledby="requirement-heading">
          <div className={styles.formSectionTitle}>
            <span>02</span>
            <div><b id="requirement-heading">Your requirement</b><small>Product, application, quantity or support needed</small></div>
          </div>

          <div className={styles.professionalFieldGrid}>
            <label className={styles.professionalField}>
              <span className={styles.fieldLabel}>Ingredient or product <sup>*</sup></span>
              <span className={styles.fieldControl}><MessageSquareText aria-hidden="true" /><input id="contact-product" placeholder="e.g. Cocoa powder" {...bind("product", { required: "Please enter an ingredient or product" })} /><Check className={styles.validTick} aria-hidden="true" /></span>
              {errors.product && <small id="product-error" className={styles.fieldError}>{errors.product.message}</small>}
            </label>
            <label className={styles.professionalField}>
              <span className={styles.fieldLabel}>Manufacturer or grade <small>If known</small></span>
              <span className={styles.fieldControl}><MessageSquareText aria-hidden="true" /><input id="contact-grade" placeholder="Brand, code or specification" {...bind("grade")} /></span>
            </label>
            <label className={styles.professionalField}>
              <span className={styles.fieldLabel}>Finished-product application <sup>*</sup></span>
              <span className={styles.fieldControl}><MessageSquareText aria-hidden="true" /><input id="contact-application" placeholder="Cake, beverage, ice cream..." {...bind("application", { required: "Please enter the application" })} /><Check className={styles.validTick} aria-hidden="true" /></span>
              {errors.application && <small id="application-error" className={styles.fieldError}>{errors.application.message}</small>}
            </label>
            <label className={styles.professionalField}>
              <span className={styles.fieldLabel}>Required quantity and unit <sup>*</sup></span>
              <span className={styles.fieldControl}><MessageSquareText aria-hidden="true" /><input id="contact-quantity" placeholder="e.g. 500 kg" {...bind("quantity", { required: "Please enter the required quantity" })} /><Check className={styles.validTick} aria-hidden="true" /></span>
              {errors.quantity && <small id="quantity-error" className={styles.fieldError}>{errors.quantity.message}</small>}
            </label>
            <label className={styles.professionalField}>
              <span className={styles.fieldLabel}>Preferred pack size <small>Optional</small></span>
              <span className={styles.fieldControl}><MessageSquareText aria-hidden="true" /><input id="contact-pack" placeholder="e.g. 25 kg" {...bind("packSize")} /></span>
            </label>
            <label className={styles.professionalField}>
              <span className={styles.fieldLabel}>Delivery city and PIN code <sup>*</sup></span>
              <span className={styles.fieldControl}><MessageSquareText aria-hidden="true" /><input id="contact-delivery" autoComplete="postal-code" placeholder="City · 600000" {...bind("delivery", { required: "Please enter the delivery location" })} /><Check className={styles.validTick} aria-hidden="true" /></span>
              {errors.delivery && <small id="delivery-error" className={styles.fieldError}>{errors.delivery.message}</small>}
            </label>
            <label className={styles.professionalField}>
              <span className={styles.fieldLabel}>Required date <small>Optional</small></span>
              <span className={styles.fieldControl}><MessageSquareText aria-hidden="true" /><input id="contact-date" type="date" {...bind("requiredDate")} /></span>
            </label>
            <label className={styles.professionalField}>
              <span className={styles.fieldLabel}>Product documents <small>Optional</small></span>
              <span className={styles.fieldControl}><MessageSquareText aria-hidden="true" /><input id="contact-documents" placeholder="COA, TDS, SDS, allergen..." {...bind("documents")} /></span>
            </label>
          </div>

          <label className={styles.consent}>
            <input type="checkbox" {...register("sample")} />
            <span>I would like the team to check sample availability.</span>
          </label>

          <label className={`${styles.professionalField} ${styles.messageField}`}>
            <span className={styles.fieldLabel}>Message <sup>*</sup></span>
            <span className={styles.fieldControl}>
              <MessageSquareText aria-hidden="true" />
              <textarea suppressHydrationWarning id="contact-message" rows="5" placeholder="Tell us about your requirement..." {...bind("message", { required: "Please enter your message", minLength: { value: 12, message: "Please add a little more detail" } })} />
              <Check className={styles.validTick} aria-hidden="true" />
            </span>
            {errors.message && <small id="message-error" className={styles.fieldError}>{errors.message.message}</small>}
          </label>
          <small className={styles.privacy}><LockKeyhole /> Do not include confidential formulations, passwords, payment-card information or sensitive personal data.</small>
        </section>

        <div className={styles.formSubmitArea}>
          <div>
            <label className={styles.consent}>
              <input suppressHydrationWarning type="checkbox" aria-describedby={errors.consent ? "consent-error" : undefined} {...register("consent", { required: "Please confirm that we may contact you" })} />
              <span>I have read the <a href="/privacy/">Privacy Policy</a> and agree that Vikranth may use this information to respond to my business enquiry. <sup>*</sup></span>
            </label>
            {errors.consent && <small id="consent-error" className={styles.fieldError}>{errors.consent.message}</small>}
            <small className={styles.privacy}><LockKeyhole /> Your details stay private and secure.</small>
          </div>
          <button suppressHydrationWarning type="submit" className={styles.professionalSubmit} disabled={isSubmitting}>
            {isSubmitting ? <><LoaderCircle className={styles.submitSpinner} /> Sending...</> : <>Send enquiry <ArrowRight /></>}
          </button>
        </div>
        <span className={styles.formLive} aria-live="polite">{isValid ? "Form is ready to submit" : "Please complete all required fields"}</span>
      </form>
    </div>
  );
}
