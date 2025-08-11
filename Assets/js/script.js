
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

    ];

    SearchBar();
    SwiperSection();  
    SwiperBlogSection();
    SwiperNewArr();
    SwiperAboutSection();
    displayProducts(Products);
    searchIndex();
    BlogSearch();
});

let productContainer = document.getElementById('IndexContainer');

function displayProducts(Products){
  if (!productContainer) return;

  productContainer.innerHTML = '';

  if (Products.length === 0){
        productContainer.innerHTML = "<h3>No products found!</h3>";
        return;
    }

  Products.forEach (product => {
    const div = document.createElement('div');
    div.classList.add('showCards', 'text-center', 'swiper-slide');
    div.setAttribute('data-color', product.color); // ADD
    div.setAttribute('data-price', product.price);
    div.setAttribute('data-title', product.name);

    const originalPrice = product.price + 10;

    div.innerHTML = `
        <div class="imgContainer">
            <img src="${product.image}" alt="${product.alt}" class="img-fluid food-img">
                <div class="cardInner">
                    <h3><span class="me-lg-2 " data-id="${product.id}"><ion-icon name="bag-add-outline" class="cartBag add-cart"></ion-icon></span>
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
    

// SearchBar Functionality
    // SearchBar Display Functionality
function SearchBar(){
    let navFirstUl = document.getElementById('navFirstUl');
    let SearchBar = document.getElementById('SearchBar');
    let searchClose = document.getElementById('searchClose');
    let SearchIcon = document.getElementById('SearchIcon');
    
    SearchIcon.addEventListener('click', function(){
        navFirstUl.style.display = 'none';
        SearchBar.style.display = 'inline-block';
    });
    searchClose.addEventListener('click',function(){
        navFirstUl.style.display = 'flex';
        SearchBar.style.display = 'none';
    });
}

// Banner Curosel

function rollCurosel(){
    const BannerRowOne = document.getElementById('BannerRowOne');
    const BannerRowTwo = document.getElementById('BannerRowTwo');

    const isRowOneVisible = window.getComputedStyle(BannerRowOne).display !== 'none';
    
    if (BannerRowOne.classList.contains('activeBanner')) {
        BannerRowOne.classList.remove('activeBanner');
        BannerRowTwo.classList.add('activeBanner');
    } else {
        BannerRowTwo.classList.remove('activeBanner');
        BannerRowOne.classList.add('activeBanner');
    }
}

// Banner Arrow

window.addEventListener('scroll', function () {
    const leftArrow = document.querySelector('.leftArr');
    const rightArrow = document.querySelector('.RightArr');

    if (window.scrollY > 200) {
        leftArrow.style.display = 'none';
        rightArrow.style.display = 'none';
    } else {
        leftArrow.style.display = 'block';
        rightArrow.style.display = 'block';
    }
});

function SwiperSection(){
    // Swiper Section Caurosel

        var swiper = new Swiper(".mySwiper", {
        slidesPerView: 3,           // Show 3 slides at once
        spaceBetween: 30,           // Space between slides
        loop: false,                // Don't loop (optional)
        pagination: {
        el: ".swiper-pagination",
        clickable: true
        },
        // autoplay: is NOT included
        // navigation: is NOT included

         breakpoints: {
    // when window width is >= 0px (default for mobile)
    0: {
      slidesPerView: 1
    },
    // when window width is >= 576px (small screens)
    576: {
      slidesPerView: 2
    },
    // when window width is >= 768px (tablets)
    768: {
      slidesPerView: 2, // Medium tablets (fix)
    },
    992: {
      slidesPerView: 3, // Desktops
    }
    }
    });
}

function SwiperBlogSection(){
    // Swiper Section Caurosel

        var swiper = new Swiper(".myBlogSwiper", {
        slidesPerView: 4,           // Show 3 slides at once
        spaceBetween: 20,           // Space between slides
        loop: false,                // Don't loop (optional)
        pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true
        },
        // autoplay: is NOT included
        // navigation: is NOT included

         breakpoints: {
    // when window width is >= 0px (default for mobile)
    0: {
      slidesPerView: 1
    },
    // when window width is >= 576px (small screens)
    576: {
      slidesPerView: 2
    },
    // when window width is >= 768px (tablets)
    768: {
      slidesPerView: 2, // Medium tablets (fix)
    },
    992: {
      slidesPerView: 3, // Desktops
    },
    1200: {
        slidesPerView: 4, // Large desktops (optional)
      }
    }
    });
}

function SwiperNewArr(){
    // Swiper Section Caurosel

        var swiper = new Swiper(".myNewArrSwiper", {
        slidesPerView: 4,           // Show 3 slides at once
        spaceBetween: 20,           // Space between slides
        loop: false,                // Don't loop (optional)
        pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true
        },
        // autoplay: is NOT included
        // navigation: is NOT included

         breakpoints: {
    // when window width is >= 0px (default for mobile)
    0: {
      slidesPerView: 1
    },
    // when window width is >= 576px (small screens)
    576: {
      slidesPerView: 2
    },
    // when window width is >= 768px (tablets)
    768: {
      slidesPerView: 2, // Medium tablets (fix)
    },
    992: {
      slidesPerView: 3, // Desktops
    },
    1200: {
        slidesPerView: 4, // Large desktops (optional)
      }
    }
    });
}

// Swiper For About Section

function SwiperAboutSection(){
    // Swiper Section Caurosel

        var swiper = new Swiper(".aboutSwiper", {
        slidesPerView: 3,           // Show 3 slides at once
        spaceBetween: 30,           // Space between slides
        loop: false,                // Don't loop (optional)
        pagination: {
        el: ".swiper-pagination",
        clickable: true
        },
        // autoplay: is NOT included
        // navigation: is NOT included

         breakpoints: {
    // when window width is >= 0px (default for mobile)
    0: {
      slidesPerView: 1
    },
    // when window width is >= 576px (small screens)
    576: {
      slidesPerView: 2
    },
    // when window width is >= 768px (tablets)
    768: {
      slidesPerView: 2, // Medium tablets (fix)
    },
    992: {
      slidesPerView: 3, // Desktops
    }
    }
    });
}


// Search Fuctionality for Index Page
function searchIndex(){
    let searchInput = document.getElementById("searchInput");
    if (!searchInput) return; // prevent error if element not found

    searchInput.addEventListener("keyup", function () {
        let filter = this.value.toLowerCase();
        let slides = document.querySelectorAll(".swiper-slide");

        slides.forEach(slide => {
            let title = slide.getAttribute("data-title");
            if (title && title.toLowerCase().includes(filter)) {
                slide.style.display = "";
            } else {
                slide.style.display = "none";
            }
        });
    });
}

// Search Funtionality for Blog Page
function BlogSearch(){
    let searchInput = document.getElementById('BlogSearch');
    let blogSlides = document.querySelectorAll(".blogSlide");

    searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.toLowerCase().trim();

        blogSlides.forEach(slide => {
            const title = slide.querySelector("h5").textContent.toLowerCase();
            const description = slide.querySelector("p.Jost12px")?.textContent.toLowerCase();

            if (title.includes(searchTerm) || (description && description.includes(searchTerm))) {
                slide.style.display = "block";
            } else {
                slide.style.display = "none";
            }
        });
    });
}

