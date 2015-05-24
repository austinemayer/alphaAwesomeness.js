
var express = require("express");
var app = express();

app.set("view engine","ejs");

app.get("/", function(req, res){
	res.render("index");
});

app.get("/:width/:height?/:color?", function(req, res){
	// var width = req.params.width;
	// var height = req.params.height;
	// var color = req.params.color;
	// res.render("index");

	var width = 250;
	var height = 200;
	var colordepth = 256;
	
	var img = new PNGlib(width, height, colordepth);
	var bg = img.color (200, 200, 200, 1);

	res.send('<img src="data:image/png;base64,'+img.getBase64()+'">');

	// res.render("index", {});
});

var server = app.listen(3000, function(){
	console.log("Hey Alex, Run 'node index.js' in console then go to http://localhost:3000/");
});

// Matches /WIDTHxHEIGHT/COLOR

// app.addRoute("/:width(\d+)x:height(\d+)/:color(\w+)", widthHeightColor);

// http.createServer(function(req, res) {
//     var path = url.parse(req.url).pathname
//     var match = app.match(path);
//     match.fn(req, res, match);
// }).listen(8888);

// function widthHeightColor(req, res, match) {
//     return 'Hello';
// }

