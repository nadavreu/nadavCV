import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';

const dir = path.join(__dirname, 'temporary screenshots');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

// Find next screenshot number
const existing = fs.readdirSync(dir).filter(f => f.startsWith('screenshot-'));
let num = 1;
for (const f of existing) {
    const match = f.match(/screenshot-(\d+)/);
    if (match) num = Math.max(num, parseInt(match[1]) + 1);
}

const filename = label ? `screenshot-${num}-${label}.png` : `screenshot-${num}.png`;
const filepath = path.join(dir, filename);

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise(r => setTimeout(r, 1500));

// Scroll through the page to trigger IntersectionObserver animations
await page.evaluate(async () => {
    const delay = ms => new Promise(r => setTimeout(r, ms));
    const step = window.innerHeight / 2;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await delay(200);
    }
    window.scrollTo(0, 0);
    await delay(500);
});
await new Promise(r => setTimeout(r, 1000));
await page.screenshot({ path: filepath, fullPage: true });
await browser.close();

console.log(`Screenshot saved: ${filepath}`);
