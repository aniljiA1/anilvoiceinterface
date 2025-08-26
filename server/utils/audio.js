// utils/audio.js
import fs from "fs";
import path from "path";

/**
 * Save uploaded audio file to /uploads folder
 * @param {Buffer} buffer - The audio buffer from multer
 * @param {string} filename - The file name
 * @returns {string} filePath
 */
export function saveAudioFile(buffer, filename) {
  const uploadsDir = path.resolve("uploads");

  // ensure uploads folder exists
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
  }

  const filePath = path.join(uploadsDir, filename);
  fs.writeFileSync(filePath, buffer);
  return filePath;
}
