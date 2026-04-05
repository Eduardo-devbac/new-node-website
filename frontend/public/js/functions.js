const form = document.getElementById("formulario");
const button = document.getElementById("boton-general");
const buttongeneral = document.getElementById("busqueda-tienda");
const botoncoment = document.querySelectorAll(".btn-coment")
const listsale = document.querySelectorAll(".btn_sale");
const listacompra = document.getElementById("lista-compra");
const cerrarsesion = document.getElementById("cerrar_sesion");
const responseBox = document.getElementById("respuesta-formualrio");
var total = 0;
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const modalidadSelect = document.getElementById("modalidad");
const formlog = document.getElementById("formulario-sesion");
const btndelete = document.getElementById("delete-user");
const adminMenu = document.getElementById("adminMenu");

if (button) {
  button.addEventListener("click", function () {
    const busqueda = document.getElementById("busqueda-general").value;
    alert("Busqueda: " + busqueda);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const adminMenu = document.getElementById("adminMenu");

  if (adminMenu) {
    adminMenu.addEventListener("change", function () {
      const url = this.value;
      if (url) {
        window.location.href = url;
      }
    });
  }
});

if (buttongeneral) {
  buttongeneral.addEventListener("click", function () {
    const busqueda = document.getElementById("buscador-tienda").value;
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
      modality: form.modality.value,
    };

    const response = await fetch(`${window.API_URL}/registro`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.redirect) {
      window.location.href = result.redirect;
      return;
    }

    if (result.success) {
      responseBox.innerHTML = `
        <div class="success-card">
          <h2>¡Listo!</h2>
          <p>${result.message}</p>
        </div>
      `;
    } else {
      responseBox.innerHTML = `
        <div class="error-card">
          <h2>Error</h2>
          <p>${result.message}</p>
        </div>
      `;
    }
  });
}

if (formlog) {
  formlog.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      mail: formlog.mail.value,
      password: formlog.password.value,
    };

    const response = await fetch(`${window.API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.redirect) {
      window.location.href = result.redirect;
      return;
    }

    if (result.success) {
      responseBox.innerHTML = `
        <div class="success-card">
          <h2>¡Listo!</h2>
          <p>${result.message}</p>
        </div>
      `;
    } else {
      responseBox.innerHTML = `
        <div class="error-card">
          <h2>Error</h2>
          <p>${result.message}</p>
        </div>
      `;
    }
  });
}

botoncoment.forEach((coment) => {
  coment.addEventListener("click", async (e) => {
    e.preventDefault();
    const parent = coment.closest(".comentario-box");
    const textarea = parent.querySelector(".comentario");
    const responseBox = parent.querySelector(".respuesta-formualrio");
    const datacoment = {
      comentario: textarea.value
    }

     const texto = textarea.value.trim();

    if (texto === "") {
      responseBox.innerHTML = `
        <div class="error-card">
          <h4>El comentario no puede estar vacío</h4>
        </div>
      `;
      return;
    }
    const response = await fetch(`/comentario`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(datacoment),
    });

     const result = await response.json();

    if (result.redirect) {
      window.location.href = result.redirect;
      return;
    }

    if (result.success) {
      responseBox.innerHTML = `
        <div class="success-card">
          <h2>¡Listo!</h2>
          <p>${result.message}</p>
        </div>
      `;
    } else {
      responseBox.innerHTML = `
        <div class="error-card">
          <h2>Error</h2>
          <p>${result.message}</p>
        </div>
      `;
    }

    
  })
})



if (cerrarsesion) {
  cerrarsesion.addEventListener("click", async (event) => {
    event.preventDefault();

    const res = await fetch("/logout");
    const data = await res.json();

    if (data.success) {
      window.location.href = data.redirect;
    }
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

if (togglePassword) {
  togglePassword.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";

    passwordInput.type = isPassword ? "text" : "password";

    togglePassword.classList.toggle("open");
  });
}

if (btndelete){
  document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete-user")) {
    const id = e.target.dataset.id;

    console.log("boton presionado")

    const res = await fetch(`/admin/delete/${id}`, {
      method: "DELETE"
    });


    if (res.ok) {
      location.reload();
    }
  }
});
}

agregarProducto();
totalCompra();
