import { useLayoutEffect, useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { createPortal } from "react-dom";
import { Link, useParams, Navigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

import "./Russell.css"; /* shared: smooth wrapper, hero nav/bg, magnetic btn, footer */
import "./CaseStudy.css";
import TiltMenu from "./TiltMenu";
import { WORKS } from "./Worksv2";

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
import kanji1Image from "../assets/Kanriel1.svg";
import kanji2Image from "../assets/Kanriel2.svg";
import kanji3Image from "../assets/Kanriel3.svg";
import kanji4Image from "../assets/Kanriel4.svg";
import bangkalCover from "../assets/bangkalproject.png";
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
import patsVideo from "../assets/PATS.mp4";
import patsPoster from "../assets/PATSSHOOL.svg";
import patsReference from "../assets/PATSSHOOL.svg";
import corpoCover from "../assets/corpo.svg";
import corpo1 from "../assets/corpo1.svg";
import corpo2 from "../assets/corpo2.svg";
import corpo3 from "../assets/corpo3.svg";
import corpo4 from "../assets/corpo4.svg";
import corpo5 from "../assets/corpo5.svg";
import corpo6 from "../assets/corpo6.svg";
import corpo7 from "../assets/corpo7.svg";
import corpoOriginalVideo from "../assets/corpo1.mp4";
import corpoEnhancedVideo from "../assets/Corpo.mp4";
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
/* const ciCase = {
    title: "Community Intelligence",
    client: "Enov8tive",
    year: "2026",
    services: ["Mobile App Design", "UX Design", "Product Design"],
    cover: coverImage,
      background: {
        text: "Community Intelligence is Enov8tive's mobile platform for Local Government Units (LGUs) in the Philippines. Registered patients are grouped into households, and each household profile holds its address, members, and living conditions. Field personnel and household representatives answer Pulso ng Masa surveys about each household's needs, from disaster readiness to social assistance, and the responses attach to the household record so LGUs can plan from real data. I designed the mobile flows for household management and the survey experience.",
        link: { label: "Visit client website.", href: "#" },
    },
    challenge: [
        "The primary user is a field worker holding a phone, standing in front of a family, often interrupted. The data is hierarchical (a household contains many members), the surveys are long, and the records change over time. Any design that treats this like a desktop form would be slow, error-prone, and awkward to use in someone's home.",
        "I framed the work around three questions: how do we separate household-level and member-level data so the user always knows who they are answering for, how do we make long surveys feel short and recoverable, and how do we keep records and statistics accurate when families change?",
    ],
    findings: [
        {
            label: "Model the data the way people think about it",
            text: "Some questions belong to the household and others to one person. Instead of one flat list, the flow opens with \"Who's Answering the Form?\" and branches into two lists: eight household surveys (such as Community Needs, Disaster Readiness, and Social Assistance) and one socioeconomic survey per member. Each list shows a summary and a progress count, so context is never ambiguous.",
        },
        {
            label: "Reduce typing, chunk the effort",
            text: "Field input on a small screen is expensive, so I replaced free text with checkbox tiles, searchable chips, number steppers, and star ratings. Typing is reserved for \"Others\". Long surveys are split into short screens (the Environmental Assessment runs across three, and Disaster Readiness adds Next and Previous), which keeps each step light and shows progress.",
        },
        {
            label: "Protect the data at irreversible moments",
            text: "Losing a half-finished survey, or submitting one by mistake, are the two costliest errors in this context. I added \"Complete Form?\" and \"Abort Form?\" confirmations, and household edits stay unsaved until the user confirms \"Save Household Changes?\". Each dialog states exactly what will be saved or lost, so users don't have to guess.",
        },
        {
            label: "Design for change, not just creation",
            text: "Families move, heads change, and the statistics must follow. Members can be transferred through a guided four-step flow or deactivated with a reason and date. If a head is deactivated, a new head must be chosen first and the other members' relationship tags reset to \"Others\", which prevents orphaned households. Deactivated members drop out of statistics but remain visible under Inactive and Transferred tabs, so history is preserved without polluting the numbers.",
        },
        {
            label: "Findability at scale",
            text: "With hundreds of households, search is the main entry point. The list shows the total count, highlights matching letters, and reports how many results were found. A filter narrows from region down to street, and an Active and Deactivated toggle separates current records from old ones. When nothing matches, the empty state offers to create that household, so a dead end becomes the next step.",
        },
    ],
    results: [
        {
            label: "What I delivered",
            paragraphs: [
                "A complete mobile experience for the household lifecycle (create, edit, list, deactivate, add members, transfer, and deactivate members) plus the Pulso ng Masa survey flows, with eight household surveys and one member survey linked to the household profile.",
                "Every feature was handed off to the development team with a workflow, acceptance criteria, annotated screens, and a Figma prototype.",
            ],
        },
    ],
    gallery: {
    
        small: [
            { src: galleryOne,  },
            { src: galleryTwo,  },
            { src: galleryThree, caption: "" },
            { src: galleryFour, caption: "" },
        ],
    },
    next: "enov8tive-login-revamp",
}; */

const kanrielCase = {
    title: "Kanriel",
    client: "Lady Arielle",
    year: "2026", // [TODO: kumpirmahin]
    services: ["Product Design", "UX Design", "Full-Stack Development", "PWA"],
    cover: kanrielImage,

    background: {
        text: "Kanriel is a JLPT study app I designed and built for Lady Arielle, a Japanese-language student at PATS in Arayat, Pampanga. Her school provided a reviewer website that was often down and a mobile app that only worked on Android, while the actual reviewers were printed on paper. She uses iOS, so she asked me for something that works on her device. I shaped the product with her, then designed and built it end to end as an installable Progressive Web App, from interface to database and storage. Her classmates later adopted it because they study the same material.",
        link: { label: "View the app.", href: "https://kanriel.vercel.app/" },
    },
    challenge: [
        "The existing tools failed at the moment students needed them. The website was frequently down, the app excluded iOS users, and paper reviewers can be lost, damaged, and hard to carry. Reliability and access were the real problems, more than features.",
        "I worked from three questions: how can paper reviewers become digital without forcing students to retype everything, how can classmates studying the same material avoid rebuilding it one by one, and how can every study material (reviewers, videos, PDFs) live in a single place?",
    ],
    findings: [
        {
            label: "Make the core loop light",
            text: "Students create reviewers for kanji, vocabulary, and grammar and study them as flashcards or quizzes. The goal was a short path from opening the app to practicing, so that a few spare minutes are enough to review.",
        },
        {
            label: "Iterating on a real pain point: data entry",
            text: "After the first version, feedback was fast and specific: typing every question and answer by hand took too long. I redesigned the entry flow around import. The student photographs the paper reviewer, gives the photo and a CSV template to an AI assistant, and uploads the resulting table. The importer validates columns, catches duplicates, and handles up to 500 rows at a time. Adding a reviewer went from a long session to about one to two minutes. Trade-off: the flow depends on an external AI tool, so the importer's validation and duplicate checks carry the reliability.",
        },
        {
            label: "Sharing without sacrificing individual progress",
            text: "Classmates review the same material, so rebuilding it was wasted effort. Reviewers can be shared by link and added to a logged-in classmate's dashboard. Shared reviewers are view-only, and each student keeps their own progress, so one person's scores never affect another's.",
        },
        {
            label: "Consolidating scattered materials",
            text: "Teachers sent JLPT orientation videos and PDFs through chats and folders. The Study Library keeps PDFs, videos, and audio in folders, with favorites, saved playback position, and PDF highlights, so materials sit next to the reviewers instead of in another app.",
        },
        {
            label: "Designed for interrupted, imperfect sessions",
            text: "Study sessions get cut short, so unfinished quizzes save automatically and can be resumed. Answers support partial credit and show which parts matched, so a near miss still teaches something. Every attempt is logged, wrong answers collect in a mistake bank for retry, lessons can be merged into one reviewer for mixed practice, and a timed Kotoba Game offers a faster mode.",
        },
        {
            label: "A PWA to remove platform barriers",
            text: "The school's app excluded iOS, so I built Kanriel as a Progressive Web App. It can be added to the home screen on iPhone, iPad, or Android, opens in its own window, needs no app store, and updates reach everyone as soon as they're published. One codebase also made it realistic for a solo builder to maintain.",
        },
        {
            label: "Personal theme, neutral structure",
            text: "The pink theme was Lady Arielle's request, because she wanted an app she'd enjoy opening daily. The structure underneath stays simple, readable, and focused on the material, so classmates who don't share her taste can use it comfortably.",
        },
    ],
    results: [
        {
            label: "Learning outcome",
            paragraphs: [
                "Lady Arielle reports that her grades improved after she started using Kanriel, and she began passing her JLPT mock tests. Before the app, her materials were scattered and reviewing was inconsistent. With everything in one place, she studied more regularly through flashcards and quizzes and revisited weak topics.",
                "This is one learner's experience, not a controlled study, so I treat it as strong qualitative evidence and not as proof of effect.",
            ],
        },
        {
            label: "Adoption",
            paragraphs: [
                "Lady Arielle has used Kanriel for four months and created more than 50 reviewers. Her classmates tried it after she shared it and kept using it. The import flow, which came directly from user feedback, reduced the time to add a paper reviewer to about one to two minutes.",
            ],
        },
        {
            label: "What's next",
            paragraphs: [
                "A manual review flow for paragraph answers in the custom form builder, password reset, a settings page, and automated tests. I'd also run short sessions with classmates to see where the import flow still causes friction.",
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
        small: [
            { src: kanji3Image},
            { src: kanji2Image },
            { src: kanji1Image},
                        { src: kanji4Image},
        ],
    },
    next: "cafe-rese",
};



/* const loginCase = {
    title: "Enov8tive Login Revamp",
    client: "Enov8tive",
    year: "2026",
    services: ["UI Design", "UX Design", "Design Handoff"],
    cover: revampImage,
    background: {
        text: "The login page is the first screen every Enov8tive subscriber sees. Accounts exist only for people who bought or subscribed to the apps, so there is no public sign-up. I redesigned the login, the forgot-password flow, and the security states added after QA feedback, then handed screens, states, and specs to engineering.",
        link: { label: "Visit prototype.", href: "#" },
    },
    challenge: [
        "The original page undermined trust at the first touchpoint of a healthcare product. A faded stock photo of a laptop and smartwatch said nothing about healthcare and competed with the form. The card packed the logo, social sign-in, form, legal text, app store badges, and social links into one small box, so the primary action was hard to find, and nothing told users whether the app was working, waiting, or had failed.",
        "QA surfaced two functional problems: no rate limiting, so a bot could attempt passwords indefinitely, and a broken forgot-password flow, where opening the emailed magic link dropped users back on the login page. The work had to fix hierarchy and trust, add security users can understand, and close the reset dead end.",
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
            label: "Calm, on-brand visual direction",
            text: "I replaced the stock photo with a quiet white and blue treatment taken from the logo, so the page supports the form. White and blue are common in healthcare and often associated with cleanliness, trust, and calm, and reusing brand colors makes the page familiar to returning users. The button uses a deeper blue so white text stays readable.",
        },
        {
            label: "One task per card, clear hierarchy",
            text: "The card now holds only what's needed to sign in. Logo, tagline, social links, and store badges moved to a brand panel beside it. Labels sit above larger fields, and Sign in is the strongest element on the page. Google and Apple sign-in show a \"Last used\" badge to help returning users pick the right method quickly.",
        },
        {
            label: "System status at every step",
            text: "The original gave no sign that anything was happening. I designed loading states for the button and form and clear messages for errors and blocked attempts, so users can tell whether the page is working, waiting, or has rejected them.",
        },
        {
            label: "Security the user can understand",
            text: "In response to QA's brute-force finding, I designed three layers: rate limiting, a reCAPTCHA check, and account lockout. Each has its own message, so a locked-out user understands what happened and doesn't assume the page is broken. Security that confuses legitimate users creates support load, so the copy matters as much as the control.",
        },
        {
            label: "Copy and structure for registered users only",
            text: "Because accounts come from a purchase or subscription, there is no sign-up button. The copy reads \"Sign in to your enov8tive account\", and a support link helps people who can't get in.",
        },
        {
            label: "Finding and fixing the dead-end reset",
            text: "I noticed the magic link led nowhere, proposed a fix on my own initiative, and presented the screens to the CEO and my director. After opening the link, users land on a secure page to create and confirm a new password, followed by a reCAPTCHA check.",
        },
    ],
    results: [
        {
            label: "Approval and handoff",
            paragraphs: [
                "The CEO reviewed and approved the redesign, and my director backed the forgot-password flow I proposed. I handed engineering the final screens, states, and specs for the login, the three security layers, and the password reset.",
                "The redesign is in development and not yet deployed, so I'm not reporting performance numbers. The screens shown are the approved design, not a live page. Once live, I'd track login success rate, lockout-related support requests, and password-reset completion.",
            ],
        },
    ],
    gallery: {
    
        small: [
            { src: revampImage },
            { src: revampImage, },
            { src: revampImage,  },
            { src: revampImage, },
        ],
    },
    next: "kanriel",
}; */

const reseCase = {
    title: "Cafe RESÉ",
    client: "Cafe RESÉ",
    year: "2026",
    services: ["UI Design", "UX Design"],
    cover: reseImage,
    background: {
        text: "Cafe RESÉ is a busy cafe in Malolos, Bulacan with a steady flow of customers, but its only online presence is a Facebook page and an Instagram account. Nobody asked me to design anything. I chose it as a self-initiated project to practice defining a problem and a solution without a brief. The result is a UI and UX template showing how the cafe could present its story, menu, and services online. It has not been developed, deployed, or shown to the cafe.",
        link: {
            label: "View the prototype.",
            href: "https://www.figma.com/proto/vcYZJzNfJjc4Miy8LpwP9T/UI-UX-Portfolio?node-id=247-2969&t=En7mVMQtOhTKvMHK-0&scaling=scale-down-width&content-scaling=fixed&page-id=38%3A1422&starting-point-node-id=247%3A2969&hide-ui=1",
        },
    },
    challenge: [
        "Social feeds are good for updates and poor for orientation. A first-time visitor has to scroll through old posts to find the menu, learn the story, or work out how to get there. Information that should take seconds takes minutes.",
        "With no client brief, I defined my own success criteria: what must a first-time visitor see immediately, how can the menu and the cafe's story get room without crowding the home page, and how can contact and feedback be easy to find?",
    ],
    findings: [
        {
            label: "One place for what newcomers look for",
            text: "The main goal was a single destination that gathers the story, menu, services, and contact details. It's designed as a template, so the cafe can fill in its own content later.",
        },
        {
            label: "A home page that scrolls like a pitch",
            text: "The home page follows a deliberate order: a hero that says who the cafe is, an About section, Services, then customer Feedbacks. A visitor can understand the cafe in one scroll without opening another page.",
        },
        {
            label: "Give the highest-intent content its own page",
            text: "The menu is what most visitors want first, so it has a dedicated page rather than a squeezed section. This gives items space and makes the list easier to scan.",
        },
        {
            label: "Brand personality through story",
            text: "A busy cafe usually has a story worth telling. The Our Story page gives it room so the brand feels personal and less like a generic template.",
        },
        {
            label: "Reduce the effort to reach the cafe",
            text: "A dedicated Contact page keeps the essentials in one place, so visitors don't dig through social posts. Feedbacks on the home page add social proof from other customers.",
        },
    ],
    results: [
        {
            label: "What I delivered",
            paragraphs: [
                "A UI and UX design for the Cafe RESÉ website: a home page with Hero, About, Services, and Feedbacks sections, plus separate Menu, Our Story, and Contact pages, with an interactive Figma prototype.",
                "Because this is self-initiated and hasn't been shown to the cafe or tested with visitors, I'm not claiming outcomes. The next step would be to share it with the owner, learn which content they'd actually maintain, and test whether first-time visitors find the menu and location quickly.",
            ],
        },
    ],
    gallery: {

        small: [
            { src: reseImage, caption: "" },
            { src: rese4Image, caption: "" },
            { src: rese2Image, caption: "" },
            { src: rese3Image, caption: "" },
        ],
    },
    next: "bangkal-qrush",
};

const bangkalCase = {
    title: "QRUSH",
    client: "Barangay Bangkal",
    year: "2025",
    services: ["UI Design", "UX Design", "Full-Stack Development", "System Design"],
    cover: bangkalCover,
      background: {
        text: "QRUSH is a web-based document request system for Barangay Bangkal in Malolos, Bulacan, built as a four-person capstone project at La Consolacion University Philippines. Residents request barangay documents online and track them in real time, while staff verify, process, and complete each transaction from a role-based dashboard. I led the project and handled the design and development of the system, working with three teammates, and it is deployed as a live website.",
        link: { label: "Visit the live site.", href: "https://bangkalqrush.com" },
    },
    challenge: [
        "The barangay processed every document request in person. Based on interviews and observation with officials and residents, this meant congestion at the hall, no way for residents to check a request's status without returning, no formal check that a requester actually lives in the barangay, and no digital tool for staff to organize, track, or report on transactions. Residents who work office hours had no practical way to request a document at all.",
        "Moving online introduces its own risks. The audience ranges from working adults to elderly residents with low digital confidence, the data includes IDs and proof of residency, and not every resident has a working phone number on file. The design had to be secure enough for a government context and still usable by the people least comfortable with online forms.",
        "I worked from three questions: how do we verify residents without locking out those the records miss, how do we guide people through a request without errors, and how do we keep every request traceable from submission to claim?",
    ],
    findings: [
        {
            label: "Verification against the barangay's own masterlist",
            text: "Registration requires the resident's details to match the official masterlist exactly before an account is created. Partial matches show hints under the relevant field, but they only guide the user and never approve an account. This keeps access limited to registered residents without the barangay having to trust self-declared identity.",
        },
        {
            label: "Fallback paths so no resident is excluded",
            text: "A strict match would fail residents whose records are outdated, so I designed two fallbacks. Manual verification asks for a valid ID, a selfie holding the ID, and one proof of residency, with a written explanation if the proof isn't in the resident's name, and allows up to three attempts. A Tracker Reference ID lets residents check the review status without an account. Staff can also register residents in person. Security that locks out the people the service exists for would have defeated the purpose.",
        },
        {
            label: "A phone OTP gate before the first request",
            text: "After the first login, residents verify their number with a six-digit SMS code before they can submit any request. They can still browse the dashboard while they wait, so the gate blocks the action that matters without blocking the whole product. Resend is limited to three attempts with a sixty-second cooldown, and a lockout routes the resident to staff for a manual reset.",
        },
        {
            label: "Built for low digital literacy",
            text: "The interface follows WCAG AA for text size and contrast, uses plain Filipino and English, and each request is broken into short steps. First-time users get a skippable onboarding walkthrough and an optional tour with tooltips, a chatbot answers barangay questions in either language, and the PWA can be added to the home screen on Android and iOS. Residents without smartphones can ask for a printed QR ticket, so the physical process is never cut off.",
        },
        {
            label: "One shared reference through ticket, QR, and public tracker",
            text: "Approval generates a digital ticket with a QR code that staff scan to complete the transaction. A public tracker shows limited details without login, with the name partially masked, and sends the owner to log in for the full view. Ownership is validated so one resident can't see another's request. Completion then produces a separate Official Receipt, so the ticket works as the claim reference and the receipt as the permanent proof of payment.",
        },
        {
            label: "Designing for delays and disputes",
            text: "A follow-up button appears when processing runs past the configured time plus a buffer, with up to three attempts and a cooldown. Pickup has a claim window with reminders before expiry. If staff set the pickup time less than 24 hours before the window closed, the request is flagged as a disputed unclaimed document instead of penalizing the resident. Every action is recorded in a tamper-evident activity log, so disputes are settled with evidence instead of memory.",
        },
        {
            label: "A staff dashboard that matches real workflows",
            text: "Admin, Staff, and Kapitan accounts each get their own permissions. Staff review requests with mandatory reasons on rejection, mark pickups, complete transactions by QR, reference number, or manual entry, manage services, stock, and the calendar, and export reports. Staff-side logins are whitelisted and require a PIN after the password.",
        },
        {
            label: "Security chosen with the audience in mind",
            text: "I used Firebase App Check and compound-key API rate limiting instead of CAPTCHA, because CAPTCHA is a documented barrier for elderly and non-technical users, the group most at risk here. App Check blocks unauthorized clients at the infrastructure level with no extra steps for the user. Other controls include single active device sessions, device login alerts, session timeouts, and optional email two-factor authentication. Trade-off: this relies on Firebase and Supabase, which sped up delivery but ties the system to those platforms.",
        },
        {
            label: "Scoped AI, with its limits stated",
            text: "The chatbot uses the Gemini API and is restricted to barangay-related questions, with no personal resident data sent to it. The restriction is prompt-based, not a hard technical block, so it can't be guaranteed against every off-topic query. I documented that limit and kept the chatbot as an assistive layer, never a required step.",
        },
    ],
    results: [
        {
            label: "Evaluation",
            paragraphs: [
                "The system was evaluated against ISO/IEC 25010:2023 by 40 respondents: 30 verified residents, 5 barangay staff and clerks, and 5 IT professionals. It earned a grand mean of 4.47, interpreted as Very Good. Functional Suitability, Compatibility, Security, Maintainability, Interaction Capability, and Safety rated Excellent, and no characteristic scored below 4.40. The system also received the Best in System Design award for the capstone.",
                "The lowest-scoring area was Performance Efficiency (4.40), specifically capacity, because the system hasn't been stress-tested. The paper also notes the scores sit in a narrow range, the evaluation window was short, and no penetration test was done, so I treat the results as a solid acceptance signal, not proof of long-term performance.",
            ],
        },
        {
            label: "What I delivered",
            paragraphs: [
                "A full-stack production web app, live at bangkalqrush.com, covering masterlist verification with manual fallback, OTP-gated document requests, QR ticketing and public tracking, claim-window and dispute handling, official receipts, appointment booking with the Kapitan, announcements, and a role-based admin dashboard with reporting.",
            ],
        },
        {
            label: "What I'd do next",
            paragraphs: [
                "Run formal load testing with a tool like k6 or JMeter before any wider rollout, add AI-assisted pre-screening of uploaded requirements to cut staff review time, extend the PWA with background sync for patchy connectivity (the system needs a stable connection today), and add dedicated evaluation items for the OTP gate, follow-up feature, and chatbot, which were scored under existing items.",
            ],
        },
    ],
    gallery: {
        small: [
            { src: bangkal1 },
            { src: bangkal2 },
            { src: bangkal3 },
            { src: bangkal4 },

            { src: bangkal7 },
            { src: bangkal8 },
            { src: bangkal9 },
            { src: bangkal10 },
        ],
    },
    next: "playground",
};



const playgroundCase = {
    title: "PATS Winter Playground",
    client: "Personal project",
    year: "2026",
    services: ["Motion Design", "GSAP Animation", "Frontend Development"],
    cover: patsPoster,
    coverVideo: patsVideo,
      background: {
        text: "This is a personal motion study, not a client project, though it ended up being shared with the schoofl it depicts. I modeled an animated school scene after the Philippines Arayat Training School (PATS) building, with mountains behind it, and built it in React with GSAP. With the year-end approaching, I turned it into a winter scene with falling snow, snowy trees, and a snowy roof. It's a space to practice frontend motion design and to explore how far one illustrated scene can go with code alone.",
        link: { label: "View the playground.", href: "https://klyk-inky.vercel.app/" },
    },
    challenge: [
        "Motion is easy to overdo and hard to make meaningful. I set myself three questions: how do I make a still illustration feel alive, how do I show time of day changing without swapping images, and how do I make people want to explore instead of just look?",
        "The scene also had to feel like PATS, so I used the real building as reference and kept its brick walls, white columns, and triangular entrance.",
    ],
    reference: [
        { src: patsReference, },
    ],
    findings: [
        {
            label: "State change through time of day",
            text: "The scene moves through morning, noon, evening, and night. The sun travels, sky color shifts, and the mood of the whole school changes with it, so the page looks different on each visit. Driving this from code instead of swapped images keeps the file light and the transitions continuous.",
        },
        {
            label: "A seasonal layer with purpose",
            text: "Because the year is ending, I added falling snow, snow on the roof and trees, and a cold blue sky, so the school feels ready for the holidays. Seasonal detail gives the scene a reason to be revisited.",
        },
        {
            label: "Life through uneven rhythm",
            text: "Students walk across the front of the school, and a sensei is part of the scene. Each character moves at its own pace, so the motion doesn't read as one repeating loop.",
        },
        {
            label: "Interaction that rewards curiosity",
            text: "Characters and objects react to click and hover, which turns the picture into something to explore.",
        },
        {
            label: "Anchoring it in a real event",
            text: "PATS has a photo booth at its year-end event, so I added one beside the Student Council booth. A tooltip invites visitors to view photos, and a speech bubble in English and Japanese invites them to try it. Tying the scene to something real gives it a story, not just effects.",
        },
        {
            label: "A cartoon style people see themselves in",
            text: "I kept the school and its students in a friendly cartoon style instead of a realistic one. It makes the scene approachable, forgives small inaccuracies in the building, and lets students recognize themselves and their school at a glance. That recognition is what the PATS admin and students responded to.",
        },
    ],
    results: [
        {
            label: "What I built",
            paragraphs: [
                "An interactive winter scene of PATS built with React and GSAP, with a day-and-night cycle, moving students and a sensei, and a photo booth tied to the year-end event.",
                "It started as a practice project, but the people it was made for responded to it. The PATS admin liked it and found it cute, and students reacted the same way, especially to the cartoon version of their school and of themselves. That kind of reaction matters to me more than any metric here, because it shows the scene felt recognizable and warm to the community it depicts. There's no formal usage data, so I treat this as informal qualitative feedback.",
                "If I continued, I'd add a reduced-motion mode and test performance on low-end phones, since continuous animation is where this kind of piece usually struggles.",
            ],
        },
    ],
    gallery: {
        small: [], // [TODO: optional, ilagay ang screenshots ng morning/night, halimbawa { src: patsNight, caption: "Night" }]
    },
    next: "enov8tive-corporate-website",
};
const corporateCase = {
    title: "Enov8tive Corporate Website",
    client: "Self-initiated (Enov8tive concept)",
    year: "2026",
    services: ["UX Audit", "Web Design", "UI Design", "Front-end Development", "Motion Design"],
    cover: corpoCover,
    coverCompare: {
        original: corpoOriginalVideo,
        enhanced: corpoEnhancedVideo,
    },
       background: {
        text: "A self-initiated redesign of Enov8tive's corporate landing page, the site that introduces their healthcare software to clinics, hospitals, and medical practitioners. It was not commissioned, and Enov8tive has not seen it. I treated it as a real engagement: I audited the live site, defined the problems, set design principles, and then designed and built the result myself. Because Enov8tive's name and logo can't be used, I created a placeholder brand, Vitalink, so the work stands on its own. My role was end-to-end: UX audit, information architecture, visual design, prototyping, and front-end development with GSAP.",
        links: [
            { label: "Visit the website.", href: "https://vitalink-rose.vercel.app/" },
            { label: "View the prototype.", href: "https://www.figma.com/proto/6SQPSy8GHbNR0q2e1sR5Mx/Corpo-Redesing?node-id=21-1140&t=ExMedrxxMF6fAlxq-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&hide-ui=1" },
        ],
    },
    challenge: [
        "The audience is a medical decision-maker: a clinic owner, administrator, or physician who evaluates software quickly and with skepticism. For that person, the site has to answer three questions fast: what is this, can I trust it, and what do I do next. The original had the right content but answered them weakly. Trust came almost entirely from stock photography, so it looked like generic healthcare rather than a credible software company. Hierarchy was flat, with long stacked sections and large empty gaps. The primary tabs were low in contrast and easy to miss, the call-to-action banner put teal text over a busy photo, the testimonial used a clip-art avatar, the footer logo area looked broken, and \"Inquire Now\" appeared in several different styles. The page had no motion or sense of polish, so it felt static.",
        "I framed the work around one goal, getting a qualified visitor to inquire, and three questions: how do we signal clinical credibility through the interface itself instead of through stock photos, how do we make the product, the PhilHealth integration, and the mobile app understandable in a single scroll, and how do we add motion that supports reading instead of competing with it?",
    ],
    findings: [
        {
            label: "Design principles",
            text: "Before designing, I set four principles to judge every decision against: clinical (calm, clean, uncluttered), credible (proof before claims), clear (one primary action per view), and quiet (motion that guides, never performs). When a layout idea failed one of these, it was cut.",
        },
        {
            label: "A placeholder brand with intent",
            text: "Vitalink keeps the DNA-helix motif so the identity still reads as healthcare and stays recognizable as a medical product, while the name, wordmark, and layout are original. It also kept the project ethically clean: the redesign demonstrates my process without borrowing someone else's brand.",
        },
        {
            label: "Visual system: white, light blue, one accent",
            text: "I limited the palette to white and light blue surfaces with a single teal accent reserved for actions, so color always means something. Rounded cards, generous spacing, and a consistent type scale give the page a calm, clinical rhythm. Trade-off: a restrained palette risks feeling cold, so I let photography and the app mockups carry the warmth.",
        },
        {
            label: "One call to action, one style",
            text: "The original used several styles of \"Inquire Now\". I reduced it to one primary teal pill with an arrow, repeated in the navigation, hero, banner, and FAQ, with a secondary ghost button for lower-priority actions such as About Us. Repetition gives the visitor a predictable path at every scroll depth, and a single visual treatment makes the main action unmistakable.",
        },
        {
            label: "Hero: message first, proof second",
            text: "The hero leads with a large headline and two actions, then a \"Trusted by 10k+ providers\" line with avatars and a star rating placed directly under it, so social proof arrives before the visitor scrolls. A soft teal overlay keeps the text readable over the photo. The proof numbers in this concept are placeholders and would be replaced with verified data in production.",
        },
        {
            label: "Information architecture for scanning",
            text: "I replaced long stacked sections with a sequence that matches how a buyer evaluates: a one-line value statement, three stat cards for credibility, then \"What We Do\" as a tabbed card carousel. Tabs became a clear pill switcher with a solid active state, fixing the original's low-contrast controls. Cards use a dark gradient under the photos so white text keeps its contrast. This limits the choices on screen at any moment and keeps the page shorter.",
        },
        {
            label: "Localized trust signals",
            text: "I adapted the concept to a Philippine market and gave the PhilHealth eClaims integration its own section: a green-tinted card with a verified badge and a moving row of partner logos. For providers in this market, a certified integration is a stronger trust signal than any marketing line, so it earns dedicated space and a distinct color that separates it from the product's teal.",
        },
        {
            label: "Removing friction near the decision point",
            text: "The banner uses a soft blue overlay so its headline and two buttons stay legible. Testimonials became a single large quote with simple carousel controls, and the FAQ moved to a two-column layout with an Inquire Now button beside it, so a visitor with a last-minute question can act without scrolling back up. Plus and minus toggles make each question's state obvious.",
        },
        {
            label: "Showing the product",
            text: "The page closes with the mobile app, Vitalink MD, using phone mockups, a one-line promise, and store badges. Showing real interface screens does more for credibility than a description, and it gives the page a visual ending that points to a next step.",
        },
        {
            label: "Motion with restraint",
            text: "I built the page with GSAP and ScrollSmoother: smooth scrolling and minimal fade-in triggers as sections enter. Motion is limited to opacity and short vertical shifts so it supports reading order without adding noise. Trade-off: smooth scrolling can feel unfamiliar to some users, so keeping the effect subtle was a deliberate choice, not a default.",
        },
    ],
    results: [
        {
            label: "What I delivered",
            paragraphs: [
                "A designed and fully built landing page: hero with social proof, value statement and stats, tabbed What We Do, PhilHealth integration, call-to-action banner, testimonials, FAQ, and a mobile app showcase, plus a Figma prototype and a live demo.",
                "This is a self-initiated concept that hasn't been launched or tested with real users, so I'm not claiming performance numbers. If it went into production, I would measure inquiry conversion on the primary call to action, scroll depth through the What We Do section, and FAQ engagement, and I would run a short usability test with clinic administrators to check whether the hierarchy and tabs behave as designed.",
            ],
        },
        {
            label: "What I'd do next",
            paragraphs: [
                "Replace placeholder statistics and testimonials with verified content, run an accessibility pass against WCAG AA for text over imagery and the overlay states, add a reduced-motion fallback for the scroll animation, and test the \"What We Do\" carousel with keyboard and touch users.",
            ],
        },
    ],
    gallery: { small: [] },
    galleryCompare: {
        // TODO: palitan ng actual BEFORE images ang original
        original: [
            { src: corpoCover }, { src: corpo1 }, { src: corpo2 }, { src: corpo3 },
            { src: corpo4 }, { src: corpo5 }, { src: corpo6 }, { src: corpo7 },
        ],
        enhanced: [
            { src: corpoCover }, { src: corpo1 }, { src: corpo2 }, { src: corpo3 },
            { src: corpo4 }, { src: corpo5 }, { src: corpo6 }, { src: corpo7 },
        ],
    },
    next: "kanriel",
};

/* ── LAHAT NG CASE STUDIES. Ang key = URL:  /works/<key> ──
    Para magdagdag ng bago: gumawa ng object tulad ng ciCase,
    tapos ilagay dito. `next` = key ng susunod na case study. */
export const CASE_STUDIES = {
    // "community-intelligence": ciCase,
    kanriel: kanrielCase,
    // "enov8tive-login-revamp": loginCase,
    "cafe-rese": reseCase,
    "bangkal-qrush": bangkalCase,
    playground: playgroundCase,
    "enov8tive-corporate-website": corporateCase,
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

function VersionTabs({ value, onChange }) {
    const tabs = [
        { id: "original", label: "Original" },
        { id: "enhanced", label: "Enhanced version" },
    ];
    const idx = Math.max(0, tabs.findIndex((t) => t.id === value));
    return (
        <div className="cs__tabs" role="tablist" style={{ "--i": idx }}>
            <span className="cs__tab-pill" aria-hidden="true" />
            {tabs.map((t) => (
                <button
                    key={t.id}
                    type="button"
                    role="tab"
                    aria-selected={value === t.id}
                    className={`cs__tab${value === t.id ? " is-active" : ""}`}
                    onClick={() => onChange(t.id)}
                >
                    {t.label}
                </button>
            ))}
        </div>
    );
}

function GalleryShot({ className, onOpen, children }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const [hover, setHover] = useState(false);
    const move = (e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
    };
    return (
        <figure
            className={className}
            onClick={onOpen}
            onMouseMove={move}
            onMouseEnter={(e) => { move(e); setHover(true); }}
            onMouseLeave={() => setHover(false)}
        >
            <motion.div
                className="works__circle-cursor"
                style={{ x, y }}
                initial={false}
                animate={{ opacity: hover ? 1 : 0, scale: hover ? 1 : 0.5 }}
                transition={{
                    opacity: { duration: 0.2 },
                    scale: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                }}
            >
                <span>View</span>
            </motion.div>
            {children}
        </figure>
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
    const [preview, setPreview] = useState(null);
    const [coverTab, setCoverTab] = useState("enhanced");
    const [galleryTab, setGalleryTab] = useState("enhanced");
    const smallShots = caseStudy.galleryCompare
        ? caseStudy.galleryCompare[galleryTab]
        : caseStudy.gallery.small;
    const mainOffset = caseStudy.gallery.main ? 1 : 0;
    const galleryList = [
        ...(caseStudy.gallery.main ? [caseStudy.gallery.main] : []),
        ...smallShots,
    ];
    const lbStep = useCallback(
        (d) => setPreview((i) => (i === null ? i : (i + d + galleryList.length) % galleryList.length)),
        [galleryList.length]
    );

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

            q(".cs__compare, .cs__reference .cs__shot").forEach((shot) => {
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
        if (preview === null) return;
        const smoother = ScrollSmoother.get();
        smoother?.paused(true);
        const onKey = (e) => {
            if (e.key === "Escape") setPreview(null);
            if (e.key === "ArrowRight") lbStep(1);
            if (e.key === "ArrowLeft") lbStep(-1);
        };
        window.addEventListener("keydown", onKey);
        return () => {
            smoother?.paused(false);
            window.removeEventListener("keydown", onKey);
        };
    }, [preview]);

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
                        {caseStudy.coverCompare && <VersionTabs value={coverTab} onChange={setCoverTab} />}
                        <div className="cs__cover">
                            {caseStudy.coverCompare ? (
                                <video
                                    key={coverTab}
                                    src={caseStudy.coverCompare[coverTab]}
                                    poster={caseStudy.cover}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload="metadata"
                                />
                            ) : caseStudy.coverVideo ? (
                                <video
                                    src={caseStudy.coverVideo}
                                    poster={caseStudy.cover}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload="metadata"
                                />
                            ) : (
                                <img src={caseStudy.cover} alt={`${caseStudy.client} project overview`} />
                            )}
                        </div>

                        <div className="cs__block cs__block--loose">
                            <InfoRow label="Background">
                                <p>{caseStudy.background.text}</p>
                                {(caseStudy.background.links || (caseStudy.background.link ? [caseStudy.background.link] : [])).map((l) => (
                                    <a
                                        key={l.label}
                                        className="cs__link"
                                        href={l.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <span className="cs__link-dot" />
                                        {l.label}
                                    </a>
                                ))}
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

                        {caseStudy.reference && (
                            <>
                                <SplitText className="cs__heading">Reference</SplitText>
                                <div className="cs__gallery cs__reference">
                                    {caseStudy.reference.map((r, i) => (
                                        <figure key={i} className="cs__shot cs__shot--main">
                                            <img src={r.src} alt={r.caption || "Reference"} />
                                            {r.caption && <figcaption>{r.caption}</figcaption>}
                                        </figure>
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

                        {caseStudy.galleryCompare && <VersionTabs value={galleryTab} onChange={setGalleryTab} />}
                        <div className="cs__gallery">
                            {caseStudy.gallery.main && (
                                <GalleryShot
                                    className="cs__shot cs__shot--main cs__shot--click"
                                    onOpen={() => setPreview(0)}
                                >
                                    <img src={caseStudy.gallery.main.src} alt={caseStudy.gallery.main.caption || `${caseStudy.title} screen`} />
                                    {caseStudy.gallery.main.caption && <figcaption>{caseStudy.gallery.main.caption}</figcaption>}
                                </GalleryShot>
                            )}
                            <div key={galleryTab} className={`cs__shots-grid${smallShots.length === 3 ? " cs__shots-grid--three" : ""}`}>
                                {smallShots.map((s, i) => (
                                    <GalleryShot
                                        key={i}
                                        className="cs__shot cs__shot--click"
                                        onOpen={() => setPreview(mainOffset + i)}
                                    >
                                        <img src={s.src} alt={s.caption || `Screen ${i + 1}`} />
                                        {s.caption && <figcaption>{s.caption}</figcaption>}
                                    </GalleryShot>
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
                                See All Works <sup className="magnetic-btn__sup">({WORKS.length})</sup>
                            </MagneticButton>
                        </div>
                    </section>

                    <Footer />

                    <TiltMenu open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
                </main>
                                       {preview !== null && galleryList[preview] &&
                    createPortal(
                        <div
                            className="cs__lightbox"
                            role="dialog"
                            aria-modal="true"
                            onClick={() => setPreview(null)}
                        >
                            <img
                                key={preview}
                                src={galleryList[preview].src}
                                alt={galleryList[preview].caption || "Preview"}
                                onClick={(e) => e.stopPropagation()}
                            />

                            <button
                                type="button"
                                className="cs__lb-nav cs__lb-nav--prev"
                                aria-label="Previous image"
                                onClick={(e) => { e.stopPropagation(); lbStep(-1); }}
                            >
                                ‹
                            </button>
                            <button
                                type="button"
                                className="cs__lb-nav cs__lb-nav--next"
                                aria-label="Next image"
                                onClick={(e) => { e.stopPropagation(); lbStep(1); }}
                            >
                                ›
                            </button>

                            <span className="cs__lightbox-count">
                                {String(preview + 1).padStart(2, "0")} / {String(galleryList.length).padStart(2, "0")}
                            </span>

                            <button
                                type="button"
                                className="cs__lightbox-close"
                                aria-label="Close preview"
                                onClick={(e) => { e.stopPropagation(); setPreview(null); }}
                            >
                                ×
                            </button>
                        </div>,
                        document.body
                    )}
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