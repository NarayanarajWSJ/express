var express = require('express');
var Client = require('node-rest-client').Client;
const fileUpload = require('express-fileupload');
var fs = require("fs");

var app = express();
app.use(express.static('public'));
app.use(fileUpload());

// This responds with "Hello World" on the homepage
app.get('/', function (req, res) {
   console.log("Got a GET request for the homepage");
   res.send('Hello GET');
})

// This responds a POST request for the homepage
app.post('/', function (req, res) {
   console.log("Got a POST request for the homepage");
   res.send('Hello POST');
})

// This responds a DELETE request for the /del_user page.
app.delete('/del_user', function (req, res) {
   console.log("Got a DELETE request for /del_user");
   res.send('Hello DELETE');
})

// This responds a GET request for the /list_user page.
app.get('/list_user', function (req, res) {
   console.log("Got a GET request for /list_user");
   res.send('Page Listing');
})

// This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get('/ab*cd', function(req, res) {   
   console.log("Got a GET request for /ab*cd");
   res.send('Page Pattern Match');
})

app.get('/process_get', function (req, res) {
    // Prepare output in JSON format
    response = {
       first_name:req.query.first_name,
       last_name:req.query.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
 })

 app.get('/login', function (req, res) {
    // Prepare output in JSON format
    response = {
        email:req.query.email,
        password:req.query.password
    };
    console.log('email :' + response.email);
    console.log('password :' + response.password);
    var client = new Client();
    var args = {
        data:{
            email:req.query.email,
            password:req.query.password
        },
        headers: { "Content-Type": "application/json" }
    };
        client.post("https://work-study-japan.herokuapp.com/api/UserWSJs/login?access_token=ZuLPJp0WCMZtQgFIFFAYVuP6NkiMTesbLjOKndnPCJlSwRiZNLffHymK090sV3HI", args, function (data, response) {
        // parsed response body as js object
        console.log(data);
        // raw response
        if(data.error){
            console.log(data.error);
            res.end(JSON.stringify(data.error.code));
        }else{
            console.log(data.id);
            res.end(JSON.stringify(data.id));
        }
        
    });
 })

//  app.post('/file_upload', function (req, res) {
//     console.log(req.files.file.name);
//     console.log(req.files.file.path);
//     console.log(req.files.file.type);
//     var file = __dirname + "/" + req.files.file.name;
    
//     fs.readFile( req.files.file.path, function (err, data) {
//        fs.writeFile(file, data, function (err) {
//           if( err ){
//              console.log( err );
//              }else{
//                 response = {
//                    message:'File uploaded successfully',
//                    filename:req.files.file.name
//                 };
//              }
//           console.log( response );
//           res.end( JSON.stringify( response ) );
//        });
//     });
//  })

 app.post('/upload', function(req, res) {
    if (!req.files)
    return res.status(400).send('No files were uploaded.');
    console.log(req.files.file.name); // the uploaded file object
    console.log(req.files.file);
    req.files.file.mv('public/' + req.files.file.name, function(err) {
        if (err){
         console.log(err);
            return res.status(500).send(err);
        }
     
        res.send('File uploaded!');
      });
  });

var server = app.listen(4000, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})