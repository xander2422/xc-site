'use client';

import { useState, useEffect } from "react";
import Image from "next/image";

const LINKS = [
  ["About", "#about"],
  ["Services", "#services"],
  ["Consulting", "#consult"],
  ["FAQ", "#faq"],
  ["Contact", "#contact"],
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
      <div className="container nav-inner">
        <a href="#top" className="nav-logo" aria-label="Xander Cayetano, back to top" onClick={() => setOpen(false)}>
          <Image src="/logo-mark-black.png" alt="" width={26} height={32} priority />
          <span>Xander Cayetano</span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {LINKS.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>

        <a href="#consult" className="btn btn-dark btn-sm nav-cta">Book a call</a>

        <button
          className="nav-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span /><span />
        </button>
      </div>

      <div className="nav-mobile">
        {LINKS.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
        ))}
        <a href="#consult" className="btn btn-dark" onClick={() => setOpen(false)}>Book a call</a>
      </div>
    </header>
  );
}
