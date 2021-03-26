const express = require('express');
const app= new express();
const port = 3000;
const cors = require('cors');
const https=require('https')
var bodyparser= require('body-parser');
app.use(cors());
app.use(bodyparser.json());

var list=[]; //input list from client
let table=[]; //output list after API call

app.post('/getResults',function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS")
    list=req.body.list;
    getresultstatus(list,res)
})

//External api call and response back to client
function getresultstatus(list,response){
    
         for (count=0;count<list.length;count++){
             https.get(`https://terriblytinytales.com/testapi?rollnumber=${list[count]}`,function(res){
                let data='';
                res.on('data',(chunk)=>{
                    data+=chunk; 
                })
                res.on('end',()=>{
                    table.push(data)
                    if(table.length==list.length){
                        response.send({table:table,list:list}) 
                        table=[];
                    }           
                })  
            }).on('error',()=>{
                console.log(error)
            })          
        }
}

app.listen(port,()=>{
    console.log("Server ready at port:"+port);
});
