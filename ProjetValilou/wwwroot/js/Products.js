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
                <span class="cart-item-stock">Stock restant: ${product.stock - product.quantity}</span>
            `;
            cartItemsList.appendChild(li);
        });

        cartDetailsContainer.classList.toggle('show', cartProducts.length > 0);
        updateCartTotal();
        updateProductStockDisplay();
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

    // Initialisation
    updateCartCount();
    showCartDetails();
});
