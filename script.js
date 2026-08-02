const pathCards = document.querySelectorAll('.path-card');
const selectedLabel = document.getElementById('selected-label');
const dynamicCta = document.getElementById('dynamic-cta');

pathCards.forEach(card => {
  card.addEventListener('click', () => {
    pathCards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    const intent = card.dataset.intent;
    const label = card.dataset.label;
    selectedLabel.textContent = label;
    dynamicCta.href = `https://ai.dingxinasset.com.tw/?utm_source=landing&utm_medium=organic&utm_campaign=broad_funnel&utm_content=${encodeURIComponent(intent)}`;
    dynamicCta.textContent = `以「${label}」開始健檢`;
  });
});

document.querySelectorAll('.track-start').forEach(link => {
  link.addEventListener('click', () => {
    if (typeof fbq === 'function') fbq('trackCustom', 'StartLegacyScan');
  });
});