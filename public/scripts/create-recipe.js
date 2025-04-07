const showCreateRecipeModal = () => {
  const body = document.querySelector("body");
  body.classList.add(
    "show-create-recipe-container",
    "show-form-overlay",
    "hide-scroll"
  );
};
const hideCreateRecipeModal = () => {
  const body = document.querySelector("body");
  body.classList.remove(
    "show-create-recipe-container",
    "show-form-overlay",
    "hide-scroll"
  );
};
document.addEventListener("DOMContentLoaded", () => {
  const createRecipeBtns = document.querySelectorAll(".create-recipe-btn");
  const formOverlay = document.querySelector(".form-overlay");

  if (formOverlay) {
    formOverlay.addEventListener("click", hideCreateRecipeModal);
  }
  createRecipeBtns.forEach((recipeBtn) => {
    recipeBtn.addEventListener("click", showCreateRecipeModal);
  });
});
export { hideCreateRecipeModal };
