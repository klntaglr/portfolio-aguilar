import { useEffect, useRef, useState } from "react";
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
} from "react-icons/si";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";

// ── assets ─────────────────────────────────────────────────────────────────
import arielleProject  from "../assets/arielleproject.png";
import bangkaLogo      from "../assets/bangka.png";
import bangkalProject  from "../assets/bangkalproject.png";
import blueBackground  from "../assets/blue1.png";
import laconslanetLogo from "../assets/laconslanet.png";
import laconslanetProject from "../assets/laconslanetproject.png";
import ladyLogo        from "../assets/lady.png";
import logo            from "../assets/logo.png";
import virielleProject from "../assets/virielleproject.png";
import viriellesLogo   from "../assets/virielles.png";
import nammerAvatar    from "../assets/nammer1.png";
import ladyAvatar      from "../assets/ladyclient.jpg";
import czarAvatar      from "../assets/czar.jpg";
import ellaAvatar      from "../assets/ella.jpg";

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
    image: bangkalProject,
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
    industryContext:
      "Government digital services are consistently rated lowest in user satisfaction. The gap between expectation and delivery is widest here — and the opportunity for impact is greatest.",
    industryParagraphs: [
      "Government digital services are consistently rated lowest in user satisfaction surveys. Citizens expect the same quality of digital experience from their barangay that they get from private apps.",
      "The gap between expectation and delivery is widest in local government — and the opportunity for meaningful impact is greatest precisely because the bar is so low.",
      "Systems that reduce friction in civic processes have compounding effects: faster service, higher trust, reduced workload for staff.",
    ],
    industryStats: [
      { value: "4x", label: "Faster request processing" },
      { value: "100%", label: "Responsive coverage" },
      { value: "2", label: "Primary user roles" },
      { value: "0", label: "In-person visits required" },
    ],
    approach:
      "I mapped the full request journey from submission to claiming, prioritised the highest-frequency actions in the interface, and built a responsive system that keeps both staff and residents informed at every step.",
    approachParagraphs: [
      "The design process started with the resident's mental model. What do they expect to happen after they submit a request? That expectation shaped every status state and notification in the system.",
      "I designed around visibility: clear status states, predictable steps, strong confirmation feedback, and mobile-first public access.",
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
      "The final system separates the resident and staff experiences into distinct but connected flows. Residents get a clean submission form, real-time tracking, and SMS notifications. Staff get a dashboard that surfaces urgency without requiring manual sorting.",
      "QR-based validation replaced the manual signature check — the single biggest bottleneck in the original process. Document pickup is now verified in seconds instead of minutes.",
      "The mobile-first public portal means residents never need to visit the office just to check status. The office visit is reserved for claiming — and even that is now predictable.",
    ],
    solutionFeatures: [
      { title: "Online Request Portal", desc: "Residents submit requests from any device without visiting the office." },
      { title: "Real-time Status Tracking", desc: "Every request has a live status visible to both resident and staff." },
      { title: "QR Document Validation", desc: "Instant verification at pickup replaces manual signature checks." },
      { title: "Staff Action Dashboard", desc: "Prioritized queue helps staff process requests efficiently." },
    ],
    reflection:
      "The biggest lesson from QRUSH: the UX problem was hidden inside a logistics complaint. Residents didn't say 'the interface is confusing' — they said 'I don't know what's happening with my request.' That's a visibility problem, not a process problem.",
    reflectionParagraphs: [
      "The biggest lesson from QRUSH: the UX problem was hidden inside a logistics complaint. Residents didn't say 'the interface is confusing' — they said 'I don't know what's happening with my request.' That's a visibility problem, not a process problem.",
      "Designing for low-digital-literacy users requires removing every assumption. Every label, every button, every status message was tested for plain-language clarity.",
      "The QR validation feature came from watching staff manually match documents to records — a 3-minute process that happened dozens of times a day. The right observation led to the right solution.",
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
        { name: "Navy", value: "#0d3052" },
        { name: "Lime", value: "#c7f000" },
        { name: "White", value: "#ffffff" },
        { name: "Gray", value: "#e8e8e8" },
        { name: "Ink", value: "#1a1a1a" },
      ],
      fonts: ["Inter Heavy", "Inter Regular", "Montserrat SemiBold"],
      tools: [<SiFigma />, <SiReact />, <SiGreensock />, <SiJavascript />, <SiHtml5 />, <SiCss3 />],
    },
 gallery: [bangkalProject, bangkalProject, bangkalProject, bangkalProject],
figmaUrl: "https://www.figma.com/proto/your-link-here",
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
    image: virielleProject,
    logo: viriellesLogo,
    bgColor: "#1a1a1a",
    accentColor: "#c7f000",
    services: ["Web Design", "Brand Direction", "Landing Flow", "Responsive UI"],
    overviewParagraphs: [
      "Virielle's existing work had personality — the challenge was shaping that into a polished web presence that could guide potential clients toward inquiry.",
      "The goal was a site that felt intentional, creative, and premium without over-designing.",
      "Every section needed to earn its place in the conversion journey from identity to inquiry.",
    ],
    challengeParagraphs: [
      "The studio story, services, and credibility points weren't organized into a strong page journey. Visitors understood the brand but couldn't quickly decide to take action.",
      "Without a clear hierarchy, the site felt like a portfolio dump rather than a guided pitch.",
    ],
    challengePoints: [
      "No clear narrative flow from identity to services to contact",
      "Service offerings buried under visual content",
      "Mobile reading experience needed significant improvement",
      "CTAs placed without strategic intent",
      "Brand personality not reflected in layout decisions",
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
      "The site needed to behave like a guided pitch: establish identity, show value, clarify services, then make the inquiry path obvious before momentum drops.",
      "I structured the page around brand introduction, selected proof, service explanation, and focused CTAs — with enough visual rhythm to feel premium without becoming cluttered.",
    ],
    approachSteps: [
      { num: "01", title: "Message Clarity", desc: "Clarified the studio's core message and identified the single most important conversion goal." },
      { num: "02", title: "Landing Flow Map", desc: "Mapped a section sequence from identity introduction through services to inquiry CTA." },
      { num: "03", title: "Visual Hierarchy", desc: "Designed responsive sections with calm spacing and stronger typographic hierarchy." },
      { num: "04", title: "Mobile Refinement", desc: "Refined mobile readability and CTA placement for maximum clarity on small screens." },
    ],
    solutionParagraphs: [
      "The final design uses visual restraint as a signal of confidence. White space does the heavy lifting — content breathes, hierarchy is clear, and the inquiry path is never more than one scroll away.",
      "Service sections were restructured from a grid of icons to a narrative explanation of value. Clients understand what they're getting before they ask.",
      "The mobile version was treated as a first-class experience, not an afterthought. CTAs are thumb-reachable. Text is scannable. The flow is identical to desktop.",
    ],
    solutionFeatures: [
      { title: "Guided Landing Flow", desc: "Section sequence moves visitors naturally from brand story to contact." },
      { title: "Service Clarity", desc: "Each service explained in client-facing language, not designer jargon." },
      { title: "Mobile-First Layout", desc: "Every section designed for small screens before scaling up." },
      { title: "Friction-Free Inquiry", desc: "Contact path visible at every scroll position." },
    ],
    reflectionParagraphs: [
      "The hardest part of designing for creative studios is avoiding the trap of designing to impress other designers. The audience is clients, not peers.",
      "Restraint is a skill. Every element that didn't serve the conversion journey was removed, even when it looked good in isolation.",
      "The final result was quieter than the original brief suggested — and more effective for it.",
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
        { name: "Dark", value: "#1a1a1a" },
        { name: "Lime", value: "#c7f000" },
        { name: "White", value: "#ffffff" },
        { name: "Stone", value: "#e8e8e8" },
        { name: "Mid", value: "#4f4f4f" },
      ],
      fonts: ["Inter Heavy", "Inter Regular", "Lora Italic"],
      tools: [<SiFigma />, <SiFramer />, <SiReact />, <SiTailwindcss />, <SiHtml5 />, <SiSass />],
    },
    gallery: [virielleProject, virielleProject, virielleProject, virielleProject],
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
    subtitle: "Marketing portfolio website",
    client: "Lady Arielle",
    timeline: "May 2026",
    role: "Portfolio Website",
    industry: "Personal Brand",
    type: "Freelance Project",
    image: arielleProject,
    logo: ladyLogo,
    bgColor: "#0d3052",
    accentColor: "#c7f000",
    services: ["Portfolio Design", "Marketing", "UI/UX Design", "Web Development"],
    overviewParagraphs: [
      "Lady Arielle needed a professional digital portfolio that gathered her experience, strengths, and marketing work into one polished place.",
      "The strategy was to make the site feel like a curated pitch — not a gallery of disconnected content.",
      "Visitors needed a fast reason to care. Credibility, work context, and contact flow were the three priorities.",
    ],
    challengeParagraphs: [
      "Her achievements and work samples were scattered across formats, making the story harder to present quickly during applications or professional introductions.",
      "Without a single shareable link that told the full story, every introduction required extra explanation.",
    ],
    challengePoints: [
      "Work scattered across PDFs, decks, and social profiles",
      "No single shareable link for professional introductions",
      "Story not structured for recruiter attention spans",
      "Mobile presentation needed for on-the-go sharing",
      "Contact path unclear for inbound opportunities",
    ],
    industryParagraphs: [
      "For marketing professionals, the portfolio itself is a marketing artifact. How you present your work says as much as the work itself.",
      "Recruiters spend an average of 30 seconds on a portfolio before deciding whether to dig deeper. Hierarchy and clarity are the deciding factors.",
      "A personal portfolio that can be shared in a message and opened on a phone is 10x more useful than one that requires a desktop.",
    ],
    industryStats: [
      { value: "6", label: "Portfolio sections" },
      { value: "30s", label: "Recruiter attention window" },
      { value: "3", label: "Content priorities" },
      { value: "1", label: "Shareable web presence" },
    ],
    approachParagraphs: [
      "I prioritized credibility signals first — role, education, measurable results — then work samples, then contact. This matches the recruiter's evaluation sequence.",
      "The page order was designed around a single question: 'What does this person do and should I talk to them?' Every section answers part of that question.",
    ],
    approachSteps: [
      { num: "01", title: "Proof Point Audit", desc: "Identified the strongest credibility signals and work samples to lead with." },
      { num: "02", title: "Page Architecture", desc: "Defined section order: credibility → work → contact, matching recruiter evaluation flow." },
      { num: "03", title: "Content Hierarchy", desc: "Structured each section for scanning — most important information visible without scrolling." },
      { num: "04", title: "Mobile Optimization", desc: "Tested flow on multiple devices for fast loading and easy sharing." },
    ],
    solutionParagraphs: [
      "The final portfolio opens with a strong hero that communicates role, value, and personality in under 5 seconds. No guessing required.",
      "Work samples are presented with context — not just what was made, but why it mattered and what it achieved. Results-framing makes the work more compelling.",
      "The contact section is designed for low commitment — a clear email link and LinkedIn handle, no form that feels like a job application.",
    ],
    solutionFeatures: [
      { title: "Strong Hero", desc: "Role, value proposition, and personality communicated in under 5 seconds." },
      { title: "Results-Framed Work", desc: "Each work sample presented with context and measurable outcomes." },
      { title: "Scannable Layout", desc: "Every section readable in under 10 seconds for busy recruiters." },
      { title: "Low-Friction Contact", desc: "Simple contact path that doesn't feel like filling out a job application." },
    ],
    reflectionParagraphs: [
      "Personal portfolio projects are deceptively complex. The designer has to become the client's advocate — filtering out everything they're proud of that doesn't serve the goal.",
      "The hardest conversation was about which work samples to cut. More is not more when attention is the constraint.",
      "The client reported positive recruiter feedback within weeks of launch. The structure did its job.",
    ],
    outcomes: [
      "Professional personal brand presence established",
      "Sharper content hierarchy reduced cognitive load",
      "Better mobile presentation for on-the-go sharing",
      "Client reported positive feedback from recruiters",
    ],
    metrics: [
      { value: "6", label: "Portfolio sections" },
      { value: "3", label: "Content priorities" },
      { value: "1", label: "Shareable web presence" },
    ],
    designSystem: {
      colors: [
        { name: "Navy", value: "#0d3052" },
        { name: "Lime", value: "#c7f000" },
        { name: "Surface", value: "#e8e8e8" },
        { name: "White", value: "#ffffff" },
        { name: "Ink", value: "#1a1a1a" },
      ],
      fonts: ["Inter Heavy", "Inter Regular", "Montserrat Bold"],
      tools: [<SiFigma />, <SiReact />, <SiGreensock />, <SiTailwindcss />, <SiHtml5 />, <SiCss3 />],
    },
    gallery: [arielleProject, arielleProject, arielleProject, arielleProject],
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
    image: laconslanetProject,
    logo: laconslanetLogo,
    bgColor: "#0d3052",
    accentColor: "#c7f000",
    services: ["Web App Design", "UI Redesign", "Mobile UX", "Design System"],
    overviewParagraphs: [
      "LaConsolaNet had a strong social platform concept but the interface needed clearer structure for feeds, actions, navigation, and mobile presentation.",
      "The redesign focused on making the product easier to explain and easier to use — especially for their upcoming capstone defense.",
      "A social platform must feel familiar fast. Reducing visual noise and grouping expected actions together was the core strategy.",
    ],
    challengeParagraphs: [
      "Important actions were competing for attention, visual consistency was uneven, and the mobile version lacked a strong layout direction for the capstone defense presentation.",
      "The evaluators would form opinions in minutes. The interface needed to communicate competence and clarity immediately.",
    ],
    challengePoints: [
      "Key actions buried under visual clutter",
      "Inconsistent component styling across screens",
      "Mobile layout not ready for defense presentation",
      "Navigation patterns didn't follow social platform conventions",
      "No unified design language across web and mobile",
      "Feed hierarchy unclear — everything competed for attention",
    ],
    industryParagraphs: [
      "Social platforms live by the rule of familiarity. Users expect certain patterns — feed, notifications, profile, compose — and deviation creates friction, not delight.",
      "For a capstone defense, the interface is an argument. Evaluators are assessing whether the team understands their users. A clean, conventional UI is the clearest proof.",
      "The best social product redesigns don't reinvent patterns — they execute familiar patterns with more clarity and consistency.",
    ],
    industryStats: [
      { value: "8+", label: "Screens redesigned" },
      { value: "2", label: "Device contexts" },
      { value: "1", label: "Unified UI direction" },
      { value: "4hr", label: "Defense-ready turnaround" },
    ],
    approachParagraphs: [
      "I rebuilt feed, navigation, and action placement around familiar social platform patterns. The goal wasn't innovation — it was execution.",
      "Visual consistency was established through a simple component system: one card style, one nav pattern, one type scale. Repeated correctly, it creates confidence.",
    ],
    approachSteps: [
      { num: "01", title: "Screen Audit", desc: "Reviewed existing screens and documented every hierarchy and consistency issue." },
      { num: "02", title: "Pattern Alignment", desc: "Rebuilt components around established social platform conventions for instant familiarity." },
      { num: "03", title: "Mobile Layouts", desc: "Created defense-ready mobile screens with clear navigation and feed hierarchy." },
      { num: "04", title: "Design System", desc: "Built a simple component library the team could explain and defend confidently." },
    ],
    solutionParagraphs: [
      "The redesigned web screens organized content into a standard three-column social layout: navigation, feed, and contextual sidebar. Familiar, clear, defensible.",
      "Mobile screens followed thumb-zone conventions — primary actions bottom-centered, navigation accessible without reaching. Every decision had a rationale the team could explain.",
      "A minimal design system documentation was prepared alongside the screens, giving the team visual language to describe their decisions to evaluators.",
    ],
    solutionFeatures: [
      { title: "Feed Hierarchy", desc: "Content organized by recency and relevance with clear visual weight." },
      { title: "Convention-Based Nav", desc: "Navigation patterns matched to user expectations from existing social platforms." },
      { title: "Mobile-First Screens", desc: "Thumb-zone optimized layouts for the mobile defense presentation." },
      { title: "Design System Docs", desc: "Component documentation the team could explain during evaluation." },
    ],
    reflectionParagraphs: [
      "This project reinforced a lesson: when the audience is evaluators, not users, the interface needs to communicate the designer's thinking, not just the product's function.",
      "The team's confidence in presenting increased significantly once they had a system they could explain — not just show.",
      "The most impactful change wasn't a visual one. It was giving every design decision a clear rationale that the team understood and could defend.",
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
        { name: "Navy", value: "#0d3052" },
        { name: "Lime", value: "#c7f000" },
        { name: "Surface", value: "#e8e8e8" },
        { name: "White", value: "#ffffff" },
        { name: "Muted", value: "#8c8c8c" },
      ],
      fonts: ["Inter Heavy", "Inter Regular", "Montserrat SemiBold"],
      tools: [<SiFigma />, <SiReact />, <SiGreensock />, <SiJavascript />, <SiHtml5 />, <SiCss3 />],
    },
    gallery: [laconslanetProject, laconslanetProject, laconslanetProject, laconslanetProject],
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

// ── Sticky Section Label with GSAP scroll follow ─────────────────────────────
function StickySection({ label, children, id }) {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || !labelRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 30%",
      end: "bottom 30%",
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

// ── Gallery Carousel ─────────────────────────────────────────────────────────
function GalleryCarousel({ images, title, actionHref }) {
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

          {/* ── HERO IMAGE ──────────────────────────────────────────────────── */}
          <div className="pc-hero-image-wrap pc-hero-reveal">
            <img className="pc-hero-image" src={project.image} alt={`${project.title} preview`} />
          </div>

          {/* ── OVERVIEW ────────────────────────────────────────────────────── */}
          <StickySection label="OVERVIEW" id="overview">
            <div className="pc-prose-block pc-sr">
              {project.overviewParagraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </StickySection>

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

          {/* ── INTERACTIVE PROTOTYPE ───────────────────────────────────────── */}
 {/* ── INTERACTIVE PROTOTYPE ───────────────────────────────────────── */}
  <StickySection label="INTERACTIVE PROTOTYPE" id="prototype">
  <div className="pc-prose-block pc-sr">
    <p>The final design was built into a high-fidelity interactive prototype — every interaction, transition, and state designed as it would appear in production.</p>
    <GalleryCarousel images={project.gallery} title={project.title} actionHref={project.figmaUrl} />
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
  {/* <section className="pc-testi-section pc-sr">
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
          </section> */}

          {/* ── PREV / NEXT ──────────────────────────────────────────────────── */}
          <nav className="pc-project-nav pc-sr">
            <Link to={`/projects/${prevProject.id}`} className="pc-project-nav__item">
              <span className="pc-project-nav__dir">PREVIOUS</span>
              <strong className="pc-project-nav__name">{prevProject.title}</strong>
            </Link>
            <Link to={`/projects/${nextProject.id}`} className="pc-project-nav__item pc-project-nav__item--next">
              <span className="pc-project-nav__dir">NEXT</span>
              <strong className="pc-project-nav__name">{nextProject.title}</strong>
            </Link>
          </nav>

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