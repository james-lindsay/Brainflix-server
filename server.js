const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();

app.use(express.static('./public'));

const PORT = process.env.PORT

app.use(express.json());

app.use(cors({ origin: process.env.FRONTEND_URL }));

const videoRoutes = require("./routes/videos");
app.use("/videos", videoRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});