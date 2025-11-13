const axios = require("axios");
const jwt = require("jsonwebtoken");

const VIDEO =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4";

const SECRET = "MONU_BANNA_TEST_SECRET";

// ----------------------
// SIMPLE STREAM (no token)
// ----------------------
exports.streamSimpleVideo = async (req, res) => {
  try {
    let range = req.headers.range || "bytes=0-";

    const head = await axios.head(VIDEO);
    const videoSize = head.headers["content-length"];

    const CHUNK = 1_000_000; // 1MB chunks
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK, videoSize - 1);

    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": end - start + 1,
      "Content-Type": "video/mp4",
      "Cache-Control": "no-store",
    });

    const stream = await axios.get(VIDEO, {
      responseType: "stream",
      headers: {
        Range: `bytes=${start}-${end}`,
      },
    });

    stream.data.pipe(res);
  } catch (err) {
    console.log("ERROR simple:", err.message);
    res.status(500).json({ error: "Simple Stream Failed" });
  }
};

// ----------------------
// TOKEN GENERATOR
// ----------------------
exports.issueToken = (req, res) => {
  const { userId = "guest" } = req.body;

  const token = jwt.sign(
    { sub: userId, role: "student" },
    SECRET,
    { expiresIn: "5m" }
  );

  res.json({ token });
};

// ----------------------
// PROTECTED STREAM
// ----------------------
exports.streamSecureVideo = async (req, res) => {
  try {
    const userId = req.tokenPayload.sub; // from verifyToken
    let range = req.headers.range || "bytes=0-";

    const head = await axios.head(VIDEO);
    const videoSize = head.headers["content-length"];

    const CHUNK = 1_000_000;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK, videoSize - 1);

    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": end - start + 1,
      "Content-Type": "video/mp4",
      "Cache-Control": "no-store",
      "X-User-ID": userId,
    });

    const stream = await axios.get(VIDEO, {
      responseType: "stream",
      headers: {
        Range: `bytes=${start}-${end}`,
      },
    });

    stream.data.pipe(res);

  } catch (err) {
    console.log("SECURE ERROR:", err.message);
    res.status(500).json({ error: "Secure Stream Failed" });
  }
};
