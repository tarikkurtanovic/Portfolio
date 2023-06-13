const sidemenu = document.getElementById("sidemenu");
const menu = document.querySelector(".bx-x");

function openmenu() {
  sidemenu.style.right = "0";
  menu.classList.add(".hidden");
}

function closemenu() {
  sidemenu.style.right = "-400px";
}
