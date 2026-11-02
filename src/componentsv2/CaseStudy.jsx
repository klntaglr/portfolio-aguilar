import { useLayoutEffect, useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { Link, useParams, Navigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

import "./Russell.css"; /* shared: smooth wrapper, hero nav/bg, magnetic btn, footer */
import "./CaseStudy.css";
import TiltMenu from "./TiltMenu";

import logoImage from "../assets/logo.png";
import spiralBackground from "../assets/spiralbg.webp";
import projectImage from "../assets/CI.svg";
import kanrielImage from "../assets/Kanriel.svg";
import ladyClient from "../assets/ladyclient.jpg";
import quoteIcon from "../assets/quotesvg.svg";
import revampImage from "../assets/Revamp.svg";
import reseImage from "../assets/rese.svg";
import rese2Image from "../assets/Rese2.svg";
import rese3Image from "../assets/Rese3.svg";
import rese4Image from "../assets/Rese4.svg";
import loginBefore from "../assets/originallogin.svg";
import loginAfter from "../assets/revamplogin.svg";
/* TODO: palitan ng actual screenshots */
const galleryMain = projectImage;
const galleryOne = projectImage;
const galleryTwo = projectImage;
const galleryThree = projectImage;
const galleryFour = projectImage;
const giftFinderImage = projectImage;
const coverImage = projectImage;

/* ════════════════════════════════════════════════
CONTENT — Community Intelligence
(mga may [TODO] ay kailangan mong punan ng totoong data mo)
════════════════════════════════════════════════ */
const ciCase = {
    title: "Community Intelligence",
    client: "Enov8tive",
    year: "2026",
    services: ["Mobile App Design", "UX Design", "Product Design"],
    cover: coverImage,
    background: {
        text: "Community Intelligence is Enov8tive's mobile platform for Local Government Units (LGUs) in the Philippines. Registered patients are grouped into households, and each household profile holds its address, members, and living conditions. Through Pulso ng Masa, field personnel and household representatives answer surveys on each household's needs, from disaster readiness to social assistance. The responses are attached to the household record, so LGUs can see who needs help and plan their next move from real data.",
        link: { label: "Visit client website.", href: "#" },
    },
    challenge: [
        "The app is used in the field, on small screens, often while talking to a family. Every household has many members, and every survey asks a lot of questions. My role was to design the mobile flows for household management and the Pulso ng Masa surveys, so that data entry stays quick and clear. [TODO: kumpirmahin ang exact role mo]",
        "The core questions: how do we separate household-level and member-level surveys without confusing the user, how do we keep long forms from feeling long, and how do we keep records accurate when families change, such as when a member moves, a head is replaced, or a whole household is deactivated?",
    ],
    findings: [
        {
            label: "Two levels of data",
            text: "Some questions belong to the whole household, others to one person. The flow starts with a \"Who's Answering the Form?\" step, then leads to separate lists. Households get eight surveys, such as Community Needs, Disaster Readiness, and Social Assistance, while individual members get their own socioeconomic survey. Each list shows a summary and a progress count, so the user always knows who the answers are for.",
        },
        {
            label: "Long forms, short steps",
            text: "The Environmental Assessment is split into three short screens, and the Disaster Readiness survey adds Next and Previous controls. Instead of typing, users tap checkbox tiles, add searchable chips, use number steppers, or give star ratings. Typing is only needed when someone picks \"Others\".",
        },
        {
            label: "Protecting the data",
            text: "Field staff should never lose a half-finished survey by accident, and should never submit one by mistake. Surveys use \"Complete Form?\" and \"Abort Form?\" prompts, and household edits are not final until the user confirms \"Save Household Changes?\". Each confirmation says clearly what will be saved or lost.",
        },
        {
            label: "Keeping records accurate",
            text: "Families change, and the statistics must follow. Members can be transferred to another household in a guided four-step flow, or deactivated with a reason and date. When a head is deactivated, a new head must be chosen first, and the other members' relationship tags change to \"Others\". Deactivated members stop counting toward statistics but stay visible under the Inactive and Transferred tabs.",
        },
        {
            label: "Finding the right household fast",
            text: "With hundreds of households, search has to be quick. The list shows the total count, highlights matching letters, and reports how many results were found. A filter narrows down from region to street, and an Active and Deactivated toggle separates current households from old ones. If nothing matches, the empty state invites the user to create that household.",
        },
    ],
    results: [
        {
            label: "What I delivered",
            paragraphs: [
                "A complete mobile experience for the household lifecycle: creating, editing, listing, and deactivating households, adding members, transferring them, and deactivating them. On top of that, I designed the Pulso ng Masa survey flows, with eight household surveys and one member survey, all linked back to the household profile.",
                "Every feature was handed off with a workflow, acceptance criteria, relevant screens, and a Figma prototype to the development team. [TODO: magdagdag ng totoong resulta, halimbawa: kung ilang LGUs o households na ang gumagamit, feedback ng stakeholders, o bilis ng survey completion]",
            ],
        },
    ],
    gallery: {
        main: { src: galleryMain, caption: "Pulso ng Masa survey list for a household" },
        small: [
            { src: galleryOne, caption: "Household profile" },
            { src: galleryTwo, caption: "Member transfer flow" },
            { src: galleryThree, caption: "" },
            { src: galleryFour, caption: "" },
        ],
    },
    next: "enov8tive-login-revamp",
};

const bolCase = {
    title: "AI Gift Finder",
    client: "bol",
    year: "2025",
    services: ["Mobile App Design", "User research & Testing", "UX Design"],
    cover: coverImage,
    background: {
        text: "In preparation for the holiday season, bol wants to support their users in finding gifts for their loved ones. In comes the AI Gift Finder/Cadeauhulp. This conversational AI chatting experience, helps users with finding inspirational ideas for a gift, or a direct product that may fit their needs.",
        link: { label: "Visit client website.", href: "#" },
    },
    challenge: [
        "At this point in time, DEPT® had already done concepting for the Gift Finder. Though bol felt there were still design opportunities to enhance the user experience before releasing it to the public. My role here was to seek the answers to the questions; learning about how users behave with a conversational chat, learning about the value of output, learning about how intuitive the navigation feels, and more.",
        "Seeking answers to these questions had been done so, by setting up and running the pilot for the Gift Finder. Consisting of a mixed methodology approach with usability tests and retrospective interviews in a lab environment. Learning about what users do, think, and say regarding finding gifts with the Gift Finder.",
    ],
    findings: [
        {
            label: "Suggestions and chip behavior",
            text: "Users struggled in getting enough variety in products per output, variety in product categories, as well as the product amount. With the limit being set to 4 products per output, a behavioral pattern occured where users often relied on repeated use of the quick suggestion chips. Using it in order to quickly gain more product suggestions, as well as quickly navigate oneself through the conversation.",
        },
        {
            label: "Reading input fields",
            text: "When chatting with the Gift Finder, users generally showed 2 prompting styles. Either keyword focussed, or writing longer story-esque prompts. Even though users can finish their tasks quite well in both cases, the users who wrote longer prompts were frustrated that the chat's input field didn't allow for reading back a prompt before sending it. It was also the case that when users send their prompts in the chat, the position stayed in the middle of a chat field, and became disorienting.",
        },
        {
            label: "Losing a chat",
            text: "When navigating between a product detail page and a chat, users on some occasions double tapped the back button. The back button for both product detail pages, as well as the chat are on the same position, this made users exit the chat and lose their history. In other occassions, users also had performance issues. This either made a chat wipe, or made users want to restart their chat.",
        },
        {
            label: "FAB's and mental models",
            text: "Entering the Gift Finder, goes via the floating action button on the home page. In some cases, users expected the entry point for the Gift Finder to be within a search, a gift page, or a card on the home page. For them, this aligns more with their mental model of how they see and imagine the layout of the bol app.",
        },
    ],
    results: [
        {
            label: "Insight Sharing",
            paragraphs: [
                "The pilot was well received by bol, the DEPT® team, and key stakeholders, which led to further iterations. Working with the UX Team was an ideal way of integrating findings into design, working to ensure users can find the answers they need quickly through discovery.",
                "As of October 2025, the conversational Gift Finder is a featured link on the 'Wish To Gift' landing page, with over 70% of those users saying it helped 'finding gifts more fun'.",
            ],
        },
    ],
    gallery: {
        main: { src: galleryMain, caption: "Basic navigation to find the gifts quicker" },
        small: [
            { src: galleryOne, caption: "Main entry point" },
            { src: galleryTwo, caption: "Intro screens" },
            { src: galleryThree, caption: "" },
            { src: galleryFour, caption: "" },
        ],
    },
    next: "community-intelligence",
};


const kanrielCase = {
    title: "Kanriel",
    client: "Lady Arielle",
    year: "2026", // [TODO: kumpirmahin]
    services: ["Product Design", "UX Design", "Full-Stack Development", "PWA"],
    cover: kanrielImage,

    background: {
        text: "Kanriel is a JLPT reviewer app built for Lady Arielle, a Japanese language student at PATS in Arayat, Pampanga. Her school gave students a reviewer website that was often down and a mobile app that only worked on Android, while the actual reviewers were printed on paper. She uses iOS devices, so she asked me to build something that works for her, and I made it an installable Progressive Web App that runs on any device. Together we shaped the idea, and I designed and built the whole app, from the interface to the database and storage behind it, to support her studies. Her classmates later started using it too, since they review the same material.",
        link: { label: "View the app.", href: "#" }, // [TODO: ilagay ang live link]
    },

    challenge: [
        "The tools students were given kept getting in the way of studying. The website was frequently down, which was frustrating right when they needed to review. The app was Android-only, and Lady Arielle uses iOS devices. The reviewers themselves were on paper, which can be lost, torn, or soaked, and is hard to carry around.",
        "I set out to answer three questions: how can paper reviewers become digital without making students retype everything, how can classmates who study the same material avoid rebuilding it one by one, and how can all study materials, from reviewers to videos and PDFs, live in one app?",
    ],

    findings: [
        {
            label: "From paper to practice",
            text: "Students can create their own reviewers for kanji, vocabulary, and grammar, then study them as flashcards or take a quiz. Moving from paper to screen meant reviewing felt lighter and less overwhelming, and it works anywhere with a phone.",
        },
        {
            label: "Typing it all in took too long",
            text: "After the first version, feedback came in quickly: typing every question and answer by hand was time-consuming. So I redesigned the entry flow. The student photographs the paper reviewer, gives the photo to an AI assistant together with a CSV template, and gets back a table of questions, answers, and meanings. Uploading that file into the reviewer fills in everything automatically. The importer checks the columns, catches duplicates, and handles up to 500 rows at a time. What used to take a long session now takes about one to two minutes.",
        },
        {
            label: "One reviewer, shared with classmates",
            text: "Her classmates review the same material, so it made no sense for each of them to rebuild it. Lady Arielle can share her reviewers with a link, and classmates who are logged in can add them to their own dashboard. Shared reviewers stay view-only, and each student keeps their own progress, so one person's scores never affect another's.",
        },
        {
            label: "A library for everything else",
            text: "Students were also receiving JLPT orientation videos and PDFs from their teachers, scattered across chats and folders. The Study Library holds PDFs, videos, and audio in folders, with favorites, saved playback position, and PDF highlights, so they sit next to the reviewers instead of in another app.",
        },
        {
            label: "Built for real study sessions",
            text: "Study sessions get interrupted, so unfinished quizzes save automatically and can be resumed. Answers support partial credit and show which parts matched, so a nearly correct answer still teaches something. Every attempt goes to a history, and wrong answers collect in a mistake bank to retry. Lessons can be merged into one reviewer for mixed practice, and a timed Kotoba Game adds a faster, more playful mode.",
        },
        {
            label: "Installable on any device",
            text: "Because the school's app only worked on Android, I built Kanriel as a Progressive Web App (PWA). It can be added to the home screen on iPhone, iPad, or Android, opens like a regular app in its own window, and needs no app store or separate versions for each platform. Updates reach everyone as soon as they're published.",
        },
        {
            label: "Her app, her look",
            text: "The pink theme was Lady Arielle's own request. It's her app, and she wanted something she'd enjoy opening every day, which made reviewing feel more personal and motivating. Her classmates didn't need the same look. What mattered to them was that they could review properly and that the app actually helped them study, so the interface stays simple, readable, and focused on the material.",
        },
    ],

    results: [
        {
            label: "Academic improvement",
            paragraphs: [
                "One of the most meaningful outcomes was seeing Lady Arielle's grades improve after she started using Kanriel. Before the app, reviewing was less consistent because her study materials were scattered and difficult to access. With her reviewers organized in one place, she could study more regularly, practice through flashcards and quizzes, and revisit the topics she struggled with.",
                "She also started passing her JLPT mock tests, a milestone that showed how consistent practice was translating into better performance. The ability to practice reciting Kanji characters gave her another way to reinforce what she was learning and improve her recall.",
                "For me, this was the result that mattered most: the app wasn't just being used; it was becoming part of her actual learning progress.",
            ],
        },
        {
            label: "Adoption",
            paragraphs: [
                "Lady Arielle has been using Kanriel for four months and has created more than 50 reviewers, taking quizzes and reviewing flashcards along the way. Her classmates tried it after she shared it, found it helpful for reviewing, and kept using it too.",
                "The AI-and-CSV import, which came directly from user feedback, cut the time to add a paper reviewer to about one to two minutes. Sharing meant classmates no longer repeated the same work.",
            ],
        },
        {
            label: "What's next",
            paragraphs: [
                "Open areas I'm planning to improve: a manual review flow for paragraph answers in the custom form builder, password reset, a settings page, and automated tests.",
            ],
        },
    ],

    feedback: [
        {
            quote: "Reviewing is easier now, and I'm finally seeing better results in school.",
            note: "I used to put off reviewing because organizing my notes took so much time. Now I just open the app and study whenever I have a few minutes, even when I'm outside. I don't have to worry about carrying all my papers around anymore. The CSV import is probably my favorite part because I can add a whole reviewer in about a minute instead of typing everything myself. I also love how I can practice reciting Kanji characters because it helps me remember them better. Since I started using Kanriel, my grades have improved, and I've been passing my JLPT mock tests too!",
            name: "Lady Arielle",
            role: "PATS student",
            image: ladyClient,
        },
        // Dagdag ka pa kung may ibang quote. Kapag walang image, mawawala ang photo at full width ang text:
        // { quote: "...", note: "...", name: "Classmate", role: "Student, PATS" },
    ],

    gallery: {
        main: {
            src: kanrielImage,
            caption: "Reviewer dashboard with progress",
        },
        small: [
            { src: kanrielImage, caption: "CSV import" },
            { src: kanrielImage, caption: "Flashcards" },
            { src: kanrielImage, caption: "Quiz results" },
            { src: kanrielImage, caption: "Study Library" },
        ],
    },
    next: "cafe-rese",
};



const loginCase = {
    title: "Enov8tive Login Revamp",
    client: "Enov8tive",
    year: "2026",
    services: ["UI Design", "UX Design", "Design Handoff"],
    cover: revampImage,
    background: {
        text: "The login page is the first screen every Enov8tive subscriber sees. Accounts are only for registered users who bought or subscribed to the apps, so there is no public sign-up. I redesigned the login, the forgot-password flow, and the security states added after QA feedback, then handed the screens and specs to the engineers.",
        link: { label: "Visit client website.", href: "#" }, // [TODO: ilagay ang link o alisin]
    },
    challenge: [
        "The original page looked unfinished. A faded stock photo of a laptop and smartwatch felt like a generic tech product and said nothing about healthcare, and it competed with the form instead of supporting it. On top of that, the login card squeezed the logo, social sign-in, form, legal text, app store badges, and social links into one small box. The main action was hard to spot, and nothing told users when the app was working or had failed.",
        "QA also found a security gap: there was no rate limiting, so a bot could try passwords again and again. The forgot-password flow was broken as well. After the user opened the magic link from their email, nothing happened and they landed back on the login page.",
    ],
    comparison: {
        before: { src: loginBefore, label: "Original login page" },
        after: { src: loginAfter, label: "Redesigned login page" },
        points: [
            { label: "Background", text: "Before: a faded stock photo of a laptop and smartwatch that felt like a generic tech product. After: a calm white and light-blue brand panel that matches the logo and keeps attention on the form." },
            { label: "Hierarchy", text: "Before: every element had the same weight and no heading. After: a clear \"Welcome Back!\" heading, with one solid Sign in button as the main action." },
            { label: "Card content", text: "Before: store badges, social links, and legal text were all inside the card. After: the card only holds the sign-in task, and branding and links moved to the side panel." },
            { label: "Form", text: "Before: tiny text and placeholders used as labels. After: visible labels above larger fields, a show-password icon, and a simple Password or Code switch." },
            { label: "Feedback", text: "Before: no loading, error, or lockout states. After: designed states for loading, errors, lockout, and the reCAPTCHA check." },
            { label: "Password reset", text: "Before: the magic link led back to the login page. After: the link opens a secure page to set a new password." },
        ],
    },
    findings: [
        {
            label: "A calmer, on-brand look",
            text: "I replaced the stock photo with a quiet white and blue look taken from the logo, so the page supports the form instead of competing with it. White and blue are common in healthcare and are often associated with cleanliness, trust, and calm, and reusing the brand colors makes the page feel familiar to returning users. The button uses a deeper blue so white text stays readable.",
        },
        {
            label: "Less crowding, clearer hierarchy",
            text: "The sign-in card now only holds what the user needs to log in. The logo, tagline, social links, and app store badges moved to a brand panel beside it. Type is larger, labels sit above the fields instead of inside them, and Sign in is the strongest element on the page. Google and Apple sign-in show a \"Last used\" badge to help returning users.",
        },
        {
            label: "Feedback at every step",
            text: "The original gave no sign that anything was happening. I designed loading states for the button and form, and clear messages for errors and blocked attempts, so users always know whether the page is working, waiting, or has rejected them.",
        },
        {
            label: "Security the user can understand",
            text: "QA reported that bots could brute-force logins, and the team asked for an enhancement. I designed the screens for three layers: rate limiting, a reCAPTCHA check, and account lockout. Each has its own message, so a locked-out user understands what happened instead of thinking the page is broken.",
        },
        {
            label: "Built for registered users only",
            text: "Because accounts come from a purchase or subscription, there is no sign-up button or free registration. The copy says \"Sign in to your enov8tive account\", and a support link helps people who can't get in.",
        },
        {
            label: "Fixing the dead-end reset",
            text: "I noticed the forgot-password magic link led nowhere, so I proposed a fix on my own and presented the screens to the CEO and my director. They agreed with the direction: after the user opens the link, a secure page lets them create a new password and confirm it, followed by a reCAPTCHA check. [TODO: kumpirmahin ang eksaktong fields]",
        },
    ],
    results: [
        {
            label: "Approval and handoff",
            paragraphs: [
                "The CEO reviewed the redesign and approved it, and my director backed the forgot-password flow I proposed. I handed the engineers the final screens, states, and specs for the login, security layers, and password reset.",
                "The redesign is currently in development and hasn't been deployed yet, so the screens here show the approved design rather than a live page.",
            ],
        },
    ],
    gallery: {
        main: { src: loginAfter, caption: "Redesigned login page" },
        small: [
            { src: revampImage, caption: "Loading and error states" },
            { src: revampImage, caption: "reCAPTCHA and account lockout" },
            { src: revampImage, caption: "Forgot password" },
            { src: revampImage, caption: "Set a new password" },
        ],
    },
    next: "kanriel",
};

const reseCase = {
    title: "Cafe RESÉ",
    client: "Cafe RESÉ",
    year: "2026", // [TODO: kumpirmahin]
    services: ["Landing Page Design", "Web Design", "Branding"], // [TODO: idagdag ang "Front-End Development" kung ikaw ang nag-code]
    cover: reseImage,
    background: {
        text: "Cafe Rese is a cafe in Malolos, Bulacan that is always busy, with a steady stream of customers coming in. Nobody asked me to build anything. I noticed how many people visited and how much the cafe had to offer, and I wanted to see how it would look online. So I designed a landing page on my own initiative that showcases its services, menu, and customer feedback in one place. [TODO: ilagay ang eksaktong detalye, halimbawa kung anong klaseng cafe, signature drinks, o ano ang gusto mong ipakita]",
        link: {
            label: "View the prototype.",
            href: "https://www.figma.com/proto/vcYZJzNfJjc4Miy8LpwP9T/UI-UX-Portfolio?node-id=247-2969&t=En7mVMQtOhTKvMHK-0&scaling=scale-down-width&content-scaling=fixed&page-id=38%3A1422&starting-point-node-id=247%3A2969&hide-ui=1",
        },
    },
    challenge: [
        "Cafe Rese already has people walking in, but a new customer who has not visited yet has no single place to see what the cafe offers, what is on the menu, or what other customers think. [TODO: kumpirmahin kung ano talaga ang walang online ngayon, halimbawa Facebook page lang o wala]",
        "This was a self-initiated project with no client brief, so I set my own questions: what does a first-time visitor need to know within a few seconds, how do I present the menu so it is easy to scan, and how do I make the page feel like the cafe itself instead of a generic template?",
    ],
    findings: [
        {
            label: "One page, clear sections",
            text: "A landing page works best when a visitor can scroll once and understand the whole cafe. I organized the page into short sections for services, menu, and feedback, so people find what they came for without jumping between pages. [TODO: ilista ang eksaktong sections sa page mo]",
        },
        {
            label: "A menu that is easy to scan",
            text: "Visitors usually look at the menu first, so it gets its own section with items grouped by category. Names and prices are easy to read at a glance, even on a phone. [TODO: ilagay ang categories at kung may photos ba]",
        },
        {
            label: "Showing what the cafe offers",
            text: "The services section tells visitors what they can do at Cafe Rese before they arrive, so they know what to expect. [TODO: ilagay ang totoong services, halimbawa dine-in, takeout, events]",
        },
        {
            label: "Room for customer feedback",
            text: "The page has a feedback section so future visitors can see what other customers say. Cafe Rese has not collected feedback yet, so this section is designed and ready to be filled in. [TODO: tanggalin ito kung hindi mo nilagay sa page]",
        },
        {
            label: "A look that matches the cafe",
            text: "The colors, type, and imagery are chosen to match the cafe's warm, welcoming feel, and the layout stays simple so the content leads. [TODO: ilagay ang palette, fonts, at inspirasyon]",
        },
        {
            label: "Works on a phone",
            text: "Most people look up a cafe on their phone, often while deciding where to go, so the layout is designed to read well on small screens first. [TODO: kumpirmahin na responsive talaga]",
        },
    ],
    results: [
        {
            label: "What I delivered",
            paragraphs: [
                "A complete landing page for Cafe Rese that presents its services, menu, and customer feedback in one place, designed to be easy to browse on any device.",
                "This was a self-initiated concept, so there is no client feedback or usage data to share yet. [TODO: i-update kapag naipakita mo na sa owner, nailunsad na, o may feedback na]",
            ],
        },
    ],
    gallery: {
        main: { src: reseImage, caption: "" },
        small: [
            { src: reseImage, caption: "" },
            { src: rese4Image, caption: "" },
            { src: rese2Image, caption: "" },
            { src: rese3Image, caption: "" },

        ],
    },
    next: "community-intelligence",
};

/* ── LAHAT NG CASE STUDIES. Ang key = URL:  /works/<key> ──
    Para magdagdag ng bago: gumawa ng object tulad ng ciCase,
    tapos ilagay dito. `next` = key ng susunod na case study. */
export const CASE_STUDIES = {
    "community-intelligence": ciCase,
    bol: bolCase,
    kanriel: kanrielCase,
    "enov8tive-login-revamp": loginCase,
    "cafe-rese": reseCase,
};

/* ════════════════════════════════════════════════
REUSABLE: MagneticButton
════════════════════════════════════════════════ */
function MagneticButton({ children, href, ...props }) {
    const btnRef = useRef(null);
    const fillRef = useRef(null);

    const handleMouseMove = useCallback((e) => {
        const btn = btnRef.current;
        if (!btn) return;
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.35, y: y * 0.35, duration: 0.4, ease: "power2.out" });
    }, []);

    const handleMouseEnter = useCallback((e) => {
        const btn = btnRef.current;
        const fill = fillRef.current;
        if (!btn || !fill) return;
        const rect = btn.getBoundingClientRect();
        gsap.killTweensOf(fill);
        gsap.set(fill, {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            xPercent: -50,
            yPercent: -50,
            scale: 0,
            left: 0,
            top: 0,
        });
        gsap.to(fill, { scale: 120, duration: 4.5, ease: "expo.out" });
    }, []);

    const handleMouseLeave = useCallback((e) => {
        const btn = btnRef.current;
        const fill = fillRef.current;
        if (!btn || !fill) return;
        const rect = btn.getBoundingClientRect();
        gsap.killTweensOf(fill);
        gsap.set(fill, {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            xPercent: -50,
            yPercent: -50,
            left: 0,
            top: 0,
        });
        gsap.to(fill, { scale: 0, duration: 0.7, ease: "power2.inOut" });
        gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.35)" });
    }, []);

    const Component = href ? Link : "button";

    return (
        <Component
            ref={btnRef}
            to={href}
            type={href ? undefined : "button"}
            className={`magnetic-btn${props.className ? ` ${props.className}` : ""}`}
            onClick={props.onClick}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <span ref={fillRef} className="magnetic-btn__fill" />
            <span className="magnetic-btn__text">{children}</span>
        </Component>
    );
}

/* ════════════════════════════════════════════════
REUSABLE: SplitText — masked word-by-word reveal
════════════════════════════════════════════════ */
function SplitText({ as: Tag = "h2", className = "", children, ...rest }) {
    const words = String(children).split(" ");
    return (
        <Tag className={className} {...rest}>
            {words.map((w, i) => (
                <span key={i}>
                    <span className="cs__mask">
                        <span className="cs__mask-inner">{w}</span>
                    </span>
                    {i < words.length - 1 ? " " : ""}
                </span>
            ))}
        </Tag>
    );
}

/* ════════════════════════════════════════════════
REUSABLE: InfoRow
════════════════════════════════════════════════ */
function InfoRow({ label, children }) {
    return (
        <div className="cs__row">
            <span className="cs__row-label">{label}</span>
            <div className="cs__row-body">{children}</div>
        </div>
    );
}

/* ════════════════════════════════════════════════
REUSABLE: Footer (bar only)
════════════════════════════════════════════════ */
/* ════════════════════════════════════════════════
   REUSABLE: BeforeAfter — draggable comparison
════════════════════════════════════════════════ */
function BeforeAfter({ before, after }) {
    const [pos, setPos] = useState(50);
    return (
        <div className="cs__compare">
            <div className="cs__compare-stage" style={{ "--pos": `${pos}%` }}>
                <img className="cs__compare-img" src={after.src} alt={after.label} />
                <img className="cs__compare-img cs__compare-img--before" src={before.src} alt={before.label} />
                <span className="cs__compare-tag cs__compare-tag--before">Before</span>
                <span className="cs__compare-tag cs__compare-tag--after">After</span>
                <div className="cs__compare-handle" aria-hidden="true"><span /></div>
                <input
                    className="cs__compare-range"
                    type="range"
                    min="0"
                    max="100"
                    value={pos}
                    onChange={(e) => setPos(Number(e.target.value))}
                    aria-label="Slide to compare before and after"
                />
            </div>
        </div>
    );
}

function Footer() {
    return (
        <footer className="footer cs__footer">
            <div className="footer__bar">
                <div className="footer__bar-col">
                    <span className="footer__bar-label">Credits</span>
                    <div className="footer__bar-links">
                        <span className="footer__bar-link">© Russell Aguilar – 2026</span>
                    </div>
                </div>
                <div className="footer__bar-col">
                    <span className="footer__bar-label">Contact</span>
                    <div className="footer__bar-links">
                        <a href="https://www.linkedin.com/in/klent-russell-aguilar-b6929739b/" className="footer__bar-link">LinkedIn</a>
                        <a href="https://www.instagram.com/klntaglr/" className="footer__bar-link">Instagram</a>
                        <a href="https://github.com/klntaglr" className="footer__bar-link">Github</a>
                        <a href="mailto:klentaguilar@gmail.com" className="footer__bar-link">Email</a>
                    </div>
                </div>
                <div className="footer__bar-menu">
                    <span className="footer__bar-label">Menu</span>
                    <div className="footer__bar-links">
                        <Link to="/" className="footer__bar-link">Home</Link>
                        <Link to="/works" className="footer__bar-link">Work</Link>
                        <Link to="/about-web-designer" className="footer__bar-link">About</Link>
                        <Link to="/contact-me" className="footer__bar-link">Contact</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

/* ════════════════════════════════════════════════
PAGE
════════════════════════════════════════════════ */
function CaseStudyPage({ caseStudy }) {
    const rootRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [nextHovered, setNextHovered] = useState(false);
    const [fbIndex, setFbIndex] = useState(0);
    const fbList = caseStudy.feedback || [];
    const fb = fbList[fbIndex];
    const fbStep = (d) => setFbIndex((i) => (i + d + fbList.length) % fbList.length);
    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);

    const handleNextMove = useCallback((e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        e.currentTarget.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg)`;
        cursorX.set(e.clientX - rect.left);
        cursorY.set(e.clientY - rect.top);
    }, [cursorX, cursorY]);

    const handleNextLeave = useCallback((e) => {
        setNextHovered(false);
        e.currentTarget.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg)";
    }, []);

    useLayoutEffect(() => {
        ScrollSmoother.get()?.kill();
        const smoother = ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 1.5,
            effects: true,
        });
        smoother.scrollTop(0);

        const ctx = gsap.context(() => {
            const q = gsap.utils.selector(rootRef);

            const tl = gsap.timeline({ delay: 0.25, defaults: { ease: "expo.out" } });
            tl.fromTo(q(".cs__hero .cs__mask-inner"), { yPercent: 115 }, { yPercent: 0, duration: 1.3, stagger: 0.07 })
                .fromTo(q(".cs__meta-col"), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.1 }, "-=0.8")
                .fromTo(q(".hero__scroll"), { opacity: 0 }, { opacity: 1, duration: 0.8 }, "-=0.6");

            gsap.to(q(".cs__hero-content"), {
                y: -70,
                opacity: 0,
                ease: "none",
                scrollTrigger: { trigger: ".cs__hero", start: "top top", end: "65% top", scrub: true },
            });
            gsap.to(q(".cs__hero .hero__scroll"), {
                opacity: 0,
                ease: "none",
                scrollTrigger: { trigger: ".cs__hero", start: "top top", end: "25% top", scrub: true },
            });

            gsap.fromTo(
                q(".cs__body"),
                { y: 70 },
                {
                    y: 0,
                    ease: "none",
                    scrollTrigger: { trigger: ".cs__body", start: "top 98%", end: "top 60%", scrub: 1.2 },
                }
            );

            gsap.fromTo(
                q(".cs__cover"),
                { clipPath: "inset(10% 8% round 28px)" },
                {
                    clipPath: "inset(0% 0% round 12px)",
                    ease: "none",
                    scrollTrigger: { trigger: ".cs__cover", start: "top 90%", end: "top 25%", scrub: 1.2 },
                }
            );

            q(".cs__row").forEach((row) => {
                gsap.fromTo(
                    row.children,
                    { y: 44, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.1,
                        ease: "power3.out",
                        stagger: 0.12,
                        scrollTrigger: { trigger: row, start: "top 88%", toggleActions: "play none none reverse" },
                    }
                );
            });

            q(".cs__heading, .cs__next-title").forEach((h) => {
                gsap.fromTo(
                    h.querySelectorAll(".cs__mask-inner"),
                    { yPercent: 115 },
                    {
                        yPercent: 0,
                        duration: 1.2,
                        ease: "expo.out",
                        stagger: 0.08,
                        scrollTrigger: { trigger: h, start: "top 88%", toggleActions: "play none none reverse" },
                    }
                );
            });

            q(".cs__shot, .cs__compare").forEach((shot) => {
                gsap.fromTo(
                    shot,
                    { y: 80, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.2,
                        ease: "power3.out",
                        scrollTrigger: { trigger: shot, start: "top 92%", toggleActions: "play none none reverse" },
                    }
                );
            });

            gsap.fromTo(
                q(".cs__next-label, .cs__next-card, .cs__next .works__cta"),
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.1,
                    ease: "power3.out",
                    stagger: 0.12,
                    scrollTrigger: { trigger: ".cs__next", start: "top 75%", toggleActions: "play none none reverse" },
                }
            );
        }, rootRef);

        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener("load", refresh);
        const t = setTimeout(refresh, 400);

        return () => {
            clearTimeout(t);
            window.removeEventListener("load", refresh);
            ctx.revert();
            smoother.kill();
        };
    }, []);

    useEffect(() => {
        const smoother = ScrollSmoother.get();
        const prevBody = document.body.style.overflow;
        const prevHtml = document.documentElement.style.overflow;
        const preventScroll = (e) => e.preventDefault();
        const preventKeyScroll = (e) => {
            if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(e.key)) e.preventDefault();
        };

        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
            smoother?.paused(true);
            window.addEventListener("wheel", preventScroll, { passive: false });
            window.addEventListener("touchmove", preventScroll, { passive: false });
            window.addEventListener("keydown", preventKeyScroll, { passive: false });
        }

        return () => {
            document.body.style.overflow = prevBody;
            document.documentElement.style.overflow = prevHtml;
            smoother?.paused(false);
            window.removeEventListener("wheel", preventScroll);
            window.removeEventListener("touchmove", preventScroll);
            window.removeEventListener("keydown", preventKeyScroll);
        };
    }, [isMenuOpen]);

    return (
        <div id="smooth-wrapper">
            <div id="smooth-content">
                <main className="site-root cs" ref={rootRef}>
                    {/* HERO */}
                    <section className="hero cs__hero">
                        <div
                            className="hero__bg"
                            style={{ backgroundImage: `url(${spiralBackground})` }}
                            aria-hidden="true"
                        />
                        <div className="hero__glow" />
                        <div className="hero__overlay" />

                        <nav className="hero__nav">
                            <motion.button
                                type="button"
                                className="hero__menu"
                                aria-expanded={isMenuOpen}
                                aria-controls="site-navigation"
                                onClick={() => setIsMenuOpen((p) => !p)}
                                initial={{ opacity: 0, y: -18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <span className="menu-icon">
                                    <span />
                                    <span />
                                </span>
                                <span className="menu-label">Menu</span>
                            </motion.button>

                            <motion.a
                                href="/"
                                className="hero__logo-wrap"
                                initial={{ opacity: 0, y: -18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <img src={logoImage} alt="Russell Aguilar" className="hero__logo" />
                            </motion.a>
                        </nav>

                        <div className="cs__hero-content">
                            <SplitText as="h1" className="cs__title">{caseStudy.title}</SplitText>

                            <div className="cs__meta">
                                <div className="cs__meta-col">
                                    <span className="cs__meta-label">Client</span>
                                    <span className="cs__meta-value">{caseStudy.client}</span>
                                </div>
                                <div className="cs__meta-col">
                                    <span className="cs__meta-label">Year</span>
                                    <span className="cs__meta-value">{caseStudy.year}</span>
                                </div>
                                <div className="cs__meta-col cs__meta-col--services">
                                    <span className="cs__meta-label">Services</span>
                                    {caseStudy.services.map((s) => (
                                        <span key={s} className="cs__meta-value">{s}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="hero__scroll">
                            <div className="scroll-ring">
                                <motion.span
                                    className="scroll-dot"
                                    animate={{ y: [0, 16, 0] }}
                                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
                                />
                            </div>
                        </div>
                    </section>

                    {/* BODY CARD */}
                    <section className="cs__body">
                        <div className="cs__cover">
                            <img src={caseStudy.cover} alt={`${caseStudy.client} project overview`} />
                        </div>

                        <div className="cs__block cs__block--loose">
                            <InfoRow label="Background">
                                <p>{caseStudy.background.text}</p>
                                <a
                                    className="cs__link"
                                    href={caseStudy.background.link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="cs__link-dot" />
                                    {caseStudy.background.link.label}
                                </a>
                            </InfoRow>

                            <InfoRow label="Challenge">
                                {caseStudy.challenge.map((p, i) => (
                                    <p key={i}>{p}</p>
                                ))}
                            </InfoRow>
                        </div>

                        {caseStudy.comparison && (
                            <>
                                <SplitText className="cs__heading">Before and after</SplitText>
                                <BeforeAfter before={caseStudy.comparison.before} after={caseStudy.comparison.after} />
                                <div className="cs__block">
                                    {caseStudy.comparison.points.map((p) => (
                                        <InfoRow key={p.label} label={p.label}>
                                            <p>{p.text}</p>
                                        </InfoRow>
                                    ))}
                                </div>
                            </>
                        )}

                        <SplitText className="cs__heading">Key design decisions</SplitText>
                        <div className="cs__block">
                            {caseStudy.findings.map((f) => (
                                <InfoRow key={f.label} label={f.label}>
                                    <p>{f.text}</p>
                                </InfoRow>
                            ))}
                        </div>

                        <SplitText className="cs__heading">Key results</SplitText>
                        <div className="cs__block">
                            {caseStudy.results.map((r) => (
                                <InfoRow key={r.label} label={r.label}>
                                    {r.paragraphs.map((p, i) => (
                                        <p key={i}>{p}</p>
                                    ))}
                                </InfoRow>
                            ))}
                        </div>

                        {fb && (
                            <>
                                <SplitText className="cs__heading">What client said</SplitText>
                                <div className="cs__feedback">
                                    <article className={`cs__fb${fb.image ? "" : " cs__fb--nophoto"}`} key={fbIndex}>
                                        {fb.image && (
                                            <div className="cs__fb-photo">
                                                <img src={fb.image} alt={fb.name} />
                                            </div>
                                        )}
                                        <span className="cs__fb-badge" aria-hidden="true">
                                            <img src={quoteIcon} alt="" />
                                        </span>
                                        <div className="cs__fb-content">
                                            <h3 className="cs__fb-quote">{fb.quote}</h3>
                                            {fb.note && <span className="cs__fb-note">{fb.note}</span>}
                                            <div className="cs__fb-foot">
                                                <div className="cs__fb-person">
                                                    <span className="cs__fb-name">{fb.name}</span>
                                                    {fb.role && <span className="cs__fb-role">{fb.role}</span>}
                                                </div>
                                                {fbList.length > 1 && (
                                                    <div className="cs__fb-pager">
                                                        <button type="button" onClick={() => fbStep(-1)} aria-label="Previous feedback">‹</button>
                                                        <span>{String(fbIndex + 1).padStart(2, "0")}</span>
                                                        <span className="cs__fb-track">
                                                            <span style={{ width: `${((fbIndex + 1) / fbList.length) * 100}%` }} />
                                                        </span>
                                                        <span>{String(fbList.length).padStart(2, "0")}</span>
                                                        <button type="button" onClick={() => fbStep(1)} aria-label="Next feedback">›</button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            </>
                        )}

                        <div className="cs__gallery">
                            <figure className="cs__shot cs__shot--main">
                                <img src={caseStudy.gallery.main.src} alt={caseStudy.gallery.main.caption || `${caseStudy.title} screen`} />
                                {caseStudy.gallery.main.caption && <figcaption>{caseStudy.gallery.main.caption}</figcaption>}
                            </figure>
                            <div className="cs__shots-grid">
                                {caseStudy.gallery.small.map((s, i) => (
                                    <figure key={i} className="cs__shot">
                                        <img src={s.src} alt={s.caption || `Screen ${i + 1}`} />
                                        {s.caption && <figcaption>{s.caption}</figcaption>}
                                    </figure>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* NEXT CASE */}
                    <section className={`cs__next${nextHovered ? " is-hovered" : ""}`}>
                        <span className="cs__next-label">Next Case</span>
                        <SplitText className="cs__next-title">{caseStudy.next.name}</SplitText>

                        <Link
                            to={caseStudy.next.href}
                            className="cs__next-card"
                            onMouseEnter={() => setNextHovered(true)}
                            onMouseMove={handleNextMove}
                            onMouseLeave={handleNextLeave}
                        >
                            <motion.div
                                className="works__circle-cursor"
                                style={{ x: cursorX, y: cursorY }}
                                animate={{ opacity: nextHovered ? 1 : 0, scale: nextHovered ? 1 : 0.5 }}
                                transition={{
                                    x: { duration: 0.08, ease: "linear" },
                                    y: { duration: 0.08, ease: "linear" },
                                    opacity: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
                                    scale: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                                }}
                            >
                                <span>Next</span>
                            </motion.div>
                            <img src={caseStudy.next.image} alt={`${caseStudy.next.name} preview`} />
                        </Link>

                        <div className="cs__next-line" />

                        <div className="works__cta">
                            <MagneticButton href="/works" className="cs__outline-btn">
                                See All Works <sup className="magnetic-btn__sup">(0)</sup>
                            </MagneticButton>
                        </div>
                    </section>

                    <Footer />

                    <TiltMenu open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
                </main>
            </div>
        </div>
    );
}

/* ── kinukuha ang tamang case study base sa URL (/works/:slug) ── */
export default function CaseStudy() {
    const { slug } = useParams();
    const data = CASE_STUDIES[slug];
    if (!data) return <Navigate to="/works" replace />;

    const nextEntry = CASE_STUDIES[data.next];
    const caseStudy = {
        ...data,
        next: {
            name: nextEntry.title,
            href: `/works/${data.next}`,
            image: nextEntry.cover,
        },
    };

    return <CaseStudyPage key={slug} caseStudy={caseStudy} />;
}