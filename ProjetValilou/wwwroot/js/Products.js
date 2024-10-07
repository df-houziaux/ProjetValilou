// Fonction pour charger les produits via AJAX
function loadCategory(category) {
    $.ajax({
        url: '/Products/Category',  // Appel à l'action du contrôleur
        type: 'GET',
        data: { category: category },  // Envoie la catégorie sélectionnée comme paramètre
        success: function (result) {
            $('#product-container').html(result);  // Injecte la réponse (la vue partielle) dans le conteneur
        },
        error: function (xhr, status, error) {
            console.error('Erreur AJAX: ', status, error);  // Gérer les erreurs éventuelles
            alert('Erreur lors du chargement des produits.');
        }
    });
}
