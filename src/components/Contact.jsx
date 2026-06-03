import emailjs from "@emailjs/browser";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  FiArrowLeft,
  FiChevronRight,
  FiDownload,
  FiMail,
  FiPhone,
  FiX,
} from "react-icons/fi";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineBeaker } from "react-icons/hi";
import { IoBriefcaseOutline, IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import { MdOutlineWebStories } from "react-icons/md";
import ReCAPTCHA from "react-google-recaptcha";
import { SiIndeed } from "react-icons/si";
import logo from "../assets/logo.png";
import "./Portfolio.css";

const MotionDiv = motion.div;
const MotionForm = motion.form;
const MotionSpan = motion.span;
const STEP_COUNT = 4;

const DEFAULT_ENGAGEMENT = "hire";

const DEFAULT_FORM_DATA = {
  message: "",
  preferredDate: "",
  name: "",
  company: "",
  phoneCountry: "+63",
  phoneNumber: "",
  email: "",
};

const CONTACT_EMAIL = "klentaguilar@gmail.com";
const CONTACT_PHONE = "+639672179650";

const PHONE_COUNTRY_OPTIONS = [
  { value: "+63", label: "PH +63" },
  { value: "+1", label: "US +1" },
  { value: "+44", label: "UK +44" },
  { value: "+61", label: "AU +61" },
  { value: "+65", label: "SG +65" },
  { value: "+81", label: "JP +81" },
];

const investmentRanges = [
  { id: "under-500", label: "Under $500", description: "Starter" },
  { id: "800", label: "$800", description: "Essential" },
  { id: "1200", label: "$1,200", description: "Professional" },
  { id: "1800plus", label: "$1,800+", description: "Premium" },
];

const engagementOptions = [
  {
    id: "hire",
    title: "Open role or headcount",
    subtitle: "UI/UX Designer, Website Designer, or Frontend Engineer",
    tag: "Full-time · Contract",
    icon: IoBriefcaseOutline,
  },
  {
    id: "project",
    title: "Scoped project or initiative",
    subtitle: "Design system, product redesign, dashboard, or digital product",
    tag: "Project-based",
    icon: HiOutlineBeaker,
  },
  {
    id: "retainer",
    title: "Embedded design support",
    subtitle: "Ongoing UX/UI capacity for your product or engineering team",
    tag: "Retainer · Part-time",
    icon: MdOutlineWebStories,
  },
];

const engagementDetails = {
  hire: {
    fieldLabel: "Role Type",
    stepTitle: "What position are you filling?",
    stepSubtitle: "This helps me tailor my response to your team's specific need and hiring timeline.",
    options: [
      {
        id: "uiux-designer",
        label: "UI/UX Designer",
        description: "Research, wireframes, prototypes, and end-to-end product design.",
      },
      {
        id: "product-designer",
        label: "Website Designer",
        description: "Marketing websites, landing pages, and content-driven web experiences.",
      },
      {
        id: "frontend",
        label: "Frontend Engineer",
        description: "React development with strong design sensibility and component systems.",
      },
      {
        id: "discuss",
        label: "Role still being defined",
        description: "Reach out early — I'm open to discussing scope before a JD is finalized.",
      },
    ],
  },
  project: {
    fieldLabel: "Initiative Type",
    stepTitle: "What's the nature of the initiative?",
    stepSubtitle: "Select the closest match — this helps me assess fit and prepare relevant work samples.",
    options: [
      {
        id: "design-system",
        label: "Design system",
        description: "Component library, token architecture, and documentation.",
      },
      {
        id: "product-redesign",
        label: "Product redesign",
        description: "End-to-end UX overhaul of an existing digital product.",
      },
      {
        id: "webapp",
        label: "Web app or dashboard",
        description: "Data-heavy interface, admin panel, or internal tooling.",
      },
      {
        id: "uiux",
        label: "UX/UI design only",
        description: "Figma deliverables — flows, wireframes, and high-fidelity screens.",
      },
      {
        id: "website",
        label: "Corporate website",
        description: "Marketing site, investor relations, or brand presence.",
      },
      {
        id: "discuss",
        label: "Exploratory / early stage",
        description: "Happy to sign an NDA and discuss before scope is set.",
      },
    ],
  },
  retainer: {
    fieldLabel: "Engagement Model",
    stepTitle: "How would your team work with me?",
    stepSubtitle: "Understanding the structure upfront helps me confirm availability and fit for your team.",
    options: [
      {
        id: "embedded",
        label: "Embedded in your team",
        description: "Attend standups, work in your tools, collaborate daily with engineering.",
      },
      {
        id: "regular",
        label: "Scheduled weekly capacity",
        description: "Fixed hours per week for design reviews, iterations, and delivery.",
      },
      {
        id: "advisory",
        label: "Design advisory",
        description: "Audit, strategy, and direction — less execution, more guidance.",
      },
      {
        id: "discuss",
        label: "Open to structuring together",
        description: "Let's talk — I'm flexible on how the engagement is shaped.",
      },
    ],
  },
};
const timelineOptions = {
  hire: [
    { id: "immediate", label: "Available now" },
    { id: "2weeks", label: "Within 2 weeks" },
    { id: "1month", label: "Next month" },
    { id: "flexible", label: "Flexible" },
  ],
  project: [
    { id: "asap", label: "ASAP" },
    { id: "2weeks", label: "1 - 2 weeks" },
    { id: "1month", label: "Within a month" },
    { id: "3months", label: "1 - 3 months" },
    { id: "flexible", label: "No hard deadline" },
  ],
  retainer: [
    { id: "thisweek", label: "This week" },
    { id: "2weeks", label: "Within 2 weeks" },
    { id: "1month", label: "Next month" },
    { id: "flexible", label: "Flexible" },
  ],
};

const getDefaultDetail = (engagementId) =>
  engagementDetails[engagementId]?.options[0]?.id || "";

const getDefaultTimeline = (engagementId) =>
  timelineOptions[engagementId]?.[0]?.id || "";

const getDefaultInvestment = (engagementId) =>
  engagementId === "hire" ? "" : investmentRanges[0]?.id || "";

function Contact() {
  const formRef = useRef(null);
  const recaptchaRef = useRef(null);
  const formStartRef = useRef(Date.now());
  const toastTimerRef = useRef(null);

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedEngagement, setSelectedEngagement] = useState(DEFAULT_ENGAGEMENT);
  const [selectedDetail, setSelectedDetail] = useState(
    getDefaultDetail(DEFAULT_ENGAGEMENT),
  );
  const [selectedTimeline, setSelectedTimeline] = useState(
    getDefaultTimeline(DEFAULT_ENGAGEMENT),
  );
  const [selectedInvestment, setSelectedInvestment] = useState(
    getDefaultInvestment(DEFAULT_ENGAGEMENT),
  );
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [honeypot, setHoneypot] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [toast, setToast] = useState(null);
  const [submitStatus, setSubmitStatus] = useState({
    type: "idle",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  const RATE_LIMIT_KEY = "contact_form_last_submit";
  const RATE_LIMIT_MS = 2 * 60 * 1000;
  const MIN_FORM_TIME_MS = 3000;

  const activeEngagement = useMemo(
    () => engagementOptions.find((item) => item.id === selectedEngagement),
    [selectedEngagement],
  );

  const detailConfig =
    engagementDetails[selectedEngagement] || engagementDetails[DEFAULT_ENGAGEMENT];

  const timelineChoices =
    timelineOptions[selectedEngagement] || timelineOptions[DEFAULT_ENGAGEMENT];

  const activeDetail = useMemo(
    () => detailConfig.options.find((item) => item.id === selectedDetail),
    [detailConfig.options, selectedDetail],
  );

  const activeTimeline = useMemo(
    () => timelineChoices.find((item) => item.id === selectedTimeline),
    [selectedTimeline, timelineChoices],
  );

  const activeInvestment = useMemo(
    () => investmentRanges.find((item) => item.id === selectedInvestment),
    [selectedInvestment],
  );

  const combinedPhone = useMemo(() => {
    const number = formData.phoneNumber.trim();
    const country = formData.phoneCountry.trim();
    if (!number) return "";
    return `${country} ${number}`.trim();
  }, [formData.phoneCountry, formData.phoneNumber]);

  const isPhoneValid =
    formData.phoneCountry.trim().length > 0 &&
    formData.phoneNumber.trim().length >= 7;

  const isFinalReady =
    formData.name.trim().length > 1 &&
    formData.company.trim().length > 1 &&
    isPhoneValid &&
    formData.email.trim().length > 4 &&
    !isSubmitting;

  const needsInvestmentRange = selectedEngagement !== "hire";
  const canContinueFromBrief = formData.message.trim().length > 8;
  const progressWidth = `${(currentStep / STEP_COUNT) * 100}%`;

const stepCopy = {
    1: {
      title: "What brings you here today?",
      subtitle: "Select the option that best reflects your organization's need — I'll tailor everything from here.",
    },
    2: {
      title: detailConfig.stepTitle,
      subtitle: detailConfig.stepSubtitle,
    },
    3: {
      title:
        selectedEngagement === "hire"
          ? "Tell me about the role and team"
          : selectedEngagement === "retainer"
            ? "Describe the engagement and team structure"
            : "Describe the initiative",
      subtitle:
        selectedEngagement === "hire"
          ? "Include the team size, reporting line, tech stack, location requirements, and target start date."
          : selectedEngagement === "retainer"
            ? "Describe the product, team composition, tools used, and how design currently fits into the workflow."
            : "Cover the business goal, target users, scope, constraints, and any existing assets or brand guidelines.",
    },
    4: {
      title: "Where should I send my reply?",
      subtitle: "Based in the Philippines (UTC+8) — open to remote, hybrid, or relocation. NDA available on request. I respond within 24 hours.",
    },
  };

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const showToast = (type, message, duration = 4200) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ type, message });
    toastTimerRef.current = setTimeout(() => setToast(null), duration);
  };

  const isRateLimited = () => {
    const last = Number(localStorage.getItem(RATE_LIMIT_KEY) || 0);
    return Date.now() - last < RATE_LIMIT_MS;
  };

  const setRateLimit = () => {
    localStorage.setItem(RATE_LIMIT_KEY, String(Date.now()));
  };

  const updateField = (event) => {
    const { name, value } = event.target;
    if (name === "phoneNumber") {
      const digitsOnly = value.replace(/\D/g, "");
      setFormData((current) => ({ ...current, [name]: digitsOnly }));
      return;
    }
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const goBack = () => {
    setSubmitStatus({ type: "idle", message: "" });
    setCurrentStep((step) => Math.max(1, step - 1));
  };

  const goNext = () => {
    setSubmitStatus({ type: "idle", message: "" });

    if (currentStep === 1 && !selectedEngagement) {
      showToast("error", "Please choose how I can help first.");
      return;
    }

    if (currentStep === 2 && !selectedDetail) {
      showToast("error", `Please choose a ${detailConfig.fieldLabel.toLowerCase()}.`);
      return;
    }

    if (currentStep === 3 && !selectedTimeline) {
      showToast("error", "Please choose a timeline.");
      return;
    }

    if (currentStep === 3 && needsInvestmentRange && !selectedInvestment) {
      showToast("error", "Please choose an investment range.");
      return;
    }

    if (currentStep === 3 && !canContinueFromBrief) {
      showToast("error", "Please add a short enquiry before continuing.");
      return;
    }

    setCurrentStep((step) => Math.min(STEP_COUNT, step + 1));
  };

  const pickEngagement = (id) => {
    setSelectedEngagement(id);
    setSelectedDetail(getDefaultDetail(id));
    setSelectedTimeline(getDefaultTimeline(id));
    setSelectedInvestment(getDefaultInvestment(id));
    setSubmitStatus({ type: "idle", message: "" });
    window.setTimeout(() => setCurrentStep(2), 160);
  };

  const pickDetail = (id) => {
    setSelectedDetail(id);
    setSubmitStatus({ type: "idle", message: "" });
    window.setTimeout(() => setCurrentStep(3), 160);
  };

  const handleCopy = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast("success", `${label} copied.`);
    } catch {
      showToast("error", `Could not copy ${label.toLowerCase()}.`);
    }
  };

  const resetFormFlow = () => {
    setCurrentStep(1);
    setSelectedEngagement(DEFAULT_ENGAGEMENT);
    setSelectedDetail(getDefaultDetail(DEFAULT_ENGAGEMENT));
    setSelectedTimeline(getDefaultTimeline(DEFAULT_ENGAGEMENT));
    setSelectedInvestment(getDefaultInvestment(DEFAULT_ENGAGEMENT));
    setFormData(DEFAULT_FORM_DATA);
    setHoneypot("");
    setRecaptchaToken("");
    formStartRef.current = Date.now();
    formRef.current?.reset();
    recaptchaRef.current?.reset();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitStatus({ type: "idle", message: "" });

    if (!isFinalReady) {
      showToast("error", "Please complete your name, company, phone, and email.");
      return;
    }

    if (!canContinueFromBrief) {
      showToast("error", "Please add your enquiry before sending.");
      setCurrentStep(3);
      return;
    }

    if (
      !EMAILJS_SERVICE_ID ||
      !EMAILJS_TEMPLATE_ID ||
      !EMAILJS_PUBLIC_KEY ||
      !RECAPTCHA_SITE_KEY
    ) {
      const message = "Missing EmailJS or reCAPTCHA config. Check your .env.";
      setSubmitStatus({ type: "error", message });
      showToast("error", message);
      return;
    }

    if (honeypot) {
      const message = "Spam detected.";
      setSubmitStatus({ type: "error", message });
      showToast("error", message);
      return;
    }

    if (Date.now() - formStartRef.current < MIN_FORM_TIME_MS) {
      const message = "Please take a moment before submitting.";
      setSubmitStatus({ type: "error", message });
      showToast("error", message);
      return;
    }

    if (isRateLimited()) {
      const message = "Too many submissions. Please wait a bit and try again.";
      setSubmitStatus({ type: "error", message });
      showToast("error", message);
      return;
    }

    if (!recaptchaToken) {
      const message = "Please tick the reCAPTCHA first.";
      setSubmitStatus({ type: "error", message });
      showToast("error", message);
      return;
    }

    if (!formRef.current) return;

    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: EMAILJS_PUBLIC_KEY },
      );

      setRateLimit();
      setSubmitStatus({ type: "success", message: "Message sent. Thank you!" });
      showToast("success", "Message sent. I will reply within 24 hours.", 4800);
      resetFormFlow();
    } catch {
      const message = "Something went wrong. Try emailing directly.";
      setSubmitStatus({ type: "error", message });
      showToast("error", message, 5000);
      recaptchaRef.current?.reset();
      setRecaptchaToken("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    if (currentStep === 1) {
      return (
        <div className="contact-flow-options">
          {engagementOptions.map((item) => {
            const Icon = item.icon;
            const isActive = selectedEngagement === item.id;

            return (
              <button
                type="button"
                className={`contact-flow-option ${isActive ? "is-active" : ""}`}
                key={item.id}
                onClick={() => pickEngagement(item.id)}
              >
                <span className="contact-flow-option-icon">
                  <Icon />
                </span>
                <span className="contact-flow-option-copy">
                  <strong>{item.title}</strong>
                  <small>{item.subtitle}</small>
                  <em>{item.tag}</em>
                </span>
                <FiChevronRight className="contact-flow-option-arrow" />
              </button>
            );
          })}
        </div>
      );
    }

    if (currentStep === 2) {
      return (
        <div className="contact-flow-detail-grid">
          {detailConfig.options.map((item) => (
            <button
              type="button"
              className={`contact-flow-detail-card ${
                selectedDetail === item.id ? "is-active" : ""
              }`}
              key={item.id}
              onClick={() => pickDetail(item.id)}
            >
              <strong>{item.label}</strong>
              <span>{item.description}</span>
            </button>
          ))}
        </div>
      );
    }

    if (currentStep === 3) {
      const timelineLabel =
        selectedEngagement === "hire" ? "Desired Start Date" : "Timeline";
      const dateLabel =
        selectedEngagement === "hire"
          ? "Preferred Start Date"
          : selectedEngagement === "retainer"
            ? "Preferred Start Date"
            : "Target Launch Date";
      const messagePlaceholder =
        selectedEngagement === "hire"
          ? "Tell me about the role, team, responsibilities, tools, schedule, and what you are looking for."
          : selectedEngagement === "retainer"
            ? "What kind of ongoing support do you need? For example: design iterations, new sections, UX audits, or React updates."
            : "Tell me about your project: goals, audience, pages, design direction, must-have features, and anything already prepared.";

      return (
        <div className="contact-flow-details">
          <div className="contact-flow-field">
            <span className="contact-flow-label">{timelineLabel}</span>
            <div className="contact-flow-timeline-grid">
              {timelineChoices.map((item) => (
                <button
                  type="button"
                  className={`contact-flow-chip ${
                    selectedTimeline === item.id ? "is-active" : ""
                  }`}
                  key={item.id}
                  onClick={() => setSelectedTimeline(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <label className="contact-flow-field" htmlFor="preferredDate">
            <span className="contact-flow-label">
              {dateLabel} <em>optional</em>
            </span>
            <input
              className="contact-flow-line-input contact-flow-date-input"
              id="preferredDate"
              name="preferredDate"
              onChange={updateField}
              type="date"
              value={formData.preferredDate}
            />
          </label>

          {needsInvestmentRange && (
            <div className="contact-flow-field">
              <span className="contact-flow-label">Investment Range</span>
              <div className="contact-flow-budget-grid">
                {investmentRanges.map((item) => (
                  <button
                    type="button"
                    className={`contact-flow-budget-card ${
                      selectedInvestment === item.id ? "is-active" : ""
                    }`}
                    key={item.id}
                    onClick={() => setSelectedInvestment(item.id)}
                  >
                    <strong>{item.label}</strong>
                    <span>{item.description}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <label className="contact-flow-field" htmlFor="message">
            <span className="contact-flow-label">
              Your Enquiry <span className="required">*</span>
            </span>
            <textarea
              className="contact-flow-line-input contact-flow-line-textarea"
              id="message"
              name="message"
              onChange={updateField}
              placeholder={messagePlaceholder}
              value={formData.message}
            />
          </label>

          <button
            className="contact-flow-primary"
            onClick={goNext}
            type="button"
          >
            Continue
          </button>
        </div>
      );
    }

    return (
      <div className="contact-flow-final">
        <div className="contact-flow-split-fields">
          <label className="contact-flow-field" htmlFor="name">
            <span className="contact-flow-label">
              Your Name <span className="required">*</span>
            </span>
            <input
              autoComplete="name"
              className="contact-flow-line-input"
              id="name"
              name="name"
              onChange={updateField}
              placeholder="Juan dela Cruz"
              required
              type="text"
              value={formData.name}
            />
          </label>

          <label className="contact-flow-field" htmlFor="company">
            <span className="contact-flow-label">
              Company <span className="required">*</span>
            </span>
            <input
              autoComplete="organization"
              className="contact-flow-line-input"
              id="company"
              name="company"
              onChange={updateField}
              placeholder="Acme Corp"
              required
              type="text"
              value={formData.company}
            />
          </label>
        </div>

        <div className="contact-flow-split-fields">
          <label className="contact-flow-field" htmlFor="phoneNumber">
            <span className="contact-flow-label">
              Telephone <span className="required">*</span>
            </span>
            <div className="contact-flow-phone-group">
              <select
                aria-label="Country code"
                className="contact-flow-line-input contact-flow-country-select"
                name="phoneCountry"
                onChange={updateField}
                value={formData.phoneCountry}
              >
                {PHONE_COUNTRY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <input
                autoComplete="tel-national"
                className="contact-flow-line-input"
                id="phoneNumber"
                inputMode="numeric"
                name="phoneNumber"
                onChange={updateField}
                pattern="[0-9]*"
                placeholder="9123456789"
                required
                type="tel"
                value={formData.phoneNumber}
              />
            </div>
          </label>

          <label className="contact-flow-field" htmlFor="email">
            <span className="contact-flow-label">
              Email <span className="required">*</span>
            </span>
            <input
              autoComplete="email"
              className="contact-flow-line-input"
              id="email"
              name="email"
              onChange={updateField}
              placeholder="hello@company.com"
              required
              type="email"
              value={formData.email}
            />
          </label>
        </div>

        <div className="contact-flow-recaptcha">
          {RECAPTCHA_SITE_KEY ? (
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={RECAPTCHA_SITE_KEY}
              onChange={(token) => setRecaptchaToken(token || "")}
              onExpired={() => setRecaptchaToken("")}
            />
          ) : (
            <div className="contact-flow-recaptcha-empty">
              Add VITE_RECAPTCHA_SITE_KEY to enable reCAPTCHA.
            </div>
          )}
        </div>

        {submitStatus.message && (
          <p className={`contact-flow-status is-${submitStatus.type}`}>
            {submitStatus.message}
          </p>
        )}

     <button
          className="contact-flow-primary"
          disabled={!isFinalReady}
          type="submit"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>

        <div className="contact-flow-cv-row">
          <span className="contact-flow-cv-label">Prefer to review first?</span>
          <a
            href="/src/assets/resume.pdf"
            download="Russell_Aguilar_Resume.pdf"
            className="contact-flow-cv-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiDownload />
            Download CV
          </a>
        </div>
      </div>
    );
  };

  return (
    <main className="contact-flow-page">
      <header className="contact-flow-topbar">
        <a className="contact-flow-brand" href="/" aria-label="Back to portfolio">
          <img src={logo} alt="Russell Aguilar logo" />
          <span>
            <strong>Russell</strong>
            <small>Aguilar</small>
          </span>
        </a>

        <a className="contact-flow-close" href="/" aria-label="Close contact form">
          <FiX />
        </a>
      </header>

      <section className="contact-flow-stage" aria-label="Contact form">
        <MotionForm
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="contact-flow-card"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          onSubmit={handleSubmit}
          ref={formRef}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <input name="from_name" type="hidden" value={formData.name} />
          <input name="from_email" type="hidden" value={formData.email} />
          <input name="interest" type="hidden" value={activeEngagement?.title || ""} />
          <input name="engagement_type" type="hidden" value={selectedEngagement} />
          <input name="budget" type="hidden" value={activeDetail?.label || ""} />
          <input name="detail_label" type="hidden" value={detailConfig.fieldLabel} />
          <input name="timeline" type="hidden" value={activeTimeline?.label || ""} />
          <input
            name="investment_range"
            type="hidden"
            value={activeInvestment?.label || ""}
          />
          <input name="preferred_date" type="hidden" value={formData.preferredDate} />
          <input name="message" type="hidden" value={formData.message} />
          <input name="telephone" type="hidden" value={combinedPhone} />

          <div className="contact-flow-honeypot" aria-hidden="true">
            <label htmlFor="contact-website-check">Website</label>
            <input
              autoComplete="off"
              id="contact-website-check"
              name="website_check"
              onChange={(event) => setHoneypot(event.target.value)}
              tabIndex={-1}
              type="text"
              value={honeypot}
            />
          </div>

          <div className="contact-flow-progress-row">
            {currentStep === 1 ? (
              <span className="contact-flow-step-label">Step {currentStep}</span>
            ) : (
              <button
                className="contact-flow-back"
                onClick={goBack}
                type="button"
              >
                <FiArrowLeft />
                Back
              </button>
            )}

            <span className="contact-flow-progress-track">
              <MotionSpan
                animate={{ width: progressWidth }}
                className="contact-flow-progress-fill"
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              />
            </span>

            <span className="contact-flow-step-count">
              {currentStep} / {STEP_COUNT}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <MotionDiv
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              className="contact-flow-step"
              exit={{ opacity: 0, x: -20, filter: "blur(3px)" }}
              initial={{ opacity: 0, x: 20, filter: "blur(3px)" }}
              key={currentStep}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="contact-flow-copy">
                <h1>{stepCopy[currentStep].title}</h1>
                <p>{stepCopy[currentStep].subtitle}</p>
              </div>

              {renderStep()}
            </MotionDiv>
          </AnimatePresence>
        </MotionForm>

        <MotionDiv
          animate={{ opacity: 1, y: 0 }}
          className="contact-flow-direct"
          initial={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.35, delay: 0.14 }}
        >
          <button type="button" onClick={() => handleCopy(CONTACT_EMAIL, "Email")}>
            <FiMail />
           Email Me
          </button>

          <button type="button" onClick={() => handleCopy(CONTACT_PHONE, "Phone")}>
            <FiPhone />
         Contact Me
          </button>

          <a
            href="https://www.instagram.com/klntaglr/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaInstagram />
            Instagram
          </a>

          <a
            href="https://www.linkedin.com/in/klent-russell-aguilar-b6929739b/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaLinkedinIn />
            LinkedIn
          </a>

          <a
            href="https://profile.indeed.com/?hl=en_PH&co=PH&from=gnav-jobseeker-profile--profile-one-frontend"
            rel="noopener noreferrer"
            target="_blank"
          >
            <SiIndeed />
            Indeed
          </a>
        </MotionDiv>
      </section>

      <AnimatePresence>
        {toast && (
          <MotionDiv
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`contact-flow-toast is-${toast.type}`}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            role="status"
            transition={{ duration: 0.25 }}
          >
            <span className="contact-flow-toast-icon">
              {toast.type === "success" ? (
                <IoCheckmarkCircle />
              ) : (
                <IoCloseCircle />
              )}
            </span>
            <span>
              <strong>{toast.type === "success" ? "Done" : "Heads up"}</strong>
              <small>{toast.message}</small>
            </span>
            <button
              aria-label="Close notification"
              onClick={() => setToast(null)}
              type="button"
            >
              <FiX />
            </button>
          </MotionDiv>
        )}
      </AnimatePresence>
    </main>
  );
}

export default Contact;
