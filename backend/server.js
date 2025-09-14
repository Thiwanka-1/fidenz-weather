import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import NodeCache from "node-cache";

dotenv.config();
const app = express();
app.use(cors());
const cache = new NodeCache({ stdTTL: 300 }); // 5 min cache

// Read JSON (your file has a "List" key)
const raw = JSON.parse(fs.readFileSync("./cities.json", "utf-8"));
const cities = raw.List || []; // fallback if empty

// ✅ Endpoint: return both CityCode + CityName
app.get("/api/cities", (_, res) => {
  res.json(
    cities.map((c) => ({
      code: c.CityCode,
      name: c.CityName,
    }))
  );
});

// ✅ Endpoint: get weather by city code
app.get("/api/weather/:id", async (req, res) => {
  const id = req.params.id;
  const key = `w_${id}`;
  const cached = cache.get(key);
  if (cached) return res.json(cached);

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${process.env.OWM_API_KEY}`;
    const { data } = await axios.get(url);

    const payload = {
      name: data.name,
      description: data.weather?.[0]?.description,
      temp: data.main?.temp,
    };

    cache.set(key, payload);
    res.json(payload);
  } catch (e) {
    console.error("Weather API error:", e.message);
    // fallback: serve from cities.json if available
    const fallback = cities.find((c) => c.CityCode === id);
    if (fallback) {
      return res.json({
        name: fallback.CityName,
        description: fallback.Status,
        temp: fallback.Temp,
      });
    }
    res.status(500).json({ error: "Failed to fetch weather" });
  }
});

app.listen(process.env.PORT || 4000, () =>
  console.log("API running on", process.env.PORT || 4000)
);
