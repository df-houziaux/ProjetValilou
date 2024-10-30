// Récupère les éléments du DOM
const searchInput = document.getElementById('searchInput');
const searchFilter = document.getElementById('searchFilter');
const cartCount = document.getElementById('cartCount');
let cartItems = 0; // Initialiser le nombre d'articles dans le panier
let cartProducts = []; // Tableau pour stocker les produits dans le panier

let productCards = document.querySelectorAll('.flip-card'); // Récupérer les cartes de produits

// Filtrage des produits en fonction de la recherche
searchInput.addEventListener('input', () => filterProducts());
searchFilter.addEventListener('change', () => filterProducts());

function filterProducts() {
    const filterValue = searchInput.value.toLowerCase();
    const filterType = searchFilter.value;

    productCards.forEach(card => {
        const name = card.getAttribute('data-name').toLowerCase();
        const price = card.getAttribute('data-price').toLowerCase();
        const ingredient = card.getAttribute('data-ingredient').toLowerCase();

        let isMatch = false;

        switch (filterType) {
            case 'name':
                isMatch = name.includes(filterValue);
                break;
            case 'price':
                isMatch = price.includes(filterValue);
                break;
            case 'ingredient':
                isMatch = ingredient.includes(filterValue);
                break;
        }

        card.style.display = isMatch ? 'block' : 'none';
    });
}

// Fonction pour attacher l'événement d'ajout au panier
function attachAddToCartEvent() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const removeFromCartButtons = document.querySelectorAll('.remove-from-cart-btn');

    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const card = button.closest('.flip-card');
            const productName = card.getAttribute('data-name');
            const productPrice = parseFloat(card.getAttribute('data-price')); // Récupérer le prix du produit

            // Ajoute le produit au tableau du panier
            if (!cartProducts.some(item => item.name === productName)) {
                cartProducts.push({ name: productName, price: productPrice });
                cartItems++;  // Incrémente le compteur d'articles
                cartCount.textContent = cartItems;  // Met à jour l'affichage du compteur
                alert(`${productName} ajouté au panier !`);  // Message de confirmation

                // Affiche le bouton "Retirer du panier"
                const removeButton = card.querySelector('.remove-from-cart-btn');
                removeButton.style.display = 'block';
            }
        });
    });

    // Gérer le retrait du panier
    removeFromCartButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const card = button.closest('.flip-card');
            const productName = card.getAttribute('data-name');

            // Retire le produit du tableau du panier
            const productIndex = cartProducts.findIndex(item => item.name === productName);
            if (productIndex > -1) {
                cartProducts.splice(productIndex, 1);
                cartItems--;  // Décrémente le compteur d'articles
                cartCount.textContent = cartItems;  // Met à jour l'affichage du compteur
                alert(`${productName} retiré du panier.`);  // Message de confirmation

                // Masque le bouton "Retirer du panier"
                button.style.display = 'none';
            }
        });
    });
}

// Charger la première catégorie par défaut lorsque la page est prête
$(document).ready(function () {
    attachAddToCartEvent(); // Attacher l'événement aux boutons existants
});
