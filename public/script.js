fetch('/api/map')
   .then(function (response){
        return response.json();
   })
   .then(function (data){
        console.log(data);
   });