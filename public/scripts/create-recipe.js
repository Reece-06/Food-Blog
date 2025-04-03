const createRecipeBtns = document.querySelectorAll(".create-recipe-btn");
const body = document.querySelector("body");

const showCreateRecipeModal = (event) => {
  body.classList.add(
    "show-create-recipe-container",
    "show-form-overlay",
    "hide-scroll"
  );
};

createRecipeBtns.forEach((recipeBtn) => {
  recipeBtn.addEventListener("click", showCreateRecipeModal);
});
