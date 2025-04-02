import express from "express";

import path from "node:path";

const port = 3000;
const foodBlog = express();
const dirname = import.meta.dirname;

// Set up EJS
foodBlog.set("view engine", "ejs");
foodBlog.set("views", path.join(dirname, "views"));

// Serve static files
foodBlog.use(express.static(path.join(dirname, "public")));

let recipes = {};
let hasRecipes = false;

// Middleware that checks if there are already recipes created
const checkRecipes = (req, res, next) => {
  hasRecipes = Object.keys(recipes).length > 0;
  next();
};

foodBlog.use(checkRecipes);

foodBlog.get("/", (req, res) => {
  res.render("index.ejs", { hasRecipes: hasRecipes });
});

foodBlog.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
