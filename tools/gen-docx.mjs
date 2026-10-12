// Generates brand_assets/nadavreubensCV(ENG).docx and (Hebrew).docx from tools/cv-data.mjs
// Usage: node tools/gen-docx.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle, TabStopType, TabStopPosition } from 'docx';
import { contact, en, he } from './cv-data.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const INK = '1A1A1A', MUTED = '555555', ACCENT = '2E4A7D';
const FONT_EN = 'Calibri', FONT_HE = 'Arial';

function build(data, lang) {
  const rtl = lang === 'he';
  const font = rtl ? FONT_HE : FONT_EN;
  const align = rtl ? AlignmentType.RIGHT : AlignmentType.LEFT;
  const kids = [];

  const run = (text, o = {}) => new TextRun({ text, font, rightToLeft: rtl, ...o });

  // ── Header ──
  kids.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
    children: [run(rtl ? contact.name_he : contact.name_en, { bold: true, size: 36, color: INK })],
  }));
  kids.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
    children: [new TextRun({ text: `${contact.phone}  |  ${contact.email}`, font, size: 19, color: MUTED })],
  }));
  kids.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 160 },
    children: [new TextRun({ text: `${rtl ? contact.address_he : contact.address_en}  |  ${contact.linkedin}`, font, size: 19, color: MUTED, rightToLeft: rtl })],
  }));

  const heading = (text) => new Paragraph({
    alignment: align,
    bidirectional: rtl,
    spacing: { before: 200, after: 80 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: ACCENT, space: 2 } },
    children: [run(text, { bold: true, size: 22, color: ACCENT, allCaps: !rtl })],
  });

  const body = (text, o = {}) => new Paragraph({
    alignment: align, bidirectional: rtl,
    spacing: { after: 60, line: 264 },
    children: [run(text, { size: 20, color: INK })], ...o,
  });

  const bullet = (text) => new Paragraph({
    alignment: align, bidirectional: rtl,
    bullet: { level: 0 },
    spacing: { after: 20, line: 252 },
    children: [run(text, { size: 20, color: INK })],
  });

  // "Role — Org" with the date pushed to the far edge via a tab stop
  const roleLine = (date, role, org) => new Paragraph({
    alignment: align, bidirectional: rtl,
    spacing: { before: 120, after: 20 },
    tabStops: [{ type: rtl ? TabStopType.LEFT : TabStopType.RIGHT, position: TabStopPosition.MAX }],
    children: [
      run(role, { bold: true, size: 21, color: INK }),
      run(org ? `  —  ${org}` : '', { size: 20, color: MUTED }),
      run('\t', {}),
      new TextRun({ text: date, font, size: 19, color: MUTED, bold: true }),
    ],
  });

  kids.push(heading(data.title_summary));
  kids.push(body(data.summary));

  kids.push(heading(data.title_skills));
  for (const s of data.skills) {
    kids.push(new Paragraph({
      alignment: align, bidirectional: rtl,
      spacing: { after: 50, line: 264 },
      children: [run(`${s.group}: `, { bold: true, size: 20, color: INK }), run(s.items, { size: 20, color: INK })],
    }));
  }

  kids.push(heading(data.title_soft));
  kids.push(body(data.soft.join(' · ')));

  kids.push(heading(data.title_exp));
  for (const e of data.exp) {
    kids.push(roleLine(e.date, e.role, e.org));
    if (e.intro) kids.push(body(e.intro));
    e.bullets.forEach(b => kids.push(bullet(b)));
  }

  kids.push(heading(data.title_proj));
  for (const p of data.proj) {
    kids.push(new Paragraph({
      alignment: align, bidirectional: rtl,
      spacing: { before: 120, after: 20 },
      children: [run(p.name, { bold: true, size: 21, color: INK }), run(`  —  ${p.role}`, { size: 20, color: MUTED })],
    }));
    p.bullets.forEach(b => kids.push(bullet(b)));
    kids.push(new Paragraph({
      alignment: align, bidirectional: rtl,
      spacing: { after: 60 },
      children: [run(rtl ? 'טכנולוגיות: ' : 'Stack: ', { bold: true, size: 19, color: MUTED }), new TextRun({ text: p.stack, font, size: 19, color: MUTED })],
    }));
  }

  kids.push(heading(data.title_edu));
  for (const ed of data.edu) {
    kids.push(roleLine(ed.date, ed.name, ed.org));
    if (ed.bullets.length) kids.push(body(ed.bullets.join(' · '), { spacing: { after: 60 } }));
  }

  kids.push(heading(data.title_lang));
  kids.push(body(data.lang.join('   ·   ')));

  return new Document({
    creator: 'Nadav Reubens',
    title: `${rtl ? contact.name_he : contact.name_en} — CV`,
    styles: { default: { document: { run: { font, size: 20 } } } },
    sections: [{
      properties: { page: { margin: { top: 720, bottom: 720, left: 720, right: 720 } } },
      children: kids,
    }],
  });
}

for (const [lang, data, file] of [['en', en, 'nadavreubensCV(ENG).docx'], ['he', he, 'nadavreubensCV(Hebrew).docx']]) {
  const buf = await Packer.toBuffer(build(data, lang));
  const out = path.join(ROOT, 'brand_assets', file);
  fs.writeFileSync(out, buf);
  console.log('wrote', file, `(${(buf.length / 1024).toFixed(1)} KB)`);
}
