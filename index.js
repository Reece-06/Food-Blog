import express from "express";

import path from "node:path";
import multer from "multer";
import { error } from "node:console";

const port = 3000;
const foodBlog = express();
const dirname = import.meta.dirname;
const upload = multer({ storage: multer.memoryStorage() });

// Set up EJS
foodBlog.set("view engine", "ejs");
foodBlog.set("views", path.join(dirname, "views"));

foodBlog.use(express.urlencoded({ extended: true }));
// Serve static files
foodBlog.use(express.static(path.join(dirname, "public")));

let recipes = [];

// Store posted recipes
const storeRecipes = (recipe, photo) => {
  const newRecipe = {
    author: recipe.author,
    calories: Number(recipe.calories),
    carbohydrates: Number(recipe.carbohydrates),
    cookTime: recipe.cookTime,
    cuisine: recipe.cuisine,
    fat: Number(recipe.fat),
    mealCourse: recipe.mealCourse,
    numServing: Number(recipe.numServing),
    prepTime: recipe.prepTime,
    protein: Number(recipe.protein),
    recipeName: recipe.recipeName,
    instructions: JSON.parse(recipe.instructions),
    ingredientSets: JSON.parse(recipe.ingredientSets),
    photo: photo ? photo.buffer.toString("base64") : null,
    mimeType: photo ? photo.mimeType : null,
  };
  recipes.push(newRecipe);
};

foodBlog.get("/", (req, res) => {
  const hasRecipes = recipes.length > 0;
  res.render("index.ejs", { hasRecipes, recipes });
});
foodBlog.post("/api/recipe", upload.single("photo"), (req, res) => {
  const formData = req.body;
  const photo = req.file;

  storeRecipes(formData, photo);

  res.redirect("/");
});
foodBlog.get("/api/getRecipe/:recipeId", (req, res) => {
  const recipeId = Number(req.params.recipeId);
  const recipe = recipes[recipeId];
  console.log(recipe);
  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404).json({ error: "Recipe not found" });
  }
});
foodBlog.delete("/api/deleteRecipe/:recipeId", (req, res) => {
  const recipeId = Number(req.params.recipeId);
  recipes.splice(recipeId, 1);
  res.redirect("/");
});

foodBlog.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
