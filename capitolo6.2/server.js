const path = require('path')
const fs = require('fs');
const express = require('express');
const { dm, Response, init, liburno_server } = require("liburno_bklib");
const { Reset, Bold, Reverse, Red, Green, Yellow, Blue, Magenta, Cyan, White } = init();

const app = express();
var server = require('http').Server(app);

var pjson = require('./package.json');
var config=pjson.config || {}
var APPNAME=pjson.description?pjson.description:pjson.name;
const port=process.env.PORT || config.port || 3000;
config.port=port;

console.log(`\n\nRestarting ${Cyan}${Bold} ${APPNAME.toUpperCase()} ${Reset}`)

dm.start(__dirname,config);
dm.appname=APPNAME;
liburno_server(express, app, config);

var addfile=(file,pars)=> {
  console.log(`${Yellow}...${file}${Reset}`);
  app.use('/'+file, pars);  
}

server.listen(port, () => {
    console.log(`${Bold}${Green}Start server at: ${White}${port}${Reset}`);
});
console.log(`Setting errors on service.... ${Reset}`);
app.use((req, res, next)=> {
  if (req.method=='POST') {
      res.status(404).send(new Response(req,null,`missing ${req.method}: ${req.url}`))
  } else {
      fs.readFile(path.join(__dirname,'dist/index.html'),(err,data)=>{
        res.writeHeader(200, {"Content-Type": "text/html"});  
        res.write(data);  
        res.end();  
      })
  }
})