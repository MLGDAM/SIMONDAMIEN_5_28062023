// creation Variable getItem / récupération du LocalStorage
let orderId = localStorage.getItem("orderId");
console.log(orderId);

// récupération du numéro de commande pour l'injecter dans le HTML
let userOrderId = document.getElementById("orderId");
userOrderId.textContent = orderId;

// vidage complet du local Storage
localStorage.clear();