const addInsBtn = document.querySelector(".add-instruction-btn");
// generate new label / input attributes
const generateNewAttribute = (attrValue) => {
  const splitValueArr = attrValue.split("-");
  const currentNum = Number(splitValueArr[splitValueArr.length - 1]);
  splitValueArr[splitValueArr.length - 1] = currentNum + 1;

  const newAttr = splitValueArr.join("-");
  return newAttr;
};
// Renames id name, and for attributes of a labels and inputs
const renameAttributes = (parentEl) => {
  const inputEl = parentEl.querySelector(".instruction-input");
  const labelEl = parentEl.querySelector(".ins-label");

  const newAttrVal = generateNewAttribute(inputEl.id);

  inputEl.id = newAttrVal;
  inputEl.name = newAttrVal;
  labelEl.setAttribute("for", newAttrVal);
};
// Adds instruction inputs
const addInstruction = () => {
  const lastInsContainer = document.querySelector(
    ".instruction-input-container:last-of-type"
  );

  const clonedContainer = lastInsContainer.cloneNode(true);

  renameAttributes(clonedContainer);

  const newContainer = lastInsContainer.insertAdjacentElement(
    "afterend",
    clonedContainer
  );
  console.log("inserted element:", newContainer);
};

addInsBtn.addEventListener("click", addInstruction);
