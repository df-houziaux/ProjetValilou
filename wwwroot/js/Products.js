// Éléments DOM
const cartCount = document.getElementById('cartCount');
const cartDetailsContainer = document.getElementById('cartDetailsContainer');
const cartIconLink = document.getElementById('cartIconLink');
const clearCartBtn = document.getElementById('clearCartBtn');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartItemsList = document.getElementById('cartItemsList');
const cartTotalElement = document.getElementById('cartTotal');
const validateOrderBtn = document.getElementById('validateOrderBtn');
const productContainer = document.getElementById('product-container');
const searchInput = document.getElementById('searchInput');
const searchFilter = document.getElementById('searchFilter');
const showPriceBtn = document.getElementById('showPriceBtn');

// Récupération des produits du panier depuis localStorage
let cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];

// Met à jour le compteur du panier
function updateCartCount() {
    const cartCountValue = cartProducts.reduce((sum, product) => sum + product.quantity, 0);
    cartCount.textContent = cartCountValue;
}

// Affiche les détails du panier
function showCartDetails() {
    cartItemsList.innerHTML = ''; 
    cartProducts.forEach(product => {
        const listItem = document.createElement('li');
        const stockMessage = product.quantity < product.stock ? '' : ' (Stock épuisé)';

        // Formatage du texte
        listItem.textContent = `${product.name} ${product.quantity} x ${product.price.toFixed(2)} € ${stockMessage}`;

        // Créer un conteneur pour les boutons + et - et le champ de saisie
        const quantityContainer = document.createElement('div');
        quantityContainer.style.display = 'inline-flex';
        quantityContainer.style.alignItems = 'center';
        quantityContainer.style.marginLeft = '15px'; 

        // Bouton pour diminuer la quantité
        const decreaseBtn = document.createElement('button');
        decreaseBtn.textContent = '-';
        decreaseBtn.style.marginRight = '15px'; 

        decreaseBtn.onclick = () => {
            if (product.quantity > 1) {
                product.quantity--;
                saveCart();
                showCartDetails(); 
            }
        };

        // Champ de saisie pour la quantité
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = product.quantity;
        quantityInput.min = 1;
        quantityInput.max = 999;
        quantityInput.style.width = '50px'; 
        quantityInput.style.marginRight = '15px'; 

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
            showCartDetails(); 
        };

        // Bouton pour augmenter la quantité
        const increaseBtn = document.createElement('button');
        increaseBtn.textContent = '+';
        increaseBtn.style.marginLeft = '15px';

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

    // Afficher ou masquer le conteneur du panier selon le contenu
    cartDetailsContainer.classList.toggle('show', cartProducts.length > 0);
    updateCartTotal(); 
    updateProductStockDisplay(); 
}

// Met à jour visuellement le stock des produits
function updateProductStockDisplay() {
    const products = Array.from(productContainer.children);

    products.forEach(product => {
        // Vérifiez si l'élément est défini
        if (product) {
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
        } else {
            console.warn('Un produit est indéfini dans le conteneur.');
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
    showCartDetails(); 
    updateCartTotal(); 
    alert(`${name} ajouté au panier !`);
}

// Supprime un produit du panier
function removeFromCart(name) {
    const index = cartProducts.findIndex(product => product.name === name);
    if (index !== -1) {
        cartProducts.splice(index, 1);
        saveCart();
        showCartDetails(); 
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
    showCartDetails();
});
closeCartBtn.addEventListener('click', () => {
    cartDetailsContainer.classList.remove('show');
});

// Vider le panier
clearCartBtn.addEventListener('click', () => {
    if (confirm("Êtes-vous sûr de vouloir vider le panier ?")) {
        cartProducts = [];
        saveCart();
        showCartDetails(); 
    }
});

// Ajouter un produit depuis les boutons "Ajouter au panier"
document.body.addEventListener('click', event => {
    if (event.target.classList.contains('add-to-cart-btn')) {
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
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();  // Récupère la valeur de la recherche (minuscule)
    const filterType = searchFilter.value;  // Filtre de tri actuel (nom, ingrédient, prix)
    const products = Array.from(productContainer.children);  // Récupère tous les produits dans le conteneur

    // Parcours des produits pour appliquer la recherche et le tri
    products.forEach(product => {
        const name = product.getAttribute('data-name').toLowerCase();  // Récupère le nom du produit
        const ingredient = product.getAttribute('data-ingredient').toLowerCase();  // Récupère les ingrédients du produit

        // Vérifie si le produit correspond à la recherche
        if (filterType === 'name' && name.includes(searchTerm)) {
            product.style.display = '';  // Affiche le produit s'il correspond
        } else if (filterType === 'ingredient' && ingredient.includes(searchTerm)) {
            product.style.display = '';  // Affiche le produit s'il correspond
        } else if (filterType === 'price' && name.includes(searchTerm)) {
            product.style.display = '';  // Affiche le produit s'il correspond
        } else {
            product.style.display = 'none';  // Cache le produit s'il ne correspond pas
        }
    });

    sortProducts();  // Applique le tri après la recherche
});

// Fonction de tri des produits
function sortProducts() {
    const filterType = searchFilter.value;
    const products = Array.from(productContainer.children); 

    // Tri des produits en fonction du critère sélectionné
    if (filterType === 'price-desc') {
        products.sort((a, b) => {
            const priceA = parseFloat(a.getAttribute('data-price'));
            const priceB = parseFloat(b.getAttribute('data-price'));
            return priceB - priceA;  // Tri décroissant
        });
    } else if (filterType === 'price-asc') {
        products.sort((a, b) => {
            const priceA = parseFloat(a.getAttribute('data-price'));
            const priceB = parseFloat(b.getAttribute('data-price'));
            return priceA - priceB;  // Tri croissant
        });
    } else if (filterType === 'name') {
        products.sort((a, b) => {
            const nameA = a.getAttribute('data-name').toLowerCase();
            const nameB = b.getAttribute('data-name').toLowerCase();
            return nameA.localeCompare(nameB); // Tri par ordre alphabétique
        });
    } else if (filterType === 'ingredient') {
        products.sort((a, b) => {
            const ingredientA = a.getAttribute('data-ingredient').toLowerCase();
            const ingredientB = b.getAttribute('data-ingredient').toLowerCase();
            return ingredientA.localeCompare(ingredientB); // Tri par ingrédient
        });
    }

    // Réafficher les produits triés dans le conteneur
    productContainer.innerHTML = '';  
    products.forEach(product => {
        productContainer.appendChild(product);  
    });
    console.log("Products sorted:", products); 
}

// Appliquer le tri à chaque changement de filtre
searchFilter.addEventListener('change', () => {
    sortProducts();
    console.log("Filter changed:", searchFilter.value); 
});





// Initialisation
updateCartCount();
showCartDetails(); 
