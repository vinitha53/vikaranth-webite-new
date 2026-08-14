"use client";
import Link from "next/link";
import Image from "next/image";
import {useState} from "react";
import {ArrowRight,BadgeCheck,Mail,MapPin,Menu,Phone,X} from "lucide-react";
import GlobalSearch from "./GlobalSearch";
import styles from "./detail.module.css";
const UtilitySet=({hidden=false})=><div className={styles.utilitySet} aria-hidden={hidden||undefined}><span><BadgeCheck/> B2B Food Ingredient Supplier</span><span><MapPin/> Chennai</span><span>Serving businesses across India</span><a href="tel:+918754442924"><Phone/> +91 87544 42924</a><a href="mailto:vikranth.chemicals@gmail.com"><Mail/> vikranth.chemicals@gmail.com</a></div>;
export default function DetailHeaderClient(){const[open,setOpen]=useState(false);return <><div className={styles.utility}><div className={styles.utilityViewport}><div className={styles.utilityTrack}><UtilitySet/><UtilitySet hidden/></div></div></div><header className={styles.header}><div className={styles.headerInner}><Link className={styles.brand} href="/"><Image src="/logo-vikranth.png" width={190} height={72} alt="Vikranth Chemical Corporation"/></Link><nav className={open?styles.navOpen:""}><Link href="/">Home</Link><Link href="/about">About</Link><Link href="/products">Products</Link><Link href="/industries">Industries</Link><Link href="/associates">Suppliers</Link><Link href="/#insights">Blog</Link><Link href="/contact">Contact</Link></nav><GlobalSearch onOpen={()=>setOpen(false)}/><Link className={styles.quote} href="/contact#enquiry">Request a Quote <ArrowRight/></Link><button suppressHydrationWarning className={styles.menuButton} onClick={()=>setOpen(value=>!value)} aria-label="Toggle navigation" aria-expanded={open}>{open?<X/>:<Menu/>}</button></div></header></>}
