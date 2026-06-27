// ==========================================
// HEADER
// ==========================================

const header = document.getElementById("header");

if (header) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    });

}

// ==========================================
// ACTIVE NAVIGATION
// ==========================================

const sections =
document.querySelectorAll("section");

const navItems =
document.querySelectorAll(".nav-links a");

if (sections.length && navItems.length) {

    window.addEventListener("scroll", () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
            section.offsetTop - 120;

            const sectionHeight =
            section.offsetHeight;

            if (

                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight

            ) {

                currentSection = section.getAttribute("id");

            }

        });

        navItems.forEach(link => {

            link.classList.remove("active");

            if (

                link.getAttribute("href") ===
                `#${currentSection}`

            ) {

                link.classList.add("active");

            }

        });

    });

}
// ==========================================
// MOBILE MENU
// ==========================================

const menuToggle = document.querySelector(".menu-toggle");

const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });

}

// ==========================================
// RENDER PRODUCTS
// ==========================================

const productsContainer =
document.getElementById("productsContainer");

const filterButtons =
document.querySelectorAll(".filters button");

const searchInput =
document.getElementById("searchInput");

let currentFilter = "all";

function renderProducts(productList = products) {

    if (!productsContainer) return;

    productsContainer.innerHTML = "";

    if (productList.length === 0) {

    productsContainer.innerHTML = `

        <div class="empty-state">

            <h2>🔍</h2>

            <h3>Produk tidak ditemukan</h3>

            <p>

                Coba gunakan kata kunci lain
                atau pilih kategori berbeda.

            </p>

        </div>

    `;

    return;

}

    productList.forEach(product => {

        productsContainer.innerHTML += `

        <div class="card fade-up">

            <img
            src="${product.image}"
            alt="${product.title}">

            <div class="card-body">

                <span class="badge">

                    ${product.category}

                </span>

                <h3>

                    ${product.title}

                </h3>

                <p>

                    ${product.description}

                </p>

                <strong>

                    ${product.price}

                </strong>

                <div class="button-group">

                    <a
                    href="product.html?id=${product.id}"
                    class="detail-btn">

                        Detail

                    </a>

                    <a
                    href="#payment"
                    class="buy-btn">

                        Beli

                    </a>

                </div>

            </div>

        </div>

        `;

    });

}

// ==========================================
// FILTER & SEARCH
// ==========================================

function filterProducts() {

    let filteredProducts = products;

    if (currentFilter !== "all") {

        filteredProducts = filteredProducts.filter(product =>
            product.category === currentFilter
        );

    }

    const keyword =
    searchInput.value.toLowerCase();

    filteredProducts = filteredProducts.filter(product =>

        product.title.toLowerCase().includes(keyword) ||

        product.description.toLowerCase().includes(keyword)

    );

    renderProducts(filteredProducts);

}

// ==========================================
// FILTER PRODUCTS
// ==========================================

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const category =
        button.dataset.filter;

        currentFilter = category;

        filterProducts();
    });

});

// ==========================================
// LIVE SEARCH
// ==========================================

if (searchInput) {

    searchInput.addEventListener("input", () => {

        filterProducts();

    });

}

console.log("script jalan");
renderProducts();

// ==========================================
// PRODUCT DETAIL
// ==========================================

const productImage =
document.getElementById("productImage");

if (productImage) {

    const params =
    new URLSearchParams(window.location.search);

    const productId =
    Number(params.get("id"));

    console.log(productId);

    const product =
    products.find(item => item.id === productId);

    console.log(product);

    if (product) {

    document.getElementById("productImage").src =
    product.image;

    document.getElementById("productImage").alt =
    product.title;

    document.getElementById("productCategory").textContent =
    product.category;

    document.getElementById("productTitle").textContent =
    product.title;

    document.getElementById("productPrice").textContent =
    product.price;

    document.getElementById("productDescription").textContent =
    product.description;

    const featuresList =
    document.getElementById("productFeatures");

    featuresList.innerHTML = "";

    product.features.forEach(feature => {

        featuresList.innerHTML += `

            <li>${feature}</li>

        `;

    });

}

// ==========================================
// SCROLL ANIMATION
// ==========================================

const observer =
new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.15
});

document.querySelectorAll(".fade-up")
.forEach(item=>{

    observer.observe(item);

});

}

