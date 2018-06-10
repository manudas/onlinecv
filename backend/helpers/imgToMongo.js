/**
 * Module dependencies
 */


var fs = require('fs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// img path 
var imgPath = './backend/background.jpg';
var imgPath = './foto_perfil.jpg';
// connect to mongo
mongoose.connect('mongodb://localhost/onlinecv');

// example schema
var schema = new Schema({
    key: String, value: Buffer 
}, {
  versionKey: false, // You should be aware of the outcome after set to false
  collection: 'config'
});

// our model
var A = mongoose.model('config', schema);

mongoose.connection.on('open', function () {
  console.error('mongo is open');
    // store an img in binary in mongo
    var a = new A;
    // this way we store the image as binary data in mongodb
    a.value = fs.readFileSync(imgPath);
    // use the following to store the image as a base64 instead of binarydata
    // a.value = new Buffer(fs.readFileSync(imgPath), 'binary').toString('base64');
    // a.key = 'bgimage';
    a.key = 'profile_picture';
    a.save(function (err, a) {
      if (err) throw err;

      console.error('saved img to mongo');
      
    });

});