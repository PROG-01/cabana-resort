const mapContainer = document.querySelector("#map");

const bookingModal = document.querySelector("#bookingModal");
const roomInput = document.querySelector("#roomInput");
const guestInput = document.querySelector("#guestInput");

const bookBtn = document.querySelector("#bookBtn");
const cancelBtn = document.querySelector("#cancelBtn");

const notification = document.querySelector("#notification");

let selectedCabana = null;

function showNotification(message, isSuccess) {

    notification.textContent = message;

    notification.classList.remove("hidden");
    notification.classList.remove("success");
    notification.classList.remove("error");

    if (isSuccess) {
        notification.classList.add("success");
    } else {
        notification.classList.add("error");
    }

    notification.classList.add("show");

    setTimeout(function () {

        notification.classList.remove("show");

        setTimeout(function () {

            notification.classList.add("hidden");

        }, 300);

    }, 2500);

}

const tileClasses = {
    ".": "grass",
    "#": "road",
    "c": "cabin",
    "W": "water",
    "p": "pool"
};
Promise.all([
    fetch("/api/map")
        .then(function(response){
            return response.json();
    }), 
    fetch("/api/cabana-bookings").then(function(response) {
        return response.json();
    })
])
.then(function([mapData, cabanaBookings]){

        mapData.forEach(function(row, rowIndex){

            const rowDiv = document.createElement("div");
            rowDiv.classList.add("row");

            row.split("").forEach(function(cell, colIndex){

                const cellDiv = document.createElement("div");

                cellDiv.classList.add("cell");
                if(cell === "W"){
                    cellDiv.style.cursor = "pointer";

                    const booking = cabanaBookings.find(function(cabana) {
                    return cabana.row === rowIndex && cabana.col === colIndex;
                    });

                if (booking) {
                    cellDiv.classList.add("booked");
                    cellDiv.style.pointerEvents = "none";
                }

                    cellDiv.addEventListener("click", function(){
                         selectedCabana = {
                             row: rowIndex,
                             col: colIndex,
                             cell: cellDiv
                         };

                         roomInput.value = "";
                         guestInput.value = "";

                         bookingModal.classList.remove("hidden");

                         roomInput.focus();
                    });

                }

                cellDiv.classList.add(tileClasses[cell]);

                rowDiv.appendChild(cellDiv);

            });

            mapContainer.appendChild(rowDiv);

        });

    });

    cancelBtn.addEventListener("click", function () {

    bookingModal.classList.add("hidden");

    roomInput.value = "";
    guestInput.value = "";

    selectedCabana = null;

});

bookBtn.addEventListener("click", function () {

    const room = roomInput.value.trim();
    const guestName = guestInput.value.trim();

    if (!room || !guestName) {
        showNotification("Please fill in both fields.", false);
        return;
    }

    fetch("/api/book", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            row: selectedCabana.row,
            col: selectedCabana.col,
            room,
            guestName

        })

    })
    .then(function(response){

        return response.text().then(function(message){

            return {
                ok: response.ok,
                message: message
            };

        });

    })
    .then(function(result){

        showNotification(result.message, result.ok);

        if(result.ok){

            selectedCabana.cell.classList.add("booked");

            selectedCabana.cell.style.pointerEvents = "none";

            bookingModal.classList.add("hidden");

            selectedCabana = null;

        }

    });

});