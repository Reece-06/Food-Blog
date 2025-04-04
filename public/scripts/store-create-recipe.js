const recipeData = {
  recipeName: "",
  author: "",
  prepTime: "",
  cookTime: "",
  mainCourse: "",
  cuisine: "",
};
const storeData = (currentPageNum) => {
  if (currentPageNum === 1) {
    const basicInfoInputs = document.querySelectorAll(
      "#recipe-name, #author, #prep-time-hours, #prep-time-minutes, #prep-time-seconds, #cook-time-hours, #cook-time-minutes, #cook-time-seconds, #meal-course, #meal-course"
    );
    console.log("hello");
    console.log(basicInfoInputs);
  }
};

export { storeData };
