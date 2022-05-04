let ourProducts = JSON.parse(localStorage.getItem("products"));

console.log(ourProducts);

function displayProduct() {
    let a = ourProducts.map(prod => {
        return `
            <tr class="productsHolder">
                    <td><img src="${prod.img}" class="bookImg" width="30"> alt="${prod.name}"></td>
                    <td> ${prod.name} </td>
                    <td> ${prod.price} </td>
                    <td>
                    <a href="admin_update.php> class="btn"> <i class="fas fa-edit"></i> edit </a>
                    <a href="admin_page.php> class="btn"> <i class="fas fa-trash"></i> delete </a>
                    </td>
                </tr> `;
        })
        document.querySelector(".product-display-table").innerHTML = a;
}

displayProduct() ;