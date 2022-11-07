
let url = "https://my.itmo.ru/api/sport/my_sport/schedule/available/limits";
process.env.TOKEN = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIwSVliSmNVLW1wbEdBdzhFMzNSNkNKTUdWa3hZdUQ2eUItdWt3RlBJOXV3In0.eyJleHAiOjE2Njc4MjM0OTAsImlhdCI6MTY2NzgyMTY5MCwiYXV0aF90aW1lIjoxNjY3ODIxNjg5LCJqdGkiOiJhMzY5ZDhiNi05ZDRkLTRlOGItOWQ3ZC1iYTU0OGU3ZDU4MzMiLCJpc3MiOiJodHRwczovL2lkLml0bW8ucnUvYXV0aC9yZWFsbXMvaXRtbyIsImF1ZCI6InlhbmRleCIsInN1YiI6ImFlOTI4NzdiLTc4NzktNDQ4Ni1hYjE5LTdjNjM1MmRhOTQ5ZSIsInR5cCI6IkJlYXJlciIsImF6cCI6InN0dWRlbnQtcGVyc29uYWwtY2FiaW5ldCIsInNlc3Npb25fc3RhdGUiOiI2NWU1NWI2ZC1kMGRkLTQ1YjktOTlhMC04MWE5NGU1YzQ4NzYiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cHM6Ly9teS5pdG1vLnN1IiwiaHR0cHM6Ly9teS5pdG1vLnJ1IiwiaHR0cHM6Ly9lbWJlZC5pZm1vLnJ1IiwiaHR0cHM6Ly9pc3UuaWZtby5ydSJdLCJyZXNvdXJjZV9hY2Nlc3MiOnsieWFuZGV4Ijp7InJvbGVzIjpbImVkaXQ6YWNjb3VudCJdfSwic3R1ZGVudC1wZXJzb25hbC1jYWJpbmV0Ijp7InJvbGVzIjpbImFjY2VzcyJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZWR1IHdvcmsiLCJzaWQiOiI2NWU1NWI2ZC1kMGRkLTQ1YjktOTlhMC04MWE5NGU1YzQ4NzYiLCJpc3UiOjMzMzQxMiwicHJlZmVycmVkX3VzZXJuYW1lIjoiZWdvcmpvdmlhbCJ9.dhD5t4lbyqejJLZ2mHZAwSEw-cweVLPbsf270YHPb2ByUKGieAZviGlWZ45hDVpLtjhM5Cu019L8sZPjX5jHoNTy5PHgN8Bbat3UNKM43sQUMGceq5RQZYjai98_uRwTZr_0CtKuS1SfgS41u5WC-ae6TPXnBHsRTBMq7hgmxiiw-rhSCTeVVNYFozGF4Cmirc-_mPd3_D0UtqSLLXF8M20RYPUb051xYiHzqqVu3NALZsj5R3ISoA7weK0MMbIa_dBVekVMSMMrLdV6tm8k11-YpVMC82GaFebX57lSUbrnc2zQmgqWlmCPSvQyolmhtvoIHGLYpeWW2mVgbw912Q"
let token = process.env.TOKEN;
let arr = [];
let free_less = [];
let occupied_less = [];

// console.log(process.env)


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


        const http = require("http");
        http.createServer(function(request,response){
            // console.log()
            // response.end(json_arrary)
            switch (request.url){
                case "/json_arrary":
                    response.end(json_arrary)
                    break
                case "/json_occupied_less":
                    response.end(json_occupied_less)
                    break
                case "/json_free_less":
                    response.end(json_free_less)
                    break
            }

        }).listen(3000, "127.0.0.1",()=>{
            console.log("Сервер начал прослушивание запросов");
        });

    })

