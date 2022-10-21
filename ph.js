let url = "https://my.itmo.ru/api/sport/my_sport/schedule/available/limits";
// let response = await fetch(url);
//
// let names = await response.json();
//
// console.log(names)
let _lessons;
let token = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIwSVliSmNVLW1wbEdBdzhFMzNSNkNKTUdWa3hZdUQ2eUItdWt3RlBJOXV3In0.eyJleHAiOjE2NjYzOTEwMjQsImlhdCI6MTY2NjM4OTIyNCwiYXV0aF90aW1lIjoxNjYwMDM1ODA2LCJqdGkiOiI3ZmRmNTkyZC04M2I3LTRlMGMtYThiMS01NzM2ZTBjYzE1MjkiLCJpc3MiOiJodHRwczovL2lkLml0bW8ucnUvYXV0aC9yZWFsbXMvaXRtbyIsImF1ZCI6InlhbmRleCIsInN1YiI6ImFlOTI4NzdiLTc4NzktNDQ4Ni1hYjE5LTdjNjM1MmRhOTQ5ZSIsInR5cCI6IkJlYXJlciIsImF6cCI6InN0dWRlbnQtcGVyc29uYWwtY2FiaW5ldCIsInNlc3Npb25fc3RhdGUiOiJiOTllMmZhOC1kZjlmLTQ3MmMtOWFiZC0wMjFmOTg5OThhNDAiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cHM6Ly9teS5pdG1vLnN1IiwiaHR0cHM6Ly9teS5pdG1vLnJ1IiwiaHR0cHM6Ly9lbWJlZC5pZm1vLnJ1IiwiaHR0cHM6Ly9pc3UuaWZtby5ydSJdLCJyZXNvdXJjZV9hY2Nlc3MiOnsieWFuZGV4Ijp7InJvbGVzIjpbImVkaXQ6YWNjb3VudCJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZWR1IHdvcmsiLCJzaWQiOiJiOTllMmZhOC1kZjlmLTQ3MmMtOWFiZC0wMjFmOTg5OThhNDAiLCJpc3UiOjMzMzQxMiwicHJlZmVycmVkX3VzZXJuYW1lIjoiZWdvcmpvdmlhbCJ9.gOmyDAeNAH2muTDASPZFuN1smNvhTqHlr-kNWyaxrmjpy2ODGXmQVtKaF2sC9Zc2CjI1xr4CGDDhdpUknfAANU6OCnuKgodK9iZ8eeV2a5K_RWIpGk1FqFjFsX25Rb0_7BHvMRS-eFvUTrmxrvV0XTAqII5h2bpz0tOuntiU1veidDNfY4NNUxDVoqEODqFPNnr91thMHpoFexxsHDA2lSE72QN4Ws9qGxjvksXjpFrJZol901Pl2TTJXjVaVNrfZ8fpzyuGxGr4y_6PJ7-5vB6w8g44EM5VvgAgvi1tRmOXsILtU79aBZRwWuukCDNreRUZ6pnDjQ6Qp-LxCmySHA"
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
 // .then(commits => console.log(commits))
    .then(lessons => {

        // console.log(lessons.result)

        for (var k in lessons.result){
            // console.log(k)
            for (var c in lessons.result[k]){
                // console.log(lessons.result[k][c])
                lessons.result[k][c].less = k
                lessons.result[k][c].time = c
                arr.push(lessons.result[k][c])
                if (lessons.result[k][c].available === 0){
                    occupied_less.push(lessons.result[k][c])
                }
                if (lessons.result[k][c].availble === lessons.result[k][c].limit){
                    free_less.push(lessons.result[k][c])
                }
            }
        }
        // console.log(arr[1])
        arr.sort((a, b) => a.available > b.available ? 1 : -1);
        // console.log(arr)
        console.log(occupied_less)
        // console.log(occupied_less)
        // console.log(occupied_less)
        // console.log(occupied_less)
        // console.log(occupied_less)

    })
