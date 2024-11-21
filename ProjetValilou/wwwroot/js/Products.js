document.addEventListener('DOMContentLoaded', () => {
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
    let cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];

    // Met à jour le compteur du panier
    function updateCartCount() {
        const totalItems = cartProducts.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    // Met à jour le total du panier
    function updateCartTotal() {
        const totalPrice = cartProducts.reduce((sum, item) => sum + item.price * item.quantity, 0);
        cartTotalElement.textContent = `${totalPrice.toFixed(2)} €`;
    }

    // Affiche les détails du panier
    function showCartDetails() {
        cartItemsList.innerHTML = '';

        cartProducts.forEach(product => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="cart-item-name">${product.name}</span>
                <div class="cart-item-controls">
                    <button class="quantity-btn decrease-quantity" data-name="${product.name}">-</button>
                    <input type="number" class="quantity-input" value="${product.quantity}" min="1" data-name="${product.name}" />
                    <button class="quantity-btn increase-quantity" data-name="${product.name}">+</button>
                    <img src="/images/corbeillerouge.jpg" alt="Retirer" class="remove-item-img" data-name="${product.name}" />
                </div>
                <span class="cart-item-price">${(product.price * product.quantity).toFixed(2)} €</span>
            `;
            cartItemsList.appendChild(li);
        });

        cartDetailsContainer.classList.toggle('show', cartProducts.length > 0);
        updateCartTotal();
    }

    // Ajoute un produit au panier
    function addToCart(name, price) {
        const existingProduct = cartProducts.find(p => p.name === name);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cartProducts.push({ name, price, quantity: 1 });
        }
        saveCart();
        alert(`${name} ajouté au panier !`);
    }

    // Supprime un produit du panier
    function removeFromCart(name) {
        const index = cartProducts.findIndex(product => product.name === name);
        if (index !== -1) {
            cartProducts.splice(index, 1); // Supprime l'élément
            saveCart();
        }
    }

    // Sauvegarde le panier dans le localStorage
    function saveCart() {
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
        updateCartCount();
        showCartDetails();
    }

    // Gestion des boutons de modification des quantités
    cartItemsList.addEventListener('click', event => {
        const target = event.target;
        const productName = target.getAttribute('data-name');
        const product = cartProducts.find(p => p.name === productName);

        if (!product) return;

        if (target.classList.contains('remove-item-img')) {
            removeFromCart(productName);
        } else if (target.classList.contains('increase-quantity')) {
            product.quantity++;
        } else if (target.classList.contains('decrease-quantity')) {
            product.quantity > 1 ? product.quantity-- : removeFromCart(productName);
        }
        saveCart();
    });

    // Mise à jour des quantités via les champs de saisie
    cartItemsList.addEventListener('input', event => {
        if (event.target.classList.contains('quantity-input')) {
            const productName = event.target.getAttribute('data-name');
            const newQuantity = parseInt(event.target.value, 10);

            if (!isNaN(newQuantity) && newQuantity >= 1) {
                const product = cartProducts.find(p => p.name === productName);
                if (product) {
                    product.quantity = newQuantity;
                    saveCart();
                }
            } else {
                alert("La quantité doit être un nombre valide supérieur ou égal à 1.");
                event.target.value = 1; // Rétablit une valeur valide
            }
        }
    });

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
        }
    });

    // Ajouter un produit depuis les boutons "Ajouter au panier"
    document.body.addEventListener('click', event => {
        if (event.target.classList.contains('add-to-cart-btn')) {
            const name = event.target.getAttribute('data-product-name');
            const price = parseFloat(event.target.getAttribute('data-product-price').replace(',', '.'));

            if (name && !isNaN(price)) {
                addToCart(name, price);
            } else {
                alert("Données de produit invalides.");
            }
        }
    });

    // Redirection vers la page de paiement
    validateOrderBtn.addEventListener('click', () => {
        // Sauvegarder les détails du panier côté serveur
        fetch('/api/cart/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cartProducts)
        })
            .then(response => {
                if (response.ok) {
                    // Redirection vers la page de paiement
                    window.location.href = '/Payment/Payment'; // Assurez-vous que la route soit correcte
                } else {
                    alert('Erreur lors de la sauvegarde du panier.');
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
        const products = Array.from(productContainer.children); // Récupère tous les produits dans le conteneur

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
        productContainer.innerHTML = '';  // Vide le conteneur
        products.forEach(product => {
            productContainer.appendChild(product);  // Ajoute les produits triés
        });
        console.log("Products sorted:", products); // Vérifie les produits triés
    }

    // Appliquer le tri à chaque changement de filtre
    searchFilter.addEventListener('change', () => {
        sortProducts();
        console.log("Filter changed:", searchFilter.value); // Vérifie le type de filtre sélectionné
    });


    // Initialiser les données du panier
    updateCartCount();
    showCartDetails();
});
