document.addEventListener("DOMContentLoaded", () => {
  const createRecipeBtns = document.querySelectorAll(".create-recipe-btn");
  const body = document.querySelector("body");
  const formOverlay = document.querySelector(".form-overlay");

  const showCreateRecipeModal = () => {
    body.classList.add(
      "show-create-recipe-container",
      "show-form-overlay",
      "hide-scroll"
    );
  };
  const hideCreateRecipeModal = () => {
    body.classList.remove(
      "show-create-recipe-container",
      "show-form-overlay",
      "hide-scroll"
    );
  };
  if (formOverlay) {
    formOverlay.addEventListener("click", hideCreateRecipeModal);
  }
  createRecipeBtns.forEach((recipeBtn) => {
    recipeBtn.addEventListener("click", showCreateRecipeModal);
  });
});
