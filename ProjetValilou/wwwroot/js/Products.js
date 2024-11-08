const cartCount = document.getElementById('cartCount');
const cartDetailsContainer = document.getElementById('cartDetailsContainer');
const cartIconLink = document.getElementById('cartIconLink');
const clearCartBtn = document.getElementById('clearCartBtn');
let cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];

// Mise à jour du compteur du panier
function updateCartCount() {
    const totalItems = cartProducts.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Affichage des détails du panier avec boutons + et -
function showCartDetails() {
    const cartItemsList = document.getElementById('cartItemsList');
    cartItemsList.innerHTML = ''; // Réinitialise la liste du panier

    cartProducts.forEach((product) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="cart-item-name">${product.name}</span>
            <div class="cart-item-controls">
                <button class="quantity-btn decrease-quantity" data-name="${product.name}">-</button>
                <input type="number" class="quantity-input" value="${product.quantity}" min="1" />
                <button class="quantity-btn increase-quantity" data-name="${product.name}">+</button>
                <button class="remove-item-btn" data-name="${product.name}">
                    <img src="/images/corbeillerouge.jpg" alt="Retirer" class="remove-item-img"/>
                </button>
            </div>
            <span class="cart-item-price">${product.price} €</span>
        `;
        cartItemsList.appendChild(li);
    });

    // Afficher le panier seulement s'il y a des produits
    if (cartProducts.length > 0) {
        cartDetailsContainer.classList.add('show');
    } else {
        cartDetailsContainer.classList.remove('show');
    }
}

// Fonction pour gérer l'ajout d'articles au panier
function addToCart(productName, productPrice) {
    const existingProduct = cartProducts.find(p => p.name === productName);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cartProducts.push({ name: productName, price: productPrice, quantity: 1 });
    }
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    updateCartCount();
}

// Fonction pour supprimer un article du panier
function removeFromCart(productName) {
    cartProducts = cartProducts.filter(product => product.name !== productName);
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    updateCartCount();
    showCartDetails();
}

// Gestion des boutons + et - pour ajuster la quantité
document.getElementById('cartItemsList').addEventListener('click', (event) => {
    const productName = event.target.getAttribute('data-name');

    if (event.target.classList.contains('increase-quantity')) {
        const product = cartProducts.find(p => p.name === productName);
        product.quantity++;
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
        updateCartCount();
        showCartDetails();
    }

    if (event.target.classList.contains('decrease-quantity')) {
        const product = cartProducts.find(p => p.name === productName);
        if (product.quantity > 1) {
            product.quantity--;
        } else {
            removeFromCart(productName);
        }
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
        updateCartCount();
        showCartDetails();
    }

    if (event.target.classList.contains('remove-item-btn') || event.target.closest('.remove-item-btn')) {
        removeFromCart(productName);
    }
});

// Événements pour ajouter au panier
document.body.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart-btn')) {
        const productName = event.target.getAttribute('data-product-name');
        const productPrice = parseFloat(event.target.getAttribute('data-product-price'));
        addToCart(productName, productPrice);
        alert(`${productName} ajouté au panier !`);
    }
});

cartIconLink.addEventListener('click', showCartDetails);
clearCartBtn.addEventListener('click', () => {
    cartProducts = [];
    localStorage.removeItem('cartProducts');
    updateCartCount();
    showCartDetails();
});

updateCartCount();
