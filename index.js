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

app.get("/:width/:height/:color?/:alpha?", function(req, res){

	// Documentation -- https://www.npmjs.com/package/node-png

	// Getting color from url.
	var color = req.params.color;

	// Getting alpha from url.
	var alpha = req.params.alpha;

	if (typeof(color) == "undefined") {
		color = "666666";
		console.log("Color is set to default: " + color);
	}

	if (typeof(alpha) == "undefined") {
		alpha = "255";
		console.log("Alpha is set to default: " + alpha);
	} else if (alpha > 255) {
		alpha = "255";
		console.log("Alpha is set to default: " + alpha);
	}

	// Converting hex to rgb
    var hex = parseInt(color, 16),
    	r = (hex >> 16) & 255,
    	g = (hex >> 8) & 255,
    	b = hex & 255;

    // Creates new instance of png with height and width set in params.
	var png = new PNG({
	    width: req.params.width,
	    height: req.params.height,
	    filterType: -1
	});

	// Looping over every pixel in png giving each an rgba value.
	for (var y = 0; y < png.height; y++) {
	    for (var x = 0; x < png.width; x++) {
	        var idx = (png.width * y + x) << 2;
	        png.data[idx  ] = r;
	        png.data[idx+1] = g;
	        png.data[idx+2] = b;
	        png.data[idx+3] = alpha;
	    }
	}


	// We are getting an image back! but the response doesnt end...
	png.pack().pipe(res);
});

var server = app.listen(3000, function(){
	console.log("Site is up. Go to http://localhost:3000/");
});

