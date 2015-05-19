
var Router = require('routes');
var router = Router();

// Matches /WIDTHxHEIGHT/COLOR
router.addRoute("/:width(\d+)x:height(\d+)/:color(\w+)", widthHeightColor);

http.createServer(function(req, res) {
    var path = url.parse(req.url).pathname
    var match = router.match(path);
    match.fn(req, res, match);
}).listen(8888);

function widthHeightColor(req, res, match) {
    return 'Hello';
}

