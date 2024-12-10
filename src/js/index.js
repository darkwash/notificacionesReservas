const btn = document.querySelector("input");
let tabla = document.querySelector("tbody");
const loading = document.querySelector(".loader");
const ocultarElement = document.querySelector(".contenido ");
const success = 1;

document.addEventListener("DOMContentLoaded", showTable);


function showTable() {
  fetch("conexion.php")
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

  datos.forEach(dato => {

    let fila = document.createElement("tr");

    fila.innerHTML = `
      <td> ${dato.no_reserva} </td>
      <td>  ${dato.check_in} </td>
      <td>  ${dato.area} </td>
    `;

    tabla.appendChild(fila);

  });
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

          fetch('src/sendmail.php', {
            method: 'POST',
            headers: {
              'Content-Type':'application/json' ,
            },
            body: JSON.stringify(datos)
          })
          .then(response => {
            if(!response.ok){
              swal('Error al enviar la solicitud', `Error: ${response.status} ${response.statusText}`, 'error');
              throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            return response.text()})
          .then(data => {
            swal("Success", "El correo se ha enviado satisfactoriamente", "success");

          })
          .catch(error =>{
            swal('Error al enviar la solicitud', error);


        })

        }

        else {
          swal("Error", "Revisa que el correo sea correcto", "error");
        }

    }, 2000);
  });
}
