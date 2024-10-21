const open = document.getElementById("open");
const close = document.getElementById("close");
// const modal = document.getElementsByClassName('modalcontainer')[0];
const modal = document.querySelector(".modalcontainer");

// open.onclick = function () {
//     modal.style.display = 'flex';
// }

// close.onclick = function () {
//     modal.style.display = 'none';
// }

open.onclick = () => {
  modal.style.display = "flex";
};
close.onclick = () => {
  modal.style.display = "none";
};
