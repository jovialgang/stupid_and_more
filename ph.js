
let url = "https://my.itmo.ru/api/sport/my_sport/schedule/available/limits";

let token = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIwSVliSmNVLW1wbEdBdzhFMzNSNkNKTUdWa3hZdUQ2eUItdWt3RlBJOXV3In0.eyJleHAiOjE2NjY0NDYxMjAsImlhdCI6MTY2NjQ0NDMyMCwiYXV0aF90aW1lIjoxNjYwMDM1ODA2LCJqdGkiOiIxZmM2NWQ1Ny1iY2IzLTQ4MmMtOGMwNC0wNzY4YjM3NTRmZWUiLCJpc3MiOiJodHRwczovL2lkLml0bW8ucnUvYXV0aC9yZWFsbXMvaXRtbyIsImF1ZCI6InlhbmRleCIsInN1YiI6ImFlOTI4NzdiLTc4NzktNDQ4Ni1hYjE5LTdjNjM1MmRhOTQ5ZSIsInR5cCI6IkJlYXJlciIsImF6cCI6InN0dWRlbnQtcGVyc29uYWwtY2FiaW5ldCIsInNlc3Npb25fc3RhdGUiOiJiOTllMmZhOC1kZjlmLTQ3MmMtOWFiZC0wMjFmOTg5OThhNDAiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cHM6Ly9teS5pdG1vLnN1IiwiaHR0cHM6Ly9teS5pdG1vLnJ1IiwiaHR0cHM6Ly9lbWJlZC5pZm1vLnJ1IiwiaHR0cHM6Ly9pc3UuaWZtby5ydSJdLCJyZXNvdXJjZV9hY2Nlc3MiOnsieWFuZGV4Ijp7InJvbGVzIjpbImVkaXQ6YWNjb3VudCJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZWR1IHdvcmsiLCJzaWQiOiJiOTllMmZhOC1kZjlmLTQ3MmMtOWFiZC0wMjFmOTg5OThhNDAiLCJpc3UiOjMzMzQxMiwicHJlZmVycmVkX3VzZXJuYW1lIjoiZWdvcmpvdmlhbCJ9.c9vS8FRe8sfe36CSJh_DHRmdW10xBRTUkUs_KqV0jd1uMpSAxKbo2t00DbOmTq7OjwEROo-PbrE34PdHpIS-IigBzFgVA47tKUIEdZbkt8gWa-6plq-OrgfdF-a5xS8EWmTCj02UcAgL7Bd41kp0kwIHtMEMhKKMZ7RzUSkDwBYLL8axKdiQGd8nhhMVjF9EnPxOuLFqiwkniINFqYW0r_CaZo0rQgLOIIkcO_j5gCDXKEQWJqViOIGR77OjQ7wJZenDK5HFJ7igId5OmFzadlmrefGQX9g6j8dr1a3J8GmR3Nbftbzb8nA01TVtueVNOzgykUyf6gW80D3ibIU7wQ"
let arr = [];
let free_less = [];
let occupied_less = [];



fetch(url,{
    method: "get",
    headers:{
        "authorization": token
    },
})
    .then(response => response.json())
    .then(lessons => {
        // console.log(lessons.result)

        for (const k in lessons.result){
            for (const c in lessons.result[k]){
                lessons.result[k][c].lesson_group_id = k
                lessons.result[k][c].other_lessons_id = c
                arr.push(lessons.result[k][c])
                if (lessons.result[k][c].available === 0){
                    occupied_less.push(lessons.result[k][c])
                }
                if (lessons.result[k][c].availble === lessons.result[k][c].limit){
                    free_less.push(lessons.result[k][c])
                }
            }
        }
        arr.sort((a, b) => a.available > b.available ? 1 : -1);

        let json_arrary = JSON.stringify(arr)
        let json_occupied_less = JSON.stringify(occupied_less)
        let json_free_less = JSON.stringify(free_less)






        const http1 = require("http");
        http1.createServer(function(request,response){
            // console.log()
            response.end(json_arrary)
        }).listen(3001, "127.0.0.1",()=>{
            console.log("Сервер начал прослушивание запросов");
        });

        const http2 = require("http");
        http2.createServer(function(request,response){
            // console.log()
            response.end(json_occupied_less)
        }).listen(3002, "127.0.0.1",()=>{
        });

        const http3 = require("http");
        http3.createServer(function(request,response){
            // console.log()
            response.end(json_free_less)
        }).listen(3003, "127.0.0.1",()=>{
        });
    })

