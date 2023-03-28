//array de botones
//globales
const agregarAlCarrito = document.querySelectorAll(".addToCart");
agregarAlCarrito.forEach((agregarAlCarritoBoton) => {
  agregarAlCarritoBoton.addEventListener("click", addToCartClicked);
});
const botonCaja = document.querySelector("#botonCaja");

const shoppingCartItemsContainer = document.querySelector(
  ".shoppingCartItemsContainer"
);
//let agregarAlCarrito = JSON.parse(localStorage.getItem("agregarAlCarrito"));

//local storage

const saveLocal = () => {
  localStorage.setItem("agregarAlCarrito", JSON.stringify(agregarAlCarrito));
};

//añadir items al carrito
function addToCartClicked(event) {
  const button = event.target;
  const item = button.closest(".item");
  const itemTitle = item.querySelector(".item-title").textContent;
  const itemPrice = item.querySelector(".item-price").textContent;
  const itemImage = item.querySelector(".item-image").src;

  addItemToShoppingCart(itemTitle, itemPrice, itemImage);
  saveLocal();
}
//toastify libreria

botonCaja.addEventListener("click", () => {
  Toastify({
    text: "Producto agregado",
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    duration: 1600,
  }).showToast();
});

function addItemToShoppingCart(itemTitle, itemPrice, itemImage) {
  const elementsTitle = shoppingCartItemsContainer.getElementsByClassName(
    "shoppingCartItemTitle"
  );
  //bucle for para no duplicar
  for (let i = 0; i < elementsTitle.length; i++) {
    if (elementsTitle[i].innerText === itemTitle) {
      let elementQuantity = elementsTitle[
        i
      ].parentElement.parentElement.parentElement.querySelector(
        ".shoppingCartItemQuantity"
      );
      elementQuantity.value++;
      $(".toast").toast("show");
      updateShoppingCartTotal();
      return;
    }
  }
  //elemento que aparece en el carrito

  const shoppingCartRow = document.createElement("div");
  const shoppingCartContent = `
  <div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${itemImage} class="shopping-cart-image">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                    value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`;
  shoppingCartRow.innerHTML = shoppingCartContent;
  shoppingCartItemsContainer.append(shoppingCartRow);

  shoppingCartRow
    .querySelector(".buttonDelete")
    .addEventListener("click", removeShoppingCartItem);

  shoppingCartRow
    .querySelector(".shoppingCartItemQuantity")
    .addEventListener("change", quantityChanged);

  updateShoppingCartTotal();
}
// Funcion que actualiza el precio total

function updateShoppingCartTotal() {
  let total = 0;
  const shoppingCartTotal = document.querySelector(".shoppingCartTotal");

  const shoppingCartItems = document.querySelectorAll(".shoppingCartItem");

  shoppingCartItems.forEach((shoppingCartItem) => {
    const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
      ".shoppingCartItemPrice"
    );
    const shoppingCartItemPrice = Number(
      shoppingCartItemPriceElement.textContent.replace("$", "")
    );
    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
      ".shoppingCartItemQuantity"
    );
    const shoppingCartItemQuantity = Number(
      shoppingCartItemQuantityElement.value
    );
    total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
  });
  shoppingCartTotal.innerHTML = `${total.toFixed(2)}$`;
}
//remover items
function removeShoppingCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.closest(".shoppingCartItem").remove();
  updateShoppingCartTotal();
}
//cambiar cantidad
function quantityChanged(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  updateShoppingCartTotal();
}
//funcion para comprar
function comprarButtonClicked() {
  shoppingCartItemsContainer.innerHTML = "";
  updateShoppingCartTotal();
}
