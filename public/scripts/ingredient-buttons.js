let ingDeleteBtns = document.querySelectorAll(".delete-set-btn");
let ingAddSetBtn = document.querySelector(".add-set-btn");
const addIngredientsSet = () => {
  const lastIngredientSetEl = document.querySelector(
    ".ingredient-set:last-of-type"
  );
  const lastHrEl = document.querySelector(
    ".divider-create-recipe:last-of-type"
  );

  console.log(lastIngredientSetEl);
  const newHrEl = lastIngredientSetEl.insertAdjacentElement(
    "afterend",
    lastHrEl
  );
  console.log(newHrEl);
  const newIngredientSetEl = newHrEl.insertAdjacentElement(
    "afterend",
    lastIngredientSetEl
  );
  console.log(newIngredientSetEl);
};
const deleteIngredientSet = (event) => {
  const btnParent = event.target.parentElement;
  const btnIngSetParent = btnParent.parentElement;

  if (
    btnIngSetParent.nextElementSibling !== null &&
    btnIngSetParent.nextElementSibling.nodeName !== "BUTTON"
  ) {
    btnIngSetParent.nextElementSibling.remove();
  } else {
    btnIngSetParent.previousElementSibling.remove();
  }
  btnIngSetParent.remove();
};
ingDeleteBtns.forEach((ingDelBtn) => {
  ingDelBtn.addEventListener("click", deleteIngredientSet);
});
ingAddSetBtn.addEventListener("click", addIngredientsSet);
