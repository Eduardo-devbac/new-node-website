const form = document.getElementById("formulario");
const button = document.getElementById("boton-general");
const buttongeneral = document.getElementById("busqueda-tienda");
const botoncoment = document.querySelectorAll(".btn-coment")
const cerrarsesion = document.getElementById("cerrar_sesion");
const responseBox = document.getElementById("respuesta-formualrio");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const modalidadSelect = document.getElementById("modalidad");
const formlog = document.getElementById("formulario-sesion");
const btndelete = document.getElementById("delete-user");
const adminMenu = document.getElementById("adminMenu");
const btndeletcoment = document.getElementById("delete-coment");
const botones = document.querySelectorAll(".btn_sale");
const lista = document.getElementById("lista-compra");
const totalTexto = document.getElementById("total");
let total = 0;
const hamburger = document.getElementById("hamburger");
const navList = document.querySelector("nav ul");

if (hamburger && navList) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navList.classList.toggle("show");
  });
}

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

document.addEventListener("DOMContentLoaded", () => {
  const adminMenu = document.getElementById("userMenu");

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

botones.forEach(btn => {
  btn.addEventListener("click", () => {

    const nombre = btn.dataset.nombre;
    const precio = parseFloat(btn.dataset.precio);

    // Agregar a la lista
    const li = document.createElement("li");
    li.textContent = `${nombre} - $${precio}`;
    lista.appendChild(li);

    // Sumar al total
    total =  total + precio;
    totalTexto.textContent = `Total: $${total}`;
  });
});

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

if (btndeletcoment){
  document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("delete-coment")) {
      const id = e.target.dataset.id;

      console.log("boton presionado");

      const res = await fetch(`/admin/comentarios/delete/${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        location.reload();
      }
    }
  });
}

