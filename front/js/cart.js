//Initialisation du local storage
let produitDansLocalStorage = JSON.parse(localStorage.getItem("produits"));
// Si le panier est vide
function createBasket(produitDansLocalStorage) {
  var cart__items = document.getElementById("cart__items");
  if (produitDansLocalStorage === null) { // égalité stricte 
    let panierVide = document.createElement("p");
    panierVide.classList.add("panier-vide");
    cart__items.appendChild(panierVide).innerText = "Le panier est vide";

    // Si le panier contient des articles    
  } else {
    let produitPanier = [];
    for (let i = 0; i < produitDansLocalStorage.length; i++) { // index 0, Condition, incrémentation de l'index

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
      cartItemContentTitlePrice.classList.add("cart__item__content__titlePrice");
      cartItemContent.appendChild(cartItemContentTitlePrice);
      console.log(cartItemContentTitlePrice)

      // Création cart__item__content__color
      let cartItemContentColor = document.createElement("div");
      cartItemContentColor.classList.add("cart__item__content__color");
      cartItemContent.appendChild(cartItemContentColor).textContent = produitDansLocalStorage[i].colors;

      // Création div cart__item__content__settings
      let cartItemContentSettings = document.createElement("div");
      cartItemContentSettings.classList.add("cart__item__content__settings");
      cartItemContent.appendChild(cartItemContentSettings);

      // Création div class="cart__item__content__settings__quantity
      let cartItemContentSettingsQuantity = document.createElement("div");
      cartItemContentSettingsQuantity.classList.add("cart__item__content__settings__quantity")
      cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);

      // Quantité
      let quantity = document.createElement("p");
      cartItemContentSettingsQuantity.appendChild(quantity).textContent = "Qté : ";

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
      cartItemContentSettingsDelete.classList.add("cart__item__content__settings__delete");
      cartItemContentSettings.appendChild(cartItemContentSettingsDelete);

      // deleteItem
      let deleteItem = document.createElement("p");
      deleteItem.classList.add("deleteItem");
      cartItemContentSettingsDelete.appendChild(deleteItem).textContent = "Supprimer";


      fetch(`http://localhost:3000/api/products/${produitDansLocalStorage[i]._id}`)
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
        //articleImg = new Image (300, 150);//
        articleImg.src = divImg.appendChild(articleImg).imgContent = value.imageUrl;
        //Nom du produit
        let productName = document.createElement("h2");
        cartItemContentTitlePrice.appendChild(productName).textContent = value.name;
        //Prix produit
        let productPrice = document.createElement("p")
        cartItemContentColor.appendChild(productPrice).textContent = value.price + " €"
      }
    }
  }
}

createBasket(produitDansLocalStorage);


// total des quantités

let totalQuantity = 0
if (produitDansLocalStorage != null) {
  for (let j = 0; j < produitDansLocalStorage.length; j++) {
    totalQuantity += parseInt(produitDansLocalStorage[j].quantity);
    // affichage de la quantité

    let productTotalQuantity = document.getElementById("totalQuantity")
    productTotalQuantity.textContent = totalQuantity;
  }

  //function changeQuantity() {

    let itemQuantity = document.querySelectorAll(".itemQuantity");
  
  
    for (let j = 0; j < itemQuantity.length; j++) {
      itemQuantity[j].addEventListener("change", (event) => {
        event.preventDefault()

        //Sélection de l'élement selon son id et sa couleur
        let itemNew = produitDansLocalStorage[j].quantity;
        let itemModif = itemQuantity[j].valueAsNumber;
  
        const result = produitDansLocalStorage.find( // recherche dans le localStorage le premier élément qui correspond à (element)
          (element) => element.itemModif !== itemNew); // Comparaison des valeurs de l'élément présent sur itemQuantity avec une inégalité stricte de sa valeur dans le localStorage
  
        result.quantity = itemModif; // le resultat du changement sera defini comme la nouvelle valeur affiché
        produitDansLocalStorage[j].quantity = result.quantity; // la quantité de l'élément dans le localStorage sera égale à notre valeur "result"
  
        localStorage.setItem("produits", JSON.stringify(produitDansLocalStorage));// Réécriture du localStorage, le stringify passe l'objet en chaine de caractere
  
  
      });//fin addeventlistener
    }
// }
// changeQuantity()  

// Calcul du prix panier

  // initiatilisation a 0

  let totalPrice = 0

  for (let k = 0; k < produitDansLocalStorage.length; k++) { // index 0, Condition, incrémentation de l'index

    fetch(`http://localhost:3000/api/products/${produitDansLocalStorage[k]._id}`) // appel données API 
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


      console.log(produitDansLocalStorage[k].quantity)
      console.log(value)
      totalPrice = totalPrice += (produitDansLocalStorage[k].quantity) * (value.price);


      // affichage  du prix

      let productTotalPrice = document.getElementById("totalPrice")
      productTotalPrice.textContent = totalPrice;
      console.log(totalPrice)
      //}
    }
  }
}


// bouton supprimer 
const btnSupprimer = document.getElementsByClassName("deleteItem");
var articlesLocalStorage = JSON.parse(localStorage.getItem("produits")); // <<< on recupère le localStorage

for (let j = 0; j < btnSupprimer.length; j++) {
  btnSupprimer[j].addEventListener("click", (event) => {
    var elementSupprimer = articlesLocalStorage.splice(j, 1); // methode splice retire un élément a l'index et le nombre a supprimer 1 soit la ligne
    localStorage.setItem("produits", JSON.stringify(articlesLocalStorage));
    window.location.reload(true);
  })
}
// Création du Formulaire //

// FORMULAIRE //
//Instauration formulaire avec regex
function getForm() {
  
  let form = document.querySelector(".cart__order__form");

  // Ecoute de la modification du prénom
  form.firstName.addEventListener('change', function () {
    validFirstName(this);
  });

  // Ecoute de la modification du prénom
  form.lastName.addEventListener('change', function () {
    validLastName(this);
  });

  // Ecoute de la modification du prénom
  form.address.addEventListener('change', function () {
    validAddress(this);
  });

  // Ecoute de la modification du prénom
  form.city.addEventListener('change', function () {
    validCity(this);
  });

  // Ecoute de la modification du prénom
  form.email.addEventListener('change', function () {
    validEmail(this);
  });

  //validation du prénom
  const validFirstName = function (inputFirstName) {
    let firstNameRegExp = new RegExp('/^[a-zA-Z0-9]+$/');
    let firstNameErrorMsg = inputFirstName.nextElementSibling;
    

    if (firstNameRegExp.test(inputFirstName.value)) {
      firstNameErrorMsg.innerHTML = '';
    } else {
      firstNameErrorMsg.innerHTML = "Veuillez indiquez un prénom valide. ex : Marc";
    }
  };

  //validation du nom
  const validLastName = function (inputLastName) {
    let lastNameRegExp = new RegExp('/^[a-zA-Z0-9]+$/');
    let lastNameErrorMsg = inputLastName.nextElementSibling;

    if (lastNameRegExp.test(inputLastName.value)) {
      lastNameErrorMsg.innerHTML = '';
    } else {
      lastNameErrorMsg.innerHTML = "Veuillez indiquez un nom valide. ex : Dupont";
    }
  };

  //validation de l'adresse
  const validAddress = function (inputAddress) {
    let addressRegExp = new RegExp('[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+')
    let addressErrorMsg = inputAddress.nextElementSibling;

    if (addressRegExp.test(inputAddress.value)) {
      addressErrorMsg.innerHTML = '';
    } else {
      addressErrorMsg.innerHTML = "Veuillez indiquez une adresse valide. ex : 15 du commerce";
    }
  };

  //validation de la ville
  const validCity = function (inputCity) {
    let cityRegExp = new RegExp('^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$')
    let cityErrorMsg = inputCity.nextElementSibling;

    if (cityRegExp.test(inputCity.value)) {
      cityErrorMsg.innerHTML = '';
    } else {
      cityErrorMsg.innerHTML = "Veuillez indiquez une ville valide. ex : Annecy";
    }
  };

  //validation de l'email
  const validEmail = function (inputEmail) {
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let emailErrorMsg = inputEmail.nextElementSibling;

    if (emailRegExp.test(inputEmail.value)) {
      emailErrorMsg.innerHTML = '';
    } else {
      emailErrorMsg.innerHTML = "Veuillez indiquez une email valide. ex : marc@gmail.com";
    }
  };
}
getForm();

function postForm() {

  const order = document.getElementById('order');

  order.addEventListener('click', (event) => {
    event.preventDefault();
    // Si toutes les conditions sont remplies
     if(firstName.value !== "" && lastName.value !== "" && address.value !== "" && city.value !== "" && email.value !== ""){

    //Récupération des données du formulaire dans un objet
    const contact = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      address: document.getElementById('address').value,
      city: document.getElementById('city').value,
      email: document.getElementById('email').value
    }

    //Création d'un array vide
    let products = [];

    // Création d'une boucle pour récuperer les ID 
    for (let i = 0; i < produitDansLocalStorage.length; i++) {
      products.push(produitDansLocalStorage[i]._id);
    }
    console.log(products);

    // je mets les valeurs du formulaire et les produits sélectionnés
    // dans un objet...
    const submitData = {
      contact,
      products,
    }
 
  
    // Envoi du formulaire et localStorage (sendFormData) au serveur

    const options = {
      method: 'POST',
      body: JSON.stringify(submitData),
      headers: {
        'Content-Type': 'application/json',
      }
    };

    fetch("http://localhost:3000/api/products/order", options)
    .then(response => response.json())
    .then(data => {
    localStorage.setItem('orderId', data.orderId);
    //Renvoi de l'orderId dans l'URL de la page confirmation
    document.location.href = 'confirmation.html?id='+ data.orderId;
  })
   } else {
    // sinon toutes les conditions ne sont pas remplies alors le formulaire n'est pas validé
    alert("Veuillez remplir le formulaire de contact ou ajouter un article dans votre panier.");
  }
}); // fin eventListener postForm
} // fin envoi du formulaire postForm
postForm();
