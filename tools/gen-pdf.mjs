// Generates brand_assets/nadavreubensCV(ENG).pdf and (Hebrew).pdf from tools/cv-data.mjs
// Usage: node tools/gen-pdf.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import { contact, en, he } from './cv-data.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function html(data, lang) {
  const rtl = lang === 'he';
  const name = rtl ? contact.name_he : contact.name_en;
  const addr = rtl ? contact.address_he : contact.address_en;
  const stackLabel = rtl ? 'טכנולוגיות' : 'Stack';
  const fontStack = rtl ? `'Assistant', 'Arial', sans-serif` : `'Source Sans 3', 'Calibri', 'Segoe UI', sans-serif`;
  const fontUrl = rtl
    ? 'https://fonts.googleapis.com/css2?family=Assistant:wght@400;600;700&display=swap'
    : 'https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600;700&display=swap';

  const section = (title, inner) => `<section class="sec"><h2>${esc(title)}</h2>${inner}</section>`;
  const ul = items => items.length ? `<ul>${items.map(b => `<li>${esc(b)}</li>`).join('')}</ul>` : '';
  const entry = (date, role, org, extra) => `
    <div class="entry">
      <div class="entry-head">
        <div class="entry-title"><strong>${esc(role)}</strong>${org ? `<span class="org"> — ${esc(org)}</span>` : ''}</div>
        <div class="date">${esc(date)}</div>
      </div>
      ${extra}
    </div>`;

  return `<!DOCTYPE html>
<html lang="${rtl ? 'he' : 'en'}" dir="${rtl ? 'rtl' : 'ltr'}">
<head>
<meta charset="utf-8">
<title>${esc(name)} — CV</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${fontUrl}" rel="stylesheet">
<style>
  @page { size: A4; margin: 13mm 14mm; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: ${fontStack};
    font-size: 10.1pt; line-height: 1.42; color: #1A1A1A;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
  header { text-align: center; margin-bottom: 11px; }
  h1 { font-size: 21pt; font-weight: 700; letter-spacing: -0.015em; line-height: 1.1; }
  .contact { font-size: 8.9pt; color: #555; margin-top: 3px; }
  .contact span { white-space: nowrap; }
  .contact .sep { color: #B0B0B0; margin: 0 6px; }

  .sec { margin-top: 11px; break-inside: avoid; }
  h2 {
    font-size: 10.3pt; font-weight: 700; color: #2E4A7D;
    letter-spacing: ${rtl ? '0' : '0.07em'};
    text-transform: ${rtl ? 'none' : 'uppercase'};
    border-bottom: 1.1pt solid #2E4A7D; padding-bottom: 2.5px; margin-bottom: 6px;
  }

  p.summary { text-align: justify; }
  .skill-row { margin-bottom: 3.5px; }
  .skill-row strong { font-weight: 700; }

  .entry { margin-bottom: 7px; break-inside: avoid; }
  .entry-head { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; margin-bottom: 1.5px; }
  .entry-title { font-size: 10.4pt; }
  .entry-title strong { font-weight: 700; }
  .org { color: #555; }
  .date { font-size: 8.9pt; font-weight: 600; color: #555; white-space: nowrap; flex-shrink: 0; }
  .intro { color: #333; margin-bottom: 2px; }

  ul { list-style: none; }
  li { position: relative; padding-${rtl ? 'right' : 'left'}: 11px; margin-bottom: 1px; }
  li::before { content: '•'; position: absolute; ${rtl ? 'right' : 'left'}: 1px; color: #2E4A7D; font-weight: 700; }

  .stack { font-size: 8.9pt; color: #555; margin-top: 1.5px; }
  .stack strong { font-weight: 700; }
  .inline-list { color: #1A1A1A; }
</style>
</head>
<body>
  <header>
    <h1>${esc(name)}</h1>
    <div class="contact"><span dir="ltr">${esc(contact.phone)}</span><span class="sep">|</span><span dir="ltr">${esc(contact.email)}</span></div>
    <div class="contact"><span>${esc(addr)}</span><span class="sep">|</span><span dir="ltr">${esc(contact.linkedin)}</span></div>
  </header>

  ${section(data.title_summary, `<p class="summary">${esc(data.summary)}</p>`)}

  ${section(data.title_skills, data.skills.map(s =>
    `<div class="skill-row"><strong>${esc(s.group)}:</strong> ${esc(s.items)}</div>`).join(''))}

  ${section(data.title_soft, `<div class="inline-list">${data.soft.map(esc).join(' &middot; ')}</div>`)}

  ${section(data.title_exp, data.exp.map(e =>
    entry(e.date, e.role, e.org, (e.intro ? `<div class="intro">${esc(e.intro)}</div>` : '') + ul(e.bullets))).join(''))}

  ${section(data.title_proj, data.proj.map(p => `
    <div class="entry">
      <div class="entry-head">
        <div class="entry-title"><strong>${esc(p.name)}</strong><span class="org"> — ${esc(p.role)}</span></div>
      </div>
      ${ul(p.bullets)}
      <div class="stack"><strong>${esc(stackLabel)}:</strong> ${esc(p.stack)}</div>
    </div>`).join(''))}

  ${section(data.title_edu, data.edu.map(ed =>
    entry(ed.date, ed.name, ed.org,
      ed.bullets.length ? `<div class="intro">${ed.bullets.map(esc).join(' &middot; ')}</div>` : '')).join(''))}

  ${section(data.title_lang, `<div class="inline-list">${data.lang.map(esc).join(' &nbsp;&middot;&nbsp; ')}</div>`)}
</body>
</html>`;
}

const browser = await puppeteer.launch({ headless: true });
for (const [lang, data, file] of [['en', en, 'nadavreubensCV(ENG).pdf'], ['he', he, 'nadavreubensCV(Hebrew).pdf']]) {
  const page = await browser.newPage();
  await page.setContent(html(data, lang), { waitUntil: 'networkidle0' });
  await page.evaluateHandle('document.fonts.ready');
  const out = path.join(ROOT, 'brand_assets', file);
  await page.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true });
  console.log('wrote', file, `(${(fs.statSync(out).size / 1024).toFixed(1)} KB)`);
  await page.close();
}
await browser.close();
