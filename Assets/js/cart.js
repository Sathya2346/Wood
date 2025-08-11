document.addEventListener('DOMContentLoaded', function (){
  loadfood();
  loadWish();
  loadContent();
  PlaceOrder();
});

// Add To Cart Page Btns
let btncart = document.querySelector('.cart-icon');
let carts = document.querySelector('.carts');
let cartclose = document.querySelector('#cart-close');

btncart.addEventListener('click',()=>{
    carts.classList.add('cart-active');
});
cartclose.addEventListener('click',()=>{
    carts.classList.remove('cart-active');
});

// Add To Wish Page Btns
let wishBtnCart = document.querySelector('.wishIcon');
let Wish = document.querySelector('.Wish')
let wishClose = document.querySelector('#wishClose');

wishBtnCart.addEventListener('click',()=>{
    Wish.classList.add('wish-active');
});
wishClose.addEventListener('click',()=>{
    Wish.classList.remove('wish-active');
});

// Add to Cart Functionality

function loadfood(){
    const savedCart = JSON.parse(localStorage.getItem("CategoryCart"));
    if (savedCart && savedCart.length > 0) {
        itemList = savedCart;
        let cartBasket = document.querySelector('.cart-content');
        cartBasket.innerHTML = '';

        itemList.forEach(item => {
            let newProductElement = createCartProduct(item.title, item.price, item.imgSrc, item.qty);
            cartBasket.append(newProductElement);
        });
    }
    loadContent();
    updateTotal();
    saveCartToLocalStorage();
}
function loadWish() {
    const savedWish = JSON.parse(localStorage.getItem("CategoryWish"));
    if (savedWish && savedWish.length > 0) {
        wishList = savedWish;
        let wishBasket = document.querySelector('.Wish-content');
        wishBasket.innerHTML = '';

        wishList.forEach(item => {
            let newWishElement = createWishProduct(item.title, item.price, item.imgSrc);
            newWishElement.querySelector('.wish-remove').addEventListener('click', removeWishItem);
            wishBasket.append(newWishElement);
        });
    }
}

let itemList = JSON.parse(localStorage.getItem("CategoryCart")) || [];


function loadContent() {
    let cartBtn = document.querySelectorAll('.add-cart');
    cartBtn.forEach((btn) => {
        btn.addEventListener('click', addcart);
    });
    // remove item from cart
    let btnRemove = document.querySelectorAll('.cart-remove');
    btnRemove.forEach((btun)=>{
        btun.addEventListener('click',removeItem);
    });

    // Quantity change event
    let qtyInputs = document.querySelectorAll('.cart-quantity');
    qtyInputs.forEach(input => {
        input.addEventListener('change', changQty);
    });
    // Wish List
    let heart = document.querySelectorAll('.cartWish');
    heart.forEach((heart) => {
        heart.addEventListener('click',wish);
    });
    // Remove Wish Item
    let WishRemoveBtn = document.querySelectorAll('.wish-remove');
    WishRemoveBtn.forEach((btn) => {
      btn.addEventListener('click', removeWishItem);
    });
    
}
// Remove Item

function removeItem(){
    if (confirm('Are You Sure To Remove Item')) {
        const cartBox = this.closest('.cart-box');
        const title = cartBox.querySelector('.cart-food-title').innerText;
        // Remove element from DOM
        cartBox.remove();

        // Remove from itemList array
        itemList = itemList.filter(el => el.title !== title);

        // Update totals and count
        updateTotal();
        saveCartToLocalStorage();
    }
}
// Change Quantity

function changQty(){
    if(isNaN(this.value) || this.value<1){
        this.value = 1;
    }

    let cartBox = this.closest('.cart-box');
    let title = cartBox.querySelector('.cart-food-title').innerText;

    // Update quantity in itemList
    itemList = itemList.map(item => {
        if (item.title === title) {
            item.qty = parseInt(this.value);
        }
        return item;
    });
    updateTotal();
    saveCartToLocalStorage();
}

// Wish List

let wishList = JSON.parse(localStorage.getItem("CategoryWish")) || [];

function wish(){
    this.classList.add('Redheart');
    let food = this.closest('.showCards');
    let title = food.querySelector('.food-title').innerHTML;
    let price = food.querySelector('.food-price').innerHTML;
    let imgSrc = food.querySelector('.food-img').src;

    let existingItem = wishList.find((el) => el.title === title && el.price === price);
    if(existingItem){
        alert("Product Already Added in Wish List");
        return;
    }
    let newWishitem = {title,price,imgSrc};
    wishList.push(newWishitem);

    let wishBasket = document.querySelector('.Wish-content');
    let newWishElement = createWishProduct(title, price, imgSrc);
    newWishElement.querySelector('.wish-remove').addEventListener('click', removeWishItem);
    wishBasket.append(newWishElement);

    saveCartToLocalStorage();
}
function createWishProduct(title, price, imgSrc) {
    let WishBox = document.createElement("div");
    WishBox.classList.add("Wish-box");


    WishBox.innerHTML = `
    <img src="${imgSrc}" class="cart-img img-fluid">
    <div class="detail-box">
      <div class="wish-food-title">${title}</div>
        <div class="price-box">
          <div class="cart-price">${price}</div>
        </div>
    </div>
    <ion-icon name="trash" class="wish-remove"></ion-icon>`;
    saveCartToLocalStorage();
    return WishBox;
}
// Remove Item from Wish
function removeWishItem(){
    if (confirm('Are You Sure To Remove Item')) {
        const WishBox = this.closest('.Wish-box');
        const title = WishBox.querySelector('.wish-food-title').innerText;
        // Remove element from DOM
        WishBox.remove();

        // Remove from itemList array
        wishList = wishList.filter(el => el.title !== title);

        saveCartToLocalStorage();
    }
}

function addcart() {

    let food = this.closest('.showCards');
    let title = food.querySelector('.food-title').innerHTML;
    let price = food.querySelector('.food-price').innerHTML;
    let imgSrc = food.querySelector('.food-img').src;

    // Check if product is already in cart
    let existingItem = itemList.find((el) => el.title === title && el.price === price);
    if (existingItem) {
        alert("Product Already Added in Cart");
        return;
    }

    let newProduct = {title, price,imgSrc, qty:1};
    itemList.push(newProduct);


    // Add product to cart UI
    let cartBasket = document.querySelector('.cart-content');
    let newProductElement = createCartProduct(title, price, imgSrc);
    cartBasket.append(newProductElement);

    loadContent();
    updateTotal();
    saveCartToLocalStorage();
}

function createCartProduct(title, price, imgSrc,qty = 1) {
    let cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");


    cartBox.innerHTML = `
    <img src="${imgSrc}" class="cart-img img-fluid">
    <div class="detail-box">
      <div class="cart-food-title">${title}</div>
        <div class="price-box">
          <div class="cart-price">${price}</div>
          <div class="cart-amt">${price}</div>
        </div>
        <input type="number" value="${qty}" class="cart-quantity">
    </div>
    <ion-icon name="trash" class="cart-remove"></ion-icon>`;
    saveCartToLocalStorage();
    return cartBox;
}


function updateTotal(){
    let cartItems = document.querySelectorAll('.cart-box');
    let totalValue = document.querySelector('.total-price');

    let total = 0;

    cartItems.forEach(prduct=>{
        let priceElement = prduct.querySelector('.cart-price');
        let price = parseFloat(priceElement.innerHTML.trim());
             price = parseFloat(priceElement.innerHTML.replace(/[^\d.]/g, ''));
        let qty = prduct.querySelector('.cart-quantity').value;
        let cartamt = prduct.querySelector('.cart-amt');

        total +=(price*qty);
        cartamt.innerHTML = "Rs." + price*qty;
    });

    totalValue.innerHTML = "Rs." + total;

    // Add Product Count in Cart Icon
    let cartCount = document.querySelector('.product-count');
    let count = itemList.length;
    cartCount.innerHTML = count;

    if(count == 0){
        cartCount.style.display = "none";
    }
    else{
        cartCount.style.display = "inline";
    }
    
    saveCartToLocalStorage();
}

function saveCartToLocalStorage() {
    localStorage.setItem("CategoryCart", JSON.stringify(itemList));
    localStorage.setItem("CategoryWish",JSON.stringify(wishList));
}

// Place Order Functionality

function PlaceOrder(){
  const placeOrderBtn = document.getElementById("place-order-btn");
    const popup = document.getElementById("order-popup");
    const closePopupBtn = document.getElementById("close-popup");

    if (!placeOrderBtn || !popup || !closePopupBtn) {
        console.error("PlaceOrder elements not found in DOM.");
        return;
    }

    placeOrderBtn.addEventListener("click", () => {
        popup.style.display = "flex";
        itemList = [];
        document.querySelector('.cart-content').innerHTML = '';
        updateTotal();
        saveCartToLocalStorage();
    });

    closePopupBtn.addEventListener("click", () => {
        popup.style.display = "none";
    });

    popup.addEventListener("click", (event) => {
        if (event.target === popup) {
            popup.style.display = "none";
        }
    });
}