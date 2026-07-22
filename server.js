const fs = require('fs');

const express = require('express');

const app = express();

const mapData = fs.readFileSync('data/map.ascii', 'utf8').trim().split('\n');

console.log(mapData);

const PORT = 3000;

// Middleware 
app.use(express.static('public'));
app.use(express.json());

// test route
app.get('/api/map', function(req, res){
    res.json(mapData);
});

app.listen(PORT, function(){
    console.log(`Server running at http://localhost:${PORT}`);
});