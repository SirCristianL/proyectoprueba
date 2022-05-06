let participantsList = [];
let itemsCounted = 0;

// Se ejecuta el código del interior una vez que ya cargó el DOM
document.addEventListener("DOMContentLoaded", function(event) {

    // Se ejecuta una función cuando se clickea en alguna parte la lista de participantes
    const listHTML = document.querySelector('.participants-list');

    listHTML.addEventListener('click', function(e) {
        // Verificamos que se haya clickeado el ícono de la cruz
        if (e.target.tagName == "I") {
            // Eliminamos el nodo del DOM
            e.target.parentNode.parentNode.removeChild(e.target.parentNode);

            // Eliminamos el participante de la lista de participantes (array)
            let itemToDelete = participantsList.findIndex(object => {
                return object.id === e.target.parentNode.id;
              });
            participantsList.splice(itemToDelete, 1);
        }
    })
});

function addParticipant() {

    // Obtenemos el valor del input (participante a agregar)
    const inputValue = document.querySelector("#participant-input").value;

    // Creamos un objeto HTML con el nombre del participante
    const listHTML = document.querySelector('.participants-list');

    const docFrag = document.createDocumentFragment();
    const tempNode = document.querySelector("div.participant-item").cloneNode(true);
    tempNode.setAttribute('id', 'participant-item-' + itemsCounted);
    tempNode.style = "display: block";

    tempNode.querySelector("span").textContent = inputValue;

    // Lo agregamos al documento HTML
    docFrag.appendChild(tempNode);
    listHTML.appendChild(docFrag);
    delete docFrag;

    // Agregamos el participante a la lista de participantes (array)
    participantsList.push({
        name: inputValue,
        id: 'participant-item-' + itemsCounted
    });
    itemsCounted ++;
}

function sortear() {
    let result = randomNum(0, participantsList.length - 1);
    Swal.fire({
        title: '¡Felicidades!',
        text: participantsList[result].name + ' ha sido la persona afortunada ;)',
        icon: 'success',
        confirmButtonText: '¡Genial!'
    });
}

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}