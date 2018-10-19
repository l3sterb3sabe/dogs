var express = require('express')
var multer  = require('multer')
var bodyParser = require('body-parser');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage })
var app = express();

let dogs = [];

app.use(bodyParser.json());
app.post('/dogs', function(req, res){   
    let dogName = req.body;
    console.log(dogName);
    dogs.push(req.body.dogName);
    res.json({
        'status' : `Added ${req.body.dogName}`
    }); 
});
app.get('/dogs', function(req, res){
    res.json({
        dogs: dogs
    });
});
app.get('/dogs/:index', function(req, res){
    res.json({
        dog: dogs[req.params.index]
    });
});



app.post('/profile', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})

app.post('/docs', upload.any(), function (req, res, next) {
    console.log(req.files);
    res.send(200, 'Success');
})

var cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
app.post('/cool-profile', cpUpload, function (req, res, next) {
  // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
  //
  // e.g.
  //  req.files['avatar'][0] -> File
  //  req.files['gallery'] -> Array
  //
  // req.body will contain the text fields, if there were any
})

app.listen(4000, () => {
    console.log('Listening to port 4000');
});