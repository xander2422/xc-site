import Image from "next/image";
import Nav from "./Nav";

const STATS = [
  { number: "10+", label: "Industries", sub: "Strategies tested across diverse markets." },
  { number: "80+", label: "Projects launched", sub: "Funnels, brands, and campaigns built to perform." },
  { number: "10–30x", label: "ROAS", sub: "$10–$30 back for every $1 spent on ads." },
];

const CLIENTS = ["Harris Farms", "Creative Electron", "Revvoo", "Madera Community College", "Milan Institute", "Hero Ink Tattoo", "Strength Valley"];

const MILESTONES = [
  { phase: "Early days", title: "The spark", desc: "Started learning the game. Studying marketing, sales psychology, and what actually makes businesses grow. Not theory. Real-world, hands-on testing." },
  { phase: "Building", title: "Xander Cayetano Consulting", desc: "Launched my consulting practice and started working with businesses across California. Built funnels, ran ads, created systems that delivered 10–30x ROAS for clients across 10+ industries." },
  { phase: "Scaling", title: "Creative Electron & beyond", desc: "Worked with companies like Creative Electron and Harris Farms. Real businesses with real revenue goals. Helped build marketing infrastructure that drove measurable growth." },
  { phase: "Now", title: "Revvoo", desc: "Building Revvoo. A platform born from everything I've learned. Taking the systems, strategies, and frameworks that worked for clients and turning them into something bigger." },
];

const SERVICES = [
  { title: "Growth strategy", desc: "Full-funnel marketing strategy designed to attract, convert, and retain customers predictably." },
  { title: "Paid advertising", desc: "High-performance ad campaigns across Meta, Google, and beyond. Built for ROI, not vanity metrics." },
  { title: "Funnels & systems", desc: "End-to-end sales funnels, automation, and CRM systems that turn leads into revenue on autopilot." },
  { title: "Brand & web", desc: "Websites, landing pages, and brand identities that look premium and convert like machines." },
];

const CONSULT_INCLUDES = [
  "Growth strategy tailored to your business",
  "Funnel & campaign audit",
  "Ad spend optimization",
  "Clear action plan you can execute immediately",
];

const FAQS = [
  { q: "How soon can I see results?", a: "Most clients start seeing traction within the first 30–60 days. The timeline depends on your industry, budget, and how aggressively we move, but I don't waste time. Every system is built to produce results fast." },
  { q: "What makes you different from agencies?", a: "Agencies sell you a package and hand you off to a junior. I build custom systems based on what your business actually needs. No fluff, no filler, no 6-month contracts with nothing to show for it." },
  { q: "What is Revvoo?", a: "Revvoo is the company I'm building. It takes everything I've learned from 80+ projects and packages it into scalable growth systems. It's the future of how businesses will approach marketing." },
  { q: "Who is the consultation for?", a: "Founders, business owners, and marketing leaders who are tired of guessing and want a clear, actionable plan to grow. If you're serious about results, this is for you." },
];

const SOCIALS = [
  { name: "Instagram", url: "https://www.instagram.com/xander_cayetano/" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/xander-cayetano-8a39381b3" },
];

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const SectionHead = ({ label, title }) => (
  <div className="section-head">
    <p className="label">{label}</p>
    <h2>{title}</h2>
  </div>
);

export default function Home() {
  return (
    <>
      <Nav />

      <main id="top">
        {/* HERO */}
        <section className="hero container">
          <div className="hero-copy">
            <p className="hero-kicker">Founder of Revvoo · Growth strategist</p>
            <h1>Xander<br />Cayetano</h1>
            <p className="hero-lede">
              Marketing systems that drive real revenue. Built from scratch, proven across 10+ industries. Now building the future of growth with Revvoo.
            </p>
            <div className="hero-actions">
              <a href="#consult" className="btn btn-dark">Book a consultation <Arrow /></a>
              <a href="#about" className="link-arrow">My story <Arrow /></a>
            </div>
          </div>

          <div className="hero-photo">
            <Image
              src="/Images/Xander-cayetano-marketer-growth-strategist.jpg"
              alt="Portrait of Xander Cayetano"
              width={1080}
              height={1440}
              sizes="(max-width: 900px) 100vw, 40vw"
              priority
            />
          </div>
        </section>

        {/* STATS */}
        <section className="container" aria-label="Results">
          <dl className="stats">
            {STATS.map((s) => (
              <div key={s.label} className="stat">
                <dt>{s.label}</dt>
                <dd className="stat-number">{s.number}</dd>
                <dd className="stat-sub">{s.sub}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* CLIENTS */}
        <section className="container clients" aria-label="Clients">
          <p className="label">Worked with</p>
          <ul>
            {CLIENTS.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </section>

        {/* ABOUT */}
        <section id="about" className="section container split">
          <SectionHead label="About" title={<>Built from scratch.<br /><span className="muted">Proven in the real world.</span></>} />
          <ol className="timeline">
            {MILESTONES.map((m) => (
              <li key={m.title}>
                <p className="timeline-phase">{m.phase}</p>
                <div>
                  <h3>{m.title}</h3>
                  <p>{m.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* SERVICES */}
        <section id="services" className="section container">
          <SectionHead label="Services" title="Systems that drive revenue." />
          <ul className="services">
            {SERVICES.map((s, i) => (
              <li key={s.title}>
                <span className="services-index">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* CONSULT */}
        <section id="consult" className="consult">
          <div className="container consult-inner">
            <div>
              <p className="label">Consulting</p>
              <h2>Pick my brain.</h2>
              <p className="consult-lede">
                Want real, actionable advice from someone who&apos;s been in the trenches? Book a 1-on-1 consultation and get tailored strategy, honest feedback, and a clear plan for your next move.
              </p>
            </div>

            <div className="consult-card">
              <div className="consult-card-head">
                <div>
                  <h3>1-on-1 strategy call</h3>
                  <p>60 minutes · Video call</p>
                </div>
                <p className="consult-price">$250</p>
              </div>
              <ul className="checklist">
                {CONSULT_INCLUDES.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <a href="#contact" className="btn btn-cream btn-block">Book your session <Arrow /></a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="section container split">
          <SectionHead label="FAQ" title="Common questions." />
          <div className="faq">
            {FAQS.map((f) => (
              <details key={f.q}>
                <summary>{f.q}<span className="faq-icon" aria-hidden="true" /></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section container split contact">
          <div className="section-head">
            <p className="label">Contact</p>
            <h2>Let&apos;s build something together.</h2>
            <p className="contact-lede">
              Whether you&apos;re looking to partner, collaborate, or just want to connect, I&apos;m always open to conversations that lead somewhere real.
            </p>
          </div>

          <form className="form">
            <div className="form-row">
              <label htmlFor="contact-name">Name</label>
              <input id="contact-name" name="name" type="text" placeholder="Your name" autoComplete="name" />
            </div>
            <div className="form-row">
              <label htmlFor="contact-email">Email</label>
              <input id="contact-email" name="email" type="email" placeholder="you@company.com" autoComplete="email" />
            </div>
            <div className="form-row">
              <label htmlFor="contact-message">Message</label>
              <textarea id="contact-message" name="message" rows={5} placeholder="What are you working on?" />
            </div>
            {/* TODO: wire up to a form backend (Formspree, Resend, etc.) */}
            <button type="button" className="btn btn-dark">Send message <Arrow /></button>
          </form>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <a href="#top" className="nav-logo" aria-label="Back to top">
            <Image src="/logo-mark-black.png" alt="" width={22} height={27} />
            <span>Xander Cayetano</span>
          </a>
          <ul className="footer-links">
            {SOCIALS.map((s) => (
              <li key={s.name}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.name}</a></li>
            ))}
          </ul>
          <p className="footer-copy">&copy; {new Date().getFullYear()} Xander Cayetano</p>
        </div>
      </footer>
    </>
  );
}
