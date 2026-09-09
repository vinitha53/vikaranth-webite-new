import Link from "next/link";
import { ArrowRight, Building2, Store, ShoppingBag, MapPin } from "lucide-react";
import { business } from "../data/business";
import styles from "./buyer-support.module.css";

const buyers = [
  { icon: Building2, title: "Manufacturers & wholesale buyers", text: "Plan bulk purchases and repeat supply. Share your grade, monthly volume, delivery schedule and document requirements.", type: "Bulk/Business", link: "Discuss bulk supply" },
  { icon: Store, title: "Bakeries & growing businesses", text: "Source ingredients for your bakery, café, restaurant or new food business. Ask about available packs for your batch size.", type: "Wholesale", link: "Find your pack size" },
  { icon: ShoppingBag, title: "Home bakers & personal buyers", text: "Have a smaller requirement? Tell us what you need. We’ll confirm suitable products, pack sizes and minimum quantities.", type: "Retail/Small Quantity", link: "Ask about a small order" },
];

export default function BuyerSupport() {
  return <section className={styles.section} aria-labelledby="buyer-support-title">
    <div className={styles.heading}><div><span>Ingredients for your next step</span><h2 id="buyer-support-title">From your first batch<br/>to your next production run.</h2></div><p>Commercial sourcing is our focus. Whether you buy for a factory, a growing business or your own kitchen, our Chennai team can help you check the right supply option.</p></div>
    <div className={styles.grid}>{buyers.map(({ icon: Icon, title, text, type, link }, index) => <article key={title}><div className={styles.cardTop}><Icon aria-hidden="true"/><span>0{index + 1}</span></div><h3>{title}</h3><p>{text}</p><Link href={`/contact/?buyer=${encodeURIComponent(type)}#enquiry`}>{link}<ArrowRight aria-hidden="true"/></Link></article>)}</div>
    <div className={styles.coverage}><MapPin aria-hidden="true"/><p>{business.coverage}</p><Link href="/products/">Explore ingredients <ArrowRight aria-hidden="true"/></Link></div>
  </section>;
}
