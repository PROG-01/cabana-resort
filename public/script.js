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
                         console.log(rowIndex, colIndex);
                    })

                }

                cellDiv.classList.add(tileClasses[cell]);

                rowDiv.appendChild(cellDiv);

            });

            mapContainer.appendChild(rowDiv);

        });

    });