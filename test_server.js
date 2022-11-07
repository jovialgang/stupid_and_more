let url = "http://localhost:3000/json_occupied_less";

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

