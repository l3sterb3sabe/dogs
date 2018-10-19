var express =   require("express");
var bodyParser =    require("body-parser");
var multer  =   require('multer');
const fileUpload = require('express-fileupload');
var app =   express();

app.use(bodyParser.json());
app.use(fileUpload());

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({ storage : storage }).array('userPhoto',5);

app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

app.post('/api/photo',function(req,res){
    upload(req,res,function(err) {
        //console.log(req.body);
        //console.log(req.files);
        if(err) {
            console.log(err)
            return res.end("Error uploading file.");
        }
        
        res.end("File is uploaded");
    });
});

app.post('/upload', function(req, res) {
    let n = req.files.docs.length;
    let docs = [];
    console.log(n);
    for(let i=0; i<n ; i++){
        docs.push(req.files.docs[i].data)
        console.log(req.files.docs[i].data);
    }
    res.json({
        docs : docs
    });
  });

app.listen(9000, function(){
    console.log("Listening to port 9000");
});