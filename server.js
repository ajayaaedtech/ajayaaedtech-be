// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const formRoutes = require("./routes/formRoutes.js");
app.use("/api/form", formRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
