

const form = document.querySelector(".login-box .form");
const email = document.querySelector(".login-box .form .email");
const password = document.querySelector(".login-box .form .password");

console.log(form, email, password);

form.addEventListener("submit", (e) => {
    if (localStorage.getItem("personalInfos")) {
        setTimeout(() => {
            swal("Error !", "plz logout first", "warning");
        }, 3000);
        window.location = "index.html";
    }
    else
        if (email.value === "admin@gmail.com" && password.value === "adminadmin") {
            e.preventDefault();
            window.location = "admin-page.html";
        }
            
        else {
            e.preventDefault();
            //POST request to send data to the server
            fetch("http://localhost:5000/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email.value,
                    password: password.value,
                }),
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {

                    if (data) {
                        console.log(data);
                        if (data.type === "ERROR") {
                            swal("Error !", "Invalid email or password!", "warning");
                            //window.location = "signup.html" ;
                        }
                        else {
                            localStorage.setItem("personalInfos", JSON.stringify(data));
                            //document.querySelector(".conditionalElement").classList.toggle("isAuth");
                            /*         swal({
                                        title: "Your account is created successfully :) :)",
                                        text: "You clicked the button!",
                                        icon: "success",
                                    })
                                        .then(() => {
                                            location.reload();
                                        }); */
                            swal("Success !", "Redirecting To Home Page ...");
                            setTimeout(() => {
                                window.location = "index.html";
                            }, 2500);
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }


})  