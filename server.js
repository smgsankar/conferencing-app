import express from "express";
import path from "path";

const app = express();

app.use(express.static(path.join(path.resolve(), "/public")));

app.get("/", (_, res) => {
  res.sendFile(path.join(path.resolve(), "/index.html"));
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
