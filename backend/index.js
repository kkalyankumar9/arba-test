const express = require("express");

const { connection } = require("./db");
const { userRoutes } = require("./routes/userRoutes");
const session = require("express-session");
const app = express();
const cors = require("cors");
const { categoryRoutes } = require("./routes/categoryRoutes");
const { productsRoutes } = require("./routes/productsRoute");
const { forgotPasswordRoute } = require("./routes/forgotPassword");
const { profileRoutes } = require("./routes/profileUpdate");

app.use(cors());
app.use(express.json());

app.use("/userauth", userRoutes);
app.use("/category", categoryRoutes);
app.use("/products", productsRoutes);
app.use("/forgot", forgotPasswordRoute);
app.use("/updateprofile", profileRoutes);
app.use(
  session({
    secret: process.env.SESSION_KEY, // Change this to a strong, random key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if your server is using HTTPS
  })
);

const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("DB connected");
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
