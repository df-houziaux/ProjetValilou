// Sélection des éléments DOM
const searchInput = document.getElementById('searchInput');
const searchFilter = document.getElementById('searchFilter');
const cartCount = document.getElementById('cartCount');
const cartDetailsContainer = document.getElementById('cartDetailsContainer');
const cartIconLink = document.getElementById('cartIconLink');
const clearCartBtn = document.getElementById('clearCartBtn'); 
let cartItems = 0;
let cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
let productCards = document.querySelectorAll('.flip-card');

// Mise à jour initiale du panier
updateCartCount();

// Événements pour la recherche
searchInput.addEventListener('input', filterProducts);
searchFilter.addEventListener('change', filterProducts);

// Mise à jour du compteur d'articles
function updateCartCount() {
    cartItems = cartProducts.reduce((total, product) => total + (product.quantity || 0), 0);
    cartCount.textContent = cartItems;
}

// Fonction pour afficher les détails du panier
function showCartDetails() {
    const cartItemsList = document.getElementById('cartItemsList');
    cartItemsList.innerHTML = ''; 

    cartProducts.forEach((product) => {
        const li = document.createElement('li');
        li.textContent = `${product.name} - ${product.quantity} x ${product.price} €`;
        cartItemsList.appendChild(li);
    });

    // Afficher le conteneur de détails du panier
    cartDetailsContainer.classList.toggle('show');
}

// Fonction pour filtrer les produits
function filterProducts() {
    const filterValue = searchInput.value.toLowerCase().trim();
    const filterType = searchFilter.value;
    const productArray = Array.from(productCards);

    if (filterType === 'price-asc' || filterType === 'price-desc') {
        productArray.sort((a, b) => {
            const priceA = parseFloat(a.getAttribute('data-price'));
            const priceB = parseFloat(b.getAttribute('data-price'));
            return filterType === 'price-asc' ? priceA - priceB : priceB - priceA;
        });
    }

    productArray.forEach(card => {
        const name = card.getAttribute('data-name').toLowerCase();
        const price = parseFloat(card.getAttribute('data-price'));
        const ingredient = card.getAttribute('data-ingredient').toLowerCase();

        let isMatch = filterType === 'name' ? name.includes(filterValue) :
            filterType === 'ingredient' ? ingredient.includes(filterValue) :
                true;

        card.style.display = isMatch ? 'block' : 'none';
    });

    const container = document.getElementById('product-container');
    container.innerHTML = "";
    productArray.forEach(card => {
        if (card.style.display !== 'none') {
            container.appendChild(card);
        }
    });
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

            const existingProduct = cartProducts.find(item => item.name === productName);
            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cartProducts.push({ name: productName, price: productPrice, quantity: 1 });
            }

            localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
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
                    product.quantity--;
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

// Fonction pour vider le panier
function clearCart() {
    cartProducts = [];
    localStorage.removeItem('cartProducts'); 
    updateCartCount();
    showCartDetails(); 
    alert("Le panier a été vidé !");
}

// Événement pour afficher les détails du panier lorsque l'icône du panier est cliquée
cartIconLink.addEventListener('click', showCartDetails);

// Ajouter l'événement pour vider le panier
clearCartBtn.addEventListener('click', clearCart);

// Chargement initial
$(document).ready(function () {
    attachAddToCartEvent();
    updateCartCount();
});
