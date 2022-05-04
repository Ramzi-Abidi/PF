
const ourForm = document.querySelector(".ourForm");
const theName = document.querySelector(".name");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const confirmPassword = document.querySelector(".confirmPassword");

console.log(theName, password, confirmPassword, email);

ourForm.addEventListener("submit", (e) => {
    if (localStorage.getItem("personalInfos")) {
        swal("Error !", "Invalid email or password!", "warning");
        window.location = "index.html";
        return;
    };

    if (password.value !== confirmPassword.value) {
        alert("password and confirm password are not matched");
        return;
    }

    e.preventDefault();     //preventing default submit (that annoying refresh)

    //POST request to send data to the server
    fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: theName.value,
            email: email.value,
            password: password.value,
        }),
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            if (data) {
                if(data.type==="ERROR") {
                    swal("Error !", "duplicate user!", "warning");
                    return;
                }
                localStorage.setItem("personalInfos", JSON.stringify(data));
                swal("account created successfully !", "Redirecting To Home Page ...");
                setTimeout(() => {
                    window.location = "index.html";
                }, 2500);
            }
        })
        .catch((error) => {
            console.log(error);
        });
});


