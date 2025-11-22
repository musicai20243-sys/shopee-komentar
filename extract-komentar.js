import fs from "fs";
import { load } from "cheerio";

function extractShopeeComments(htmlPath) {
  const html = fs.readFileSync(htmlPath, "utf8");
  const $ = load(html);

  const comments = [];

  $(".shopee-product-comment-list .q2b7Oq").each((i, el) => {
    const block = $(el);

    // Username
    const username = block.find(".InK5kS").text().trim();

    // Rating
    const rating = block.find(".icon-rating-solid").length;

    // Tanggal + variasi
    const dateVariation = block.find(".XYk98l").text().trim();

    // Isi komentar
    const comment = block.find(".YNedDV").first().text().trim();

    // Gambar
    const images = [];
    block.find(".rating-media-list__image-wrapper img").each((j, img) => {
      images.push($(img).attr("src"));
    });

    comments.push({
      username,
      rating,
      dateVariation,
      comment,
      images
    });
  });

  return comments;
}

// ===== RUN + SAVE RESULT FILE JSON =====
const result = extractShopeeComments("./data/shopee-1.html");

// Simpan otomatis ke file
fs.writeFileSync("./data/komentar/komentar.json", JSON.stringify(result, null, 2), "utf8");

console.log("✔️ Extract selesai! Hasil disimpan ke: komentar.json");
