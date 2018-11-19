const request = require('request');
const config = require('../config.js');
var db = require("../database/index.js");

let getReposByUsername = (userName) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
    
  var savePromise = new Promise (function(resolve, reject) {
    let options = {
      url: `https://api.github.com/users/${userName}/repos`,
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'request',
        'Authorization': `token ${config.TOKEN}`
      }
    };
    request(options, function(err, res, body) {
      if (err) reject(err)
      var data = JSON.parse(body);
      resolve(db.save(data));
    })
  })
  return savePromise;
}



module.exports.getReposByUsername = getReposByUsername;

//https://api.github.com/users/mak21/repos
