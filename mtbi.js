var express = require("express");
var app = express();

var fs = require('fs');
var privateKey = fs.readFileSync('/etc/apache2/sites-available/ssl-certs/mathesis.asu.edu.key','utf8');
var certificate = fs.readFileSync('/etc/apache2/sites-available/ssl-certs/mathesis_asu_edu_cert.cer','utf8');
var credentials = {key: privateKey, cert: certificate};
var httpolyglot = require('httpolyglot');
var server = httpolyglot.createServer(credentials,function(req,res){
    if(!req.socket.encrypted){
        res.writeHead(310, {"Location" : "https://" + req.headers['host'] + req.url});
        res.end();
    }else{
        app.apply(app,arguments);
    }
});
server._connListener(3100);