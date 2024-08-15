const btn = document.querySelector("input");
const tabla = document.querySelector("tbody");

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
  // console.log(plazas);
}

btn.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("Enviando correo");
});
