const delRecipeBtns = document.querySelectorAll(".delete-icon-btn");

// Identifies which recipe to delete
const handleDelete = (i) => {
  const recipes = document.querySelectorAll(".recipe");
  for (const recipeInx = 0; recipeInx < recipes.length; recipeInx++) {
    if (recipeInx === i) {
      deleteRecipeData(i.toString());
    }
  }
};

// Removes Recipe from the server
const deleteRecipeData = async (recipeId) => {
  try {
    const res = await fetch(`/api/deleteRecipe/${recipeId}`, {
      method: "DELETE",
    });
    console.log(res.status);
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

const addDelBtnEventListeners = () => {
  delRecipeBtns.forEach((delBtn, i) => {
    delBtn.addEventListener("click", () => handleDelete(i));
  });
};
addDelBtnEventListeners();
