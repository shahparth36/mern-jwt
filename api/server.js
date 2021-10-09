require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

const db = require("./models");

const { handleError } = require("./middleware/error");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(logger("dev"));

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
  });

app.use("/api", authRoutes, userRoutes);
app.use("/api/auth", authRoutes);

app.use(handleError);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is listening on PORT ${process.env.PORT}`);
});
