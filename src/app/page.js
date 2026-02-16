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

const FadeIn = ({ children, delay = 0, style = {} }) => {
  const [ref, inView] = useInView(0.08);
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(36px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
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
        {/* YOUR LOGO - cream version for dark bg */}
        <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ cursor: "pointer" }}>
          <Image
            src="/logo-cream.png.webp"
            alt="XC"
            width={44}
            height={33}
            style={{ objectFit: "contain" }}
            priority
          />
        </div>

        <button onClick={() => setOpen(!open)} style={{
          background: "none", border: "none", cursor: "pointer",
          display: "flex", flexDirection: "column", gap: open ? 0 : 5, padding: 8, zIndex: 300,
        }} aria-label="Menu">
          <span style={{ display: "block", width: 26, height: 1.5, background: CREAM, transition: "all 0.3s", transform: open ? "rotate(45deg) translateY(0.5px)" : "none" }} />
          <span style={{ display: "block", width: 26, height: 1.5, background: CREAM, transition: "all 0.3s", opacity: open ? 0 : 1 }} />
          <span style={{ display: "block", width: 26, height: 1.5, background: CREAM, transition: "all 0.3s", transform: open ? "rotate(-45deg) translateY(-0.5px)" : "none", marginTop: open ? -1.5 : 0 }} />
        </button>
      </nav>

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
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <section style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center", textAlign: "center",
      padding: "140px clamp(24px,6vw,80px) 100px", position: "relative",
    }}>
      <p style={{
        color: CREAM_DIM, fontSize: 13, letterSpacing: "0.25em", textTransform: "uppercase",
        fontFamily: "'DM Sans', sans-serif", fontWeight: 400, marginBottom: 40,
        opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(16px)",
        transition: "all 0.8s ease 0.2s",
      }}>
        Entrepreneur · Growth Strategist · Builder
      </p>

      <h1 style={{
        fontFamily: "'Playfair Display', serif", fontSize: "clamp(56px, 10vw, 130px)",
        fontWeight: 700, color: CREAM, lineHeight: 1.0, letterSpacing: "-0.02em",
        opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.9s ease 0.35s",
      }}>
        Xander<br />Cayetano
      </h1>

      <p style={{
        color: CREAM_MID, fontSize: "clamp(16px, 1.5vw, 19px)", maxWidth: 600,
        lineHeight: 1.7, marginTop: 36, fontFamily: "'DM Sans', sans-serif", fontWeight: 400,
        opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.9s ease 0.5s",
      }}>
        Marketing systems that drive real revenue — built from scratch, proven across 10+ industries. Now building the future of growth with Revvoo.
      </p>

      <div style={{
        display: "flex", gap: 16, marginTop: 52, flexWrap: "wrap", justifyContent: "center",
        opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(16px)",
        transition: "all 0.9s ease 0.65s",
      }}>
        <button onClick={() => scrollTo("consult")} style={{
          background: CREAM, color: BLACK, border: "none",
          padding: "20px 44px", fontSize: 13, fontWeight: 600,
          letterSpacing: "0.1em", textTransform: "uppercase",
          cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
          display: "flex", alignItems: "center", gap: 10,
          transition: "all 0.3s ease", borderRadius: 6,
        }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#FFF"; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = CREAM; e.currentTarget.style.transform = "translateY(0)"; }}
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

      <div style={{
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
  const brands = ["Harris Farms", "Revvoo", "Creative Electron", "Harris Farms", "Revvoo", "Creative Electron", "Harris Farms", "Revvoo", "Creative Electron"];
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
    { phase: "Early Days", title: "The Spark", desc: "Started learning the game — studying marketing, sales psychology, and what actually makes businesses grow. Not theory. Real-world, hands-on testing." },
    { phase: "Building", title: "Xander Cayetano Consulting", desc: "Launched my consulting practice and started working with businesses across California. Built funnels, ran ads, created systems that delivered 10-30x ROAS for clients across 10+ industries." },
    { phase: "Scaling", title: "Creative Electron & Beyond", desc: "Worked with companies like Creative Electron and Harris Farms — real businesses with real revenue goals. Helped build marketing infrastructure that drove measurable growth." },
    { phase: "Now", title: "Revvoo", desc: "Building Revvoo — a platform born from everything I've learned. Taking the systems, strategies, and frameworks that worked for clients and turning them into something bigger." },
  ];

  return (
    <section id="journey" style={{ padding: "120px clamp(24px,6vw,80px)", maxWidth: 900, margin: "0 auto" }}>
      <FadeIn>
        <p style={{ color: CREAM_DIM, fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 20, fontFamily: "'DM Sans', sans-serif" }}>
          My Journey
        </p>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 5vw, 58px)", fontWeight: 700, color: CREAM, lineHeight: 1.1, marginBottom: 72 }}>
          Built from scratch.<br />
          <span style={{ fontStyle: "italic", fontWeight: 400 }}>Proven in the real world.</span>
        </h2>
      </FadeIn>

      <div style={{ position: "relative", paddingLeft: 40 }}>
        <div style={{
          position: "absolute", left: 6, top: 8, bottom: 8,
          width: 1, background: `linear-gradient(to bottom, ${BORDER}, rgba(237,232,208,0.04))`,
        }} />

        {milestones.map((m, i) => (
          <FadeIn key={i} delay={0.1 * i} style={{ marginBottom: i < milestones.length - 1 ? 72 : 0, position: "relative" }}>
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
    <section id="services" style={{ padding: "120px clamp(24px,6vw,80px)", maxWidth: 1100, margin: "0 auto" }}>
      <FadeIn>
        <p style={{ color: CREAM_DIM, fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 20, fontFamily: "'DM Sans', sans-serif" }}>
          What I Do
        </p>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 5vw, 58px)", fontWeight: 700, color: CREAM, lineHeight: 1.1, marginBottom: 56 }}>
          Systems that<br />drive revenue.
        </h2>
      </FadeIn>

      <div className="grid-responsive" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {items.map((item, i) => (
          <FadeIn key={i} delay={0.1 * i}>
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
    { number: "10–30x", label: "ROAS", sub: "$10–$30 back for every $1 spent on ads." },
  ];

  return (
    <section id="results" style={{ padding: "100px clamp(24px,6vw,80px)", maxWidth: 1100, margin: "0 auto" }}>
      <FadeIn>
        <p style={{ color: CREAM_DIM, fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 20, fontFamily: "'DM Sans', sans-serif" }}>
          By The Numbers
        </p>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 5vw, 58px)", fontWeight: 700, color: CREAM, lineHeight: 1.1, marginBottom: 56 }}>
          Results that speak.
        </h2>
      </FadeIn>

      <div className="grid-responsive" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
        {stats.map((s, i) => (
          <FadeIn key={i} delay={0.12 * i}>
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
    { q: "How soon can I see results?", a: "Most clients start seeing traction within the first 30-60 days. The timeline depends on your industry, budget, and how aggressively we move — but I don't waste time. Every system is built to produce results fast." },
    { q: "What makes you different from agencies?", a: "Agencies sell you a package and hand you off to a junior. I build custom systems based on what your business actually needs. No fluff, no filler, no 6-month contracts with nothing to show for it." },
    { q: "What is Revvoo?", a: "Revvoo is the company I'm building — it takes everything I've learned from 80+ projects and packages it into scalable growth systems. It's the future of how businesses will approach marketing." },
    { q: "Who is this consultation for?", a: "Founders, business owners, and marketing leaders who are tired of guessing and want a clear, actionable plan to grow. If you're serious about results, this is for you." },
  ];

  return (
    <section id="faq" style={{ padding: "120px clamp(24px,6vw,80px)", maxWidth: 1000, margin: "0 auto" }}>
      <FadeIn>
        <p style={{ color: CREAM_DIM, fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 20, fontFamily: "'DM Sans', sans-serif" }}>
          FAQ
        </p>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 5vw, 58px)", fontWeight: 700, color: CREAM, lineHeight: 1.1, marginBottom: 56 }}>
          Common questions.
        </h2>
      </FadeIn>

      <div>
        {items.map((item, i) => {
          const isOpen = openIdx === i;
          return (
            <FadeIn key={i} delay={0.06 * i}>
              <div
                style={{
                  borderTop: `1px solid ${BORDER}`,
                  borderBottom: i === items.length - 1 ? `1px solid ${BORDER}` : "none",
                  cursor: "pointer", transition: "background 0.3s ease",
                  background: isOpen ? "rgba(237,232,208,0.03)" : "transparent",
                  padding: "0 8px", borderRadius: 4,
                }}
                onClick={() => setOpenIdx(isOpen ? -1 : i)}
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
                  maxHeight: isOpen ? 200 : 0, overflow: "hidden",
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
  <section id="consult" style={{ padding: "120px clamp(24px,6vw,80px)", maxWidth: 1000, margin: "0 auto" }}>
    <FadeIn>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 5vw, 58px)", fontWeight: 700, color: CREAM, lineHeight: 1.1, marginBottom: 20 }}>
        Pick my brain.
      </h2>
    </FadeIn>
    <FadeIn delay={0.1}>
      <p style={{ color: CREAM_MID, fontSize: 17, lineHeight: 1.7, maxWidth: 700, fontFamily: "'DM Sans', sans-serif", marginBottom: 48 }}>
        Want real, actionable advice from someone who&apos;s been in the trenches? Book a
        1-on-1 consultation and get tailored strategy, honest feedback, and a clear plan
        for your next move.
      </p>
    </FadeIn>

    <FadeIn delay={0.2}>
      <div style={{
        background: DARK_CARD, border: `1px solid ${BORDER}`,
        padding: "48px 44px", borderRadius: 10,
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
            onMouseEnter={(e) => { e.currentTarget.style.background = "#FFF"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = CREAM; e.currentTarget.style.transform = "translateY(0)"; }}
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
  <section id="contact" style={{ padding: "100px clamp(24px,6vw,80px)", maxWidth: 1000, margin: "0 auto" }}>
    <div className="grid-responsive" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "start" }}>
      <FadeIn>
        <div>
          <p style={{ color: CREAM_DIM, fontSize: 12, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 20, fontFamily: "'DM Sans', sans-serif" }}>
            Contact
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 700, color: CREAM, lineHeight: 1.15 }}>
            Let&apos;s build something{" "}
            <span style={{ fontStyle: "italic", fontWeight: 400 }}>together.</span>
          </h2>
          <p style={{ color: CREAM_MID, fontSize: 15, lineHeight: 1.7, marginTop: 18, fontFamily: "'DM Sans', sans-serif", maxWidth: 380 }}>
            Whether you&apos;re looking to partner, collaborate, or just want to connect — I&apos;m always open to conversations that lead somewhere real.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {["Name", "Email", "Message"].map((field) => (
            <div key={field}>
              <label style={{
                color: CREAM, fontSize: 11, letterSpacing: "0.12em",
                textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600, display: "block", marginBottom: 8,
              }}>{field}</label>
              {field === "Message" ? (
                <textarea rows={4} style={{
                  width: "100%", background: DARK_CARD, border: `1px solid ${BORDER}`,
                  color: CREAM, padding: "14px 16px", fontSize: 15,
                  fontFamily: "'DM Sans', sans-serif", resize: "vertical",
                  outline: "none", transition: "border-color 0.3s", borderRadius: 8,
                }}
                  onFocus={(e) => e.target.style.borderColor = "rgba(237,232,208,0.25)"}
                  onBlur={(e) => e.target.style.borderColor = BORDER}
                />
              ) : (
                <input type={field === "Email" ? "email" : "text"} style={{
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
            onMouseEnter={(e) => { e.target.style.background = "#FFF"; e.target.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.target.style.background = CREAM; e.target.style.transform = "translateY(0)"; }}
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
    <div style={{
      maxWidth: 1100, margin: "0 auto",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      flexWrap: "wrap", gap: 16,
    }}>
      <Image src="/logo-cream.png.webp" alt="XC" width={32} height={24} style={{ objectFit: "contain" }} />
      <span style={{ color: CREAM_DIM, fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>
        © 2025 Xander Cayetano. All rights reserved.
      </span>
      <div style={{ display: "flex", gap: 24 }}>
        {["Instagram", "LinkedIn", "Twitter"].map((s) => (
          <a key={s} href="#" style={{
            color: CREAM_DIM, fontSize: 12, letterSpacing: "0.08em",
            textTransform: "uppercase", cursor: "pointer", textDecoration: "none",
            fontFamily: "'DM Sans', sans-serif", transition: "color 0.3s",
          }}
            onMouseEnter={(e) => e.target.style.color = CREAM}
            onMouseLeave={(e) => e.target.style.color = CREAM_DIM}
          >
            {s}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

/* ============ MAIN PAGE ============ */
export default function Home() {
  return (
    <div style={{ background: BLACK, minHeight: "100vh" }}>
      <Nav />
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
