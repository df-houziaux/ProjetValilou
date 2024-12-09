// Éléments DOM
// Variables liées au panier
const cartCount = document.getElementById('cartCount');
const cartDetailsContainer = document.getElementById('cartDetailsContainer');
const cartIconLink = document.getElementById('cartIconLink');
const clearCartBtn = document.getElementById('clearCartBtn');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartItemsList = document.getElementById('cartItemsList');
const cartTotalElement = document.getElementById('cartTotal');
const validateOrderBtn = document.getElementById('validateOrderBtn');

// Variables liées aux produits et à la recherche
const productContainer = document.getElementById('product-container');
const searchInput = document.getElementById('searchInput');
const searchFilter = document.getElementById('searchFilter');

// Récupération des produits du panier depuis localStorage
let cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];

// Met à jour le compteur du panier
function updateCartCount() {
    const cartCountValue = cartProducts.reduce((sum, product) => sum + product.quantity, 0);
    cartCount.textContent = cartCountValue;
}

// Affiche les détails du panier
function showCartDetails() {
    cartItemsList.innerHTML = ''; // Vider la liste actuelle
    cartProducts.forEach(product => {
        const listItem = document.createElement('li');
        const stockMessage = product.quantity < product.stock ? '' : ' (Stock épuisé)';

        // Formatage du texte
        listItem.textContent = `${product.name} ${product.quantity} x ${product.price.toFixed(2)} € ${stockMessage}`;

        // Créer un conteneur pour les boutons + et - et le champ de saisie
        const quantityContainer = document.createElement('div');
        quantityContainer.style.display = 'inline-flex';
        quantityContainer.style.alignItems = 'center';
        quantityContainer.style.marginLeft = '15px'; // Espacement à gauche

        // Bouton pour diminuer la quantité
        const decreaseBtn = document.createElement('button');
        decreaseBtn.textContent = '-';
        decreaseBtn.style.marginRight = '15px'; // Espace à droite du bouton -

        decreaseBtn.onclick = () => {
            if (product.quantity > 1) {
                product.quantity--;
                saveCart();
                showCartDetails(); // Met à jour l'affichage du panier
            }
        };

        // Champ de saisie pour la quantité
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = product.quantity;
        quantityInput.min = 1;
        quantityInput.max = 999;
        quantityInput.style.width = '50px'; // Largeur du champ de saisie
        quantityInput.style.marginRight = '15px'; // Espace à droite

        // Événement pour mettre à jour la quantité
        quantityInput.onchange = () => {
            let newQuantity = parseInt(quantityInput.value);
            if (newQuantity < 1) newQuantity = 1;
            if (newQuantity > product.stock) {
                alert(`Vous ne pouvez pas commander plus de ${product.stock} unités de ce produit.`);
                newQuantity = product.stock;
            }
            product.quantity = newQuantity;
            saveCart();
            showCartDetails(); // Met à jour l'affichage du panier
        };

        // Bouton pour augmenter la quantité
        const increaseBtn = document.createElement('button');
        increaseBtn.textContent = '+';
        increaseBtn.style.marginLeft = '15px'; // Espace à gauche du bouton +

        increaseBtn.onclick = () => {
            if (product.quantity < product.stock) {
                product.quantity++;
                saveCart();
                showCartDetails();
            } else {
                alert('Stock épuisé pour ce produit.');
            }
        };

        // Ajouter les éléments au conteneur
        quantityContainer.appendChild(decreaseBtn);
        quantityContainer.appendChild(quantityInput);
        quantityContainer.appendChild(increaseBtn);

        // Ajouter le conteneur de quantité et le message au listItem
        listItem.appendChild(quantityContainer);
        cartItemsList.appendChild(listItem);
    });
    cartDetailsContainer.classList.toggle('show', cartProducts.length > 0);
    updateCartTotal(); // Mettre à jour le total
    updateProductStockDisplay(); // Mettre à jour la vue des produits
}

// Met à jour visuellement le stock des produits
function updateProductStockDisplay() {
    const products = Array.from(productContainer.children);

    products.forEach(product => {
        const name = product.getAttribute('data-name');
        const stock = parseInt(product.getAttribute('data-stock'), 10);
        const cartProduct = cartProducts.find(p => p.name === name);
        const quantityInCart = cartProduct ? cartProduct.quantity : 0;

        // Affiche le stock disponible
        const stockDisplay = product.querySelector('.card-stock');
        if (stockDisplay) {
            if (stock <= 0) {
                stockDisplay.innerHTML = '<span style="color: red;">Épuisé</span>';
            } else if (quantityInCart >= stock) {
                stockDisplay.innerHTML = '<span style="color: red;">Rupture de stock</span>';
            } else {
                stockDisplay.innerHTML = `${stock - quantityInCart} en stock`;
            }
        }
    });
}

// Met à jour le total du panier
function updateCartTotal() {
    const total = cartProducts.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    cartTotalElement.textContent = `${total.toFixed(2)} €`;
}

// Ajoute un produit au panier
function addToCart(name, price, stock) {
    const product = cartProducts.find(p => p.name === name);
    if (product) {
        if (product.quantity < stock) {
            product.quantity++;
        } else {
            alert('Stock épuisé pour ce produit.');
        }
    } else {
        cartProducts.push({ name, price, quantity: 1, stock });
    }
    saveCart();
    showCartDetails(); // Met à jour l'affichage du panier
    updateCartTotal(); // Met à jour le total
    alert(`${name} ajouté au panier !`);
}

// Supprime un produit du panier
function removeFromCart(name) {
    const index = cartProducts.findIndex(product => product.name === name);
    if (index !== -1) {
        cartProducts.splice(index, 1);
        saveCart();
        showCartDetails(); // Met à jour l'affichage du panier après suppression
    }
}

// Sauvegarde le panier dans le localStorage
function saveCart() {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    updateCartCount();
}

// Gère l'affichage/fermeture du panier
cartIconLink.addEventListener('click', event => {
    event.preventDefault();
    showCartDetails(); // Affiche les détails du panier
});
closeCartBtn.addEventListener('click', () => {
    cartDetailsContainer.classList.remove('show');
});

// Vider le panier
clearCartBtn.addEventListener('click', () => {
    if (confirm("Êtes-vous sûr de vouloir vider le panier ?")) {
        cartProducts = [];
        saveCart();
        showCartDetails(); // Met à jour l'affichage du panier après vidage
    }
});

// Ajouter un produit depuis les boutons "Ajouter au panier"
document.body.addEventListener('click', event => {
    if (event.target.classList.contains('add-to-cart-btn')) {
        console.log("Bouton 'Ajouter au panier' cliqué");
        const name = event.target.getAttribute('data-product-name');
        const price = parseFloat(event.target.getAttribute('data-product-price').replace(',', '.'));
        const stock = parseInt(event.target.getAttribute('data-product-stock'), 10);
        if (name && !isNaN(price) && !isNaN(stock)) {
            addToCart(name, price, stock);
        } else {
            alert("Données de produit invalides.");
        }
    }
});

// Valider la commande
validateOrderBtn.addEventListener('click', () => {
    const outOfStock = cartProducts.some(product => product.quantity > product.stock);
    if (outOfStock) {
        alert('Votre commande contient des articles en rupture de stock. Veuillez ajuster votre panier.');
        return;
    }
    fetch('/api/cart/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cartProducts)
    })
        .then(response => {
            if (response.ok) {
                alert('Commande validée ! Stock mis à jour.');
                window.location.href = '/Payment/Payment';
            } else {
                alert('Erreur lors de la validation de la commande.');
            }
        })
        .catch(() => {
            alert('Impossible de contacter le serveur.');
        });
});

// Fonction de recherche et filtrage des produits
$(document).ready(function () {
    const searchInput = $('#searchInput');
    const productContainer = $('#product-container');

    // Supposons que vous avez une liste de tous les produits disponibles
    const allProducts = Array.from(productContainer.children);

    searchInput.on('input', function () {
        const searchTerm = searchInput.val().toLowerCase();

        // Filtrer tous les produits par nom et ingrédients
        const filteredProducts = allProducts.filter(product => {
            const name = product.getAttribute('data-name').toLowerCase();
            const ingredients = product.getAttribute('data-ingredient').toLowerCase();
            return name.includes(searchTerm) || ingredients.includes(searchTerm);
        });

        // Afficher ou masquer les produits
        allProducts.forEach(product => product.style.display = 'none'); // Masquer tous les produits
        filteredProducts.forEach(product => product.style.display = 'block'); // Afficher les produits filtrés
    });
});

// Fonction de tri des produits
function sortProducts() {
    const products = Array.from(productContainer.children);
    products.sort((a, b) => {
        const priceA = parseFloat(a.getAttribute('data-price'));
        const priceB = parseFloat(b.getAttribute('data-price'));
        return priceA - priceB; // Tri croissant par prix
    });
    // Réajoute les produits triés dans le conteneur
    productContainer.innerHTML = ''; // Vider le conteneur avant d'ajouter les produits triés
    products.forEach(product => {
        productContainer.appendChild(product);
    });
    console.log("Produits triés :", products);
}

// Appliquer le tri à chaque changement de filtre
searchFilter.addEventListener('change', () => {
    sortProducts();
    console.log("Filtre changé :", searchFilter.value);
});
