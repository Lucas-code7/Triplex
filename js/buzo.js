function ajustarRuta(ruta) {
  const enSubcarpeta = window.location.pathname.includes("/pages/");
  return enSubcarpeta ? "../" + ruta : ruta;
}

const productos = document.getElementById("buzos");
const search_buzos = document.getElementById("search_buzos");

let carritoProduct = JSON.parse(localStorage.getItem("carritoProduct")) || [];
let buzos_array = []; 

if (productos) {
  fetch(ajustarRuta("json/buzos.json"))
    .then(res => res.json())
    .then(data => {
      buzos_array = data;
      renderResultados(data);
      agregarAlCarrito(data);
    })
    .catch(err => {
      console.error("Error al cargar los buzos:", err);
      productos.innerHTML = "<p>Error al cargar los productos...</p>";
    });
}

function renderResultados(array) {
  productos.innerHTML = "";
  array.forEach(buzo => {
    const container = document.createElement("div");
    container.className = "card-buzo";
    container.innerHTML = `
      <a href="${ajustarRuta("pages/")}${buzo.nombre}.html">
        <img class="img-buzo" src="${ajustarRuta(buzo.imagen)}">
      </a>
      <h3 class="nombre-buzo">${buzo.nombre}</h3>
      <p>$${buzo.precio} <button class="add-product" id="${buzo.id}">+</button></p>
    `;
    productos.appendChild(container);
  });
}

function agregarAlCarrito(buzosArray) {
  const botones = document.querySelectorAll(".add-product");
  botones.forEach(boton => {
    boton.onclick = (e) => {
      const productoId = e.currentTarget.id;
      const producto = buzosArray.find(buzo => buzo.id == productoId);
      let carritoActual = JSON.parse(localStorage.getItem("carritoProduct")) || [];
      const enCarrito = carritoActual.find(x => x.id == producto.id);
      if (enCarrito) {
        enCarrito.cantidad += 1;
      } else {
        carritoActual.push({ ...producto, cantidad: 1 });
      }
      localStorage.setItem("carritoProduct", JSON.stringify(carritoActual));
    };
  });
}


if (search_buzos) {
  search_buzos.addEventListener("input", () => {
    const termino = search_buzos.value.toLowerCase();
    const filtrados = buzos_array.filter(buzo =>
      buzo.nombre.toLowerCase().includes(termino)
    );
    renderResultados(filtrados);
    agregarAlCarrito(filtrados);
  });
}
