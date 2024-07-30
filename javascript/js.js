let btn = document.querySelector("input");
let tabla = document.querySelector("tbody");
tabla.innerHTML = "";
let fila;
document.addEventListener("DOMContentLoaded", showTable);
function showTable() {
  fetch("../listado.json")
    .then((response) => response.json())
    .then((plaza) => creatabla(plaza))
    .catch((error) => ocultartable());
}
function ocultartable() {
  tabla.innerHTML =
    "<tr><td colspan=3 >No existe ningun elemento en la tabla, revisar el archivo JSON</td> </tr>";
  let boton = document.querySelector(".btn");
  boton.classList.add("btn-desactivado");
}
function creatabla(datos) {
  // console.log(datos.filter((lugar) => lugar.plaza == 'mazatlan')); linea para filtrar por plazas, pendiente guardar en arreglos por plaza para manipular el envio de email
  let i = 0;
  while (i < datos.length) {
    fila = document.createElement("tr");
    fila.innerHTML = `<td> ${datos[i].idReserva}</td>
                      <td> ${datos[i].llegada}</td>
                      <td> ${datos[i].plaza}</td>`;
    tabla.appendChild(fila);
    i++;
  }
}
btn.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("Enviando correo");
});
