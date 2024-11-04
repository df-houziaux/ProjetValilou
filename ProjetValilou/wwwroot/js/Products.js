// Récupère les éléments du DOM
const searchInput = document.getElementById('searchInput');
const searchFilter = document.getElementById('searchFilter');
const cartCount = document.getElementById('cartCount');
let cartItems = 0; // Initialiser le nombre d'articles dans le panier
let cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || []; 
let productCards = document.querySelectorAll('.flip-card'); 

// Charger le compteur de produits au démarrage
updateCartCount();

// Filtrage des produits en fonction de la recherche
searchInput.addEventListener('input', () => filterProducts());
searchFilter.addEventListener('change', () => filterProducts());

function filterProducts() {
    const filterValue = searchInput.value.toLowerCase().trim();
    const filterType = searchFilter.value;
    const productArray = Array.from(productCards);

    // Tri des produits en fonction du filtre sélectionné
    if (filterType === 'price-asc') {
        productArray.sort((a, b) => {
            const priceA = parseFloat(a.getAttribute('data-price'));
            const priceB = parseFloat(b.getAttribute('data-price'));
            return priceA - priceB;
        });
    } else if (filterType === 'price-desc') {
        productArray.sort((a, b) => {
            const priceA = parseFloat(a.getAttribute('data-price'));
            const priceB = parseFloat(b.getAttribute('data-price'));
            return priceB - priceA; 
        });
    }

    productArray.forEach(card => {
        const name = card.getAttribute('data-name').toLowerCase();
        const price = parseFloat(card.getAttribute('data-price'));
        const ingredient = card.getAttribute('data-ingredient').toLowerCase();

        let isMatch = false;

        switch (filterType) {
            case 'name':
                isMatch = name.includes(filterValue);
                break;
            case 'price':
                isMatch = price === parseFloat(filterValue); 
                break;
            case 'ingredient':
                isMatch = ingredient.includes(filterValue);
                break;
            case 'price-asc':
            case 'price-desc':
                isMatch = true; 
                break;
        }

        // Affiche ou masque les produits selon le filtre
        card.style.display = isMatch ? 'block' : 'none';
    });

    // Réaffiche les produits triés dans le conteneur
    const container = document.getElementById('product-container');
    container.innerHTML = ""; 
    productArray.forEach(card => {
        if (card.style.display !== 'none') { 
            container.appendChild(card); 
        }
    });
}

// Met à jour le compteur de produits affiché
function updateCartCount() {
    cartItems = cartProducts.reduce((total, product) => {
        if (product.quantity && !isNaN(product.quantity)) {
            return total + product.quantity; 
        }
        return total; 
    }, 0);

    cartCount.textContent = cartItems; 
}

// Gestion des événements pour le panier
function attachAddToCartEvent() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const removeFromCartButtons = document.querySelectorAll('.remove-from-cart-btn');

    addToCartButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const card = button.closest('.flip-card');
            const productName = card.getAttribute('data-name');
            const productPrice = parseFloat(card.getAttribute('data-price'));

            // Rechercher le produit dans le panier et mettre à jour la quantité si nécessaire
            const existingProduct = cartProducts.find(item => item.name === productName);
            if (existingProduct) {
                existingProduct.quantity++;  
            } else {
                cartProducts.push({ name: productName, price: productPrice, quantity: 1 });
            }

            // Met à jour le localStorage
            localStorage.setItem('cartProducts', JSON.stringify(cartProducts));

            // Met à jour l'affichage du compteur d'articles
            updateCartCount();
            alert(`${productName} ajouté au panier !`);

            const removeButton = card.querySelector('.remove-from-cart-btn');
            removeButton.style.display = 'block'; 
        });
    });

    removeFromCartButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const card = button.closest('.flip-card');
            const productName = card.getAttribute('data-name');

            const productIndex = cartProducts.findIndex(item => item.name === productName);
            if (productIndex > -1) {
                const product = cartProducts[productIndex];
                if (product.quantity > 1) {
                    product.quantity--; // Diminue la quantité
                } else {
                    cartProducts.splice(productIndex, 1); 
                    button.style.display = 'none'; 
                }
            }

           
            localStorage.setItem('cartProducts', JSON.stringify(cartProducts));

            updateCartCount(); 
            alert(`${productName} retiré du panier.`);
        });
    });
}

// Chargement initial du panier
$(document).ready(function () {
    attachAddToCartEvent(); 
    updateCartCount();
});
