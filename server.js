// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger'); // import swagger config

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const formRoutes = require("./routes/formRoutes.js");
// Home route
app.get("/", (req, res) => {
  res.send("Hello APIs");
});

app.use("/api/form", formRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
