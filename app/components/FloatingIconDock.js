"use client";

import { useEffect, useRef, useState } from "react";

const quickQuestions = [
  "Find an ingredient",
  "Request a quote",
  "Talk to our team",
];

const answers = {
  "Find an ingredient": "Tell us the finished product you make, such as bread, chocolate, beverages or dairy. We will help you narrow the suitable ingredient family.",
  "Request a quote": "Please share the ingredient name, required quantity and delivery city. Our team will confirm the suitable grade, pack size and availability.",
  "Talk to our team": "You can call us on +91 87544 42924 or send your requirement through the enquiry form. Our B2B team will respond with the next step.",
};

export default function FloatingIconDock() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([{ from: "bot", text: "Hello! I'm Vikranth's ingredient assistant. How can we help with your food ingredient requirement?" }]);
  const [draft, setDraft] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (chatOpen) {
      inputRef.current?.focus();
    }
  }, [chatOpen]);

  const addMessage = (text) => {
    const value = text.trim();
    if (!value) return;
    setMessages((current) => [...current, { from: "user", text: value }, { from: "bot", text: answers[value] || "Thanks for sharing your requirement. Please include the finished product, ingredient needed, quantity and delivery city. Our B2B team will guide you with the practical next step." }]);
    setDraft("");
  };

  return (
    <>
      <div className="floating-site-dock" role="navigation" aria-label="Quick contact and social media">
        <a className="floating-site-button" href="https://www.facebook.com/search/top?q=Vikranth%20Chemical%20Corporation" target="_blank" rel="noreferrer" aria-label="Find Vikranth Chemical Corporation on Facebook"><img src="/floating-icons/facebook.png" alt="" width="70" height="70" decoding="async" /></a>
        <a className="floating-site-button" href="https://www.instagram.com/explore/search/keyword/?q=vikranth%20chemical%20corporation" target="_blank" rel="noreferrer" aria-label="Find Vikranth Chemical Corporation on Instagram"><img src="/floating-icons/instagram.png" alt="" width="70" height="70" decoding="async" /></a>
        <a className="floating-site-button" href="https://in.linkedin.com/company/vikranth-chemical-corporation" target="_blank" rel="noreferrer" aria-label="Visit Vikranth Chemical Corporation on LinkedIn"><img src="/floating-icons/linkedin.png" alt="" width="70" height="70" decoding="async" /></a>
        <a className="floating-site-button" href="https://wa.me/918754442924" target="_blank" rel="noreferrer" aria-label="Chat with Vikranth on WhatsApp"><img src="/whatsapp-branded.png" alt="" width="70" height="70" decoding="async" /></a>
        <a className="floating-site-button" href="tel:+918754442924" aria-label="Call Vikranth Chemical Corporation"><img src="/floating-icons/phone.png" alt="" width="70" height="70" decoding="async" /></a>
      </div>

      {chatOpen && <section className="ingredient-chat-panel" role="dialog" aria-modal="false" aria-label="Vikranth ingredient chatbot">
        <header><div><span>VCC Ingredient Assistant</span><small>Online · B2B support</small></div><button type="button" onClick={() => setChatOpen(false)} aria-label="Close chatbot">×</button></header>
        <div className="ingredient-chat-messages" aria-live="polite">{messages.map((message, index) => <p className={message.from} key={`${message.from}-${index}`}>{message.text}</p>)}</div>
        <div className="ingredient-chat-quick">{quickQuestions.map((question) => <button type="button" key={question} onClick={() => addMessage(question)}>{question}</button>)}</div>
        <form onSubmit={(event) => { event.preventDefault(); addMessage(draft); }}><input ref={inputRef} value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Type your requirement..." aria-label="Your ingredient requirement" /><button type="submit">Send</button></form>
      </section>}

      <button className="floating-site-button floating-site-chatbot" type="button" onClick={() => setChatOpen((open) => !open)} aria-label={chatOpen ? "Close ingredient chatbot" : "Open ingredient chatbot"} aria-expanded={chatOpen}>
        <img src="/chatbot-chef.png" alt="" width="70" height="70" decoding="async" />
      </button>
    </>
  );
}
