const btn = document.querySelector("input");
const tabla = document.querySelector("tbody");
const loading = document.querySelector(".loader");
const ocultarElement = document.querySelector(".contenido ");
const success = 1;

console.log(loading);

let fila;
document.addEventListener("DOMContentLoaded", showTable);

function showTable() {
  fetch("src/assets/listado.json")
    .then((response) => response.json())
    .then((plaza) => creatabla(plaza))
    .catch(() => ocultartable());
}

// si no hay datos  o el archivo no es leido, se ejecuta la funcion
function ocultartable() {
  tabla.innerHTML =
    "<tr><td colspan=3 >No existe ningun elemento en la tabla, revisar el archivo JSON</td> </tr>";
  const boton = document.querySelector(".btn");
  boton.classList.add("btn-desactivado");
}

// crea la tabla una vez se leyo el archivo
function creatabla(datos) {
  const plazas = {
    mazatlan: [],
    cabos: [],
    "riviera maya": [],
    acapulco: [],
    peñasco: []
  };

  datos.forEach(lugar => {
    if (plazas[lugar.plaza]) {
      plazas[lugar.plaza].push(lugar.idReserva);
    }
  });

  let i = 0;
  tabla.innerHTML = "";
  while (i < datos.length) {
    fila = document.createElement("tr");
    fila.innerHTML = `<td> ${datos[i].idReserva}</td>
                      <td> ${datos[i].llegada}</td>
                      <td> ${datos[i].plaza}</td>`;
    tabla.appendChild(fila);
    i++;
  }
  const plazasFiltradas = Object.fromEntries(
    Object.entries(plazas).filter(([key, value]) => value.length > 0)
  );

  console.log(plazasFiltradas);
}

btn.addEventListener("click", function (e) {
  e.preventDefault();
  ocultarElement.classList.add("contenido-oculto");
  loading.classList.add("mostrar-loader");
  document.body.style.background = "#222";
  setTimeout(() => {
    ocultarElement.classList.remove("contenido-oculto");
    loading.classList.remove("mostrar-loader");
    document.body.style.background = "#fff";
    if (success) {
      swal("Success!", "El correo se ha enviado satisfactoriamente", "success");
    } else {
      swal("Error", "Revisa que el correo sea correcto", "error");
    }
  }, 2000);
});
