/* Single editable catalog: data, photography, ingredients and nutrition. */
const CATALOG_DATA = [
  {
    "id": "superfoods",
    "name": "Superfoods Maca, Lúcuma y Cacao",
    "line": "Superfoods",
    "category": "superfoods",
    "presentation": "1 barra · 63.4 g",
    "price": 12.5,
    "image": "assets/products/superfoods.svg",
    "short": "Superfoods Maca, Lúcuma y Cacao",
    "tag": "Maca, lúcuma y cacao: nuestra introducción al mundo Vitabars.",
    "ingredients": [
      "Mantequilla de maní",
      "Jarabe de dátil",
      "Lúcuma en polvo",
      "Maca en polvo",
      "Cacao en polvo",
      "Chocolate al 70% endulzado con panela"
    ],
    "traits": [
      "Superfoods",
      "Con maca y lúcuma",
      "Con cacao"
    ],
    "contains": "Incluye maní.",
    "moment": "Para llevar contigo durante una jornada de trabajo, estudio o entre planes.",
    "nutrition": {
      "weight": "63.4 g",
      "kcal": "282",
      "fat": "16 g",
      "sat": "2 g",
      "trans": "0 g",
      "sodium": "13 mg",
      "carbs": "27 g",
      "sugar": "14.6 g",
      "fiber": "5 g",
      "protein": "10 g"
    },
    "ingredientImage": "assets/ingredients/superfoods.svg",
    "originalImage": "assets/originals/superfoods.jpeg",
    "discover": false
  },
  {
    "id": "lucuma",
    "name": "Lúcuma & maní",
    "line": "Proteica ISO Whey",
    "category": "whey",
    "presentation": "1 barra · 71.3 g",
    "price": 13.5,
    "image": "assets/products/lucuma.svg",
    "short": "Lúcuma & Maní",
    "tag": "Lúcuma y maní, en tu próxima pausa.",
    "ingredients": [
      "Proteína ISO Whey (suero de leche)",
      "Mantequilla de maní",
      "Jarabe de dátil",
      "Harina de avena",
      "Lúcuma en polvo"
    ],
    "traits": [
      "ISO Whey",
      "Con lúcuma",
      "Endulzada con dátiles"
    ],
    "contains": "Incluye leche y maní.",
    "moment": "Una pausa entre clases, en la oficina o entre tus planes.",
    "nutrition": {
      "weight": "71.3 g",
      "kcal": "274",
      "fat": "11 g",
      "sat": "1 g",
      "trans": "0 g",
      "sodium": "17 mg",
      "carbs": "34 g",
      "sugar": "26.1 g",
      "fiber": "4 g",
      "protein": "12 g"
    },
    "ingredientImage": "assets/ingredients/lucuma.svg",
    "originalImage": "assets/originals/lucuma.jpeg",
    "discover": true
  },
  {
    "id": "menta",
    "name": "Menta & chocolate",
    "line": "Proteica ISO Whey",
    "category": "whey",
    "presentation": "1 barra · 60.7 g",
    "price": 13.5,
    "image": "assets/products/menta.svg",
    "short": "Menta & Chocolate",
    "tag": "Menta y chocolate. Cambia el sabor de tu pausa.",
    "ingredients": [
      "Proteína ISO Whey (suero de leche)",
      "Harina de almendra",
      "Harina de avena",
      "Jarabe de dátil",
      "Chocolate al 98% endulzado con stevia",
      "Mantequilla de maní",
      "Quinoa pop",
      "Aceite esencial de menta"
    ],
    "traits": [
      "ISO Whey",
      "Chocolate al 98%",
      "Con quinoa pop"
    ],
    "contains": "Incluye leche, almendra y maní.",
    "moment": "Para llevar en la mochila del gimnasio o disfrutar entre planes.",
    "nutrition": {
      "weight": "60.7 g",
      "kcal": "299",
      "fat": "17 g",
      "sat": "1 g",
      "trans": "0 g",
      "sodium": "8 mg",
      "carbs": "21 g",
      "sugar": "9.9 g",
      "added": "0 g",
      "fiber": "3 g",
      "protein": "12 g"
    },
    "ingredientImage": "assets/ingredients/menta.svg",
    "originalImage": "assets/originals/menta.jpeg",
    "discover": true
  },
  {
    "id": "cacao",
    "name": "Cacao & cashew",
    "line": "Proteica Plant-Based",
    "category": "plant",
    "presentation": "1 barra · 61.7 g",
    "price": 13.5,
    "image": "assets/products/cacao.svg",
    "short": "Cacao & Cashew",
    "tag": "Cacao, cashew y quinoa pop: conoce su combinación.",
    "ingredients": [
      "Proteína de tarwi",
      "Jarabe de dátil",
      "Harina de avena",
      "Nibs de cacao",
      "Mantequilla de cashew y canela",
      "Chocolate al 70% endulzado con panela",
      "Quinoa pop"
    ],
    "traits": [
      "Plant-Based",
      "Proteína de tarwi",
      "Con quinoa pop"
    ],
    "contains": "Incluye tarwi y cashew.",
    "moment": "Una barra para tu pausa de media tarde o para llevar en tus salidas.",
    "nutrition": {
      "weight": "61.7 g",
      "kcal": "279",
      "fat": "17 g",
      "sat": "2 g",
      "trans": "0 g",
      "sodium": "8 mg",
      "carbs": "23 g",
      "sugar": "9.1 g",
      "fiber": "4 g",
      "protein": "10 g"
    },
    "ingredientImage": "assets/ingredients/cacao.svg",
    "originalImage": "assets/originals/cacao.jpeg",
    "discover": true
  },
  {
    "id": "maras",
    "name": "Sal de Maras & chocolate",
    "line": "Proteica Plant-Based",
    "category": "plant",
    "presentation": "1 barra · 62.8 g",
    "price": 12.5,
    "image": "assets/products/maras.svg",
    "short": "Sal de Maras & Chocolate",
    "tag": "Chocolate y Sal de Maras, en una sola barra.",
    "ingredients": [
      "Proteína de tarwi",
      "Jarabe de dátil",
      "Harina de avena",
      "Almendras",
      "Semillas de calabaza activadas",
      "Chocolate al 98% endulzado con stevia",
      "Mantequilla de cashew y canela",
      "Canela en polvo",
      "Sal de Maras"
    ],
    "traits": [
      "Plant-Based",
      "Proteína de tarwi",
      "Con Sal de Maras"
    ],
    "contains": "Incluye tarwi, almendras y cashew.",
    "moment": "Para acompañar una pausa en casa o una tarde entre planes.",
    "nutrition": {
      "weight": "62.8 g",
      "kcal": "299",
      "fat": "16 g",
      "sat": "1 g",
      "trans": "0 g",
      "sodium": "53 mg",
      "carbs": "25 g",
      "sugar": "9.7 g",
      "fiber": "4 g",
      "protein": "10 g"
    },
    "ingredientImage": "assets/ingredients/maras.svg",
    "originalImage": "assets/originals/maras.jpeg",
    "discover": true
  },
  {
    "id": "mini",
    "name": "Mini lúcuma & maní",
    "line": "Mini Vitabars",
    "category": "mini",
    "presentation": "1 mini barra · 32.3 g",
    "price": 6,
    "reference": true,
    "image": "assets/products/mini.webp"
  }
];
