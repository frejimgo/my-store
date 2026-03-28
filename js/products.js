// ============================================================
//  PRODUCTS — Edit this file to manage your store inventory
//  Add, remove, or update items here.
//
//  Fields:
//    id       — unique number, never repeat
//    name     — product title
//    category — used for the filter tabs (keep consistent)
//    price    — number in USD
//    image    — path to image in /images/ folder, or a URL
//    description — short paragraph shown on product card
//    condition   — "New", "Like New", "Good", "Fair"
//    sold        — set to true to mark as sold (hides Buy button)
// ============================================================

const PRODUCTS = [
  {
    id: 1,
    name: "Sony WH-1000XM3 audifonos/cancelaccion de sonido",
    category: "Electronicos",
    price: 50,
    image: "https://res.cloudinary.com/dhrogze8x/image/upload/v1774286402/IMG_1233_obnule.jpg",
    description: "Usado pero en buenas condiciones, podria necesitar reemplazo de las almoahidillas",
    condition: "Usado",
    sold: false,
  },
  {
    id: 2,
    name: "Fluke 115 Multiprobador",
    category: "Electronicos",
    price: 150,
    image: "https://res.cloudinary.com/dhrogze8x/image/upload/v1774286404/IMG_1231_a1kskw.jpg",
    description: "Multiprobador Fluke 115, con estuche y puntas de medicion.",
    condition: "Muy buen estado",
    sold: false,
  },
  {
    id: 3,
    name: "Baofeng 5RH PRO",
    category: "Electronicos",
    price: 50,
    image: "https://res.cloudinary.com/dhrogze8x/image/upload/v1774286405/IMG_1230_vronyf.jpg",
    description: "5RH PRO nuevo, con todos sus accesorios, ultimo firmware instalado.",
    condition: "Nuevo",
    sold: false,
  },
  {
    id: 4,
    name: "Anytone AT-D878UVII Plus",
    category: "Electronicos",
    price: 175,
    image: "https://res.cloudinary.com/dhrogze8x/image/upload/v1774286401/IMG_1229_llw9bk.jpg",
    description: "Anytone 878 UVII Plus nuevo de paquete en caja, ultimo firmware instalado.",
    condition: "Nuevo",
    sold: false,
  },
  {
    id: 5,
    name: "Suunto CORE",
    category: "Electronicos",
    price: 50,
    image: "https://res.cloudinary.com/dhrogze8x/image/upload/v1774285319/IMG_1225_sh9c40.jpg",
    description: "Suunto Core, altimetro, barometro, brujula, necesita bateria.",
    condition: "Buen estado",
    sold: false,
  },
  {
    id: 6,
    name: "Nitecore HC50",
    category: "Electronicos",
    price: 50,
    image: "https://res.cloudinary.com/dhrogze8x/image/upload/v1774285318/IMG_1228_stsj8y.jpg",
    description: "Lampara de minero, 565 lumens max, bateria recargable 18250.",
    condition: "Buen estado",
    sold: false,
  },
  {
    id: 7,
    name: "Salveque 5.11 Rush 72",
    category: "Otros",
    price: 80,
    image: "https://res.cloudinary.com/dhrogze8x/image/upload/v1774286402/IMG_1234_x3r67m.jpg",
    description: "Salveque 5.11 Rush 72, buen estado, kit de compresion extra.",
    condition: "Good",
    sold: true,
  },
  {
    id: 8,
    name: "Casco HRO - Salvatandas",
    category: "Otros",
    price: 25,
    image: "https://res.cloudinary.com/dhrogze8x/image/upload/v1774286402/IMG_1235_qza79b.jpg",
    description: "Casco salvatandas, HRO buen estado, nada mas de limpiar las espumas.",
    condition: "Good",
    sold: false,
  },
  {
    id: 9,
    name: "K-BAR BK-11",
    category: "Filos",
    price: 40,
    image: "https://res.cloudinary.com/dhrogze8x/image/upload/v1774285320/IMG_1222_fhiszd.jpg",
    description: "K-BAR BK-11 super liviana, especial para salir a caminar o trotar.",
    condition: "Buen estado",
    sold: false,
  },
  {
    id: 10,
    name: "Benchmade MPR GEN 1",
    category: "Filos",
    price: 250,
    image: "https://res.cloudinary.com/dhrogze8x/image/upload/v1774285321/IMG_1221_o7z0xk.jpg",
    description: "Mini Pocket Rocket, M390, G10, titanio.",
    condition: "Excelente estado",
    sold: false,
  },
  {
    id: 11,
    name: "Muela Rhino - Edicion Especial",
    category: "Filos",
    price: 75,
    image: "https://res.cloudinary.com/dhrogze8x/image/upload/v1774285319/IMG_1226_rsmgez.jpg",
    description: "Muela Rhino, 14C28N estuche cuero tipo scout.",
    condition: "Excelente estado",
    sold: false,
  },
  {
    id: 12,
    name: "SOG Pentagon FX",
    category: "Filos",
    price: 80,
    image: "https://res.cloudinary.com/dhrogze8x/image/upload/v1774285319/IMG_1224_di8zye.jpg",
    description: "SOG Pentagon con sus cachas originales",
    condition: "Excelente estado",
    sold: false,
  },
  {
    id: 13,
    name: "CRKT Provoke Karambit",
    category: "Filos",
    price: 50,
    image: "https://res.cloudinary.com/dhrogze8x/image/upload/v1774286403/IMG_1232_gip41w.jpg",
    description: "Super portable y compacta, Caswell Design",
    condition: "Excelente estado",
    sold: false,
  },
  {
    id: 14,
    name: "Spyderco Serge Design Dog Tag Gen 1",
    category: "Filos",
    price: 40,
    image: "https://res.cloudinary.com/dhrogze8x/image/upload/v1774285320/IMG_1223_rkxvzk.jpg",
    description: "Se usa como un dog tag al cuello, super portable",
    condition: "Excelente estado",
    sold: true,
  },
  {
    id: 15,
    name: "ZT 0770CF ELMAX",
    category: "Filos",
    price: 150,
    image: "https://res.cloudinary.com/dhrogze8x/image/upload/v1774285318/IMG_1220_ry3dsa.jpg",
    description: "Super liviana, apertura asistida",
    condition: "Excelente estado",
    sold: false,
  },
  {
    id: 16,
    name: "Cuchillo Gerber Bear Grylls",
    category: "Filos",
    price: 25,
    image: "https://res.cloudinary.com/dhrogze8x/image/upload/v1774285319/IMG_1227_elxes8.jpg",
    description: "Le falta la barrita para hacer fuego",
    condition: "Buen estado",
    sold: false,
  },
  {
    id: 17,
    name: "Test Product 001",
    category: "Otros",
    price: 125,
    image: "https://res.cloudinary.com/dhrogze8x/image/upload/v1774284269/samples/ecommerce/analog-classic.jpg",
    description: "Test Product from new web form",
    condition: "Nuevo",
    sold: false,
  },
];

// ============================================================
//  STORE SETTINGS — Update with your own info
// ============================================================
const STORE = {
  name: "Fred's Store",
  tagline: "Quality items, great prices",
  contactEmail: "fred.jimenez@gmail.com",
  contactPhone: "+506 87019876",
  paymentMethods: ["Sinpe", "Transferencia", "Pago Contra Entrega"],
  location: "Rorhomoser, San Jose",
  shippingNote: "Recoge en sitio o envio por correos de CR",
};
