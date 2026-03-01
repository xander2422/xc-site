'use client';

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const CREAM = "#EDE8D0";
const BLACK = "#0A0A0A";
const DARK_CARD = "#131313";
const CREAM_DIM = "#8A8578";
const CREAM_MID = "#B5B0A0";
const BORDER = "rgba(237,232,208,0.1)";

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const useInView = (threshold = 0.12) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
};

const FadeIn = ({ children, delay = 0, distance = 36, duration = 0.7, style = {} }) => {
  const [ref, inView] = useInView(0.15);
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : `translateY(${distance}px)`,
      transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
};

/* ============ NAV ============ */
const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const links = [
    ["Journey", "journey"], ["Services", "services"], ["Results", "results"],
    ["FAQ", "faq"], ["Pick My Brain", "consult"], ["Contact", "contact"],
  ];

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        padding: "0 clamp(24px,5vw,64px)", height: 68,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(10,10,10,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${BORDER}` : "1px solid transparent",
        transition: "all 0.35s ease",
      }}>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Scroll to top" style={{ cursor: "pointer", background: "none", border: "none", padding: 0 }}>
          <Image
            src="/logo-cream.png.webp"
            alt="XC"
            width={44}
            height={33}
            style={{ objectFit: "contain" }}
            priority
          />
        </button>

        {/* Desktop inline links */}
        <div className="nav-desktop-links" style={{
          display: "none", alignItems: "center", gap: 32,
        }}>
          {links.map(([label, id]) => (
            <button key={id}
              onClick={() => scrollTo(id)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", fontSize: 13,
                fontWeight: 400, color: CREAM_DIM, padding: 0,
                letterSpacing: "0.04em", transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => e.target.style.color = CREAM}
              onMouseLeave={(e) => e.target.style.color = CREAM_DIM}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button className="nav-hamburger" onClick={() => setOpen(!open)} style={{
          background: "none", border: "none", cursor: "pointer",
          display: "flex", flexDirection: "column", gap: open ? 0 : 5, padding: 8, zIndex: 300,
        }} aria-label="Menu">
          <span style={{ display: "block", width: 26, height: 1.5, background: CREAM, transition: "all 0.3s", transform: open ? "rotate(45deg) translateY(0.5px)" : "none" }} />
          <span style={{ display: "block", width: 26, height: 1.5, background: CREAM, transition: "all 0.3s", opacity: open ? 0 : 1 }} />
          <span style={{ display: "block", width: 26, height: 1.5, background: CREAM, transition: "all 0.3s", transform: open ? "rotate(-45deg) translateY(-0.5px)" : "none", marginTop: open ? -1.5 : 0 }} />
        </button>
      </nav>

      {/* Mobile fullscreen menu overlay */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 250, background: "rgba(10,10,10,0.98)",
        backdropFilter: "blur(40px)",
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
        opacity: open ? 1 : 0, pointerEvents: open ? "all" : "none", transition: "opacity 0.35s ease",
      }}>
        {links.map(([label, id], i) => (
          <button key={id}
            onClick={() => { setOpen(false); setTimeout(() => scrollTo(id), 250); }}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 5vw, 48px)",
              fontWeight: 400, color: CREAM_MID, padding: "14px 0",
              transition: "all 0.3s ease", opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(16px)",
              transitionDelay: `${0.08 + i * 0.04}s`,
            }}
            onMouseEnter={(e) => { e.target.style.color = CREAM; e.target.style.fontStyle = "italic"; }}
            onMouseLeave={(e) => { e.target.style.color = CREAM_MID; e.target.style.fontStyle = "normal"; }}
          >
            {label}
          </button>
        ))}
      </div>
    </>
  );
};

/* ============ HERO ============ */
const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const heroRef = useRef(null);
  const taglineRef = useRef(null);
  const nameRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          const y = window.scrollY;
          if (taglineRef.current) taglineRef.current.style.transform = `translateY(${y * 0.15}px)`;
          if (nameRef.current) nameRef.current.style.transform = `translateY(${y * 0.04}px)`;
          if (descRef.current) descRef.current.style.transform = `translateY(${y * 0.22}px)`;
          if (ctaRef.current) ctaRef.current.style.transform = `translateY(${y * 0.3}px)`;
          if (lineRef.current) lineRef.current.style.transform = `translateX(-50%) translateY(${y * 0.35}px)`;
          ticking = false;
        });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMouse({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  return (
    <section ref={heroRef} onMouseMove={handleMouseMove} style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center", textAlign: "center",
      padding: "140px clamp(24px,6vw,80px) 100px", position: "relative",
      overflow: "hidden",
    }}>
      {/* Cursor-following gradient glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: `radial-gradient(600px circle at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(237,232,208,0.035) 0%, transparent 60%)`,
        transition: "background 0.3s ease",
      }} />

      <p ref={taglineRef} style={{
        color: CREAM_DIM, fontSize: "clamp(10px, 1.8vw, 13px)", letterSpacing: "clamp(0.12em, 1.5vw, 0.25em)", textTransform: "uppercase",
        fontFamily: "'DM Sans', sans-serif", fontWeight: 400, marginBottom: 40,
        opacity: loaded ? 1 : 0,
        transition: loaded ? "opacity 0s" : "all 0.8s ease 0.2s", whiteSpace: "nowrap",
        position: "relative", zIndex: 1,      }}>
        Entrepreneur · Growth Strategist · Builder
      </p>

      <h1 ref={nameRef} style={{
        fontFamily: "'Playfair Display', serif", fontSize: "clamp(56px, 10vw, 130px)",
        fontWeight: 700, color: CREAM, lineHeight: 1.0, letterSpacing: "-0.02em",
        opacity: loaded ? 1 : 0,
        transition: loaded ? "opacity 0s" : "all 0.9s ease 0.35s",
        position: "relative", zIndex: 1,      }}>
        Xander<br />Cayetano
      </h1>

      <p ref={descRef} style={{
        color: CREAM_MID, fontSize: "clamp(16px, 1.5vw, 19px)", maxWidth: 600,
        lineHeight: 1.7, marginTop: 36, fontFamily: "'DM Sans', sans-serif", fontWeight: 400,
        opacity: loaded ? 1 : 0,
        transition: loaded ? "opacity 0s" : "all 0.9s ease 0.5s",
        position: "relative", zIndex: 1,      }}>
        Marketing systems that drive real revenue. Built from scratch, proven across 10+ industries. Now building the future of growth with Revvoo.
      </p>

      <div ref={ctaRef} className="hero-cta-group" style={{
        display: "flex", gap: 16, marginTop: 52, flexWrap: "wrap", justifyContent: "center",
        opacity: loaded ? 1 : 0,
        transition: loaded ? "opacity 0s" : "all 0.9s ease 0.65s",
        position: "relative", zIndex: 1,      }}>
        <button onClick={() => scrollTo("consult")} style={{
          background: CREAM, color: BLACK, border: "none",
          padding: "20px 44px", fontSize: 13, fontWeight: 600,
          letterSpacing: "0.1em", textTransform: "uppercase",
          cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
          display: "flex", alignItems: "center", gap: 10,
          transition: "all 0.3s ease", borderRadius: 6,
        }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#FFF"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(237,232,208,0.12)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = CREAM; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
        >
          Book a Consultation <span style={{ fontSize: 16 }}>→</span>
        </button>
        <button onClick={() => scrollTo("journey")} style={{
          background: "transparent", color: CREAM,
          border: `1px solid rgba(237,232,208,0.2)`,
          padding: "20px 44px", fontSize: 13, fontWeight: 500,
          letterSpacing: "0.1em", textTransform: "uppercase",
          cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
          transition: "all 0.3s ease", borderRadius: 6,
        }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = CREAM; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(237,232,208,0.2)"; e.currentTarget.style.transform = "translateY(0)"; }}
        >
          My Journey
        </button>
      </div>

      <div ref={lineRef} style={{
        position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
        opacity: loaded ? 0.3 : 0, transition: "opacity 1s ease 1.3s",
             }}>
        <div style={{ width: 1, height: 44, background: `linear-gradient(to bottom, ${CREAM_DIM}, transparent)` }} />
      </div>
    </section>
  );
};

/* ============ MARQUEE ============ */
const Marquee = () => {
  const brands = ["Harris Farms", "Revvoo", "Creative Electron", "Hero Ink Tattoo", "Madera Community College", "Milan Institute", "Strength Valley"];
  return (
    <div style={{
      borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`,
      padding: "28px 0", overflow: "hidden", position: "relative",
    }}>
      <div style={{
        display: "flex", gap: 80, whiteSpace: "nowrap",
        animation: "marquee 25s linear infinite",
        width: "max-content",
      }}>
        {[...brands, ...brands].map((b, i) => (
          <span key={i} style={{
            color: CREAM_DIM, fontSize: 14, letterSpacing: "0.2em",
            textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400, flexShrink: 0,
          }}>
            {b}
          </span>
        ))}
      </div>
    </div>
  );
};

/* ============ JOURNEY TIMELINE ============ */
const Journey = () => {
  const milestones = [
    { phase: "Early Days", title: "The Spark", desc: "Started learning the game. Studying marketing, sales psychology, and what actually makes businesses grow. Not theory. Real-world, hands-on testing." },
    { phase: "Building", title: "Xander Cayetano Consulting", desc: "Launched my consulting practice and started working with businesses across California. Built funnels, ran ads, created systems that delivered 10-30x ROAS for clients across 10+ industries." },
    { phase: "Scaling", title: "Creative Electron & Beyond", desc: "Worked with companies like Creative Electron and Harris Farms. Real businesses with real revenue goals. Helped build marketing infrastructure that drove measurable growth." },
    { phase: "Now", title: "Revvoo", desc: "Building Revvoo. A platform born from everything I've learned. Taking the systems, strategies, and frameworks that worked for clients and turning them into something bigger." },
  ];

  return (
    <section id="journey" style={{ padding: "100px clamp(24px,6vw,80px)", maxWidth: 900, margin: "0 auto" }}>
      <FadeIn distance={20} duration={0.6}>
        <p style={{ color: CREAM_DIM, fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 20, fontFamily: "'DM Sans', sans-serif" }}>
          My Journey
        </p>
      </FadeIn>
      <FadeIn delay={0.12} distance={50} duration={0.85}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 5vw, 58px)", fontWeight: 700, color: CREAM, lineHeight: 1.1, marginBottom: 56 }}>
          Built from scratch.<br />
          <span style={{ fontStyle: "italic", fontWeight: 400 }}>Proven in the real world.</span>
        </h2>
      </FadeIn>

      <FadeIn delay={0.25} distance={40} duration={0.8}>
        <div style={{
          position: "relative", maxWidth: 480, margin: "0 auto", marginBottom: 72,
        }}>
          <Image
            src="/Images/Xander-cayetano-marketer-growth-strategist.jpg"
            alt="Xander Cayetano"
            width={480}
            height={600}
            style={{
              width: "100%", height: "auto", display: "block",
              objectFit: "cover",
              mask: "radial-gradient(ellipse 70% 65% at 50% 40%, black 50%, transparent 100%)",
              WebkitMask: "radial-gradient(ellipse 70% 65% at 50% 40%, black 50%, transparent 100%)",
            }}
            sizes="(max-width: 480px) 100vw, 480px"
          />
        </div>
      </FadeIn>

      <div style={{ position: "relative", paddingLeft: 40 }}>
        <div style={{
          position: "absolute", left: 6, top: 8, bottom: 8,
          width: 1, background: `linear-gradient(to bottom, ${BORDER}, rgba(237,232,208,0.04))`,
        }} />

        {milestones.map((m, i) => (
          <FadeIn key={i} delay={0.1 + 0.12 * i} distance={44} duration={0.8} style={{ marginBottom: i < milestones.length - 1 ? 72 : 0, position: "relative" }}>
            <div style={{
              position: "absolute", left: -34, top: 6,
              width: 10, height: 10, borderRadius: "50%",
              background: CREAM_DIM, border: `2px solid ${BLACK}`,
            }} />
            <p style={{
              color: CREAM_DIM, fontSize: 11, letterSpacing: "0.2em",
              textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif",
              marginBottom: 10, fontWeight: 500,
            }}>
              {m.phase}
            </p>
            <h3 style={{
              fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px, 3vw, 32px)",
              fontWeight: 700, color: CREAM, lineHeight: 1.2, marginBottom: 14,
            }}>
              {m.title}
            </h3>
            <p style={{
              color: CREAM_MID, fontSize: 16, lineHeight: 1.75,
              fontFamily: "'DM Sans', sans-serif", fontWeight: 400, maxWidth: 680,
            }}>
              {m.desc}
            </p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

/* ============ SERVICES ============ */
const Services = () => {
  const items = [
    { num: "01", title: "Growth Strategy", desc: "Full-funnel marketing strategy designed to attract, convert, and retain customers predictably." },
    { num: "02", title: "Paid Advertising", desc: "High-performance ad campaigns across Meta, Google, and beyond. Built for ROI, not vanity metrics." },
    { num: "03", title: "Funnels & Systems", desc: "End-to-end sales funnels, automation, and CRM systems that turn leads into revenue on autopilot." },
    { num: "04", title: "Brand & Web", desc: "Websites, landing pages, and brand identities that look premium and convert like machines." },
  ];

  return (
    <section id="services" style={{ padding: "100px clamp(24px,6vw,80px)", maxWidth: 1100, margin: "0 auto" }}>
      <FadeIn distance={20} duration={0.6}>
        <p style={{ color: CREAM_DIM, fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 20, fontFamily: "'DM Sans', sans-serif" }}>
          What I Do
        </p>
      </FadeIn>
      <FadeIn delay={0.12} distance={50} duration={0.85}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 5vw, 58px)", fontWeight: 700, color: CREAM, lineHeight: 1.1, marginBottom: 56 }}>
          Systems that<br />drive revenue.
        </h2>
      </FadeIn>

      <div className="grid-responsive" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {items.map((item, i) => (
          <FadeIn key={i} delay={0.25 + 0.1 * i} distance={44} duration={0.8}>
            <div style={{
              padding: "44px 36px", background: DARK_CARD,
              border: `1px solid ${BORDER}`, transition: "all 0.4s ease",
              cursor: "default", minHeight: 240, borderRadius: 10,
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(237,232,208,0.2)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <span style={{
                fontFamily: "'Playfair Display', serif", fontSize: 52,
                fontWeight: 400, fontStyle: "italic",
                color: "rgba(237,232,208,0.08)", lineHeight: 1, display: "block", marginBottom: 20,
              }}>
                {item.num}
              </span>
              <h3 style={{
                fontFamily: "'Playfair Display', serif", fontSize: "clamp(20px, 2.2vw, 26px)",
                fontWeight: 700, color: CREAM, marginBottom: 14, lineHeight: 1.2,
              }}>
                {item.title}
              </h3>
              <p style={{
                color: CREAM_MID, fontSize: 15, lineHeight: 1.7,
                fontFamily: "'DM Sans', sans-serif", fontWeight: 400, margin: 0,
              }}>
                {item.desc}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

/* ============ RESULTS ============ */
const Results = () => {
  const stats = [
    { number: "10+", label: "Industries", sub: "Strategies tested across diverse markets." },
    { number: "80+", label: "Projects Launched", sub: "Funnels, brands, and campaigns built to perform." },
    { number: "10-30x", label: "ROAS", sub: "$10-$30 back for every $1 spent on ads." },
  ];

  return (
    <section id="results" style={{ padding: "80px clamp(24px,6vw,80px)", maxWidth: 1100, margin: "0 auto" }}>
      <FadeIn distance={20} duration={0.6}>
        <p style={{ color: CREAM_DIM, fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 20, fontFamily: "'DM Sans', sans-serif" }}>
          By The Numbers
        </p>
      </FadeIn>
      <FadeIn delay={0.12} distance={50} duration={0.85}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 5vw, 58px)", fontWeight: 700, color: CREAM, lineHeight: 1.1, marginBottom: 56 }}>
          Results that speak.
        </h2>
      </FadeIn>

      <div className="grid-responsive" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
        {stats.map((s, i) => (
          <FadeIn key={i} delay={0.25 + 0.12 * i} distance={44} duration={0.8}>
            <div style={{ padding: "44px 28px", borderTop: `2px solid ${CREAM}` }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(40px, 5vw, 56px)", fontWeight: 700, color: CREAM, margin: 0 }}>
                {s.number}
              </p>
              <p style={{ color: CREAM, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, marginTop: 12, marginBottom: 8 }}>
                {s.label}
              </p>
              <p style={{ color: CREAM_MID, fontSize: 14, lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif", margin: 0 }}>
                {s.sub}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

/* ============ FAQ ============ */
const FAQ = () => {
  const [openIdx, setOpenIdx] = useState(-1);
  const items = [
    { q: "How soon can I see results?", a: "Most clients start seeing traction within the first 30-60 days. The timeline depends on your industry, budget, and how aggressively we move, but I don't waste time. Every system is built to produce results fast." },
    { q: "What makes you different from agencies?", a: "Agencies sell you a package and hand you off to a junior. I build custom systems based on what your business actually needs. No fluff, no filler, no 6-month contracts with nothing to show for it." },
    { q: "What is Revvoo?", a: "Revvoo is the company I'm building. It takes everything I've learned from 80+ projects and packages it into scalable growth systems. It's the future of how businesses will approach marketing." },
    { q: "Who is this consultation for?", a: "Founders, business owners, and marketing leaders who are tired of guessing and want a clear, actionable plan to grow. If you're serious about results, this is for you." },
  ];

  return (
    <section id="faq" style={{ padding: "100px clamp(24px,6vw,80px)", maxWidth: 1000, margin: "0 auto" }}>
      <FadeIn distance={20} duration={0.6}>
        <p style={{ color: CREAM_DIM, fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 20, fontFamily: "'DM Sans', sans-serif" }}>
          FAQ
        </p>
      </FadeIn>
      <FadeIn delay={0.12} distance={50} duration={0.85}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 5vw, 58px)", fontWeight: 700, color: CREAM, lineHeight: 1.1, marginBottom: 56 }}>
          Common questions.
        </h2>
      </FadeIn>

      <div>
        {items.map((item, i) => {
          const isOpen = openIdx === i;
          return (
            <FadeIn key={i} delay={0.25 + 0.08 * i} distance={30} duration={0.75}>
              <div
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                style={{
                  borderTop: `1px solid ${BORDER}`,
                  borderBottom: i === items.length - 1 ? `1px solid ${BORDER}` : "none",
                  cursor: "pointer", transition: "background 0.3s ease",
                  background: isOpen ? "rgba(237,232,208,0.03)" : "transparent",
                  padding: "0 8px", borderRadius: 4,
                }}
                onClick={() => setOpenIdx(isOpen ? -1 : i)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpenIdx(isOpen ? -1 : i); } }}
                onMouseEnter={(e) => { if (!isOpen) e.currentTarget.style.background = "rgba(237,232,208,0.02)"; }}
                onMouseLeave={(e) => { if (!isOpen) e.currentTarget.style.background = "transparent"; }}
              >
                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "28px 0",
                }}>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(18px, 2.2vw, 24px)", fontWeight: 400,
                    color: CREAM, margin: 0,
                  }}>
                    {item.q}
                  </h3>
                  <span style={{
                    color: CREAM_DIM, fontSize: 24, fontWeight: 300,
                    transition: "transform 0.3s ease",
                    transform: isOpen ? "rotate(45deg)" : "none",
                    flexShrink: 0, marginLeft: 20,
                    fontFamily: "'DM Sans', sans-serif",
                  }}>
                    +
                  </span>
                </div>
                <div style={{
                  maxHeight: isOpen ? 500 : 0, overflow: "hidden",
                  transition: "max-height 0.4s ease, opacity 0.3s ease",
                  opacity: isOpen ? 1 : 0,
                }}>
                  <p style={{
                    color: CREAM_MID, fontSize: 15, lineHeight: 1.7,
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 400,
                    paddingBottom: 28, maxWidth: 800,
                  }}>
                    {item.a}
                  </p>
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
};

/* ============ PICK MY BRAIN ============ */
const Consult = () => (
  <section id="consult" style={{ padding: "100px clamp(24px,6vw,80px)", maxWidth: 1000, margin: "0 auto" }}>
    <FadeIn distance={50} duration={0.85}>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 5vw, 58px)", fontWeight: 700, color: CREAM, lineHeight: 1.1, marginBottom: 20 }}>
        Pick my brain.
      </h2>
    </FadeIn>
    <FadeIn delay={0.15} distance={30} duration={0.8}>
      <p style={{ color: CREAM_MID, fontSize: 17, lineHeight: 1.7, maxWidth: 700, fontFamily: "'DM Sans', sans-serif", marginBottom: 48 }}>
        Want real, actionable advice from someone who&apos;s been in the trenches? Book a
        1-on-1 consultation and get tailored strategy, honest feedback, and a clear plan
        for your next move.
      </p>
    </FadeIn>

    <FadeIn delay={0.3} distance={44} duration={0.85}>
      <div style={{
        background: DARK_CARD, border: `1px solid ${BORDER}`,
        padding: "clamp(28px, 4vw, 48px) clamp(20px, 4vw, 44px)", borderRadius: 10,
      }}>
        <div className="grid-responsive" style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-start",
          flexWrap: "wrap", gap: 24, marginBottom: 36,
        }}>
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 700, color: CREAM, margin: 0, lineHeight: 1.2 }}>
              1-on-1 Strategy Call
            </h3>
            <p style={{ color: CREAM_MID, fontSize: 15, fontFamily: "'DM Sans', sans-serif", marginTop: 8 }}>
              60 minutes · Video call · Tailored to your business
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(40px, 5vw, 56px)", fontWeight: 700, color: CREAM, margin: 0, lineHeight: 1 }}>
              $250
            </p>
            <p style={{ color: CREAM_MID, fontSize: 13, fontFamily: "'DM Sans', sans-serif", marginTop: 4 }}>
              per session
            </p>
          </div>
        </div>

        <div className="grid-responsive" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 40px", marginBottom: 40 }}>
          {[
            "Growth strategy tailored to your business",
            "Funnel & campaign audit",
            "Ad spend optimization",
            "Clear action plan you can execute immediately",
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <span style={{ color: CREAM_DIM, fontSize: 12, lineHeight: "22px" }}>✦</span>
              <span style={{ color: CREAM_MID, fontSize: 15, lineHeight: "22px", fontFamily: "'DM Sans', sans-serif" }}>{item}</span>
            </div>
          ))}
        </div>

        {/* BOOKING EMBED - Replace this div with your Calendly embed */}
        <div style={{
          padding: "32px", border: `1px dashed rgba(237,232,208,0.12)`,
          textAlign: "center", background: "rgba(237,232,208,0.02)", borderRadius: 8,
        }}>
          <p style={{ color: CREAM_DIM, fontSize: 14, fontFamily: "'DM Sans', sans-serif", margin: "0 0 20px 0" }}>
            Booking calendar will be embedded here
          </p>
          <button style={{
            background: CREAM, color: BLACK, border: "none",
            padding: "18px 40px", fontSize: 13, fontWeight: 600,
            letterSpacing: "0.1em", textTransform: "uppercase",
            cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
            display: "inline-flex", alignItems: "center", gap: 10,
            transition: "all 0.3s ease", borderRadius: 6,
          }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#FFF"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(237,232,208,0.12)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = CREAM; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            Book Your Session <span style={{ fontSize: 16 }}>→</span>
          </button>
        </div>
      </div>
    </FadeIn>
  </section>
);

/* ============ CONTACT ============ */
const Contact = () => (
  <section id="contact" style={{ padding: "80px clamp(24px,6vw,80px)", maxWidth: 1000, margin: "0 auto" }}>
    <div className="grid-responsive" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px, 5vw, 56px)", alignItems: "start" }}>
      <FadeIn distance={44} duration={0.85}>
        <div>
          <p style={{ color: CREAM_DIM, fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 20, fontFamily: "'DM Sans', sans-serif" }}>
            Contact
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, color: CREAM, lineHeight: 1.15 }}>
            Let&apos;s build something{" "}
            <span style={{ fontStyle: "italic", fontWeight: 400 }}>together.</span>
          </h2>
          <p style={{ color: CREAM_MID, fontSize: 15, lineHeight: 1.7, marginTop: 18, fontFamily: "'DM Sans', sans-serif", maxWidth: 380 }}>
            Whether you&apos;re looking to partner, collaborate, or just want to connect, I&apos;m always open to conversations that lead somewhere real.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.2} distance={44} duration={0.85}>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {["Name", "Email", "Message"].map((field) => (
            <div key={field}>
              <label htmlFor={`contact-${field.toLowerCase()}`} style={{
                color: CREAM, fontSize: 11, letterSpacing: "0.12em",
                textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600, display: "block", marginBottom: 8,
              }}>{field}</label>
              {field === "Message" ? (
                <textarea id={`contact-${field.toLowerCase()}`} rows={4} placeholder="What's on your mind?" style={{
                  width: "100%", background: DARK_CARD, border: `1px solid ${BORDER}`,
                  color: CREAM, padding: "14px 16px", fontSize: 15,
                  fontFamily: "'DM Sans', sans-serif", resize: "vertical",
                  outline: "none", transition: "border-color 0.3s", borderRadius: 8,
                }}
                  onFocus={(e) => e.target.style.borderColor = "rgba(237,232,208,0.25)"}
                  onBlur={(e) => e.target.style.borderColor = BORDER}
                />
              ) : (
                <input id={`contact-${field.toLowerCase()}`} type={field === "Email" ? "email" : "text"}
                  placeholder={field === "Email" ? "your@email.com" : "Your name"}
                  style={{
                  width: "100%", background: DARK_CARD, border: `1px solid ${BORDER}`,
                  color: CREAM, padding: "14px 16px", fontSize: 15,
                  fontFamily: "'DM Sans', sans-serif", outline: "none",
                  transition: "border-color 0.3s", borderRadius: 8,
                }}
                  onFocus={(e) => e.target.style.borderColor = "rgba(237,232,208,0.25)"}
                  onBlur={(e) => e.target.style.borderColor = BORDER}
                />
              )}
            </div>
          ))}
          <button style={{
            background: CREAM, color: BLACK, border: "none",
            padding: "16px 32px", fontSize: 13, fontWeight: 600,
            letterSpacing: "0.08em", textTransform: "uppercase",
            cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
            transition: "all 0.3s ease", alignSelf: "flex-start", marginTop: 4,
            borderRadius: 6,
          }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#FFF"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(237,232,208,0.12)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = CREAM; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            Send Message
          </button>
        </div>
      </FadeIn>
    </div>
  </section>
);

/* ============ FOOTER ============ */
const Footer = () => (
  <footer style={{ padding: "48px clamp(24px,6vw,80px)", borderTop: `1px solid ${BORDER}` }}>
    <div className="footer-inner" style={{
      maxWidth: 1100, margin: "0 auto",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      flexWrap: "wrap", gap: 16,
    }}>
      <Image src="/logo-cream.png.webp" alt="XC" width={32} height={24} style={{ objectFit: "contain" }} />
      <div style={{ display: "flex", gap: 24 }}>
        {[
          { name: "Instagram", url: "https://www.instagram.com/xander_cayetano/" },
          { name: "LinkedIn", url: "https://www.linkedin.com/in/xander-cayetano-8a39381b3" },
        ].map((s) => (
          <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" style={{
            color: CREAM_DIM, fontSize: 12, letterSpacing: "0.08em",
            textTransform: "uppercase", cursor: "pointer", textDecoration: "none",
            fontFamily: "'DM Sans', sans-serif", transition: "color 0.3s",
          }}
            onMouseEnter={(e) => e.currentTarget.style.color = CREAM}
            onMouseLeave={(e) => e.currentTarget.style.color = CREAM_DIM}
          >
            {s.name}
          </a>
        ))}
      </div>
      <span style={{ color: CREAM_DIM, fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>
        &copy; 2026 Xander Cayetano
      </span>
    </div>
  </footer>
);

/* ============ SECTION INDICATOR ============ */
const INDICATOR_SECTIONS = [
  { id: "journey", label: "Journey" },
  { id: "services", label: "Services" },
  { id: "results", label: "Results" },
  { id: "faq", label: "FAQ" },
  { id: "consult", label: "Consult" },
  { id: "contact", label: "Contact" },
];

const SectionIndicator = () => {
  const [active, setActive] = useState("");
  const [hovered, setHovered] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const midY = window.innerHeight * 0.4;
      let current = "";
      for (const { id } of INDICATOR_SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= midY && rect.bottom > midY) {
          current = id;
          break;
        }
      }
      // If no section is at midpoint, find the closest one above
      if (!current) {
        for (let i = INDICATOR_SECTIONS.length - 1; i >= 0; i--) {
          const el = document.getElementById(INDICATOR_SECTIONS[i].id);
          if (!el) continue;
          if (el.getBoundingClientRect().top <= midY) {
            current = INDICATOR_SECTIONS[i].id;
            break;
          }
        }
      }
      setActive(current);
      setVisible(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="section-indicator" style={{
      position: "fixed", right: 28, top: "50%", transform: "translateY(-50%)",
      zIndex: 100, display: "none", flexDirection: "column", gap: 18, alignItems: "flex-end",
      opacity: visible ? 1 : 0, transition: "opacity 0.4s ease",
      pointerEvents: visible ? "all" : "none",
    }}>
      {INDICATOR_SECTIONS.map(({ id, label }) => {
        const isActive = active === id;
        const isHovered = hovered === id;
        return (
          <button key={id}
            onClick={() => scrollTo(id)}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered("")}
            aria-label={`Go to ${label}`}
            style={{
              background: "none", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 10, padding: 0,
            }}
          >
            <span style={{
              color: CREAM_DIM, fontSize: 10, letterSpacing: "0.1em",
              textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif",
              opacity: isHovered || isActive ? 1 : 0,
              transform: isHovered || isActive ? "translateX(0)" : "translateX(6px)",
              transition: "all 0.3s ease", pointerEvents: "none",
            }}>
              {label}
            </span>
            <span style={{
              width: isActive ? 20 : 6, height: isActive ? 2 : 6,
              borderRadius: isActive ? 1 : "50%",
              background: isActive ? CREAM : CREAM_DIM,
              opacity: isActive ? 1 : 0.4,
              transition: "all 0.35s ease",
            }} />
          </button>
        );
      })}
    </div>
  );
};

/* ============ MAIN PAGE ============ */
export default function Home() {
  return (
    <div style={{ background: BLACK, minHeight: "100vh", position: "relative", zIndex: 1 }}>
      <Nav />
      <SectionIndicator />
      <Hero />
      <Marquee />
      <Journey />
      <Services />
      <Results />
      <FAQ />
      <Consult />
      <Contact />
      <Footer />
    </div>
  );
}
