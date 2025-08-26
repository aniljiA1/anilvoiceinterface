import express from "express";
import cors from "cors";
import multer from "multer";
import { saveAudioFile } from "./utils/audio.js";
import { SYSTEM_PROMPT } from "./utils/systemPrompt.js";

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
const upload = multer();

// POST /api/voice
app.post("/api/voice", upload.single("audio"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No audio uploaded" });
  }

  console.log("✅ Received audio:", req.file.originalname, req.file.mimetype);

  // save file locally
  const filePath = saveAudioFile(req.file.buffer, req.file.originalname);

  // for now just return confirmation
  res.json({ 
    message: "Audio received successfully!", 
    systemPrompt: SYSTEM_PROMPT,
    filePath 
  });
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
