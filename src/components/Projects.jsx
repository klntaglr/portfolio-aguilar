import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useParams } from "react-router-dom";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaFacebook, FaInstagram, FaDribbble, FaLinkedin } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import {
  SiCss3, SiFigma, SiFramer, SiGreensock,
  SiHtml5, SiJavascript, SiReact, SiTailwindcss,
  SiSass, SiThreedotjs, SiIndeed,
  SiFirebase, SiSupabase, SiVercel,
  SiNodedotjs, SiExpress, SiGooglegemini,
} from "react-icons/si";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";

// ── assets ─────────────────────────────────────────────────────────────────
import arielle1 from "../assets/arielle1.png";
import arielle2 from "../assets/arielle2.png";
import arielle3 from "../assets/arielle3.png";
import arielle4 from "../assets/arielle4.png";
import arielle5 from "../assets/arielle5.png";
import arielle6 from "../assets/arielle6.png";
import arielle7 from "../assets/arielle7.png";
import arielle8 from "../assets/arielle8.png";
import bangkaLogo from "../assets/bangka.png";
import bangkal1 from "../assets/bangkal1.png";
import bangkal2 from "../assets/bangkal2.png";
import bangkal3 from "../assets/bangkal3.png";
import bangkal4 from "../assets/bangkal4.png";
import bangkal5 from "../assets/bangkal5.png";
import bangkal6 from "../assets/bangkal6.png";
import bangkal7 from "../assets/bangkal7.png";
import bangkal8 from "../assets/bangkal8.png";
import bangkal9 from "../assets/bangkal9.png";
import bangkal10 from "../assets/bangkal10.png";
import laconslanetLogo from "../assets/laconslanet.png";
import laconslanet1 from "../assets/laconslanet1.png";
import laconslanet2 from "../assets/laconslanet2.png";
import laconslanet3 from "../assets/laconslanet3.png";
import laconslanet4 from "../assets/laconslanet4.png";
import laconslanet5 from "../assets/laconslanet5.png";
import laconslanetLoginBefore from "../assets/loginbefore.png";
import laconslanetLoginAfter from "../assets/loginafter.png";
import laconslanetDashboardBefore from "../assets/dashboardbefore.png";
import laconslanetDashboardAfter from "../assets/dashboardafter.png";
import laconslanetLandingAfter from "../assets/landingpageafter.png";
import ladyLogo from "../assets/lady.png";
import virielle1 from "../assets/virielle1.png";
import virielle2 from "../assets/virielle2.png";
import virielle3 from "../assets/virielle3.png";
import virielle4 from "../assets/virielle4.png";
import virielle5 from "../assets/virielle5.png";
import virielle6 from "../assets/virielle6.png";
import viriellesLogo from "../assets/virielles.png";
import nammerAvatar from "../assets/nammer1.png";
import ladyAvatar from "../assets/ladyclient.jpg";
import czarAvatar from "../assets/czar.jpg";
import ellaAvatar from "../assets/ella.jpg";

import "./Portfolio.css";
import "./Projects.css";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother);

// ── data ────────────────────────────────────────────────────────────────────
const CASE_STUDIES = [
  {
    id: "qrush",
    number: "01",
    title: "QRUSH",
    subtitle: "Barangay document request  ",
    client: "Barangay Bangkal, Malolos",
    timeline: "Dec 2025 – Jan 2026",
    role: "Full-stack Web App",
    industry: "Public Service",
    type: "Capstone Project",
    image: bangkal1,
    logo: bangkaLogo,
    bgColor: "#0d3052",
    accentColor: "#c7f000",
    services: ["UX Research", "Product Flow", "Responsive UI", "Frontend Build", "Backend Dev"],
    overview:
      "QRUSH transforms a slow, queue-heavy barangay document process into a streamlined digital journey — for both residents and staff. The priority was clarity at every step: from submission to claiming, every status and action needed to be immediately understandable.",
    overviewParagraphs: [
      "QRUSH transforms a slow, queue-heavy barangay document process into a streamlined digital journey — for both residents and staff.",
      "The priority was clarity at every step: from submission to claiming, every status and action needed to be immediately understandable.",
      "The goal was simple in concept, difficult in execution: build a system that makes every interaction feel predictable. No ambiguity. No dead ends.",
    ],
    challenge:
      "Residents had to queue in person, follow up manually, and wait without knowing request progress. Staff lacked a structured way to receive, review, and validate documents.",
    problemParagraphs: [
      "Barangay Bangkal processed all document requests manually — walk-in only, no digital records, no way for residents to check status remotely.",
      "On peak days, the barangay hall became congested. Residents who worked during office hours had no practical way to request documents without taking time off.",
      "Staff had no centralized tool for managing requests. Records were paper-based, easily lost, and difficult to audit. There was no formal process to verify that requestors were legitimate residents of Barangay Bangkal.",
    ],
    problemPoints: [
      "Walk-in only — no online submission channel",
      "No status tracking after request submission",
      "Repeated follow-up visits required by residents",
      "No formal resident verification mechanism",
      "Staff had no centralized dashboard for pending requests",
      "Paper trail was error-prone and easily lost",
      "Mobile users completely excluded from the process",
      "No notification system for residents",
    ],
    challengeParagraphs: [
      "Residents had to queue in person, follow up manually, and wait without knowing request progress. Staff lacked a structured way to receive, review, and validate documents.",
      "The existing paper-based system created uncertainty at every stage — a UX problem disguised as a logistics problem.",
    ],
    challengePoints: [
      "No way to track request status after submission",
      "Staff had no centralized dashboard for pending requests",
      "Manual signature checks created bottlenecks",
      "Mobile users were completely locked out of the process",
      "No notification system for residents",
      "Paper trail was error-prone and easily lost",
    ],
    researchParagraphs: [
      "Research started with observation — visiting the barangay hall during peak hours to watch how requests were actually processed. The real friction wasn't where we expected it.",
      "Informal interviews with barangay staff surfaced the operational bottlenecks: manual logbooks, signature verification queues, and no way to notify residents without calling them individually.",
      "A survey of 40 respondents was used to validate the final system against ISO/IEC 25010:2023 quality characteristics — covering functionality, usability, reliability, performance, security, maintainability, portability, compatibility, and interaction capability.",
    ],
    researchMethods: [
      "On-site observation at Barangay Bangkal hall during peak request days",
      "Informal interviews with staff and the Barangay Captain",
      "Survey-based evaluation with 40 respondents post-deployment",
      "ISO/IEC 25010:2023 quality framework as evaluation standard",
      "Iterative review cycles with the capstone panel",
    ],
    beforeAfter: [
      { label: "Before", points: ["Walk-in only, no digital channel", "Paper logbook, no audit trail", "Manual signature verification", "No resident notifications", "No status visibility after submission"] },
      { label: "After", points: ["Online submission from any device", "Digital records with full audit trail", "QR-based transaction completion", "SMS + in-app multi-channel alerts", "Real-time status tracker for residents"] },
    ],
    industryContext:
      "Most barangays in the Philippines still process document requests manually — walk-in only, paper-based, no tracking. QRUSH was built to close that gap for Barangay Bangkal.",
    industryParagraphs: [
      "Most barangays in the Philippines still process document requests the same way they have for decades — residents walk in, fall in line, submit requirements in person, and return another day to claim. There is no online submission, no status tracking, no digital notification.",
      "Republic Act No. 11032 mandates all government offices, including barangays, to streamline citizen transactions and provide online service channels. Most barangays remain non-compliant — not by choice, but by lack of accessible tools.",
      "QRUSH demonstrates that barangay-level digitalization is achievable using cloud-based web technologies, without on-premise servers or a dedicated IT department. The same stack powers startups — it can power a barangay.",
    ],
    industryStats: [
      { value: "40", label: "Respondents evaluated the system" },
      { value: "4.47", label: "Grand mean — ISO/IEC 25010:2023" },
      { value: "9", label: "Quality characteristics assessed" },
      { value: "RA 11032", label: "Compliance alignment" },
    ],
    approach:
      "I mapped the full request journey from submission to claiming, prioritised the highest-frequency actions in the interface, and built a responsive system that keeps both staff and residents informed at every step.",
    approachParagraphs: [
      "The design process started with the resident's mental model. What do they expect to happen after they submit a request? That expectation shaped every status state and notification in the system.",
      "I designed around visibility: clear status states, predictable steps, strong confirmation feedback, and mobile-first public access.",
      "The full stack covered design through deployment: Figma for UI design, React for the frontend, Firebase and Supabase for real-time data and auth, Node.js and Express.js for the backend API, Vercel for deployment, GSAP for scroll animations and smooth scrolling, Framer Motion for page transitions, and Gemini API for the AI assistive chatbot.",
    ],
    approachSteps: [
      { num: "01", title: "Journey Mapping", desc: "Mapped the full request lifecycle for both residents and staff, identifying every decision point and friction moment." },
      { num: "02", title: "Status Architecture", desc: "Designed a clear status system — submitted, under review, ready to claim — with unambiguous language at each stage." },
      { num: "03", title: "Staff Dashboard", desc: "Built a prioritized action queue for staff that surfaces the most urgent requests and simplifies validation." },
      { num: "04", title: "QR Validation", desc: "Replaced manual signature checks with QR-based verification, eliminating the most common source of delays." },
    ],
    solution:
      "I mapped the full request journey from submission to claiming, prioritised the highest-frequency actions in the interface, and built a responsive system that keeps both staff and residents informed at every step.",
    solutionParagraphs: [
      "QRUSH covers the full document request lifecycle — from masterlist-based registration and phone number OTP verification, through online submission, staff review, digital ticket generation, QR-based transaction completion, and official receipt generation upon completion.",
      "Residents submit requests from any device. Staff process them through a role-based dashboard. Every status change triggers a multi-channel notification via SMS and in-app alert. The barangay hall visit is reduced to one purpose: claiming the document.",
      "A follow-up feature lets residents flag delayed requests once the configured processing time has elapsed. Claim window management sends automated pre-expiry reminders. Disputed unclaimed documents are flagged automatically using the 24-hour rule — protecting residents from being penalized for insufficient pickup notice.",
    ],
    solutionFeatures: [
      { title: "Masterlist-Based Registration", desc: "Only verified Barangay Bangkal residents can create accounts — enforced through exact matching against the official masterlist." },
      { title: "Online Request + Real-Time Tracker", desc: "Residents submit requests and track status from any device without visiting the barangay hall." },
      { title: "QR Code Transaction Completion", desc: "Staff scan the digital ticket QR code to complete transactions instantly at pickup." },
      { title: "Multi-Channel Notifications", desc: "SMS via iProSMS and in-app alerts keep residents informed at every transaction stage." },
      { title: "Follow-Up Feature", desc: "Residents can flag delayed requests once the configured processing time plus buffer has elapsed." },
      { title: "Official Receipt Generation", desc: "Auto-generated upon completion — itemized, downloadable as PDF, distinct from the digital ticket." },
      { title: "Role-Based Admin Dashboard", desc: "Separate dashboards for Admin, Staff, and Kapitan with PIN-based secondary authentication." },
      { title: "Gemini AI Assistive Chatbot", desc: "Scoped to barangay queries, available on the landing page and resident dashboard in Filipino or English." },
    ],
    reflection:
      "The biggest lesson from QRUSH: the UX problem was hidden inside a logistics complaint. Residents didn't say 'the interface is confusing' — they said 'I don't know what's happening with my request.' That's a visibility problem, not a process problem.",
    reflectionParagraphs: [
      "The biggest lesson from QRUSH: the UX problem was hidden inside a logistics complaint. Residents didn't say 'the interface is confusing' — they said 'I don't know what's happening with my request.' That's a visibility problem, not a process problem.",
      "Designing for low-digital-literacy users requires removing every assumption. Every label, every button, every status message was tested for plain-language clarity.",
      "The QR validation feature came from watching staff manually match documents to records — a 3-minute process that happened dozens of times a day. The right observation led to the right solution.",
      "If I were to rebuild this today, I'd conduct more structured usability testing earlier — informal walkthroughs with actual barangay residents before finalizing the status language and notification flow. I validated with the staff and the capstone panel, but earlier resident feedback would have surfaced edge cases faster.",
    ],
    outcomes: [
      "Residents track requests online without visiting the office",
      "QR-based validation replaced manual signature checks",
      "Staff dashboard cut processing time significantly",
      "Mobile-ready public portal accessible on any device",
    ],
    metrics: [
      { value: "4", label: "Core user flows designed" },
      { value: "2", label: "Primary user roles" },
      { value: "100%", label: "Responsive coverage" },
    ],
    designSystem: {
      colors: [
        { name: "Primary", value: "#296459" },
        { name: "Success", value: "#157044" },
        { name: "Neutral", value: "#767676" },
        { name: "Surface", value: "#D9D9D9" },
        { name: "Dark", value: "#081F1F" },
        { name: "Ink", value: "#3E3A3A" },
        { name: "Ghost", value: "transparent" },
      ],
      fonts: [
        { name: "Inter Heavy", role: "Display · Hero headings · Section titles · Impact statements" },
        { name: "Inter Regular", role: "Body copy · Labels · Nav items · Captions · UI elements" },
        { name: "Inter Medium", role: "Subheadings · Meta labels · Button text · Data values" },
      ],
      tools: [
        { icon: <SiFigma />, label: "Figma" },
        { icon: <SiReact />, label: "React" },
        { icon: <SiFirebase />, label: "Firebase" },
        { icon: <SiSupabase />, label: "Supabase" },
        { icon: <SiNodedotjs />, label: "Node.js" },
        { icon: <SiExpress />, label: "Express" },
        { icon: <SiVercel />, label: "Vercel" },
        { icon: <SiGreensock />, label: "GSAP" },
        { icon: <SiFramer />, label: "Framer" },
        { icon: <SiGooglegemini />, label: "Gemini" },
        { icon: <SiJavascript />, label: "JavaScript" },
        { icon: <SiHtml5 />, label: "HTML5" },
        { icon: <SiCss3 />, label: "CSS3" },
      ],
      tokens: [
        { category: "Spacing", items: ["4px base unit", "8 / 16 / 24 / 32 / 48 / 64px scale"] },
        { category: "Border Radius", items: ["4px inputs", "8px cards", "12px modals", "30px pills"] },
        { category: "Typography Scale", items: ["0.63rem labels", "0.85rem body-sm", "1rem body", "1.5rem h3", "2.5rem h1"] },
        { category: "Elevation", items: ["0 2px 8px rgba(0,0,0,0.08) card", "0 12px 40px rgba(0,0,0,0.18) modal"] },
        { category: "Motion", items: ["GSAP ScrollSmoother (smooth: 1.35)", "GSAP ScrollTrigger scroll reveals", "Framer Motion page transitions", "0.65s power3.out GSAP transitions", "0.22s ease micro-interactions"] },
        { category: "Icons", items: ["Flat Icons — UI illustrations", "React Icons FA series — social/actions", "React Icons MD series — navigation"] },
        { category: "Buttons", items: ["Primary: #296459 bg, white text, 30px radius", "Success: #157044 bg, white text", "Ghost: transparent bg, #296459 border + text", "Disabled: #D9D9D9 bg, #767676 text"] },
      ],
    },
    gallery: [
      bangkal1,
      bangkal2,
      bangkal3,
      bangkal4,
      bangkal5,
      bangkal6,
      bangkal7,
      bangkal8,
      bangkal9,
      bangkal10,
    ],
    websiteUrl: "https://bangkalqrush.com",
    testimonial: {
      quote: "Dati puro pila at balik-balik lang ang mga residente namin just to follow up. Now through QRUSH, online na ang lahat — may tracking, may QR, may notifications pa. Ang ganda pa ng interface, bagay talaga sa aming barangay. Malaking tulong sa amin ang system na ito.",
      name: "Capt. Nammer A. Bulaong",
      role: "Barangay Captain · Barangay Bangkal, Malolos, Bulacan",
      avatar: nammerAvatar,
      rating: 4.8,
    },
    next: "virielle",
    prev: "laconslanet",
  },
  {
    id: "virielle",
    number: "02",
    title: "Virielle Studio",
    subtitle: "Studio website for a refined creative presence",
    client: "Virielle Studio",
    timeline: "Apr 2026",
    role: "Website Design",
    industry: "Creative Studio",
    type: "Freelance Project",
    image: virielle1,
    logo: viriellesLogo,
    bgColor: "#1a1a1a",
    accentColor: "#c7f000",
    services: ["Web Design", "Brand Direction", "Landing Flow", "Responsive UI"],
    overviewParagraphs: [
      "Virielle Studio is a freelance creative team offering capstone systems, web development, mobile apps, dashboards, website design, redesigns, and landing pages — primarily for students and small school-related IT projects.",
      "They needed a brand website that introduced their studio, showcased their services, presented pricing, introduced the team, and gave potential clients a clear path to inquiry — all in one polished landing page.",
      "I started from scratch. No existing resources, no brand assets, no copy. I opened with wireframes and placeholder mockups first to establish layout and section flow, with the understanding that content would be refined once the client could provide real information.",
    ],
    challengeParagraphs: [
      "Virielle Studio was brand new — no existing website, no testimonials, no brand assets, no copy. Everything had to be built from zero: the visual identity, the page structure, the content placeholders, the section flow.",
      "Starting from scratch meant the first job was to make the layout decisions before the real content existed. Wireframes and mockups with placeholder text and sample imagery were used to visualize and validate the structure, ready to be swapped with real content once the client could provide it.",
      "Since they had no testimonials yet, we agreed the testimonial section would be added later when they had real client feedback — I designed the page without it but with that addition in mind.",
    ],
    challengePoints: [
      "No existing brand — visual identity had to be established from scratch",
      "No assets, copy, or images provided by the client at project start",
      "No testimonials yet — social proof section deferred to future update",
      "Nine sections needed to flow naturally without feeling overloaded",
      "Mobile version required as a separate deliverable",
      "Wireframe-first approach needed before any visual decisions",
    ],
    industryParagraphs: [
      "Creative studios live and die by first impressions. Potential clients form opinions within seconds — before reading a single word.",
      "The best creative studio sites function like curated pitches. They guide the visitor from 'who are you' to 'I want to work with you' without friction.",
      "Restraint is harder than decoration. Premium positioning requires knowing what to leave out.",
    ],
    industryStats: [
      { value: "5", label: "Key page sections" },
      { value: "3", label: "Conversion moments" },
      { value: "1", label: "Focused inquiry path" },
      { value: "60%", label: "Mobile traffic share" },
    ],
    approachParagraphs: [
      "Wireframes came first. Before any color or typography decisions, I mapped out all nine sections: hero, turning ideas into impact, featured projects, something great CTA, pricing plans, team introduction, FAQ, contact form, and footer.",
      "With the structure validated, I built out the visual language — a warm terracotta palette anchored by #993C1D and #DA7756, Lora for editorial headings, Geist Mono for numbers and pricing, and a soft off-white surface (#FAF9F5) that kept the layout breathing.",
      "Placeholder mockups and sample labels were used throughout so the client could see exactly how the final product would look before committing to real copy and assets. The design was handed off development-ready, with content slots clearly defined.",
    ],
    approachSteps: [
      { num: "01", title: "Wireframing", desc: "Mapped all nine sections before any visual decisions — hero, impact statement, projects, CTA strip, pricing, team, FAQ, contact, footer." },
      { num: "02", title: "Visual Identity", desc: "Established the color system, typography pairing, and component language from scratch — terracotta primary, Lora headings, Geist Mono for numbers." },
      { num: "03", title: "Placeholder Mockups", desc: "Built full-fidelity mockups with sample images and placeholder copy so the client could visualize the final product before providing real content." },
      { num: "04", title: "Mobile Version", desc: "Designed a complete mobile layout as a separate deliverable — all nine sections adapted for small screens with the same visual system." },
      { num: "05", title: "Prototype & Handoff", desc: "Connected all screens in Figma with prototype links, ready for the developer to implement once real content is provided." },
    ],
    solutionParagraphs: [
      "The final deliverable is a nine-section landing page — desktop and mobile — designed in Figma with full prototype connections. Hero opens with a bold Lora headline on a terracotta-to-off-white gradient, immediately communicating the studio's positioning.",
      "Pricing plans are presented in three tiers with a highlighted recommended option. The team section introduces each member with photos and short bios. The FAQ accordion addresses common client questions before they need to ask. The contact section closes the page with a form and a strong CTA.",
      "Every section uses placeholder content that maps clearly to what real content should replace — the developer or the client can swap in real copy and images without restructuring the layout.",
    ],
    solutionFeatures: [
      { title: "9 Sections — Desktop + Mobile", desc: "Hero, impact statement, featured projects, CTA strip, pricing plans, team introduction, FAQ, contact form, and footer — all designed at desktop and mobile breakpoints." },
      { title: "From-Scratch Visual Identity", desc: "Color palette, typography system, button styles, card styles, and badge design all established from zero — no existing brand assets." },
      { title: "Three-Tier Pricing Layout", desc: "Starter, Pro (highlighted as recommended), and Premium tiers with clear feature lists and terracotta CTA buttons." },
      { title: "Team Introduction Section", desc: "Grid layout introducing team members with photos, names, and roles — built to accommodate real photos once provided." },
      { title: "FAQ Accordion", desc: "Expandable FAQ section addressing common client questions, designed for easy content updates." },
      { title: "Placeholder-Ready Handoff", desc: "All mockups built with clearly defined content slots — ready for developer implementation once real copy and assets are available." },
    ],
    reflectionParagraphs: [
      "Starting from scratch with no client assets is a different kind of challenge than working with an existing brand. The first job isn't designing — it's making enough decisions to give the client something to react to.",
      "The wireframe-first approach was the right call. It let us align on structure before investing time in visual polish, which meant fewer revisions at the high-fidelity stage.",
      "The testimonial section being deferred was the honest decision. Placeholder testimonials don't help anyone — the page is stronger without fake social proof than with it. When real client feedback exists, it goes in. Until then, the page works without it.",
      "If I were to revisit this, I'd spend more time on the featured projects section — it's the part of the page that does the most work for a new studio, and it deserves more visual weight than a standard card grid.",
    ],
    outcomes: [
      "Stronger first-impression brand storytelling",
      "Clearer service explanation hierarchy",
      "Simplified inquiry flow reduced friction",
      "Improved mobile reading experience",
    ],
    metrics: [
      { value: "5", label: "Key page sections" },
      { value: "3", label: "Conversion moments" },
      { value: "1", label: "Focused inquiry path" },
    ],
    designSystem: {
      colors: [
        { name: "Primary", value: "#993C1D" },
        { name: "Button", value: "#DA7756" },
        { name: "Card", value: "#FFB298" },
        { name: "Surface", value: "#FAF9F5" },
        { name: "Text", value: "#1A1A1A" },
        { name: "Subtle", value: "#6B6860" },
        { name: "Badge", value: "#DA7756" },
      ],
      fonts: [
        { name: "Lora", role: "Display · Hero headings · Section titles · Editorial tone" },
        { name: "Geist Mono", role: "Numbers · Pricing · Stats · Code-style labels" },
        { name: "Inter Regular", role: "Body copy · Labels · Nav items · Captions · UI elements" },
      ],
      tools: [
        { icon: <SiFigma />, label: "Figma" },
      ],
    },
    gallery: [virielle1, virielle2, virielle3, virielle4, virielle5, virielle6],
    figmaUrl: "https://www.figma.com/proto/HIZxdN2pkwpRUX0iNorExB/Virielle-Studio?node-id=1-44&p=f&t=42imX7hEho6xvAXg-0&scaling=scale-down-width&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A44",
    testimonial: {
      quote: "Mr. Russell Aguilar and I go way back — we were schoolmates at La Consolacion University. He understood the vision right away without needing too much explanation. The final result perfectly captured the brand identity we wanted to showcase.",
      name: "Madelle Ella",
      role: "Freelance Client · Studio Website Design",
      avatar: ellaAvatar,
      rating: 4.3,
    },
    next: "lady-arielle",
    prev: "qrush",
  },
  {
    id: "lady-arielle",
    number: "03",
    title: "Lady Arielle",
    subtitle: "Storytelling marketing portfolio — personal brand website",
    client: "Lady Arielle ",
    timeline: "May 2026",
    role: "UI/UX Designer & Web Designer",
    industry: "Marketing & Events",
    type: "Freelance Project",
    image: arielle1,
    logo: ladyLogo,
    bgColor: "#0d3052",
    accentColor: "#c7f000",
    services: ["Requirements Gathering", "Wireframing", "UI/UX Design", "Prototype", "Design Handoff"],
    overviewParagraphs: [
      "Lady Arielle is a Marketing Management graduate from La Consolacion University Philippines who reached out after noticing my work. She needed a storytelling-driven personal brand website — one that gathered her hosting experience, internship, org leadership, awards, certifications, and skills into a single shareable portfolio.",
      "The project ran across three phases: requirements gathering (resources, color direction, content, images), wireframing, then high-fidelity design and a fully interactive Figma prototype handed off development-ready.",
      "The final deliverable is a 7-section Figma design — desktop and mobile — with real content, real photography, and a complete prototype ready for developer handoff.",
    ],
    challengeParagraphs: [
      "Lady Arielle's experience spanned event hosting, internship work, org leadership, awards, and certifications — but it was scattered across PDFs, social profiles, and memory. There was no single place that told the full story.",
      "She's a marketing graduate who understood positioning — so the site couldn't just be a list. It needed to feel like a deliberate personal brand: warm, credible, and story-driven from the first scroll.",
      "The design challenge was translating that scattered experience into a cohesive 7-section narrative — one that a developer could pick up and build without needing to make layout decisions.",
    ],
    challengePoints: [
      "Experience scattered across PDFs, social profiles, and decks — no unified narrative",
      "No portfolio design to share during applications or introductions",
      "7 content areas (hosting, internship, orgs, awards, certs, skills, contact) needed to flow as a story, not a resume dump",
      "Client had specific color direction and tone — required careful requirements gathering before any design",
      "Mobile version required as a separate deliverable alongside desktop",
      "Design had to be development-ready — all content slots clearly defined for handoff",
    ],
    industryParagraphs: [
      "For marketing professionals, the portfolio is the pitch. How you frame your own story signals exactly how you'd frame a brand's story — clients and employers read it that way.",
      "A marketing graduate competing in a crowded field needs more than a CV. They need a site that demonstrates strategic thinking through its own structure and visual language.",
      "Lady Arielle's background — event hosting, org leadership, real campaign work — is genuinely strong. The job was to surface that credibility fast, before a visitor loses interest.",
    ],
    industryStats: [
      { value: "7", label: "Page sections designed" },
      { value: "3", label: "Project phases" },
      { value: "Figma", label: "Design tool" },
      { value: "2", label: "Breakpoints — desktop & mobile" },
    ],
    approachParagraphs: [
      "Phase 1 was requirements gathering — I collected her color direction, tone references, real photography, and all content: hosting events, internship details, org positions, awards, certifications, and skills. Nothing was assumed.",
      "Phase 2 was wireframing — establishing the 7-section structure before any visual decisions. Hero → Brand Strategy → Event Hosting & Planning → Social Media → About → Experience & Skills → Contact.",
      "Phase 3 was high-fidelity design in Figma using real content and real photography — no placeholders. Every section was fully detailed and connected end-to-end as an interactive prototype, ready for developer handoff.",
    ],
    approachSteps: [
      { num: "01", title: "Requirements Gathering", desc: "Collected all resources from the client: color direction, tone, real photography, hosting events, internship details, org leadership, awards, certifications, and skills." },
      { num: "02", title: "Wireframing", desc: "Mapped the 7-section structure before any visual decisions — establishing flow from hero to contact without content placeholders." },
      { num: "03", title: "High-Fidelity Design & Prototype", desc: "Built full-fidelity Figma mockups with real content and photography, prototyped end-to-end for client review and approval." },
      { num: "04", title: "Prototype & Handoff", desc: "Connected all 7 sections end-to-end in Figma with full prototype links — desktop and mobile — handed off development-ready with all content slots clearly defined." },
    ],
    solutionParagraphs: [
      "The final deliverable is a 7-section Figma design — desktop and mobile — built entirely with real content and real photography from Lady Arielle from day one. No placeholder copy, no stock images.",
      "Sections cover her brand strategy positioning, event hosting and public speaking work, social media and content creation background, a full about section, her internship and org experience, awards and certifications, and a contact section.",
      "Every section was fully detailed in high fidelity and connected end-to-end as an interactive prototype — scroll animations, transitions, and hover states all communicated through Figma prototyping. The design was handed off development-ready, with all spacing, typography, and color tokens documented.",
    ],
    solutionFeatures: [
      { title: "Scroll & Transition Annotations", desc: "Scroll animations, page transitions, and hover states all communicated through Figma prototype connections and motion annotations." },
      { title: "Mobile Version", desc: "Complete mobile layout designed as a separate breakpoint — all 7 sections adapted for small screens with the same visual system." },
      { title: "Real Content from Day One", desc: "Built with Lady Arielle's actual photography, hosting events, org positions, awards, and certifications — no placeholder copy." },
      { title: "Development-Ready Handoff", desc: "All spacing, typography, color tokens, and component states documented — designed so a developer can implement without making layout decisions." },
    ],
    reflectionParagraphs: [
      "What made this project work was the requirements-first approach. Going into Phase 1 with a proper brief — real content, real photography, clear color direction — meant the wireframe stage had actual decisions to make, not assumptions to paper over.",
      "The three-phase structure (gather → wireframe → design) kept the project from expanding scope mid-execution. The client knew what was happening at every stage, which made approvals faster and revisions minimal.",
      "Designing with real content from day one changed the quality of every decision. Typography scale, section spacing, image crop — all of those choices are different when you're working with actual photos and actual copy instead of lorem ipsum.",
      "If I were to revisit this, I'd add a case study section for her major event hosting projects — full narrative writeups with supporting photography. Her hosting experience is her strongest proof point and deserves more than a gallery card.",
    ],
    outcomes: [
      "7 content areas unified into a single coherent personal brand narrative",
      "Desktop and mobile designs delivered — fully detailed, no placeholders",
      "End-to-end interactive Figma prototype ready for developer handoff",
      "Built with real content and photography from requirements gathering — no filler",
    ],
    metrics: [
      { value: "7", label: "Page sections" },
      { value: "3", label: "Project phases" },
      { value: "2", label: "Breakpoints designed" },
    ],
    designSystem: {
      colors: [
        { name: "Primary", value: "#C97B8A" },
        { name: "Accent", value: "#E8A0B4" },
        { name: "Background", value: "#F5EFE6" },
        { name: "Text", value: "#2C2825" },
        { name: "Page BG", value: "#FDFAF6" },
        { name: "Surface", value: "#F5EFE6" },
        { name: "Border", value: "#E8DFCF" },
        { name: "Highlight", value: "#F5B8EF" },
        { name: "Secondary Text", value: "#6B6259" },
      ],
      fonts: [
        { name: "Young Serif", role: "Display · Hero headings · Name · Logotype · Impact statements" },
        { name: "Instrument Serif", role: "Section headings · Pull quotes · Italic emphasis · Editorial tone" },
        { name: "Inter", role: "Body copy · Labels · Nav items · Captions · UI elements" },
      ],
      tools: [
        { icon: <SiFigma />, label: "Figma" },
      ],
    },
    gallery: [arielle1, arielle2, arielle3, arielle4, arielle5, arielle6, arielle7, arielle8],
    figmaUrl: "https://www.figma.com/proto/iJYpGFpGr3p2PmPPBTpUYW/Portfolio-Website-%E2%80%94-Lady-Arielle?node-id=9-145&p=f&t=UElfOglUmcC5MkVE-0&scaling=scale-down-width&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=9%3A145",
    testimonial: {
      quote: "I highly recommend Mr. Russell Aguilar for his excellent work and professionalism. He created my portfolio beautifully and was very responsive, accommodating, and easy to work with. He listened carefully to my ideas, welcomed revisions, and delivered results that exceeded my expectations.",
      name: "Lady Arielle",
      role: "Marketing Portfolio Website",
      avatar: ladyAvatar,
      rating: 5.0,
    },
    next: "laconslanet",
    prev: "virielle",
  },
  {
    id: "laconslanet",
    number: "04",
    title: "LaConsolaNet!",
    subtitle: "Social media web app UI/UX redesign",
    client: "Capstone Team",
    timeline: "Feb 2026",
    role: "UI/UX Redesign",
    industry: "Social Platform",
    type: "Capstone Project",
    image: laconslanet5,
    logo: laconslanetLogo,
    bgColor: "#0d3052",
    accentColor: "#c7f000",
    services: ["Web App Design", "UI Redesign", "Mobile UX", "Design System"],
    overviewParagraphs: [
      "LaConsolaNet! had a working system — real features, real users, real institutional value. What it needed was an interface that communicated that credibility immediately.",
      "The original design looked more like a generic web project than a trusted school communication platform. The goal was to make it feel like something LCUP students would actually trust and use.",
      "My role covered the full redesign scope: web app UI, mobile screens, and a landing page — all delivered in 3–5 days after studying the system's full feature set, user flows, and capstone research paper.",
    ],
    challengeParagraphs: [
      "The original interface didn't reflect the platform's actual depth. LaConsolaNet! had five content categories, role-based access control, a content moderation queue, an analytics dashboard, and administrator-managed approval workflows — but none of that complexity was communicated clearly through the UI.",
      "The color palette and visual language felt generic — more like a student project than a platform you'd trust with official school announcements. For an institution-facing system, visual credibility matters. If it doesn't look trustworthy, it won't be used.",
      "The evaluators would form opinions in minutes. The mobile version wasn't ready. The web app needed stronger hierarchy. The landing page didn't exist. All of this had to be addressed before defense day.",
    ],
    challengePoints: [
      "Visual language felt generic — didn't communicate institutional trust",
      "Original color system didn't match LCUP's brand or a credible school platform",
      "Feed hierarchy unclear — post categories competed for equal attention",
      "Inconsistent component styling across screens",
      "Mobile layout not ready for defense presentation",
      "No landing page existed to introduce the platform to evaluators",
      "Navigation patterns didn't reflect the platform's five-category structure",
      "No unified design language across web, mobile, and promotional materials",
    ],
    researchParagraphs: [
      "Before touching any screen, I read through their full capstone research paper. LaConsolaNet! had a clearly defined problem statement, a real institutional gap, and a well-thought-out feature set. My job was to make the interface match the quality of the thinking behind it.",
      "I studied the system's five content categories — Campus Wall, Announcements, School News, Lost and Found, and Birthday Greetings — and how each had different posting and moderation rules. That content architecture shaped every layout decision: the sidebar navigation, the feed structure, the admin dashboard hierarchy.",
      "I also looked at the existing screens to understand what the team had built. The features were solid. The UI just needed a visual language that made those features feel intentional — not like placeholder styling.",
    ],
    researchMethods: [
      "Full read-through of the LaConsolaNet! capstone research paper (Chapter I–V)",
      "Feature and flow analysis across all five content categories",
      "Review of existing web app screens to identify hierarchy and consistency gaps",
      "Study of LCUP's brand colors and institutional identity for design alignment",
      "Figma-based redesign covering web app, mobile, and landing page",
    ],
    beforeAfter: [
      { label: "Before", points: ["Generic visual language, no institutional feel", "Flat color system with no hierarchy signal", "Inconsistent component styling", "No mobile-ready screens", "No landing page for platform introduction"] },
      { label: "After", points: ["LCUP-aligned color system and typography", "Clear visual hierarchy across all content categories", "Unified component language across web and mobile", "iPhone 14/15 Pro Max mobile screens for defense", "Full landing page with feature sections and CTA"] },
    ],
    beforeAfterShowcase: {
      intro:
        "A screen-by-screen view of the redesign: login, dashboard, and the landing-page entry point that the original system did not have.",
      screens: [
        {
          id: "landing",
          eyebrow: "Screen 01",
          title: "Landing page",
          before: {
            variant: "landing",
            title: "No dedicated landing page",
            caption:
              "The original project did not have a proper entry page to explain the product before users reached the app.",
          },
          after: {
            image: laconslanetLandingAfter,
            title: "Product introduction page",
            caption:
              "The added landing page frames LaConsolaNet as an official campus platform with a clear hero, CTA, and product preview.",
          },
        },
        {
          id: "login",
          eyebrow: "Screen 02",
          title: "Login page",
          before: {
            image: laconslanetLoginBefore,
            title: "Functional sign-in",
            caption:
              "The old login flow handled access, but it did not immediately communicate the LCUP identity or the purpose of the platform.",
          },
          after: {
            image: laconslanetLoginAfter,
            title: "Branded authentication",
            caption:
              "The redesign gave the sign-in experience stronger campus context, clearer form hierarchy, and a more presentation-ready look.",
          },
        },
        {
          id: "dashboard",
          eyebrow: "Screen 03",
          title: "Dashboard and home feed",
          before: {
            image: laconslanetDashboardBefore,
            title: "Unclear content hierarchy",
            caption:
              "The feed needed clearer separation between categories, navigation, posting, and department content.",
          },
          after: {
            image: laconslanetDashboardAfter,
            title: "Structured social dashboard",
            caption:
              "The new layout organizes the feed, school departments, posting tools, and navigation into a familiar social-platform structure.",
          },
        },
      ],
    },
    industryParagraphs: [
      "Social platforms live by the rule of familiarity. Users expect certain patterns — feed, notifications, profile, compose — and deviation creates friction, not delight.",
      "For a capstone defense, the interface is an argument. Evaluators are assessing whether the team understands their users. A clean, conventional UI is the clearest proof.",
      "The best social product redesigns don't reinvent patterns — they execute familiar patterns with more clarity and consistency.",
      "LaConsolaNet! was developed as an institution-exclusive platform for La Consolacion University Philippines — addressing a real communication gap where LCUP had no single, administrator-controlled digital channel. Announcements competed with personal content on Facebook. Official information reached students inconsistently. The team built a category-based, moderated social platform on the MERN stack to solve exactly that.",
    ],
    industryStats: [
      { value: "8+", label: "Screens redesigned" },
      { value: "2", label: "Device contexts" },
      { value: "1", label: "Unified UI direction" },
      { value: "4hr", label: "Defense-ready turnaround" },
    ],
    approachParagraphs: [
      "I read their entire research paper first. Understanding the system's problem statement, evaluation framework, and feature rationale before opening Figma meant every design decision had a reason behind it.",
      "The visual direction came from two sources: LCUP's institutional identity (blue and orange) and the mental model users already have of social platforms. Familiar patterns, institutional colors, stronger hierarchy — that combination made the redesign feel both trustworthy and immediately usable.",
      "I worked across three deliverables in parallel: the web app screens, iPhone 14/15 Pro Max mobile layouts, and a landing page. Each needed to feel like the same product at different screen sizes — not three separate design exercises.",
    ],
    approachSteps: [
      { num: "01", title: "Research & Feature Study", desc: "Read the full capstone paper and audited existing screens — mapping every feature, flow, and moderation rule before designing a single frame." },
      { num: "02", title: "Visual Direction", desc: "Established a color system anchored in LCUP blue and orange, with a typographic scale and component language that communicated institutional credibility." },
      { num: "03", title: "Web App Redesign", desc: "Rebuilt the feed, sidebar navigation, admin dashboard, and category pages with clear visual hierarchy and consistent component styling." },
      { num: "04", title: "Mobile Screens", desc: "Designed iPhone 14/15 Pro Max layouts for the defense presentation — thumb-zone optimized navigation, mobile-first feed structure, and full feature parity with the web version." },
      { num: "05", title: "Landing Page", desc: "Created a multi-section landing page introducing LaConsolaNet! to evaluators — hero, features, how-it-works, and CTA — giving the platform a professional entry point it didn't have before." },
    ],
    solutionParagraphs: [
      "The web app redesign reorganized content into a three-column layout — left sidebar navigation with the five category links, center feed with clear post hierarchy, right sidebar with School Department links. Familiar social platform structure, applied with LCUP's institutional colors.",
      "The mobile screens were designed specifically for iPhone 14/15 Pro Max and presented two key flows: the home feed and the announcement category. Bottom navigation followed thumb-zone conventions. The visual system matched the web version exactly.",
      "The landing page gave evaluators a proper introduction to the platform — what it is, why it exists, what it does differently from mainstream social media. It opened with a strong hero section featuring the LaConsolaNet! interface on device mockups, followed by a features overview and a get-started CTA.",
      "All three deliverables — web, mobile, and landing page — were completed and handed off within 3–5 days of receiving the brief.",
    ],
    solutionFeatures: [
      { title: "Web App UI Redesign", desc: "Full redesign of the home feed, category pages, sidebar navigation, and admin dashboard — unified under a consistent component system in LCUP's orange and blue." },
      { title: "Mobile Screens — iPhone 14 & 15 Pro Max", desc: "Two mobile frames covering the home feed and announcement flow, thumb-zone optimized with bottom navigation and full feature parity with the web version." },
      { title: "Landing Page", desc: "Multi-section landing page introducing LaConsolaNet! to evaluators — hero with device mockups, features overview, how-it-works section, and a get-started CTA." },
      { title: "LCUP-Aligned Visual Language", desc: "Color system anchored in LCUP orange (#E8670A) and deep navy (#0D2472), with flat icon illustrations and consistent typography across all three deliverables." },
      { title: "Gradient System", desc: "Three-stop gradient — #E8670A orange to #3C2F76 mid blue to #0D2472 deep navy — used across the hero, cards, and key UI surfaces to create visual depth and brand cohesion." },
      { title: "Figma Deliverable", desc: "All screens designed in Figma using the Flat Icons plugin and React Icons plugin for consistent iconography — handed off ready for developer implementation." },
    ],
    reflectionParagraphs: [
      "This project reinforced a lesson: when the audience is evaluators, not users, the interface needs to communicate the designer's thinking, not just the product's function.",
      "The team's confidence in presenting increased significantly once they had a system they could explain — not just show. They came in knowing the system was good. The redesign made it look like it.",
      "The most impactful change wasn't a single screen. It was the visual system — establishing LCUP's colors and a consistent component language that made every screen feel intentional rather than assembled.",
      "If I were to revisit this, I'd spend more time on the admin dashboard hierarchy — the content moderation queue and analytics views are where administrators spend most of their time, and those screens had the most room for further refinement.",
    ],
    outcomes: [
      "Cleaner product story for capstone defense",
      "Improved mobile screen layouts",
      "Unified design language across web and mobile",
      "Team reported higher evaluator confidence",
    ],
    metrics: [
      { value: "8+", label: "Screens redesigned" },
      { value: "2", label: "Device contexts" },
      { value: "1", label: "Unified UI direction" },
    ],
    designSystem: {
      colors: [
        { name: "Mid Blue", value: "#3C2F76" },
        { name: "Deep Navy", value: "#0D2472" },
        { name: "Light Blue", value: "#678AFF" },
        { name: "White", value: "#FFFFFF" },
        { name: "Stroke", value: "#FFFFFF" },
      ],
      fonts: [
        { name: "Inter Heavy", role: "Display · Hero headings · Section titles · Impact statements" },
        { name: "Inter Medium", role: "Subheadings · Meta labels · Button text · Card titles" },
        { name: "Inter Regular", role: "Body copy · Labels · Nav items · Captions · UI elements" },
        { name: "Geist Mono", role: "Numbers · Stats · Analytics values · Code-style labels" },
      ],
      tools: [
        { icon: <SiFigma />, label: "Figma" },
      ],
    },
    gallery: [laconslanet1, laconslanet2, laconslanet3, laconslanet4, laconslanet5],
    figmaUrl: null,
    testimonial: {
      quote: "We went to Mr. Russell because we needed a UI/UX redesign before our defense — for the web app, mobile version, and even our research poster. He immediately understood the concept of LaConsolaNet without needing too much explanation. The glow-up was incredible. Highly recommended.",
      name: "Czar Bjorn Medina & Team",
      role: "Capstone Client · UI/UX Redesign, Mobile & Research Poster",
      avatar: czarAvatar,
      rating: 4.9,
    },
    next: "qrush",
    prev: "lady-arielle",
  },
];

// ── Inline color swatch ───────────────────────────────────────────────────────
function ColorChip({ hex }) {
  return (
    <span className="pc-inline-chip">
      <span className="pc-inline-chip__dot" style={{ background: hex }} />
      <span className="pc-inline-chip__hex">{hex}</span>
    </span>
  );
}

// ── Inline font label ─────────────────────────────────────────────────────────
function FontChip({ name, style = {} }) {
  return (
    <span className="pc-inline-font" style={style}>{name}</span>
  );
}

// ── Stars renderer ───────────────────────────────────────────────────────────
function StarRating({ rating, id }) {
  return (
    <div className="pc-stars" aria-label={`Rating: ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        const gid = `star-${id}-${i}`;
        return (
          <svg key={i} className="pc-star" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset={`${fill * 100}%`} stopColor="#f4b942" />
                <stop offset={`${fill * 100}%`} stopColor="#d4d4d4" />
              </linearGradient>
            </defs>
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill={`url(#${gid})`}
            />
          </svg>
        );
      })}
      <span className="pc-rating-num">{rating.toFixed(1)}</span>
    </div>
  );
}

function BeforeAfterShowcase({ showcase }) {
  const renderWireframe = (variant) => {
    if (variant === "login") {
      return (
        <div className="pc-ba-wireframe pc-ba-wireframe--login" aria-label="Old login screen skeleton">
          <div className="pc-ba-wireframe__topbar">
            <span />
            <span />
            <span />
          </div>
          <div className="pc-ba-wireframe__login-card">
            <i className="pc-ba-wireframe__mark" />
            <b />
            <p />
            <em />
            <em />
            <i className="pc-ba-wireframe__button" />
          </div>
        </div>
      );
    }

    if (variant === "dashboard") {
      return (
        <div className="pc-ba-wireframe pc-ba-wireframe--dashboard" aria-label="Old dashboard screen skeleton">
          <div className="pc-ba-wireframe__topbar">
            <span />
            <span />
            <span />
          </div>
          <div className="pc-ba-wireframe__dashboard">
            <aside>
              <i />
              <i />
              <i />
              <i />
            </aside>
            <main>
              <b />
              <p />
              <article>
                <span />
                <span />
                <span />
              </article>
            </main>
            <section>
              <i />
              <i />
              <i />
            </section>
          </div>
        </div>
      );
    }

    return (
      <div className="pc-ba-wireframe pc-ba-wireframe--landing pc-ba-wireframe--loading" aria-label="Missing landing page skeleton">
        <div className="pc-ba-wireframe__topbar">
          <span />
          <span />
          <span />
        </div>
        <div className="pc-ba-wireframe__empty">
          <b>No dedicated landing page</b>
          <p>Users entered the product without a clear introduction, value proposition, or CTA.</p>
          <i />
        </div>
      </div>
    );
  };

  const renderPane = (side, tone) => (
    <div className={`pc-ba-pane pc-ba-pane--${tone}`}>
      <div className="pc-ba-pane__header">
        <span className="pc-ba-pane__stage">{tone}</span>
        <strong>{side.title}</strong>
      </div>
      <div className="pc-ba-pane__visual">
        {side.image ? (
          <img src={side.image} alt={side.title} />
        ) : (
          renderWireframe(side.variant)
        )}
      </div>
    </div>
  );

  return (
    <div className="pc-compare-showcase pc-sr">
      <p className="pc-compare-intro">{showcase.intro}</p>
      <div className="pc-ba-screen-list">
        {showcase.screens.map((screen) => (
          <article className="pc-ba-screen" key={screen.id}>
            <div className="pc-ba-screen__summary">
              <span>{screen.eyebrow}</span>
              <h3>{screen.title}</h3>
            </div>

            <div className="pc-ba-screen__labels" aria-hidden="true">
              <span>Before</span>
              <span>After</span>
            </div>

            <div className="pc-ba-screen__compare">
              {renderPane(screen.before, "before")}
              <span className="pc-ba-screen__divider" aria-hidden="true">
                <i />
              </span>
              {renderPane(screen.after, "after")}
            </div>

            <div className="pc-ba-screen__notes">
              <p><span>Before</span>{screen.before.caption}</p>
              <p><span>After</span>{screen.after.caption}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

// ── Sticky Section Label with GSAP scroll follow ─────────────────────────────
function StickySection({ label, children, id }) {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || !labelRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 30%",
      end: "bottom 50%",
      pin: labelRef.current,
      pinSpacing: false,
    });

    return () => trigger.kill();
  }, []);
  return (
    <div className="pc-sticky-section" id={id} ref={sectionRef}>
      <div className="pc-sticky-label-col">
        <span className="pc-sticky-label" ref={labelRef}>{label}</span>
      </div>
      <div className="pc-sticky-content-col">
        {children}
      </div>
    </div>
  );
}


function ProjectNav({ prevProject, nextProject }) {
  const [hovered, setHovered] = useState(null);
  const [rect, setRect] = useState(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const hoveredRef = useRef(null);
  const rafRef = useRef(null);

  const readRect = () => {
    if (!hoveredRef.current) return;
    const ref = hoveredRef.current === "prev" ? prevRef : nextRef;
    if (ref.current) {
      const r = ref.current.getBoundingClientRect();
      setRect({ top: r.top, left: r.left, right: r.right, which: hoveredRef.current });
    }
    rafRef.current = requestAnimationFrame(readRect);
  };

const isTouchDevice = () => window.matchMedia("(hover: none)").matches;

  const handleEnter = (which) => {
    if (isTouchDevice()) return;
    hoveredRef.current = which;
    setHovered(which);
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(readRect);
  };

  const handleLeave = () => {
    if (isTouchDevice()) return;
    hoveredRef.current = null;
    cancelAnimationFrame(rafRef.current);
    setHovered(null);
    setRect(null);
  };

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);
  return (
    <>
      {createPortal(
        <div style={{
          position: "fixed",
          top: rect ? rect.top - 16 : 0,
          transform: "translateY(-100%)",
          left: rect?.which === "prev" ? rect.left : "auto",
          right: rect?.which === "next" ? window.innerWidth - rect.right : "auto",
          width: 320,
          borderRadius: 14,
          overflow: "hidden",
          boxShadow: "0 12px 40px rgba(0,0,0,0.28)",
          opacity: hovered ? 1 : 0,
          pointerEvents: "none",
          transition: "opacity 0.2s ease",
          zIndex: 999999,
        }}>
          {hovered && (
            <img
              src={hovered === "prev" ? prevProject.image : nextProject.image}
              alt=""
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          )}
        </div>,
        document.body
      )}
      <nav className="pc-project-nav pc-sr">
        <Link
          to={`/projects/${prevProject.id}`}
          className="pc-project-nav__item"
          ref={prevRef}
          onMouseEnter={() => handleEnter("prev")}
          onMouseLeave={handleLeave}
        >
          <span className="pc-project-nav__dir">PREVIOUS</span>
          <strong className="pc-project-nav__name">{prevProject.title}</strong>
        </Link>
        <Link
          to={`/projects/${nextProject.id}`}
          className="pc-project-nav__item pc-project-nav__item--next"
          ref={nextRef}
          onMouseEnter={() => handleEnter("next")}
          onMouseLeave={handleLeave}
        >
          <span className="pc-project-nav__dir">NEXT</span>
          <strong className="pc-project-nav__name">{nextProject.title}</strong>
        </Link>
      </nav>
    </>
  );
}
// ── Gallery Carousel ─────────────────────────────────────────────────────────

// ── Gallery Carousel ─────────────────────────────────────────────────────────
function GalleryCarousel({ images, title, actionHref, websiteHref }) {
  const trackRef = useRef(null);
  const [current, setCurrent] = useState(0);

  const go = (dir) => {
    setCurrent((prev) => (prev + dir + images.length) % images.length);
  };

  useEffect(() => {
    if (!trackRef.current) return;
    gsap.to(trackRef.current, { x: `-${current * 100}%`, duration: 0.65, ease: "power3.out" });
  }, [current]);

  return (
    <div className="pc-gallery">
      <div className="pc-prototype-frame">
        <div className="pc-prototype-inner">
          <div className="pc-gallery__viewport">
            <div className="pc-gallery__track" ref={trackRef}>
              {images.map((src, i) => (
                <div className="pc-gallery__slide" key={i}>
                  <img src={src} alt={`${title} screenshot ${i + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="pc-gallery__controls">
        <div className="pc-gallery__nav">
          <button className="pc-gallery__btn" onClick={() => go(-1)} aria-label="Previous image">
            <MdOutlineArrowBackIos />
          </button>
          <div className="pc-gallery__dots">
            {images.map((_, i) => (
              <button
                key={i}
                className={`pc-gallery__dot ${i === current ? "pc-gallery__dot--active" : ""}`}
                onClick={() => setCurrent(i)}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
          <button className="pc-gallery__btn" onClick={() => go(1)} aria-label="Next image">
            <MdOutlineArrowForwardIos />
          </button>
        </div>
        {actionHref && (
          <a
            href={actionHref}
            target="_blank"
            rel="noopener noreferrer"
            className="pc-proto-link"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            <span>Open in Figma Prototype</span>
          </a>
        )}
        {websiteHref && (
          <a
            href={websiteHref}
            target="_blank"
            rel="noopener noreferrer"
            className="pc-proto-link"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span>Visit Website</span>
          </a>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════════════════
function Projects() {
  const { projectId } = useParams();
  const pageRef = useRef(null);
  const smootherRef = useRef(null);

  const activeIndex = Math.max(0, CASE_STUDIES.findIndex((p) => p.id === projectId));
  const project = CASE_STUDIES[activeIndex];
  const prevProject = CASE_STUDIES.find((p) => p.id === project.prev);
  const nextProject = CASE_STUDIES.find((p) => p.id === project.next);

  useEffect(() => { window.scrollTo({ top: 0, left: 0 }); }, [project.id]);

  useEffect(() => {
    const existing = ScrollSmoother.get();
    if (existing) existing.kill();

    const smoother = ScrollSmoother.create({
      wrapper: "#proj-smooth-wrapper",
      content: "#proj-smooth-content",
      smooth: 1.35,
      effects: true,
      smoothTouch: 0.08,
    });
    smootherRef.current = smoother;

    ScrollTrigger.refresh();
    return () => { smoother.kill(); };
  }, [project.id]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.fromTo(".pc-hero-reveal",
        { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0, duration: 1, stagger: 0.12, ease: "power3.out", delay: 0.15 }
      );

      // Scroll reveals
      gsap.utils.toArray(".pc-sr").forEach((el) => {
        gsap.fromTo(el,
          { autoAlpha: 0, y: 32 },
          {
            autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
          }
        );
      });

      // Stats counter pop
      gsap.utils.toArray(".pc-stat-val").forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          onEnter: () => el.classList.add("pc-stat-val--animate"),
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, [project.id]);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".parallax-reveal-section",
          start: "top 120%",
          end: "bottom 100%",
          scrub: 0.8,
        },
      });

      tl.fromTo(
        ".parallax-reveal-card",
        { clipPath: "inset(0% 40% 0% 40% round 36px)" },
        { clipPath: "inset(0% 0% 0% 0% round 28px)", ease: "none" }
      );

      tl.fromTo(
        ".parallax-reveal-card",
        { scale: 1.6, y: 200 },
        { scale: 1, y: 0, ease: "none" },
        0
      );
    }, pageRef);

    return () => ctx.revert();
  }, [project.id]);
  return (
    <div className="pc-page" ref={pageRef}>

      {/* ── SMOOTH WRAPPER ──────────────────────────────────────────────────── */}
      <div id="proj-smooth-wrapper">
        <div id="proj-smooth-content">

          {/* ── HERO ────────────────────────────────────────────────────────── */}
          <section className="pc-hero">
            <div className="pc-hero__header pc-hero-reveal">
              <Link to="/" className="contact-back-btn" aria-label="Back to Portfolio">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M5 12l7 7M5 12l7-7" />
                </svg>
                <span>Back to Portfolio</span>
              </Link>
            </div>

            <div className="pc-hero__body">
              <div className="pc-hero__left pc-hero-reveal">
                <span className="pc-hero__category">{project.type.toUpperCase()}</span>
                <h1 className="pc-hero__title">{project.subtitle}</h1>
                <p className="pc-hero__lead">
                  {project.overviewParagraphs[0]}
                </p>
              </div>
              <div className="pc-hero__meta pc-hero-reveal">
                <div className="pc-meta-grid">
                  <div className="pc-meta-item">
                    <span className="pc-meta-key">CLIENT</span>
                    <span className="pc-meta-val">{project.client}</span>
                  </div>
                  <div className="pc-meta-item">
                    <span className="pc-meta-key">TIMELINE</span>
                    <span className="pc-meta-val">{project.timeline}</span>
                  </div>
                  <div className="pc-meta-item">
                    <span className="pc-meta-key">ROLE</span>
                    <span className="pc-meta-val">{project.role}</span>
                  </div>
                  <div className="pc-meta-item">
                    <span className="pc-meta-key">INDUSTRY</span>
                    <span className="pc-meta-val">{project.industry}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

   <div className="pc-hero-marquee-wrap pc-hero-reveal">
            <div className="pc-hero-marquee__track">
              {[...project.gallery, ...project.gallery].map((src, i) => (
                <div className="pc-hero-marquee__slide" key={i}>
                  <img src={src} alt={`${project.title} screen ${i + 1}`} draggable={false} />
                </div>
              ))}
            </div>
          </div>
          {/* ── OVERVIEW ────────────────────────────────────────────────────── */}
          <StickySection label="OVERVIEW" id="overview">
            <div className="pc-prose-block pc-sr">
              {project.overviewParagraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </StickySection>

          {/* ── THE PROBLEM ──────────────────────────────────────────────────── */}
          {project.problemParagraphs && (
            <StickySection label="THE PROBLEM" id="problem">
              <div className="pc-prose-block pc-sr">
                {project.problemParagraphs.map((p, i) => <p key={i}>{p}</p>)}
                {project.problemPoints && (
                  <>
                    <hr className="pc-divider" />
                    <span className="pc-sub-eyebrow">DOCUMENTED PAIN POINTS</span>
                    <ul className="pc-bullet-list">
                      {project.problemPoints.map((pt, i) => <li key={i}>{pt}</li>)}
                    </ul>
                  </>
                )}
              </div>
            </StickySection>
          )}

          {/* ── THE CHALLENGE ────────────────────────────────────────────────── */}
          <StickySection label="THE CHALLENGE" id="challenge">
            <div className="pc-prose-block pc-sr">
              {project.challengeParagraphs.map((p, i) => <p key={i}>{p}</p>)}
              {project.challengePoints && (
                <>
                  <hr className="pc-divider" />
                  <span className="pc-sub-eyebrow">KEY PAIN POINTS</span>
                  <ul className="pc-bullet-list">
                    {project.challengePoints.map((pt, i) => <li key={i}>{pt}</li>)}
                  </ul>
                </>
              )}
            </div>
          </StickySection>

          {project.beforeAfterShowcase && (
            <StickySection label="BEFORE / AFTER" id="before-after-showcase">
              <BeforeAfterShowcase showcase={project.beforeAfterShowcase} />
            </StickySection>
          )}

          {/* ── USER RESEARCH ────────────────────────────────────────────────── */}
          {project.researchParagraphs && (
            <StickySection label="USER RESEARCH" id="research">
              <div className="pc-prose-block pc-sr">
                {project.researchParagraphs.map((p, i) => <p key={i}>{p}</p>)}
                {project.researchMethods && (
                  <>
                    <hr className="pc-divider" />
                    <span className="pc-sub-eyebrow">RESEARCH METHODS</span>
                    <ul className="pc-bullet-list">
                      {project.researchMethods.map((m, i) => <li key={i}>{m}</li>)}
                    </ul>
                  </>
                )}
                {project.beforeAfter && (
                  <>
                    <hr className="pc-divider" />
                    <span className="pc-sub-eyebrow">BEFORE → AFTER</span>
                    <div className="pc-before-after">
                      {project.beforeAfter.map((col) => (
                        <div key={col.label} className={`pc-ba-col pc-ba-col--${col.label.toLowerCase()}`}>
                          <span className="pc-ba-label">{col.label}</span>
                          <ul className="pc-bullet-list">
                            {col.points.map((pt, i) => <li key={i}>{pt}</li>)}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </StickySection>
          )}

          {/* ── INDUSTRY CONTEXT / STATS ─────────────────────────────────────── */}
          <StickySection label="INDUSTRY CONTEXT" id="context">
            <div className="pc-prose-block pc-sr">
              {project.industryParagraphs.map((p, i) => <p key={i}>{p}</p>)}
              <hr className="pc-divider" />
              <div className="pc-stats-grid">
                {project.industryStats.map((s) => (
                  <div className="pc-stat-item" key={s.label}>
                    <span className="pc-stat-val">{s.value}</span>
                    <span className="pc-stat-label">{s.label.toUpperCase()}</span>
                  </div>
                ))}
              </div>
            </div>
          </StickySection>

          {/* ── THE APPROACH ─────────────────────────────────────────────────── */}
          <StickySection label="THE APPROACH" id="approach">
            <div className="pc-prose-block pc-sr">
              {project.approachParagraphs.map((p, i) => <p key={i}>{p}</p>)}
              <hr className="pc-divider" />
              <div className="pc-steps-list">
                {project.approachSteps.map((s) => (
                  <div className="pc-step" key={s.num}>
                    <span className="pc-step-num">{s.num}</span>
                    <div className="pc-step-body">
                      <strong className="pc-step-title">{s.title}</strong>
                      <p className="pc-step-desc">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </StickySection>

          {/* ── THE SOLUTION ─────────────────────────────────────────────────── */}
          <StickySection label="THE SOLUTION" id="solution">
            <div className="pc-prose-block pc-sr">
              {project.solutionParagraphs.map((p, i) => <p key={i}>{p}</p>)}
              <hr className="pc-divider" />
              <div className="pc-features-list">
                {project.solutionFeatures.map((f) => (
                  <div className="pc-feature" key={f.title}>
                    <strong className="pc-feature-title">{f.title}</strong>
                    <p className="pc-feature-desc">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </StickySection>

          {/* ── DESIGN SYSTEM ────────────────────────────────────────────────── */}
          {project.designSystem && (
            <StickySection label="DESIGN SYSTEM" id="design-system">
              <div className="pc-prose-block pc-sr">
                <span className="pc-sub-eyebrow">COLOR PALETTE</span>
                <div className="pc-ds-colors">
                  {project.designSystem.colors.map((c) => (
                    <div className="pc-ds-swatch" key={c.name}>
                      <div className="pc-ds-swatch__block" style={{ background: c.value }} />
                      <span className="pc-ds-swatch__name">{c.name}</span>
                      <span className="pc-ds-swatch__val">{c.value}</span>
                    </div>
                  ))}
                </div>

                <hr className="pc-divider" />
                <span className="pc-sub-eyebrow">TYPOGRAPHY</span>
                <div className="pc-ds-fonts">
                  {project.designSystem.fonts.map((f, i) => (
                    <div className="pc-ds-font-card" key={i}>
                      <span className="pc-ds-font-name">{f.name}</span>
                      <span
                        className="pc-ds-font-preview"
                        style={{ fontFamily: `'${f.name}', serif` }}
                      >
                        Aa
                      </span>
                      <span className="pc-ds-font-role">{f.role}</span>
                    </div>
                  ))}
                </div>

                {project.designSystem.tokens && (
                  <>
                    <hr className="pc-divider" />
                    <span className="pc-sub-eyebrow">DESIGN TOKENS</span>
                    <div className="pc-ds-tokens">
                      {project.designSystem.tokens.map((t) => (
                        <div className="pc-ds-token-group" key={t.category}>
                          <strong className="pc-ds-token-cat">{t.category}</strong>
                          <ul className="pc-ds-token-list">
                            {t.items.map((item, i) => <li key={i}>{item}</li>)}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                <hr className="pc-divider" />
                <span className="pc-sub-eyebrow">TECH STACK</span>
                <div className="pc-ds-tools">
                  {project.designSystem.tools.map((tool, i) => (
                    <div className="pc-ds-tool" key={i}>
                      {tool.icon}
                      <span className="pc-ds-tool__label">{tool.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </StickySection>
          )}

          {/* ── DESIGN SCREENS ───────────────────────────────────────────────── */}
          <StickySection label="DESIGN SCREENS" id="prototype">
            <div className="pc-prose-block pc-sr">
              <p>Sample screens from the final system — covering key resident and staff flows. Open the Figma prototype link below to explore the full interactive flow.</p>
              <GalleryCarousel images={project.gallery} title={project.title} actionHref={project.figmaUrl} websiteHref={project.websiteUrl} />
            </div>
          </StickySection>
          {/* ── THE RESULT ───────────────────────────────────────────────────────── */}
          <div className="pc-result-section">
            <StickySection label="THE RESULT" id="result">
              <div className="pc-prose-block pc-sr">
                <ul className="pc-result-list">
                  {project.outcomes.map((o, i) => (
                    <li key={i}>
                      <span className="pc-result-num">{String(i + 1).padStart(2, "0")}</span>
                      <span className="pc-result-text">{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </StickySection>
          </div>
          {/* ── REFLECTION ───────────────────────────────────────────────────── */}
          <StickySection label="REFLECTION" id="reflection">
            <div className="pc-prose-block pc-prose-block--italic pc-sr">
              {project.reflectionParagraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </StickySection>

          {/* ── TESTIMONIAL ─────────────────────────────────────────────────── */}
          <section className="pc-testi-section pc-sr">
            <div className="pc-testi-inner">
              <StarRating rating={project.testimonial.rating} id={project.id} />
              <blockquote className="pc-testi-quote">"{project.testimonial.quote}"</blockquote>
              <div className="pc-testi-author">
                <div className="pc-testi-avatar">
                  {project.testimonial.avatar
                    ? <img src={project.testimonial.avatar} alt={project.testimonial.name} />
                    : <span>{project.testimonial.name.split(" ").map((n) => n[0]).join("")}</span>
                  }
                </div>
                <div className="pc-testi-info">
                  <strong>{project.testimonial.name}</strong>
                  <span>{project.testimonial.role}</span>
                </div>
              </div>
            </div>
          </section>

          {/* ── PREV / NEXT ──────────────────────────────────────────────────── */}
          <ProjectNav prevProject={prevProject} nextProject={nextProject} />
          {/* ── CTA SECTION ─────────────────────────────────────────────────── */}
          <section className="parallax-reveal-section">
            <div className="parallax-reveal-sticky">
              <div className="parallax-reveal-card">
                <h2 className="cta-title">
                  Looking for a <span className="highlight">UI/UX designer</span>?
                </h2>
                <p className="cta-description">
                  I create user-focused digital experiences that combine research, design strategy, and smooth Figma-to-code execution. Always ready to bring ideas to life in UI/UX and web design projects.
                </p>
                <div className="cta-actions">
                  <a href="/contact-me" className="cta-button">Let's Work Together</a>
                  <a href="/resume.pdf" className="cta-buttons1" download>Download CV</a>
                </div>
              </div>
            </div>
          </section>


        </div>
      </div>
    </div>
  );
}

export default Projects;
