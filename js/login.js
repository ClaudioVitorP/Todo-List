const login_email = 'claudio@fultture.com'
const password_senha = '123456'

let form = document.querySelector("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    if(email == login_email && senha == password_senha){
        window.location = "index.html";
    } else {
        alert("E-mail ou senha incorreto.")
    }
})


