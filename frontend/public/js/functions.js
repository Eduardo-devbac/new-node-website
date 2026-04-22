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
const btndeletproduct = document.getElementById("delete-product");
const botones = document.querySelectorAll(".btn_sale");
const btnpay = document.getElementById("btn-pay")
const lista = document.getElementById("lista-compra");
const totalTexto = document.getElementById("total");
let total = 0;
const hamburger = document.getElementById("hamburger");
const navList = document.querySelector("nav ul");
const formproduct = document.getElementById("formulario_producto")
  let list = []


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

if (formproduct){
  formproduct.addEventListener("submit", async (e) => {
    e.preventDefault()
    const data = {
      name:  formproduct.name.value,
      description: formproduct.description.value,
      stock: formproduct.stock.value,
      price: formproduct.price.value,
      creation_date: formproduct.creation_date.value
    }
    console.log(data)
    alert(data)
  })
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
    const idproduct = parseInt(btn.dataset.id);
    const li = document.createElement("li");
    li.textContent = `${nombre} - $${precio}`;
    lista.appendChild(li);
    total =  total + precio;
    totalTexto.textContent = `Total: $${total}`;
    agregarcarrito(idproduct)
  });
});

function agregarcarrito (idproduct) {

{
  const item = list.find(p => p.id === idproduct);
   if (item) {
    item.cantidad++;
  } else {
    list.push({ id: idproduct, cantidad: 1 });
  }
}
}

if(btnpay){ 
btnpay.addEventListener("click", async (e) => {
  e.preventDefault()
  const itemcontent = {
   list
  }

  if (list.length === 0) {
  responseBox.innerHTML = `
    <div class="error-card">
      <h2>Error</h2>
      <p>No hay productos en el carrito</p>
    </div>
  `;
  return;
}

for (const item of list) {
  if (!item.id || !item.cantidad || item.cantidad <= 0) {
    responseBox.innerHTML = `
      <div class="error-card">
        <h2>Error</h2>
        <p>Hay productos con cantidad inválida</p>
      </div>
    `;
    return;
  }
}

  const response = await fetch('/compra', {
    method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(itemcontent),
  })
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

      const res = await fetch(`/admin/comentarios/delete/${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        location.reload();
      }
    }
  });
}

if (btndeletproduct){
  document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("delete-product")) {
      const id = e.target.dataset.id;

      const res = await fetch(`/admin/productos/delete/${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        location.reload();
      }
    }
  });
}
 

