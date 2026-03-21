const form = document.getElementById("formulario");
const button = document.getElementById("boton");
const botones = document.querySelectorAll(".btn_blog");
const listsale = document.querySelectorAll(".btn_sale");
const listacompra = document.getElementById("lista-compra");
const cerrarsesion = document.getElementById("cerrar_sesion");
const responseBox = document.getElementById("respuesta-formualrio");
var total = 0;


if (button) {
  button.addEventListener("click", function () {
    const busqueda = document.getElementById("busqueda").value;
    alert("Busqueda: " + busqueda);
  });
}

if (form) {
 form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: form.name.value,
    mail: form.mail.value,
    password: form.password.value,
    modality: form.modality.value
  };

  const response = await fetch(`${window.API_URL}/formulario`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });


  const result = await response.json();


    if (result.success === true) {
      responseBox.innerHTML = `
        <div class="success-card">
          <h2>${result.message}</h2>
          <p><strong>Nombre:</strong> ${data.name}</p>
          <p><strong>Correo:</strong> ${data.mail}</p>
          <p><strong>Modalidad:</strong> ${data.modality}</p>
        </div>
      `;
    } else {
      responseBox.innerHTML = `
        <div class="error-card">
          <h2>Error</h2>
          <p>${result.message || "Ocurrió un error inesperado"}</p>
        </div>
      `;
    }
});
}

botones.forEach(function (boton) {
  boton.addEventListener("click", function () {
    const textarea = boton.parentElement.querySelector("textarea");
    const coment = textarea.value;
    alert("Comentario: " + coment);
  });
});

if (cerrarsesion) {
  cerrarsesion.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("Sesión cerrada");
  });
}

function agregarProducto() {
  listsale.forEach(function (sale) {
    sale.addEventListener("click", function (event) {
      event.preventDefault();
      const produc = sale.parentElement.querySelector("h3").textContent;
      const li = document.createElement("li");
      li.textContent = produc;
      li.id = "producto";
      listacompra.appendChild(li);
    });
  });
}

function totalCompra() {
  listsale.forEach(function (numero) {
    numero.addEventListener("click", function (event) {
      event.preventDefault();
      const precioTexto =
        numero.parentElement.querySelector("#precio").textContent;
      const costo = parseFloat(precioTexto.replace(/[^0-9.-]+/g, ""));
      total = total + costo;
      const mostratotal = document.getElementById("total");
      listacompra.appendChild(mostratotal);
      mostratotal.textContent = "Total: " + total;
    });
  });
}

agregarProducto();
totalCompra();
