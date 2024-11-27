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
                <span class="cart-item-stock">Stock restant: ${product.stock - product.quantity}</span>
            `;
            cartItemsList.appendChild(li);
        });

        cartDetailsContainer.classList.toggle('show', cartProducts.length > 0);
        updateCartTotal();
        updateProductStockDisplay(); // Mettre à jour la vue des produits
    }

    // Met à jour visuellement le stock des produits
    function updateProductStockDisplay() {
        const productCards = document.querySelectorAll('.product-card');

        productCards.forEach(card => {
            const name = card.getAttribute('data-product-name');
            const stockDisplay = card.querySelector('.product-stock');
            const addToCartBtn = card.querySelector('.add-to-cart-btn');
            const productInCart = cartProducts.find(p => p.name === name);

            const stock = parseInt(card.getAttribute('data-product-stock'), 10);
            const remainingStock = stock - (productInCart ? productInCart.quantity : 0);

            stockDisplay.textContent = remainingStock > 0 ? `Stock restant : ${remainingStock}` : 'Rupture de stock';

            if (remainingStock <= 0) {
                addToCartBtn.disabled = true;
                addToCartBtn.textContent = 'Épuisé';
                addToCartBtn.classList.add('disabled');
            } else {
                addToCartBtn.disabled = false;
                addToCartBtn.textContent = 'Ajouter au panier';
                addToCartBtn.classList.remove('disabled');
            }
        });
    }

    // Ajoute un produit au panier
    function addToCart(name, price, stock) {
        const existingProduct = cartProducts.find(p => p.name === name);

        if (existingProduct) {
            if (existingProduct.quantity >= stock) {
                alert(`Stock épuisé pour le produit ${name}.`);
                return;
            }
            existingProduct.quantity++;
        } else {
            if (stock <= 0) {
                alert(`Stock épuisé pour le produit ${name}.`);
                return;
            }
            cartProducts.push({ name, price, quantity: 1, stock });
        }

        saveCart();
        alert(`${name} ajouté au panier !`);
    }

    // Supprime un produit du panier
    function removeFromCart(name) {
        const index = cartProducts.findIndex(product => product.name === name);
        if (index !== -1) {
            cartProducts.splice(index, 1);
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
            if (product.quantity < product.stock) {
                product.quantity++;
            } else {
                alert(`Stock épuisé pour ${product.name}.`);
            }
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
            const product = cartProducts.find(p => p.name === productName);

            if (!isNaN(newQuantity) && newQuantity >= 1 && product && newQuantity <= product.stock) {
                product.quantity = newQuantity;
                saveCart();
            } else {
                alert(`La quantité doit être valide et ne pas dépasser le stock disponible.`);
                event.target.value = product.quantity;
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
        const searchTerm = searchInput.value.toLowerCase();
        const filterType = searchFilter.value;
        const products = Array.from(productContainer.children);

        // Parcours des produits pour appliquer la recherche et le tri
        products.forEach(product => {
            const name = product.getAttribute('data-name').toLowerCase();
            const ingredient = product.getAttribute('data-ingredient').toLowerCase();

            // Vérifie si le produit correspond à la recherche
            if (filterType === 'name' && name.includes(searchTerm)) {
                product.style.display = '';
            } else if (filterType === 'ingredient' && ingredient.includes(searchTerm)) {
                product.style.display = '';
            } else if (filterType === 'price' && name.includes(searchTerm)) {
                product.style.display = '';
            } else {
                product.style.display = 'none';
            }
        });

        sortProducts();
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
                return priceB - priceA;
            });
        } else if (filterType === 'price-asc') {
            products.sort((a, b) => {
                const priceA = parseFloat(a.getAttribute('data-price'));
                const priceB = parseFloat(b.getAttribute('data-price'));
                return priceA - priceB;
            });
        } else if (filterType === 'name') {
            products.sort((a, b) => {
                const nameA = a.getAttribute('data-name').toLowerCase();
                const nameB = b.getAttribute('data-name').toLowerCase();
                return nameA.localeCompare(nameB);
            });
        } else if (filterType === 'ingredient') {
            products.sort((a, b) => {
                const ingredientA = a.getAttribute('data-ingredient').toLowerCase();
                const ingredientB = b.getAttribute('data-ingredient').toLowerCase();
                return ingredientA.localeCompare(ingredientB);
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
    // Initialiser les données du panier
    updateCartCount();
    showCartDetails();
});
