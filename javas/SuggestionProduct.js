// #region Liste des produits
const produits = [
  {
    nom: "Boucles d'oreilles Delphine",
    image: "../images/pictures/bo Delphine.png",
    prix: "€75,00 EUR",
    lien: "produits/delphine.html"
  },
  {
    nom: "Boucles d'oreilles Elodie",
    image: "../images/pictures/bo Elodie.png",
    prix: "€75,00 EUR",
    lien: "produits/elodie.html"
  },
  {
    nom: "Boucles d’oreilles Iris",
    image: "../images/pictures/bo Iris.png",
    prix: "€75,00 EUR",
    lien: "produits/iris.html"
  },
  {
    nom: "Bracelet Isabelle",
    image: "../images/pictures/b Isabelle.png",
    prix: "€75,00 EUR",
    lien: "produits/isabelle.html"
  },
  {
    nom: "Bracelet Yulia",
    image: "../images/pictures/b Yulia.png",
    prix: "€80,00 EUR",
    lien: "produits/yulia.html"
  },
  {
    nom: "Bracelet Kristy",
    image: "../images/pictures/Bg Kristy.png",
    prix: "€80,00 EUR",
    lien: "produits/kristy.html"
  },
  {
    nom: "Bracelet Tressia",
    image: "../images/pictures/bg Tressia.png",
    prix: "€80,00 EUR",
    lien: "produits/tressia.html"
  },
  {
    nom: "Parure Leylana",
    image: "../images/pictures/parure Leylana.png",
    prix: "€260,00 EUR",
    lien: "produits/leylana.html"
  },
  {
    nom: "Broche Bonheur",
    image: "../images/pictures/fr Bonheur.png",
    prix: "€65,00 EUR",
    lien: "produits/bonheur.html"
  },
  {
    nom: "Broche Richesse",
    image: "../images/pictures/fr Richesse.png",
    prix: "€65,00 EUR",
    lien: "produits/richesse.html"
  },
  {
    nom: "Broche Richesse",
    image: "../images/pictures/fr Richesse.png",
    prix: "€65,00 EUR",
    lien: "produits/richesse.html"
  },
  {
    nom: "Broche Richesse",
    image: "../images/pictures/fr Richesse.png",
    prix: "€65,00 EUR",
    lien: "produits/richesse.html"
  },
  {
    nom: "Broche Richesse",
    image: "../images/pictures/fr Richesse.png",
    prix: "€65,00 EUR",
    lien: "produits/richesse.html"
  },
  {
    nom: "Broche Richesse",
    image: "../images/pictures/fr Richesse.png",
    prix: "€65,00 EUR",
    lien: "produits/richesse.html"
  },
  {
    nom: "Broche Richesse",
    image: "../images/pictures/fr Richesse.png",
    prix: "€65,00 EUR",
    lien: "produits/richesse.html"
  },
  {
    nom: "Broche Richesse",
    image: "../images/pictures/fr Richesse.png",
    prix: "€65,00 EUR",
    lien: "produits/richesse.html"
  },
  {
    nom: "Broche Richesse",
    image: "../images/pictures/fr Richesse.png",
    prix: "€65,00 EUR",
    lien: "produits/richesse.html"
  }
];
// #endregion 

// #region Instances
const produitsParPage = 12;
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1 // commence l’animation quand 10% de la carte est visible
});

let actualPage = 1;

let currentSort = null;
// #endregion

// #region Services
function createProductCard({ nom, image, prix, lien }) {
  const card = document.createElement("div");
  card.classList.add("product-card");

  card.innerHTML = `
    <a href="${lien}" class="product-link">
      <div class="product-image">
        <img src="${image}" alt="${nom}">
      </div>
      <h4>${nom}</h4>
      <p>${prix}</p>
    </a>
  `;
  return card;
}

function parsePrix(prix) {
  const propre = prix.slice(0, -4).replace('€', '').replace(',', '.');
  return parseFloat(propre);
}

function showProducts(page, tri = null) {
  const container = document.getElementById("productGrid");
  container.innerHTML = "";

  let produitsAffiches = [...produits];

  // Tri selon critère
  if (tri === "prix-croissant") {
    produitsAffiches.sort((a, b) => parsePrix(a.prix) - parsePrix(b.prix));
  } else if (tri === "prix-decroissant") {
    produitsAffiches.sort((a, b) => parsePrix(b.prix) - parsePrix(a.prix));
  }

  const debut = (page - 1) * produitsParPage;
  const fin = debut + produitsParPage;
  const pageProduits = produitsAffiches.slice(debut, fin);

  pageProduits.forEach((p) => {
    const card = createProductCard(p);
    container.appendChild(card);
    observer.observe(card); // 👈 observe chaque nouvelle carte
  });
}

function showPage(tri = null) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const nbPages = Math.ceil(produits.length / produitsParPage);


  if (actualPage > 1) {
    const precedent = document.createElement("button");
    precedent.innerHTML = "‹";
    precedent.addEventListener("click", () => {
      actualPage--;
      showProducts(actualPage, currentSort);
      showPage(currentSort);
    });
    pagination.appendChild(precedent);
  }

  for (let i = 1; i <= nbPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === actualPage) btn.classList.add("active");
    btn.addEventListener("click", () => {
      actualPage = i;
      showProducts(actualPage, currentSort);
      showPage(currentSort);
    });
    pagination.appendChild(btn);
  }

  if (actualPage < nbPages) {
    const suivant = document.createElement("button");
    suivant.innerHTML = "›";
    suivant.addEventListener("click", () => {
      actualPage++;
      showProducts(actualPage, currentSort);
      showPage(currentSort);
    });
    pagination.appendChild(suivant);
  }
}
// #endregion 

document.getElementById("sort-select")?.addEventListener("change", (e) => {
  currentSort = e.target.value;
  actualPage = 1;
  showProducts(actualPage, currentSort);
  showPage(currentSort);
});

window.addEventListener("DOMContentLoaded", () => {
  showProducts(actualPage);
  showPage();
});