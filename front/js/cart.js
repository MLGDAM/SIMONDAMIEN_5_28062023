//Initialisation du local storage
let produitDansLocalStorage = JSON.parse(localStorage.getItem("produits")); //transforme la chaîne JSON ()en un objet JavaScript / etape 1//
// Si le panier est vide
function createBasket(produitDansLocalStorage) {
  // fonction qui va recuperer les elements du local storage
  var cart__items = document.getElementById("cart__items");
  if (produitDansLocalStorage === null) {
    // égalité stricte
    let panierVide = document.createElement("p");
    panierVide.classList.add("panier-vide");
    cart__items.appendChild(panierVide).innerText = "Le panier est vide";

    // Si le panier contient des articles
  } else {
    let produitPanier = [];
    for (let i = 0; i < produitDansLocalStorage.length; i++) {
      // on boucle pour récuperer les informations du local storage

      // Création article
      let article = document.createElement("article");
      article.classList.add("cart__item");
      cart__items.appendChild(article);

      // Création div img
      let divImg = document.createElement("div");
      divImg.classList.add("cart__item__img");
      article.appendChild(divImg);

      // Création div cart item content
      let cartItemContent = document.createElement("div");
      cartItemContent.classList.add("cart__item__content");
      article.appendChild(cartItemContent);

      // Création cart__item__content__titlePrice
      let cartItemContentTitlePrice = document.createElement("div");
      cartItemContentTitlePrice.classList.add(
        "cart__item__content__titlePrice"
      );
      cartItemContent.appendChild(cartItemContentTitlePrice);

      // Création cart__item__content__color
      let cartItemContentColor = document.createElement("div");
      cartItemContentColor.classList.add("cart__item__content__color");
      cartItemContent.appendChild(cartItemContentColor).textContent =
        produitDansLocalStorage[i].colors;

      // Création div cart__item__content__settings
      let cartItemContentSettings = document.createElement("div");
      cartItemContentSettings.classList.add("cart__item__content__settings");
      cartItemContent.appendChild(cartItemContentSettings);

      // Création div class="cart__item__content__settings__quantity
      let cartItemContentSettingsQuantity = document.createElement("div");
      cartItemContentSettingsQuantity.classList.add(
        "cart__item__content__settings__quantity"
      );
      cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);

      // Quantité
      let quantity = document.createElement("p");
      cartItemContentSettingsQuantity.appendChild(quantity).textContent =
        "Qté : ";

      // Insertion de l'input quantité
      let productQuantity = document.createElement("input");
      cartItemContentSettingsQuantity.appendChild(productQuantity);
      productQuantity.value = produitDansLocalStorage[i].quantity;
      productQuantity.className = "itemQuantity";
      productQuantity.setAttribute("type", "number");
      productQuantity.setAttribute("min", "1");
      productQuantity.setAttribute("max", "100");
      productQuantity.setAttribute("name", "itemQuantity");
      // div supprimer
      let cartItemContentSettingsDelete = document.createElement("div");
      cartItemContentSettingsDelete.classList.add(
        "cart__item__content__settings__delete"
      );
      cartItemContentSettings.appendChild(cartItemContentSettingsDelete);

      // deleteItem
      let deleteItem = document.createElement("p");
      deleteItem.classList.add("deleteItem");
      cartItemContentSettingsDelete.appendChild(deleteItem).textContent =
        "Supprimer";

      fetch(
        `http://localhost:3000/api/products/${produitDansLocalStorage[i]._id}`
      ) //Appel de l'API
        .then(function (res) {
          if (res.ok) {
            return res.json();
          }
        })
        .then(function (value) {
          getArticle(value);
        })
        .catch(function (error) {
          // Une erreur est survenue
        });

      //Fonction qui récupere les valeurs dans l'API
      function getArticle(value) {
        //IMG
        let articleImg = document.createElement("img");
        articleImg.classList.add("article-Img");
        //articleImg
        articleImg.src = divImg.appendChild(articleImg).imgContent =
          value.imageUrl;
        //Nom du produit
        let productName = document.createElement("h2");
        cartItemContentTitlePrice.appendChild(productName).textContent =
          value.name;
        //Prix du produit
        let productPrice = document.createElement("p");
        cartItemContentColor.appendChild(productPrice).textContent =
          value.price + " €";
      }
    }
  }
}

createBasket(produitDansLocalStorage);
changeQuantity();
panierTotals();
deleteProduct();

// Fonction pour calculer la quantité totale des produits dans le panier, incluant aussi le prix
function panierTotals() {
  let totalQuantity = 0;
  if (produitDansLocalStorage != null) {
    // Inégalité
    for (let j = 0; j < produitDansLocalStorage.length; j++) {
      totalQuantity += parseInt(produitDansLocalStorage[j].quantity); // Addition des sommes

      // Affichage de la quantité
      let productTotalQuantity = document.getElementById("totalQuantity");
      productTotalQuantity.textContent = totalQuantity;
    }

    // Calcul du prix panier, récupération du prix via les données de l'API

    // Initiatilisation a 0

    let totalPrice = 0;

    for (let k = 0; k < produitDansLocalStorage.length; k++) {
      fetch(
        `http://localhost:3000/api/products/${produitDansLocalStorage[k]._id}`
      ) // Appel données API
        .then(function (res) {
          if (res.ok) {
            return res.json();
          }
        })
        .then(function (value) {
          totalPrices(value);
        })
        .catch(function (error) {
          // Une erreur est survenue
        });

      function totalPrices(value) {
        // Récupération du prix
        console.log(produitDansLocalStorage[k].quantity);
        console.log(value);

        totalPrice = totalPrice += produitDansLocalStorage[k].quantity * value.price;

        // Affichage  du prix

        let productTotalPrice = document.getElementById("totalPrice");
        productTotalPrice.textContent = totalPrice;
      }
    }
  }
}

// Modifier la quantité d'un produit dans le panier

function changeQuantity() {
  let itemQuantity = document.getElementsByClassName("itemQuantity");

  for (let j = 0; j < itemQuantity.length; j++) {
    itemQuantity[j].addEventListener("change", (event) => {
      event.preventDefault(); // Empecher le comportement par défaut de l'élément

      // Copie du tableau produitDansLocalStorage dans newLocalStorage :
      let newLocalStorage = produitDansLocalStorage;

      //On modifie la quantité d'un élément à chaque index [j] du tableau écouté :
      newLocalStorage[j].quantity = itemQuantity[j].value;

      //Mise à jour du local storage :
      localStorage.setItem("produits", JSON.stringify(newLocalStorage));

      panierTotals();
      deleteProduct();
    }); //Fin addeventlistener
  }
}

// Création de la fonction Supprimer

function deleteProduct() {
  const btnSupprimer = document.getElementsByClassName("deleteItem"); // Bouton supprimer
  var articlesLocalStorage = JSON.parse(localStorage.getItem("produits")); // On recupère le localStorage

  for (let j = 0; j < btnSupprimer.length; j++) {
    btnSupprimer[j].addEventListener("click", (event) => {
      var elementSupprimer = articlesLocalStorage.splice(j, 1);
      // Methode splice retire un élément a l'index et le nombre a supprimer 1 soit la ligne
      localStorage.setItem("produits", JSON.stringify(articlesLocalStorage));
      window.location.reload(true);
    });
  }
}

// Création du Formulaire //

function getForm() {
  let form = document.querySelector(".cart__order__form"); // variable qui contient le formulaire //

  // Ecoute de la modification du prénom
  form.firstName.addEventListener("change", function () {
    // Fonction de callback pour réaliser une action
    validFirstName(this); // Appeler la fonction en passant un parametre de l'élément écouté
  });

  // Ecoute de la modification du nom
  form.lastName.addEventListener("change", function () {
    validLastName(this);
  });

  // Ecoute de la modification de l'adresse
  form.address.addEventListener("change", function () {
    validAddress(this);
  });

  // Ecoute de la modification de la ville
  form.city.addEventListener("change", function () {
    validCity(this);
  });

  // Ecoute de la modification de l'email
  form.email.addEventListener("change", function () {
    validEmail(this);
  });

  //Validation du prénom
  const validFirstName = function (inputFirstName) {
    let firstNameRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let firstNameErrorMsg = inputFirstName.nextElementSibling;

    if (firstNameRegExp.test(inputFirstName.value)) {
      firstNameErrorMsg.innerHTML = "";
    } else {
      firstNameErrorMsg.innerHTML =
        "Veuillez indiquez un prénom valide. ex : Marc";
    }
  };

  //Validation du nom
  const validLastName = function (inputLastName) {
    let lastNameRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let lastNameErrorMsg = inputLastName.nextElementSibling;

    if (lastNameRegExp.test(inputLastName.value)) {
      lastNameErrorMsg.innerHTML = "";
    } else {
      lastNameErrorMsg.innerHTML =
        "Veuillez indiquez un nom valide. ex : Dupont";
    }
  };

  //Validation de l'adresse
  const validAddress = function (inputAddress) {
    let addressRegExp = new RegExp(
      "[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"
    );
    let addressErrorMsg = inputAddress.nextElementSibling;

    if (addressRegExp.test(inputAddress.value)) {
      addressErrorMsg.innerHTML = "";
    } else {
      addressErrorMsg.innerHTML =
        "Veuillez indiquez une adresse valide. ex : 15 rue du commerce";
    }
  };

  //Validation de la ville
  const validCity = function (inputCity) {
    let cityRegExp = new RegExp("^[a-zA-Z]+(?:[s-][a-zA-Z]+)*$");
    let cityErrorMsg = inputCity.nextElementSibling;

    if (cityRegExp.test(inputCity.value)) {
      cityErrorMsg.innerHTML = "";
    } else {
      cityErrorMsg.innerHTML =
        "Veuillez indiquez une ville valide. ex : Annecy";
    }
  };

  //Validation de l'email
  const validEmail = function (inputEmail) {
    let emailRegExp = new RegExp(
      "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
    );
    let emailErrorMsg = inputEmail.nextElementSibling;

    if (emailRegExp.test(inputEmail.value)) {
      emailErrorMsg.innerHTML = "";
    } else {
      emailErrorMsg.innerHTML =
        "Veuillez indiquez une email valide. ex : marc@gmail.com";
    }
  };
}
getForm();

function postForm() {
  const order = document.getElementById("order");

  order.addEventListener("click", (event) => {
    event.preventDefault();
    // Si toutes les conditions sont remplies
    if (
      firstName.value !== "" &&
      lastName.value !== "" &&
      address.value !== "" &&
      city.value !== "" &&
      email.value !== ""
    ) {
      //Récupération des données du formulaire dans un objet
      const contact = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value,
      };

      //Création d'un array vide
      let products = [];

      // Création d'une boucle pour récuperer les ID
      for (let i = 0; i < produitDansLocalStorage.length; i++) {
        products.push(produitDansLocalStorage[i]._id);
      }

      // Je mets les valeurs du formulaire et les produits sélectionnés dans un objet.
      const submitData = {
        contact,
        products,
      };

      // Envoi du formulaire et localStorage (sendFormData) au serveur

      const options = {
        method: "POST",
        body: JSON.stringify(submitData),
        headers: {
          "Content-Type": "application/json",
        },
      };

      fetch("http://localhost:3000/api/products/order", options)
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("orderId", data.orderId);
          //Renvoi de l'orderId dans l'URL de la page confirmation
          document.location.href = "confirmation.html?id=" + data.orderId;
        });
    } else {
      // Sinon toutes les conditions ne sont pas remplies alors le formulaire n'est pas validé
      alert(
        "Veuillez remplir le formulaire de contact ou ajouter un article dans votre panier."
      );
    }
  }); // Fin eventListener postForm
} // Fin envoi du formulaire postForm
postForm();
