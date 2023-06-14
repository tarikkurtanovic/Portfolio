const sidemenu = document.getElementById("sidemenu");
const menu = document.querySelector(".bx-x");

function openmenu() {
  sidemenu.style.right = "0";
  menu.classList.add(".hidden");
}

function closemenu() {
  sidemenu.style.right = "-400px";
}

// Get the form element
const form = document.querySelector("form");

// Get the input fields
const nameInput = form.querySelector('input[name="Name"]');
const emailInput = form.querySelector('input[name="Email"]');
const messageInput = form.querySelector('textarea[name="Message"]');

// Create a new HTML element for the message
const messageElement = document.createElement("p");
form.appendChild(messageElement);

// Add event listener to the form submit event
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission

  // Create a new FormData object
  const formData = new FormData(form);

  // Create a new XMLHttpRequest
  const xhr = new XMLHttpRequest();

  // Set up the request
  xhr.open("POST", form.action, true);
  xhr.setRequestHeader("Accept", "application/json");

  // Handle successful form submission
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Clear the input fields
      nameInput.value = "";
      emailInput.value = "";
      messageInput.value = "";

      // Set the success message
      messageElement.textContent = "Message  sent successfully";
      messageElement.style.color = "green";
      messageElement.style.fontSize = "20px";
    } else {
      // Set the failure message
      messageElement.textContent = "Message not sent";
      messageElement.style.color = "red";
      messageElement.style.fontSize = "20px";
    }
  };

  // Send the request
  xhr.send(formData);
});

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual"; // Disable automatic scroll restoration
  window.addEventListener("beforeunload", function () {
    window.scrollTo(0, 0); // Scrolls to the top of the page before it reloads
  });
}
if (performance.navigation.type === 1) {
  window.location.href = window.location.origin + window.location.pathname;
}
