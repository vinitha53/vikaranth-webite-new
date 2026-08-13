"use client";

import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle, LockKeyhole } from "lucide-react";
import { useForm } from "react-hook-form";
import styles from "./contact.module.css";

const prompts = {
  name: "Nice to meet you! What should we call you?",
  email: "We’ll keep this safe — promise.",
  phone: "Add a number if you’d like us to call.",
  subject: "What can our ingredient team help with?",
  message: "Take your time, I’m listening.",
};

export default function ContactForm({ onMascotState = () => {}, onSubmit: submitHandler }) {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, setValue, trigger, formState: { errors, isValid, isSubmitting } } = useForm({
    mode: "onChange",
    defaultValues: { name: "", email: "", phone: "", subject: "", message: "", consent: false },
  });

  useEffect(() => {
    const product = new URLSearchParams(window.location.search).get("product")?.trim().slice(0, 80);
    if (product) {
      setValue("subject", "Product / quotation", { shouldValidate: true });
      setValue("message", `I would like to enquire about ${product}.`, { shouldValidate: true });
    }
  }, [setValue]);

  useEffect(() => {
    if (isSubmitting) onMascotState("thinking", "One moment — I’m preparing your message.");
  }, [isSubmitting, onMascotState]);

  const focus = (field) => onMascotState(field === "message" ? "listening" : field === "name" ? "name" : "trackingRight", prompts[field]);
  const type = (field, value) => onMascotState(value.length % 8 < 4 ? "trackingLeft" : "trackingRight", prompts[field]);
  const blur = async (field) => {
    const valid = await trigger(field);
    onMascotState(valid ? "approved" : "error", valid ? "Perfect — that looks good!" : field === "email" ? "Hmm, that email looks a little off." : "Could you check that field for me?");
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
      onMascotState("success", "Got it! We’ll be in touch soon.");
      if (!submitHandler) {
        const subject = `VCC contact enquiry - ${data.subject}`;
        const body = [`Name: ${data.name}`, `Email: ${data.email}`, `Phone: ${data.phone || "Not provided"}`, `Reason: ${data.subject}`, "", data.message].join("\n");
        window.setTimeout(() => { window.location.href = `mailto:vikranth.chemicals@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`; }, 650);
      }
    } catch {
      onMascotState("error", "Something interrupted us. Please retry or call the Vikranth team.");
    }
  };

  return (
    <div className={styles.clipboardWrap}>
      <div className={styles.clipGraphic}><i /><i /></div>
      <form className={`${styles.form} ${styles.chocolateForm}`} onSubmit={handleSubmit(submit)} id="enquiry" noValidate>
        {submitted && <div className={styles.successNotice} role="status" aria-live="polite"><CheckCircle2 /><span><b>Got it!</b>We&apos;ll be in touch soon.</span></div>}

        <label>Full name <sup>*</sup><input placeholder="Your name" {...bind("name", { required: "Please enter your name", minLength: { value: 2, message: "Please enter at least 2 characters" } })} />{errors.name && <small id="name-error" className={styles.fieldError}>{errors.name.message}</small>}<i className={styles.validTick}>✓</i></label>
        <label>Email address <sup>*</sup><input type="email" placeholder="name@company.com" {...bind("email", { required: "Please enter your email", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Please enter a valid email address" } })} />{errors.email && <small id="email-error" className={styles.fieldError}>{errors.email.message}</small>}<i className={styles.validTick}>✓</i></label>
        <label>Phone number <small className={styles.optional}>Optional</small><input type="tel" inputMode="tel" placeholder="+91 98765 43210" {...bind("phone", { pattern: { value: /^[0-9 ()+-]{7,18}$|^$/, message: "Please enter a valid phone number" } })} />{errors.phone && <small id="phone-error" className={styles.fieldError}>{errors.phone.message}</small>}</label>
        <label>Reason for contact <sup>*</sup><select defaultValue="" {...bind("subject", { required: "Please choose a reason" })}><option value="" disabled>Select a reason</option><option>General enquiry</option><option>Product / quotation</option><option>Technical support</option><option>Partnership</option><option>Feedback</option></select>{errors.subject && <small id="subject-error" className={styles.fieldError}>{errors.subject.message}</small>}<i className={styles.validTick}>✓</i></label>
        <label>Message <sup>*</sup><textarea rows="6" placeholder="Tell us about your requirement…" {...bind("message", { required: "Please enter your message", minLength: { value: 12, message: "Please add a little more detail" } })} />{errors.message && <small id="message-error" className={styles.fieldError}>{errors.message.message}</small>}<i className={styles.validTick}>✓</i></label>

        <label className={styles.consent}><input type="checkbox" aria-describedby={errors.consent ? "consent-error" : undefined} {...register("consent", { required: "Please confirm that we may contact you" })} /><span>I agree to be contacted regarding my enquiry. <sup>*</sup></span></label>
        {errors.consent && <small id="consent-error" className={styles.fieldError}>{errors.consent.message}</small>}
        <button type="submit" className={styles.chocolateButton} disabled={!isValid || isSubmitting}>{isSubmitting ? <><LoaderCircle className={styles.submitSpinner} /> Sending…</> : <>Send message <ArrowRight /></>}</button>
        <small className={styles.privacy}><LockKeyhole /> Your details are safe with us.</small>
      </form>
    </div>
  );
}
