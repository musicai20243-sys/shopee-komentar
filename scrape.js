import puppeteer from "puppeteer";
import fs from "fs";

// --- BACA CONFIG JSON ---
const config = JSON.parse(fs.readFileSync("./config.json", "utf8"));

const targetUrl = config.url;
const ktp = config.ktp;

async function startAutomation() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
  });

  const page = await browser.newPage();
  await page.goto(targetUrl, { waitUntil: "networkidle2", timeout: 0 });

  // SIMPAN HTML
  const htmlFileName = `./submitted_page_${ktp}.html`;
  const htmlContent = await page.content();

  fs.writeFileSync(htmlFileName, htmlContent);

  console.log(`📄 Halaman Shopee tersimpan ke file: ${htmlFileName}`);
  console.log(`🔗 URL: ${targetUrl}`);
  console.log("✅ Selesai, browser tetap terbuka.");
}

await startAutomation();
