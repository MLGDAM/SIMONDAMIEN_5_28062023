fetch("http://localhost:3000/api/products") // Appel  API
  .then(function (reponse) {
    // Promesse
    if (reponse.ok) {
      return reponse.json(); // C'est ok donc on peut traiter le fichier
    }
  })
  .then(function (products) {
    //
    creationArticleKanap(products); // On appelle une fonction pour traiter les données
    console.log(products); // Visualisation des données reçues ( fichier json)
  })
  .catch(function (error) {
    // bloc erreur
  });

function creationArticleKanap(products) {
  for (let i = 0; i < products.length; i++) {
    //on crée une boucle à l'intérieur de la fonction

    let items = document.getElementById("items"); // retourne  l'element HTMLElement à partir de son identifiant, défini dans la propriété id de la balise de l'objet " items"

    // Création des elements
    let a = document.createElement("a");
    items.appendChild(a).href = `product.html?id=${products[i]._id}`;

    let article = document.createElement("Article");
    a.appendChild(article);

    let img = document.createElement("img");
    img.setAttribute("src", products[i].imageUrl);
    img.setAttribute("alt", products[i].altTxt);
    article.appendChild(img);

    let h3 = document.createElement("h3");
    h3.classList.add("productName");
    h3.textContent = products[i].name;
    article.appendChild(h3);

    let p = document.createElement("p");
    p.classList.add("productDescription");
    p.textContent = products[i].description;
    article.appendChild(p);
  }
}
