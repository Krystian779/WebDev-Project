// Storing user input in localstorage and displaying a thank you message
var email = document.getElementById("floatingInput");
var message = document.getElementById("floatingMessage");
var contactBtn = document.getElementById("contactBtn");
var dataJson = document.getElementById("dataJson");

contactBtn.onclick = function () {
  if (email.value === "" || message.value === "") {
    alert("Please fill in all fields.");
    return;
  } else {
    var userObj = {
      email: email.value,
      message: message.value,
    };
    var userJson = JSON.stringify(userObj);

    localStorage.setItem("contactData", userJson);

    let text = localStorage.getItem("contactData");
    let object = JSON.parse(text);
    console.log(object.email);
    console.log(object.message);

    email.value = "";
    message.value = "";
    alert(
      "Thank you for reaching out! We have received your message and will get back to you shortly."
    );
  }
};
