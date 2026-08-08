(() => {
  "use strict";

  const AI_BASE = "https://ai.dingxinasset.com.tw/";
  const INTENTS = {
    family: {
      label: "家庭與繼承",
      guidance: "AI 將優先分析婚姻、子女、法定順位、照護與繼承安排。"
    },
    property: {
      label: "房產與保單",
      guidance: "AI 將優先分析多戶房產、共同持有、保單受益人、流動性與分配安排。"
    },
    business: {
      label: "公司股權與接班",
      guidance: "AI 將優先分析控制權、經營權、股權移轉、接班與家族治理。"
    },
    crossborder: {
      label: "海外資產與稅籍",
      guidance: "AI 將優先分析境外資產、海外公司、稅務居民、CRS／FATCA 與跨境文件。"
    },
    full: {
      label: "完整健檢",
      guidance: "AI 將先全面掃描家庭、資產、股權、文件、照護與跨境因素，再深入高風險面向。"
    }
  };

  const pathSection = document.getElementById("paths");
  const cards = [...document.querySelectorAll(".path-card[data-intent]")];
  const selectedLabel = document.getElementById("selected-label");
  const selectedGuidance = document.getElementById("selected-guidance");
  const dynamicCta = document.getElementById("dynamic-cta");
  const feedback = document.getElementById("selected-intent-feedback");
  const sticky = document.getElementById("mobile-sticky");
  const stickyCta = document.getElementById("mobile-sticky-cta");
  const guidance = document.getElementById("path-guidance");

  let selectedIntent = "family";
  let hasPulsed = false;

  function buildAiUrl(intentKey) {
    const url = new URL(AI_BASE);
    url.searchParams.set("intent", intentKey);
    url.searchParams.set("utm_source", "landing");
    url.searchParams.set("utm_medium", "organic");
    url.searchParams.set("utm_campaign", "broad_funnel");
    url.searchParams.set("utm_content", intentKey);
    return url.toString();
  }

  function trackStart(intentKey, source) {
    if (typeof window.fbq === "function") {
      window.fbq("trackCustom", "StartLegacyScan", {
        intent: intentKey,
        source: source
      });
    }
  }

  function animateFeedback() {
    if (!feedback) return;
    feedback.classList.remove("is-updated");
    void feedback.offsetWidth;
    feedback.classList.add("is-updated");
  }

  function selectIntent(intentKey, { animate = true } = {}) {
    const config = INTENTS[intentKey] || INTENTS.family;
    selectedIntent = INTENTS[intentKey] ? intentKey : "family";

    cards.forEach(card => {
      const active = card.dataset.intent === selectedIntent;
      card.classList.toggle("active", active);
      card.setAttribute("aria-pressed", active ? "true" : "false");
    });

    if (selectedLabel) selectedLabel.textContent = config.label;
    if (selectedGuidance) selectedGuidance.textContent = config.guidance;

    const url = buildAiUrl(selectedIntent);

    if (dynamicCta) {
      dynamicCta.href = url;
      dynamicCta.textContent = selectedIntent === "full"
        ? "開始完整健檢"
        : `以「${config.label}」開始健檢`;
      dynamicCta.dataset.intent = selectedIntent;
    }

    if (stickyCta) {
      stickyCta.href = url;
      stickyCta.textContent = selectedIntent === "full"
        ? "開始｜完整健檢"
        : `開始｜${config.label}健檢`;
      stickyCta.dataset.intent = selectedIntent;
    }

    if (animate) animateFeedback();
  }

  cards.forEach(card => {
    card.type = "button";
    card.setAttribute("aria-pressed", card.classList.contains("active") ? "true" : "false");
    card.addEventListener("click", () => selectIntent(card.dataset.intent));
  });

  document.querySelectorAll(".path-entry").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      pathSection?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  dynamicCta?.addEventListener("click", () => trackStart(selectedIntent, "scenario"));
  stickyCta?.addEventListener("click", () => trackStart(selectedIntent, "sticky"));

  // Hide the mobile sticky CTA while the scenario selector itself is visible.
  // This leaves one clear primary action in the thumb zone and prevents accidental entry.
  if (pathSection && sticky && "IntersectionObserver" in window) {
    const stickyObserver = new IntersectionObserver(entries => {
      const visible = entries.some(entry => entry.isIntersecting);
      sticky.classList.toggle("is-suppressed", visible);
    }, { threshold: 0.08 });
    stickyObserver.observe(pathSection);
  }

  // Draw attention to the scenario-specific analysis feature once, then stop.
  if (guidance && pathSection && "IntersectionObserver" in window) {
    const guidanceObserver = new IntersectionObserver(entries => {
      const entry = entries[0];
      if (entry?.isIntersecting && !hasPulsed) {
        hasPulsed = true;
        guidance.classList.add("attention-pulse");
        window.setTimeout(() => guidance.classList.remove("attention-pulse"), 2800);
        guidanceObserver.disconnect();
      }
    }, { threshold: 0.32 });
    guidanceObserver.observe(pathSection);
  }

  selectIntent("family", { animate: false });
})();