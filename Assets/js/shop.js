

document.addEventListener('DOMContentLoaded', function () {

  const Products = [
      {id:1, name : 'Bark & Beam', price : 800, image : './Assets/images/img25.png', alt : 'img25', color : 'sandal', category : 'classic',},
      {id:2, name : 'CedarStone', price : 500, image : './Assets/images/img22.png', alt : 'img22', color : 'brown', category : 'classic',},
      {id:3, name : 'EcoTimer', price : 500, image : './Assets/images/img33.png', alt : 'img33', color : 'brown', category : 'classic',},
      {id:4, name : 'EverWood', price : 800, image : './Assets/images/img30.png', alt : 'img30', color : 'black', category : 'classic',},
      {id:5, name : 'Forest Edge', price : 700, image : './Assets/images/img52.webp', alt : 'img52', color : 'black', category : 'classic',},
      {id:6, name : 'Grainline Studio', price : 900, image : './Assets/images/img53.webp', alt : 'img53', color : 'brown', category : 'classic',},
      {id:7, name : 'Heritage Hardwood', price : 600, image : './Assets/images/img54.webp', alt : 'img54', color : 'black', category : 'classic',},
      {id:8, name : 'Maple Marvels', price : 1200, image : './Assets/images/img55.webp', alt : 'img55', color : 'brown', category : 'classic',},
      {id:9, name : 'OakHaven', price : 1500, image : './Assets/images/img56.webp', alt : 'img56', color : 'black', category : 'classic',},
      {id:10, name : 'Rustic Luxe', price : 500, image : './Assets/images/img57.webp', alt : 'img57', color : 'sandal', category : 'classic',},
      {id:11, name : 'SolidCraft', price : 1800, image : './Assets/images/img58.webp', alt : 'img58', color : 'black', category : 'classic',},
      {id:12, name : 'Sustainably Yours', price : 2200, image : './Assets/images/img59.webp', alt : 'img59', color : 'sandal', category : 'classic',},

      {id:13, name : 'Wood Luxe', price : 2200, image : './Assets/images/img75.webp', alt : 'img75', color : 'sandal', category : 'asian',},
      {id:14, name : 'Willow Woodworks', price : 2400, image : './Assets/images/img76.webp', alt : 'img76', color : 'brown', category : 'asian',},
      {id:15, name : 'Walnut Wonders', price : 2800, image : './Assets/images/img77.webp', alt : 'img77', color : 'black', category : 'asian',},
      {id:16, name : 'Timer Craft', price : 2200, image : './Assets/images/img51.webp', alt : 'img51', color : 'black', category : 'asian',},
      {id:17, name : 'The Cedar Co', price : 2600, image : './Assets/images/img78.webp', alt : 'img78', color : 'brown', category : 'asian',},
    ];

    // Filter Produts in Shop Page
let fillterSize = document.querySelectorAll('.fillterSize');    
let fillterPrice = document.getElementById('fillterPrice');
let productContainer = document.getElementById('productContainer');
const filterButtons = document.querySelectorAll('.filter-btn');
let selectedCategory = 'all';
let searchInput = document.getElementById('shopSearch');



const allBtn = document.getElementById('allFilter');
if (allBtn) {
  allBtn.addEventListener('click', function () {
    selectedCategory = 'all';
    applyFillter();
  });
}

// Filter Using Color Buttons
fillterSize.forEach(cb => {
  cb.addEventListener('change', applyFillter);
});

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const selectedColor = button.getAttribute('data-color');

    fillterSize.forEach(cb => {
      cb.checked = false;
    });

    if (selectedColor !== 'all') {
      fillterSize.forEach(cb => {
        if (cb.value === selectedColor) {
          cb.checked = true;
        }
      });
    }
    applyFillter();

  });
});

if (fillterPrice) {
    fillterPrice.addEventListener('change', applyFillter);
  }

function applyFillter(){
  let selectedSize = [...fillterSize].filter(cp => cp.checked).map(cp => cp.value);

    let fillProd = Products.filter(product => {
        let matchSize = selectedSize.length ? selectedSize.includes(product.color) : true ;
        let matchCategory = selectedCategory === 'all' ? true : product.category === selectedCategory;

    return matchSize && matchCategory;
    });

    let priceValue = fillterPrice.value;
    if (priceValue === 'low-high') {
        fillProd.sort((a, b) => a.price - b.price);
    } else if (priceValue === 'high-low') {
        fillProd.sort((a, b) => b.price - a.price);
    }
    else if (priceValue === 'a-z'){
        fillProd.sort((a,b) => a.name.localeCompare(b.name));
    }
    else if (priceValue === 'z-a'){
        fillProd.sort((a,b) => b.name.localeCompare(a.name));
    }
    displayProducts(fillProd);


}

// Filter Using Section 

const classicBtn = document.getElementById('classicFilter');
const asianBtn = document.getElementById('asian');
const bestBtn = document.getElementById('best');

if (classicBtn) {
  classicBtn.addEventListener('click', function () {
    selectedCategory = 'classic';
    applyFillter();
  });
}

if (asianBtn) {
  asianBtn.addEventListener('click', function () {
    selectedCategory = 'asian';
    applyFillter();
  });
}

if (bestBtn){
  bestBtn.addEventListener('click', function () {
    let bestProducts = Products.filter(product => product.price >= 1000);
    displayProducts(bestProducts);
    loadfood();
  });
}

// Display Products in shop Page
function displayProducts(Products){
  if (!productContainer) return;

  productContainer.innerHTML = '';

  if (Products.length === 0){
        productContainer.innerHTML = "<h3>No products found!</h3>";
        return;
    }

  Products.forEach (product => {
    const div = document.createElement('div');
    div.classList.add('showCards', 'text-center', 'mt-3');
    div.setAttribute('data-color', product.color); // ADD
    div.setAttribute('data-price', product.price);

    const originalPrice = product.price + 10;

    div.innerHTML = `
        <div class="imgContainer">
            <img src="${product.image}" alt="${product.alt}" class="img-fluid food-img">
                <div class="cardInner">
                    <h3><span class="me-lg-2 add-cart"><ion-icon name="bag-add-outline" class="cartBag"></ion-icon></span>
                        <span><ion-icon name="heart-outline" class="cartWish"></ion-icon></span></h3>
                </div>
                <div class="overlay"></div>
        </div>
            <p class="Jost20px fw-semibold mt-2 food-title">${product.name}</p>
            <h6 class="color-brown lead">&#8377; <span class="food-price">${product.price}</span> <span class="color-ash"><del>&#8377;${originalPrice}</del></span></h6>
    `;
    productContainer.appendChild(div);
  });
}
    displayProducts(Products);
    ShopSearch();
});    

function ShopSearch(){
  searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const filteredProducts = Products.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );
  });
  displayProducts(filteredProducts);
}

