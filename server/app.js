const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const port = process.env.PORT || 5000;

server.listen(5000, () => {
  console.log(`server listening on http://localhost/${port}`);
});
