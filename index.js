var http = require('http');

var express = require("express"),
	app = express();

var fs = require('fs'),
	PNG = require('node-png').PNG;

app.set("view engine","ejs");
app.use(express.static(__dirname + '/public'));


app.get("/", function(req, res){
	res.render("index");
});

app.get("/:width/:height?/:color?/:alpha?", function(req, res){

	//Documention -- https://www.npmjs.com/package/node-png

	//getting color from url.
	var color = req.params.color;
	//converting hex to rgb
    var hex = parseInt(color, 16),
    	r = (hex >> 16) & 255,
    	g = (hex >> 8) & 255,
    	b = hex & 255;
	
    //creates new instance of png with height and width set in params.
	var png = new PNG({
	    width: req.params.width,
	    height: req.params.height,
	    filterType: -1
	});

	//looping over every pixel in png giving each an rgba value.

	for (var y = 0; y < png.height; y++) {
	    for (var x = 0; x < png.width; x++) {
	        var idx = (png.width * y + x) << 2;
	        png.data[idx  ] = r;
	        png.data[idx+1] = g;
	        png.data[idx+2] = b;
	        png.data[idx+3] = req.params.alpha;
	    }
	}


//We are getting an image back! but the response doesnt end...

	png.pack().pipe(res);


//Leaving my commented code so you can see some things I was trying.





	// fs.writeFile("placeholder.png", png, 'base64')

// res.send(png);

  // This opens up the writeable stream to `output`
//   var readStream = fs.createReadStream('./placeholder.png',{ flags: 'r',
//   encoding: 'base64',
//   fd: null,
//   mode: 0666,
//   autoClose: true
// });

  // readStream.pipe(res);

  // This pipes the POST data to the file
  // console.log(readStream);

  // After all the data is saved, respond with a simple html form so they can post more data

// var base64png = readStream.toString('base64');


  	// var base64Image =  readStream.toString('base64');

  	// res.send('<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABV8AAAT/'+readStream+'">');

  	// res.send('<img src="data:image/png;base64,'+base64Image+'">');

 //  	var options = {
	//   method: 'GET',
	//   headers: {
	//     'Content-Type': 'png',
	//     'Content-Length': readStream.length
	//   }
	// };

	// var req = http.request(options, function(res) {
	//   res.setEncoding('base64');
	//   res.on('data', function (chunk) {
	//     console.log('BODY: ' + chunk);
	//   });
	// });


  // req.on('start', function () {
  //   res.write(base64Image);
  //   newImg = base64Image.toString("base64");
  //   console.log(newImg);
  //   res.send('<img src="'+newImg+'"/>');
  // });

// fs.writeFile('placeholding.png', png, function (err) {
//   if (err) throw err;
//   console.log('It\'s saved!');
// });

    // Currently working on getting png data to base64 for output.

 //    var image_origial = './placeholder.png';

 //    fs.readFile(image_origial, function(err, original_data){
	//     fs.writeFile('image_orig.jpg', original_data, function(err) {});
	//     var base64Image = original_data.toString('base64');
	//     res.send('<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABV8AAAT/'+base64Image+'">');
	// });

	    // var bitmap = fs.readFileSync(png.data);
	    // console.log(bitmap);
	    // var base64Image = new Buffer().toString('base64');
	    // console.log(base64);

	// var base64Image =  new Buffer(png.data).toString("base64");

		// console.log(base64Image);

});

var server = app.listen(3000, function(){
	console.log("Hey Alex, Run 'node index.js' in console then go to http://localhost:3000/");
});

