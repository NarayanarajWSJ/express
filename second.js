var express = require('express');
var app = express();
app.route('/Node',get(function(req,res)
{
    res.send("Tutorial on Node");
}));
