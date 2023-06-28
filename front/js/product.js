


    function getArticleId() {
      return new URL(location.href).searchParams.get("id")
    }
  
    const id = getArticleId()
    console.log(id)
  
  
    fetch(`http://localhost:3000/api/products/${id}`)
  
      .then(function (reponse) { // Promesse
        if (reponse.ok) {
          return reponse.json(); // C'est ok donc on peut traiter le fichier
        }
      })
      .then(function (products) {
        displayProduct(products); // On appelle une fonction pour traiter les données
        console.log(products)   // Visualisation des données reçues (ton fichier json)
      })
      .catch(function (error) {
        // bloc erreur
      });
  
  
    function displayProduct(value) {
      document.getElementById('title').textContent = value.name;
      document.getElementById('price').textContent = value.price;
      document.getElementById('description').textContent = value.description;
  
      const productImg = document.createElement("img");
      document.querySelector(".item__img").appendChild(productImg);
      productImg.src = value.imageUrl;
      productImg.alt = value.altTxt;
  
  
      //Boucle pour les couleurs disponibles du produit
      for (color of value.colors) {
        const productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
        productColors.innerHTML = color;
      }
  
      addToCart();
    }
  
  
    //---------------Gestion du panier --------------//
  
    function addToCart() {
  
      const addBtn = document.getElementById("addToCart");
      console.log(addBtn)
      const quantity = document.getElementById("quantity");
      const colors = document.getElementById("colors");
      console.log(colors)
  
  
      addBtn.addEventListener("click", (event) => { //
        if (colors.value !== "" && quantity.value != 0 && quantity.value <= 100) {
          let produitData = {
            _id: id,
            colors: colors.value,
            quantity: quantity.value
          };
          console.log(produitData)
  
  
          // --------------------------------------------LOCAL STORAGE---------------------------------------//
  
          // Déclaration de la variable "productTableau" dans laquelle on met les key et les values qui sont dans le local storage //
          let productTableau = JSON.parse(localStorage.getItem("produits"));
          // JSON.parse pour convertir les données au format JSON qui sont dans le local storage en objet javascript//
  
  
          if (productTableau) {
            addLocalStorage(produitData, productTableau);
            alert("Bravo, le produit a été enregistré");
          }
  
          else {
            // s'il n'y a pas de produits enregistrés dans le local storage //
  
            productTableau = []  // alors produit tableau est un tableau vide //
            productTableau.push(produitData);
            localStorage.setItem("produits", JSON.stringify(productTableau));
            console.log(productTableau);
            alert("Bravo, le produit a été enregistré");
          }
        }
  
  
      })
    }
  
  
    // Si le local storage existe //
  
    function addLocalStorage(products, elementsLocalStorage) {
  
  
      for (var i = 0; i < elementsLocalStorage.length; i++) { // <<< standard, on boucle dans le localStorage récupéré
        if (elementsLocalStorage[i]._id === products._id && elementsLocalStorage[i].colors === products.colors) { // <<< Vérif si article et couleurs existantes 
          let QteelementsLocalStorage = parseInt(elementsLocalStorage[i].quantity) + parseInt(products.quantity); // <<< Quantité modifiée
          elementsLocalStorage[i].quantity = QteelementsLocalStorage; // <<< On colle tout ça dans la variable
  
          localStorage.setItem("produits", JSON.stringify(elementsLocalStorage)); // <<< Et on met ça dans le localstorage
          return 1;
        }
      }
      elementsLocalStorage.push(products);
      localStorage.setItem("produits", JSON.stringify(elementsLocalStorage));
    };
  
  
  
