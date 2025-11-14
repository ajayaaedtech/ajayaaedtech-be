// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger.js'); // import swagger config
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes.js") ;
const courseRoutes = require("./routes/courseroutes/courseRoutes.js");


dotenv.config();
const app = express();
const port = process.env.PORT || 5001;

// DB connection
connectDB();
// Middleware
app.use(cors());
app.use(express.json());

const formRoutes = require("./routes/formRoutes.js");


// Home route
app.get("/", (req, res) => {
  res.send("AYAYAAEDTECH Backend Running 🚀");
});

const uesrroutes = require("./routes/pofileedit/userRoutes.js");
// edit and profiles
app.use("/api/user", uesrroutes)
// call back
const callbackrequest = require("./routes/customerSupportRoutes/customerSupportRoutes.js");
app.use("/api/callback", callbackrequest)


app.use("/api/form", formRoutes);

// Routes
app.use("/api/auth", authRoutes);

//for courses
app.use("/api/course", courseRoutes);

// video plyer api
app.use("/api/video", require("./routes/videoRoutes"));




app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
