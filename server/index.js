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
	db.find('PaulStoffregen', function(results) {
		if (!results) {
			helper.getReposByUsername('PaulStoffregen').then(function() {
				db.find('PaulStoffregen', function(resultsat) {
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

