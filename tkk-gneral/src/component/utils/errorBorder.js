export const errorBorder = (selector, message) => {
  let errline = document.querySelector(`${selector}`);
  if (errline.style.border === "1px solid red") {
    return;
  }
  errline.style.border = "1px solid red";
  errline.style.borderRadius = "10px";
  let para = document.createElement("p");
  para.id = "errline-para";
  para.innerText = message;
  para.style.color = "red";
  para.style.fontSize = "14px";
  errline.after(para);
  errline.addEventListener("change", () => {
    para.replaceWith("");
    errline.style.border = "";
  });
};
