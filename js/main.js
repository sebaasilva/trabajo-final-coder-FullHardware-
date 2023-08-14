document.addEventListener("DOMContentLoaded", function () {
  const favIcons = document.querySelectorAll(".fav-icon");
  favIcons.forEach((icon) => {
    icon.addEventListener("click", function () {
      const productoContainer = this.parentNode;
      const nombre = productoContainer.querySelector("h5").textContent;
      const precio = productoContainer.querySelector("p").textContent;
      const imagen = productoContainer.querySelector("img").src;
      toggleFavorite(nombre, precio, imagen);
    });
  });
});

let favoritos = [];

function toggleFavorite(nombre, precio, imagen) {
  const index = favoritos.findIndex((producto) => producto.nombre === nombre);

  if (index === -1) {
    // Si el producto no está en la lista de favoritos, lo agregamos
    favoritos.push({ nombre, precio, imagen });
  } else {
    // Si el producto está en la lista de favoritos, lo eliminamos
    favoritos.splice(index, 1);
  }

  updateFavoritesList();
}

function updateFavoritesList() {
  // Actualizamos la lista de favoritos en el menú desplegable
  const favoritosListElement = document.getElementById("favoritos-list");
  favoritosListElement.innerHTML = "";

  favoritos.forEach((producto) => {
    const li = document.createElement("li");

    const imagen = document.createElement("img");
    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;
    li.appendChild(imagen);

    const nombre = document.createElement("h4");
    nombre.textContent = producto.nombre;
    li.appendChild(nombre);

    const precio = document.createElement("p");
    precio.textContent = producto.precio;
    li.appendChild(precio);

    favoritosListElement.appendChild(li);
  });

  // Actualizamos el estado visual del ícono de favorito en cada producto
  const favIcons = document.querySelectorAll(".fav-icon");
  favIcons.forEach((icon) => {
    const productoContainer = icon.parentNode;
    const nombre = productoContainer.querySelector("h5").textContent;

    if (favoritos.some((producto) => producto.nombre === nombre)) {
      icon.classList.add("fas"); // Agregamos la clase "fas" para íconos sólidos
      icon.classList.remove("far"); // Removemos la clase "far" para íconos regulares
    } else {
      icon.classList.add("far"); // Agregamos la clase "far" para íconos regulares
      icon.classList.remove("fas"); // Removemos la clase "fas" para íconos sólidos
    }
  });
}