import fs from "fs";
import path from "path";
import sharp from "sharp";

const PUBLIC_DIR = path.resolve("public");
const MAX_DIMENSION = 1200;

async function getLargeFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(await getLargeFiles(fullPath));
    } else if (/\.(jpg|jpeg|png|webp)$/i.test(entry.name)) {
      const stats = fs.statSync(fullPath);
      if (stats.size > 200 * 1024) {
        files.push({ path: fullPath, size: stats.size });
      }
    }
  }
  return files;
}

async function optimize() {
  console.log("Mencari gambar di atas 200 KB...");
  const files = await getLargeFiles(PUBLIC_DIR);
  console.log(`Ditemukan ${files.length} file gambar untuk dioptimalkan.`);

  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    totalBefore += file.size;
    const ext = path.extname(file.path).toLowerCase();

    try {
      const fileBuffer = fs.readFileSync(file.path);
      let pipeline = sharp(fileBuffer).rotate();
      const meta = await pipeline.metadata();

      if (meta.width && meta.width > MAX_DIMENSION) {
        pipeline = pipeline.resize({ width: MAX_DIMENSION, withoutEnlargement: true });
      }

      if (ext === ".webp") {
        pipeline = pipeline.webp({ quality: 82, effort: 5 });
      } else if (ext === ".jpg" || ext === ".jpeg") {
        pipeline = pipeline.jpeg({ quality: 82, mozjpeg: true });
      } else if (ext === ".png") {
        pipeline = pipeline.png({ quality: 85, compressionLevel: 8 });
      }

      const outBuffer = await pipeline.toBuffer();

      if (outBuffer.length < file.size) {
        fs.writeFileSync(file.path, outBuffer);
        totalAfter += outBuffer.length;
        const savedPercent = (((file.size - outBuffer.length) / file.size) * 100).toFixed(1);
        console.log(
          `✓ ${path.relative(PUBLIC_DIR, file.path)}: ${(file.size / 1024).toFixed(0)} KB -> ${(outBuffer.length / 1024).toFixed(0)} KB (-${savedPercent}%)`
        );
      } else {
        totalAfter += file.size;
        console.log(`- ${path.relative(PUBLIC_DIR, file.path)}: sudah optimal`);
      }
    } catch (err) {
      totalAfter += file.size;
      console.error(`Error pada ${file.path}:`, err.message);
    }
  }

  const savedMb = ((totalBefore - totalAfter) / (1024 * 1024)).toFixed(2);
  const totalSavedPercent = totalBefore > 0 ? (((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1) : 0;
  console.log("\n=================================");
  console.log(`Total Awal   : ${(totalBefore / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Total Akhir  : ${(totalAfter / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Hemat        : ${savedMb} MB (-${totalSavedPercent}%)`);
  console.log("=================================");
}

optimize();
