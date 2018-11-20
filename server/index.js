const express = require('express');
let app = express();

//ours
var db = require("../database/index.js");
var bodyParser = require('body-parser');
var helper = require('../helpers/github.js')
 app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());



app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
	var userName = req.body.username
	db.find(userName, function(results) {
		console.log(results)
		if (results.length === 0) {
			helper.getReposByUsername(userName).then(function() {
				db.find(userName, function(resultsat) {
					res.end(JSON.stringify(resultsat)); 
				})
			})
		} else { res.end( JSON.stringify(results) ) }
	})
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.findTop(function(results) {
		res.end(JSON.stringify(results)); 
	})
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

