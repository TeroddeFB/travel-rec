function evitarEnvio(event) {
    event.preventDefault(); // Evita el envío del formulario
    alert("Form submitted"); // Ejemplo: Muestra una alerta
    const formulario = document.getElementById("miFormulario");
    formulario.reset();
    // Aquí puedes agregar tu lógica de validación o cualquier otra acción
  }



let elementosOtr = [];

function performSearch() {
    const input = document.getElementById('search-input');
    const inputNue = document.getElementById('search-input').value.toLowerCase();
    let resultados = [];

    fetch("travel_recommendation_api.json")
      .then(response => response.json())
      .then(data => {

        

        if (inputNue === "beach" || inputNue === "beaches") {
          resultados = data.beaches;
        } else if (inputNue === "temple" || inputNue === "temples") {
          resultados = data.temples;
        } else if (inputNue === "country" || inputNue === "countries") {
          resultados = data.countries;
        } 
        else if (inputNue === ""){
          resultados = "";
          alert("Fill it!");
        }
        else {
          const pais = data.countries.find((country) =>
            country.name.toLowerCase() === inputNue
          );
          if (pais) {
            resultados = pais.cities;
          }
          else {
            resultados = "";
            alert("No destinations")
          }
        }
        if (resultados != ""){
        console.log(resultados);
        const outputDiv = document.getElementById("outputDiv");
        const destinations = resultados.map(destination => `<div class="cajita">
            <p class="grande"><strong>${destination.name}</strong></p>
            <p class="chico">${destination.description}</p>
            <p class="chico">${horas(destination.time)}</p>
            <img src=${destination.imageUrl} class="foto"></img>
            </div>`);

            function horas(horario){
                const options = { timeZone: horario, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
                const newTime = new Date().toLocaleTimeString('en-US', options);
                return "Current time: " + newTime;
            }


            outputDiv.style.display = "block";
            outputDiv.innerHTML = destinations.join('');
            outputDiv.style.width = input.offsetWidth + 60 + "px"; // Ajusta el ancho
            outputDiv.style.position = "fixed";
            outputDiv.style.left = input.offsetLeft - 35 + "px";
            outputDiv.style.top = (input.offsetTop + input.offsetHeight + 10) + "px"; // Justo debajo
            console.log(destinations);}
      })
      .catch((error) => {
        console.error("Error al cargar el JSON");
      });
      

 

  

}




function resetResults() {
    const outputDiv = document.getElementById("outputDiv");
    outputDiv.style.display = "none";
}

