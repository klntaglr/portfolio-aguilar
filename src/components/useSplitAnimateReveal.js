import { useEffect } from "react";

const DEFAULT_SELECTOR = ".split-animate";
const HERO_MODE = "hero";

function wrapNodeWords(node, documentRef, nextWordIndex) {
  if (node.nodeType === Node.TEXT_NODE) {
    const fragment = documentRef.createDocumentFragment();
    const tokens = (node.textContent ?? "").split(/(\s+)/);

    tokens.forEach((token) => {
      if (!token) return;

      if (/^\s+$/.test(token)) {
        fragment.appendChild(documentRef.createTextNode(token));
        return;
      }

      const wordWrap = documentRef.createElement("span");
      wordWrap.className = "word-wrap";

      const word = documentRef.createElement("span");
      word.className = "word";
      word.style.setProperty("--word-index", String(nextWordIndex()));
      word.textContent = token;

      wordWrap.appendChild(word);
      fragment.appendChild(wordWrap);
    });

    return fragment;
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    return documentRef.createDocumentFragment();
  }

  if (node.nodeName === "BR") {
    return node.cloneNode(false);
  }

  const clone = node.cloneNode(false);

  Array.from(node.childNodes).forEach((childNode) => {
    clone.appendChild(wrapNodeWords(childNode, documentRef, nextWordIndex));
  });

  return clone;
}

function buildWordRevealMarkup(element) {
  if (element.dataset.splitPrepared === "true") return false;

  const rawHtml = element.innerHTML;
  const rawText = element.textContent ?? "";

  if (!rawText.trim()) return false;

  element.dataset.splitPrepared = "true";
  element.dataset.splitOriginal = rawHtml;

  let wordIndex = 0;
  const nextWordIndex = () => {
    const currentIndex = wordIndex;
    wordIndex += 1;
    return currentIndex;
  };

  const fragment = document.createDocumentFragment();

  Array.from(element.childNodes).forEach((childNode) => {
    fragment.appendChild(wrapNodeWords(childNode, document, nextWordIndex));
  });

  element.innerHTML = "";
  element.appendChild(fragment);
  return true;
}

export default function useSplitAnimateReveal({
  enabled = true,
  selector = DEFAULT_SELECTOR,
} = {}) {
  useEffect(() => {
    if (!enabled) return undefined;

    let isCancelled = false;
    let observer;
    const preparedElements = [];

    const setup = () => {
      if (isCancelled) return;

      const elements = Array.from(document.querySelectorAll(selector));

      elements.forEach((element) => {
        if (!(element instanceof HTMLElement)) return;
        const prepared = buildWordRevealMarkup(element);

        if (prepared || element.dataset.splitPrepared === "true") {
          preparedElements.push(element);
        }
      });

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-inview");
            observer.unobserve(entry.target);
          });
        },
        {
          root: null,
          rootMargin: "0px 0px -12% 0px",
          threshold: 0.15,
        },
      );

      preparedElements.forEach((element) => {
        if (element.dataset.splitMode === HERO_MODE) return;
        observer.observe(element);
      });
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        requestAnimationFrame(setup);
      });
    } else {
      requestAnimationFrame(setup);
    }

    return () => {
      isCancelled = true;
      observer?.disconnect();

      preparedElements.forEach((element) => {
        const original = element.dataset.splitOriginal;
        if (typeof original === "string") {
          element.innerHTML = original;
        }
        delete element.dataset.splitPrepared;
        delete element.dataset.splitOriginal;
      });
    };
  }, [enabled, selector]);
}
