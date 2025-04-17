const addInsBtn = document.querySelector(".add-instruction-btn");
const delInsBtns = document.querySelectorAll(".delete-instruction-btn");
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
// Reenable all disabled del btns if any
const reenableDelBtns = () => {
  const allDelBtns = document.querySelectorAll(".delete-instruction-btn");
  allDelBtns.forEach((delBtn) => {
    const isDisabled = delBtn.getAttribute("disabled") !== null;

    if (isDisabled) {
      delBtn.removeAttribute("disabled");
    }
  });
};
// Add a delete btn listenter to newly added instruction
const addDelBtnListener = (delBtn) => {
  delBtn.addEventListener("click", deleteInstruction);
};
// Adds instruction inputs
const addInstruction = () => {
  const lastInsContainer = document.querySelector(
    ".instruction-input-container:last-of-type"
  );

  const clonedContainer = lastInsContainer.cloneNode(true);

  renameAttributes(clonedContainer);

  lastInsContainer.insertAdjacentElement("afterend", clonedContainer);
  reenableDelBtns();
  const delBtn = clonedContainer.querySelector(".delete-instruction-btn");
  addDelBtnListener(delBtn);
};
// Disable del btn when only 1 instruction input remain
const disableFirstDelBtn = () => {
  const firstDelBtns = document.querySelectorAll(".delete-instruction-btn");

  const insContainers = document.querySelectorAll(
    ".instruction-input-container"
  );
  const onlyOneContainer = insContainers.length === 1;

  if (onlyOneContainer) {
    firstDelBtns[0].setAttribute("disabled", "");
  }
};
// Set new attribute value for id name and for
const setNewAttr = (currAttr) => {
  const attrValSplit = currAttr.split("-");
  const lastNum = attrValSplit[attrValSplit.length - 1];
  attrValSplit[attrValSplit.length - 1] = lastNum - 1;

  return attrValSplit.join("-");
};
// Rename attributes after deleting
const renameAttributesAfterDel = (nextSib) => {
  let sibContainer = nextSib;

  while (sibContainer.nodeName !== "BUTTON") {
    const inputEl = sibContainer.querySelector(".instruction-input");
    const labelEl = sibContainer.querySelector(".ins-label");
    const currAttr = inputEl.id;

    inputEl.id = setNewAttr(currAttr);
    inputEl.name = setNewAttr(currAttr);
    labelEl.setAttribute("for", setNewAttr(currAttr));
    sibContainer = sibContainer.nextElementSibling;
  }
};

// Deletes Instructiion
const deleteInstruction = (event) => {
  const delBtn = event.currentTarget;
  const insContainer = delBtn.parentElement;
  const nextSib = insContainer.nextElementSibling;
  insContainer.remove();

  disableFirstDelBtn();
  renameAttributesAfterDel(nextSib);
};
addInsBtn.addEventListener("click", addInstruction);
delInsBtns.forEach((delInsBtn) => {
  delInsBtn.addEventListener("click", deleteInstruction);
});
disableFirstDelBtn();
