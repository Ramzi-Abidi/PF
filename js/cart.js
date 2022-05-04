
/* let productName=document.querySelector(".product-name");
localStorage.getItem("cartProducts");
productName.textContent =   */
let productsSection = document.querySelector(".products");
const totalCost = Number(localStorage.getItem("cartCost"));


console.log(productsSection);

const cartProducts = JSON.parse(localStorage.getItem("cartProducts"));

let a = cartProducts.map(prod => {
    return `
    <div class="product">
        <img src=${prod.img}>
        <div class="product-info">
            <h3 class="product-name">name : ${prod.name}</h3>
            <h4 class="product-price">price : ${prod.price}</h4>
            <h4 class="product-offer">50%</h4>
            <p class="product-quantity">Qty: ${prod.productInCart}
                <p class="product-remove" onclick="handleRemove('${prod.name}','${prod.productInCart}')">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                    <span class="remove">Remove</span>       
                </p>
        </div>
    </div>
    `
});
productsSection.innerHTML = a;

function createUI() {
    let ch = `
        <div class="cart-total">
            <p>
                <span>Total Price</span>
                <span class="total">${totalCost} TND</span>
            </p>
            <p>
                <span>Number of Items</span>
                <span>${cartProducts.length} items</span>
            </p>

            <a href="shipping.html">Proceed to Checkout</a>
        </div>
    `
    document.querySelector(".cart-total").innerHTML = ch;
}

createUI();

function handleRemove(name, productInCart) {
    console.log(name);
    console.log(productInCart);

    //na9es fl basket fl home page :
    let cartNumbers = Number(localStorage.getItem("cartNumbers"));
    cartNumbers = cartNumbers - productInCart;
    localStorage.setItem("cartNumbers", JSON.stringify(cartNumbers));

    //we're going to consider name as a unique value for our books .
    let cartProducts = JSON.parse(localStorage.getItem("cartProducts"));
    console.log(cartProducts);

    //na9so ml cartCost :
    for (let i = 0; i < cartProducts.length; ++i) {
        if (cartProducts[i].name === name) {
            totalCost - cartProducts[i].price * cartProducts[i].productInCart;
            localStorage.setItem("cartCost", totalCost);
        }
        break;
    }

    const a = cartProducts.filter(p => p.name !== name);

    //setting new cartProducts to the localStorage .
    localStorage.setItem("cartProducts", JSON.stringify(a));

    //refresh the page :
    window.location.reload(false);


}