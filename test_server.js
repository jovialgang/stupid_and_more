let url = "http://localhost:3002";

let arr = [];
let free_less = [];
let occupied_less = [];



fetch(url,{
    method: "get",

})
    .then(response => response.json())
    .then(lessons => {

        console.log(lessons);


    })

