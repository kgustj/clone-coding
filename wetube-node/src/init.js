import "dotenv/config";
import "./db";
import "./models/video";
import "./models/user";
import app from "./app";

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`✅ Server listening on http://localhost:${PORT} 🚀`));
