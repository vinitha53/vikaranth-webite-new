"use client";

import { usePathname, useRouter } from "next/navigation";

export default function FloatingIconDock() {
  const pathname = usePathname();
  const router = useRouter();

  const openChatbot = () => {
    if (pathname === "/") {
      document.querySelector(".header-quote")?.click();
      return;
    }

    router.push("/contact/#enquiry");
  };

  return (
    <>
      <div className="floating-site-dock" role="navigation" aria-label="Quick contact and social media">
        <a className="floating-site-button" href="https://www.facebook.com/search/top?q=Vikranth%20Chemical%20Corporation" target="_blank" rel="noreferrer" aria-label="Find Vikranth Chemical Corporation on Facebook">
          <img src="/floating-icons/facebook.png" alt="" width="70" height="70" decoding="async" />
        </a>
        <a className="floating-site-button" href="https://www.instagram.com/explore/search/keyword/?q=vikranth%20chemical%20corporation" target="_blank" rel="noreferrer" aria-label="Find Vikranth Chemical Corporation on Instagram">
          <img src="/floating-icons/instagram.png" alt="" width="70" height="70" decoding="async" />
        </a>
        <a className="floating-site-button" href="https://in.linkedin.com/company/vikranth-chemical-corporation" target="_blank" rel="noreferrer" aria-label="Visit Vikranth Chemical Corporation on LinkedIn">
          <img src="/floating-icons/linkedin.png" alt="" width="70" height="70" decoding="async" />
        </a>
        <a className="floating-site-button" href="https://wa.me/918754442924" target="_blank" rel="noreferrer" aria-label="Chat with Vikranth on WhatsApp">
          <img src="/whatsapp-branded.png" alt="" width="70" height="70" decoding="async" />
        </a>
        <a className="floating-site-button" href="tel:+918754442924" aria-label="Call Vikranth Chemical Corporation">
          <img src="/floating-icons/phone.png" alt="" width="70" height="70" decoding="async" />
        </a>
      </div>
      <button className="floating-site-button floating-site-chatbot" type="button" onClick={openChatbot} aria-label="Open ingredient chatbot">
        <img src="/chatbot-chef.png" alt="" width="70" height="70" decoding="async" />
      </button>
    </>
  );
}
