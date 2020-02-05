const http = require("http");
const express = require("express");
const api = require('./api');
const encode = require('./encoder');

const app = express();
const port = 3000;
app.set('port', port);

const server = http.createServer(app);

app.get('/boletim/:user/:senha',(req, res, next) => {
    console.log("recebendo requisição de boletim");
    async function a(){
        console.log("tratando requisição");
        let file = await api.boletim(req.params.user, req.params.senha);
        res.writeHeader(200, {"Content-Type": "text/html; charset=utf-8", "Access-Control-Allow-Origin": "*"}); 
      if(file != 'erro'){  res.write('<style>table {border-collapse: collapse;}table, td, th {border: 1px solid black;}body{font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;}</style>'+file);  }else{res.write("erro")}
            console.log("enviando resposta");
            res.end();
            console.log("fim");
            }
            a();
});
app.get('/login/:user/:senha',(req, res, next) => {
    console.log("recebendo requisição de login");
    async function a(){
        console.log("tratando requisição");
        let dados = await api.login(req.params.user, req.params.senha);
        console.log(dados);
        res.writeHeader(200, {"Content-Type": "text/json; charset=utf-8", "Access-Control-Allow-Origin": "*"}); 
       if(dados != 'erro'){ res.write('{"nome":"'+dados.nome+'","curso":"'+dados.turma+'"}');}else{res.write('erro');}  
            console.log("enviando resposta");
            res.end();
            console.log("fim");
            }
            a();
});
console.log("api escutando em http://localhost:"+port)
server.listen(port);

