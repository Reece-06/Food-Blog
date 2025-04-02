import express from "express";
import path from "node:path";

const port = 3000;

const foodBlog = express();

const dirname = import.meta.dirname;
foodBlog.use(express.static(path.join(dirname, "public")));
const homePath = path.join(dirname, "public/index.html");

foodBlog.get("/", (req, res) => {
  res.sendFile(homePath);
});

foodBlog.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
