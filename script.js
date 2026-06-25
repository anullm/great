// ======================
// Navbar Scroll
// ======================

const header = document.getElementById("header");

window.addEventListener("scroll",()=>{

    if(window.scrollY>50){

        header.classList.add("scrolled");

    }

    else{

        header.classList.remove("scrolled");

    }

});



// ======================
// Mobile Menu
// ======================

const menu=document.querySelector(".menu-toggle");

const nav=document.querySelector(".nav-links");

menu.addEventListener("click",()=>{

    nav.classList.toggle("active");

});



// ======================
// Fade Animation
// ======================

const hidden=document.querySelectorAll(".hidden");

const observer=new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

});

hidden.forEach(el=>{

    observer.observe(el);

});

/* ================= FILTER ================= */

const filterButtons = document.querySelectorAll(".filters button");

const cards = document.querySelectorAll(".card");

filterButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        filterButtons.forEach(btn=>btn.classList.remove("active"));

        button.classList.add("active");

        const filter = button.dataset.filter;

        cards.forEach(card=>{

            if(filter==="all" || card.dataset.category===filter){

                card.style.display="block";

            }else{

                card.style.display="none";

            }

        });

    });

});
/* ===========================
   PRODUCT DETAIL
=========================== */

const params = new URLSearchParams(window.location.search);

const id = Number(params.get("id"));

const product = products.find(item => item.id === id);

if(product){

    document.getElementById("productTitle").textContent =
    product.title;

    document.getElementById("productPrice").textContent =
    product.price;

    document.getElementById("productCategory").textContent =
    product.category;

    document.getElementById("productDescription").textContent =
    product.description;

    document.getElementById("productImage").src =
    product.image;

    const featureList =
    document.querySelector(".features");

    featureList.innerHTML="";

    product.features.forEach(feature=>{

        featureList.innerHTML +=

        `<li>✔ ${feature}</li>`;

    });

}