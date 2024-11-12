document.addEventListener('DOMContentLoaded', function () {
    const cartCount = document.getElementById('cartCount');
    const cartDetailsContainer = document.getElementById('cartDetailsContainer');
    const cartIconLink = document.getElementById('cartIconLink');
    const clearCartBtn = document.getElementById('clearCartBtn');
    let cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];

    if (!Array.isArray(cartProducts)) {
        cartProducts = [];
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    }

    function updateCartCount() {
        const totalItems = cartProducts.reduce((sum, item) => sum + (item.quantity || 0), 0);
        cartCount.textContent = totalItems;
    }

    function updateCartTotal() {
        let totalPrice = 0;
        cartProducts.forEach(item => {
            totalPrice += item.price * item.quantity;
        });

        const cartTotalElement = document.getElementById('cartTotal');
        if (cartTotalElement) {
            cartTotalElement.textContent = `${totalPrice.toFixed(2)} €`;
        }
    }

    function showCartDetails() {
        const cartItemsList = document.getElementById('cartItemsList');
        if (!cartItemsList) {
            console.error('cartItemsList non trouvé');
            return;
        }

        cartItemsList.innerHTML = '';

        cartProducts.forEach((product) => {
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

        if (cartProducts.length > 0) {
            cartDetailsContainer.classList.add('show');
        } else {
            cartDetailsContainer.classList.remove('show');
        }

        updateCartTotal();
    }

    function addToCart(productName, productPrice) {
        const existingProduct = cartProducts.find(p => p.name === productName);

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cartProducts.push({ name: productName, price: productPrice, quantity: 1 });
        }

        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
        updateCartCount();
        updateCartTotal();
        showCartDetails();
    }

    function removeFromCart(productName) {
        cartProducts = cartProducts.filter(product => product.name !== productName);

        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
        updateCartCount();
        updateCartTotal();
        showCartDetails();
    }

    const cartItemsList = document.getElementById('cartItemsList');
    if (cartItemsList) {
        cartItemsList.addEventListener('click', (event) => {
            const target = event.target;
            const productName = target.getAttribute('data-name');

            if (!productName) {
                console.error('Aucun nom de produit trouvé');
                return;
            }

            const product = cartProducts.find(p => p.name === productName);
            if (!product) {
                console.error('Produit introuvable dans le panier');
                return;
            }

            if (target.classList.contains('remove-item-img')) {
                removeFromCart(productName);
            }

            if (target.classList.contains('increase-quantity')) {
                product.quantity++;
                localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
                updateCartCount();
                updateCartTotal();
                showCartDetails();
            }

            if (target.classList.contains('decrease-quantity')) {
                if (product.quantity > 1) {
                    product.quantity--;
                } else {
                    removeFromCart(productName);
                }
                localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
                updateCartCount();
                updateCartTotal();
                showCartDetails();
            }
        });
    }

    if (cartItemsList) {
        cartItemsList.addEventListener('input', (event) => {
            const target = event.target;

            if (target.classList.contains('quantity-input')) {
                const productName = target.getAttribute('data-name');
                if (!productName) return;

                const newQuantity = parseInt(target.value, 10);
                if (isNaN(newQuantity) || newQuantity < 1) {
                    target.value = 1;
                } else {
                    const product = cartProducts.find(p => p.name === productName);
                    if (product) {
                        product.quantity = newQuantity;
                        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
                        updateCartCount();
                        updateCartTotal();
                        showCartDetails();
                    }
                }
            }
        });
    }

    document.body.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart-btn')) {
            const productName = event.target.getAttribute('data-product-name');
            const productPrice = parseFloat(event.target.getAttribute('data-product-price'));
            addToCart(productName, productPrice);
            alert(`${productName} ajouté au panier !`);
        }
    });

    if (cartIconLink) {
        cartIconLink.addEventListener('click', (event) => {
            event.preventDefault();
            showCartDetails();
        });
    }

    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => {
            cartProducts = [];
            localStorage.removeItem('cartProducts');
            updateCartCount();
            updateCartTotal();
            showCartDetails();
        });
    }

    showCartDetails();
    updateCartCount();
});
