import express from "express";

import path from "node:path";
import multer from "multer";

const port = 3000;
const foodBlog = express();
const dirname = import.meta.dirname;
const upload = multer({ storage: multer.memoryStorage() });
// Set up EJS
foodBlog.set("view engine", "ejs");
foodBlog.set("views", path.join(dirname, "views"));

// Serve static files
foodBlog.use(express.static(path.join(dirname, "public")));

let recipes = {};
let hasRecipes = true;

// Middleware that checks if there are already recipes created
const checkRecipes = (req, res, next) => {
  hasRecipes = Object.keys(recipes).length > 0;
  next();
};

// foodBlog.use(checkRecipes);

foodBlog.get("/", (req, res) => {
  res.render("index.ejs", { hasRecipes: hasRecipes });
});
foodBlog.post("/api/recipe", upload.single("photo"), (req, res) => {
  const formData = req.body;
  const photo = req.file;

  console.log("Received recipe:");
  console.log("Body:", formData);
  console.log("Photo:", photo);

  res.json({ success: true });
});

foodBlog.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
