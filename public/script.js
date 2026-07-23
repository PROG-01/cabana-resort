const mapContainer = document.querySelector("#map");

const tileClasses = {
    ".": "grass",
    "#": "road",
    "c": "cabin",
    "W": "water",
    "p": "pool"
};

fetch("/api/map")
    .then(function(response){
        return response.json();
    })
    .then(function(mapData){

        mapData.forEach(function(row, rowIndex){

            const rowDiv = document.createElement("div");
            rowDiv.classList.add("row");

            row.split("").forEach(function(cell, colIndex){

                const cellDiv = document.createElement("div");

                cellDiv.classList.add("cell");
                if(cell === "W"){
                    cellDiv.style.cursor = "pointer";

                    cellDiv.addEventListener("click", function(){
                         const room = prompt("Enter room number:");

                         if(!room){
                              return;
                         }

                         const guestName = prompt("Enter guest name:");

                         if(!guestName){
                              return;
                         }

                         fetch("/api/book", {
                             method: "POST",

                             headers: {
                             "Content-Type": "application/json"
                             },

                             body: JSON.stringify({
                             row: rowIndex,
                             col: colIndex,
                             room,
                             guestName
                             })
                        })
                        .then(function(response){
                             return response.text();
                        })
                        .then(function(message){
                             alert(message);
                        });
                    })

                }

                cellDiv.classList.add(tileClasses[cell]);

                rowDiv.appendChild(cellDiv);

            });

            mapContainer.appendChild(rowDiv);

        });

    });