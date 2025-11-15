const fetch = require('node-fetch');

module.exports = async function handler(req, res) {
  try {
    const { prompt } = req.body;

    const apiKey = process.env.OPENAI_API_KEY;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateImage?key=" + apiKey,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: { text: prompt },
          size: "1024x1024"
        })
      }
    );

    const json = await response.json();

    const base64 = json.generatedImages?.[0]?.imageData;

    res.status(200).json({ image: base64 });
  } catch (error) {
    console.log("Ошибка:", error);
    res.status(500).json({ error: "server error" });
  }
}
