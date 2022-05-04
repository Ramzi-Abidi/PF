const cart = document.querySelector(".fa-shopping-basket span");
function verifLocalStorage() {

    if (localStorage.getItem("cartNumbers")) {
        cart.textContent = Number(localStorage.getItem("cartNumbers"));
    }
};
verifLocalStorage();

//API to add books to the db : 



//API to bring all books :
var arr = [];
fetch("http://localhost:5000/books")
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        console.log(data);
        localStorage.setItem("products", JSON.stringify(data));
        arr = data;
        console.log(arr);
    })
    .catch((err) => {
        console.log(err);
    });

let newData = JSON.parse(localStorage.getItem("products"));

console.log(newData);
let ok = false ;
function createUI() {
    let a = newData.map(prod => {
        if (prod.InStock === true)
            ok = "Yes" ;
        else
            ok = "No" ;
            
            return `
                <div class="card">
                    <img src=${prod.img} alt="" class="card__img">
    
                        <div class="card__data">
                            <h1 class="card__title">name : ${prod.name}</h1>
                            <span class="card__title">price : ${prod.price} TND</span>
                            <span class="card__title">In Stock : ${ok}</span>
                            <p class="card__description"> desc </p>
                            <a href="#" class="card__button">Add To Cart</a>
                        </div>
                    </div>
                </div>` ;
    });
    document.querySelector(".bs-img").innerHTML = a;
}

createUI();

const addBtn = document.querySelectorAll(".card__button");
console.log(addBtn);
addBtn.forEach((obj, i) => {
    obj.addEventListener("click", () => {
        addProducts(arr[i]);
        cartCost(arr[i]);             //to calculate the total cost of all products

    });
})
function addProducts(product) {
    //before adding to the cart, user must be logged in .
    console.log("adding to the cart");
    if (!localStorage.getItem("personalInfos")) {
        swal("Error !", "please login first", "warning");
        setTimeout(() => {
            window.location = "login.html";
        }, 2500);
        return;
    }
    console.log(product);
    if (localStorage.getItem("cartNumbers")) {
        productNumber = Number(localStorage.getItem("cartNumbers"));
        localStorage.setItem("cartNumbers", productNumber + 1);
    }
    else {
        localStorage.setItem("cartNumbers", 1);
    }
    cart.textContent = Number(localStorage.getItem("cartNumbers"));
    setCart(product);
}


let t = [];
if(localStorage.getItem("cartProducts")) {
    t = JSON.parse(localStorage.getItem("cartProducts")) ;
}

function setCart(product) {

    console.log(product);
    if (product.productInCart !== 0) {
        t = JSON.parse(localStorage.getItem("cartProducts"));
        for (let i = 0; i < t.length; i++) {
            if (t[i].name === product.name)
                t[i].productInCart++;
        }
        localStorage.setItem("cartProducts", JSON.stringify(t));
    }
    else {
        product.productInCart = 1;
        t.push(product);
        localStorage.setItem("cartProducts", JSON.stringify(t));
    }


}


function cartCost(product) {
    if (localStorage.getItem("cartCost")) {
        let totalCost = Number(localStorage.getItem("cartCost"));
        console.log(product.price + totalCost);

        localStorage.setItem("cartCost", totalCost + product.price);
    }
    else
        localStorage.setItem("cartCost", product.price);
}

//personal infos 

if (localStorage.getItem("personalInfos")) {
    document.querySelector(".nav-item2").style.display = "none";
    document.querySelector(".nav-item-name").textContent = `Hello, ${JSON.parse(localStorage.getItem("personalInfos")).name}`;
    document.querySelector(".drop").style.visibility = "visible";
}


const drop = document.querySelector(".drop");
const dropMenu = document.querySelector(".drop-menu");
console.log(drop);

drop.addEventListener("click", () => {
    dropMenu.classList.toggle("activeee");

});


//logout functionality :

document.querySelector(".logout").addEventListener("click", () => {
    //na7o el user ml localStorage
    localStorage.removeItem("personalInfos");
    localStorage.clear();
    //naamlo refresh lel page
    location.reload();

    //redirection lel signin :
    window.location = "login.html";
});

//showing cart functionality :

theCart = document.querySelector(".cart");

console.log(theCart);

theCart.addEventListener("click", () => {

    let cartProducts = JSON.parse(localStorage.getItem("cartProducts"));

    document.querySelector(".dropMenu h4").textContent = `you have ${cartProducts.length} items`;

    document.querySelector(".dropMenu").classList.toggle("activ");

});

let seeAllBtn = document.querySelector(".dropMenu button");
seeAllBtn.addEventListener("click", () => {
    window.location = "cart.html";
});