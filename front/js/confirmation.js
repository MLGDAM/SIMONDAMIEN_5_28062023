// creation Variable orderId / récupération du LocalStorage
let orderId = localStorage.getItem("orderId");

// récupération du numéro de commande pour l'injecter dans le HTML
let userOrderId = document.getElementById("orderId");
userOrderId.textContent = orderId;

// vidage complet du local Storage
localStorage.clear();
