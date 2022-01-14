// This was adapted from https://www.geeksforgeeks.org/how-to-send-an-email-from-javascript/ and uses the smtp lib. for js
function sendEmail() { 
  console.log(document.getElementById("subject").value+", "+
    document.getElementById("emailBody").value + "\n\nSent by: "+
    document.getElementById("by").value + "\n\nReturn Address: "+
    document.getElementById("returnAddress").value );
  Email.send({ 
    Host: "smtp.gmail.com", 
    Username: "Iterative.Function.Systems@gmail.com", 
    Password: "IFS@CS290", 
    To: "Remy.rouyer99+cs290@gmail.com", 
    From: "Iterative.Function.Systems@gmail.com", 
    Subject: document.getElementById("subject").value, 
    Body: document.getElementById("emailBody").value + "<br><br>Sent by: "+
    document.getElementById("by").value + "<br><br>Return Address: "+
    document.getElementById("returnAddress").value 
  }) 
    .then(function (message) {alert("Email was sent")}); 
}
let sendBtn = document.getElementById("sendBtn");
sendBtn.addEventListener("click", sendEmail);