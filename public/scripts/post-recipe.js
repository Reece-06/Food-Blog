// import { recipe } from "./store-create-recipe";
// Transfer all recipe data to form data
const getNewFormData = (recipe) => {
  const formData = new FormData();
  formData.append("author", recipe.author);
  formData.append("calories", recipe.calories);
  formData.append("carbohydrates", recipe.carbohydrates);
  formData.append("cookTime", recipe.cookTime);
  formData.append("cuisine", recipe.cuisine);
  formData.append("fat", recipe.fat);
  formData.append("mealCourse", recipe.mealCourse);
  formData.append("numServing", recipe.numServing);
  formData.append("prepTime", recipe.prepTime);
  formData.append("protein", recipe.protein);
  formData.append("recipeName", recipe.recipeName);
  formData.append("photo", recipe.photo);
  formData.append("instructions", JSON.stringify(recipe.instructions));
  formData.append("ingredientSets", JSON.stringify(recipe.ingredientSets));
  return formData;
};
// Sends recipe data to the server
const sendRecipeDataToServer = async (recipe) => {
  const data = getNewFormData(recipe);
  try {
    const res = await fetch("/api/recipe", {
      method: "POST",
      body: data,
    });

    if (res.redirected) {
      // If the server redirected, manually follow it

      window.location.href = res.url;
    } else if (res.ok) {
      // Or force a redirect after successful post

      window.location.href = "/";
    }
  } catch (error) {
    console.log(error.message);
  }
};
export { sendRecipeDataToServer };
