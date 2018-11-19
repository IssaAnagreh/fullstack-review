const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  username: String,
  name: String,
  url: String,
  stargazers_count: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data) => {
	var promise  = new Promise(function(resolve, reject) {
		for (var i = 0; i < data.length; i++) {
			var repo = new Repo({name: data[i].name, url: data[i].owner.url, username: data[i].owner.login, stargazers_count: data[i].stargazers_count})
			repo.save(function (err) {
	      if (err) reject(err)//return console.log('BAD ERROR',handleError(err));
	      // saved!
	      console.log('saved')
	      resolve();
	    })
		}
	})
	return promise
}

let find = (name, callback) => {
	Repo.find({'username': name}, function(error, repos) {
		callback(repos);	
	})
}

let findTop = (callback) => {
	Repo.find({}).sort({'stargazers_count' : 'descending'}).limit(5).exec(function(err, repos){ callback(repos) });
}

module.exports.save = save;
module.exports.find = find;
module.exports.findTop = findTop;