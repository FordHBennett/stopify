/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */


 var express = require('express'); // Express web server framework
 var fetch = require('node-fetch');
 var cors = require('cors');
 var querystring = require('querystring');
 var cookieParser = require('cookie-parser');
 const { response } = require('express');

 var client_id = 'd0b9b3b01a4c4977bb99be70d13c8e24'; // Your client id
 var client_secret = 'a79fa79340184ca6aebec28e555366f3'; // Your secret
var redirect_uri = 'https://63396d22c51f17400519d139--stoopify.netlify.app/'; // Your redirect uri

 /**
  * Generates a random string containing numbers and letters
  * @param  {number} length The length of the string
  * @return {string} The generated string
  */
 var generateRandomString = function(length) {
   var text = '';
   var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

   for (var i = 0; i < length; i++) {
     text += possible.charAt(Math.floor(Math.random() * possible.length));
   }
   return text;
 };

 var stateKey = 'spotify_auth_state';

 var app = express();

 app.use(express.static(__dirname + '/public'))
    .use(cors())
    .use(cookieParser());

 app.get('/login', function(req, res) {
   var auth_query_parameters = new URLSearchParams({
     response_type: 'code',
     client_id: client_id,
     scope: "",
     redirect_uri: redirect_uri
   })
   res.redirect('https://accounts.spotify.com/authorize?' + auth_query_parameters.toString());
 })

 app.get('/dinosaur', function(req, res) {
  console.log("dinosaur");
 })

 app.get("/callback", async (req, res) => {

   // your application requests refresh and access tokens
   // after checking the state parameter'

   const code = req.query.code;
   var body = new URLSearchParams({
     code: code,
     redirect_uri: redirect_uri,
     grant_type: "authorization_code"
   })
   const response = await fetch("https://accounts.spotify.com/api/token", {
     method: "post",
     body: body,
     headers: {
       "Content-type": "application/x-www-form-urlencoded",
       Authorization:
       "Basic " + Buffer.from(client_id + ":" + client_secret).toString("base64")
     }
   })
   const data = await response.json();
   global.access_token = data.access_token;
   res.redirect("/dashboard");
 });

 async function getData(endpoint) {
   const response = await fetch("https://api.spotify.com/v1" + endpoint, {
     method: "get",
     headers: {
       Authorization: "Bearer " + global.access_token,
     }
   })
   const data = await response.json();
   return data;
 }

 app.get("/dashboard", async (req, res) => {
  const playlists = await getData("/users/pauljwbae/playlists");
  const items = playlists.items;
  console.log("playlists retrieved");
  var playlistids = []
  items.forEach(function(item) {
    playlistids.push(item.id);
  });

  console.log("playlist IDs retrieved");
  //console.log(playlistids.length);
  //const playlist = items[1];

  //handles
  /*
  p userid
  p userid-
  p gen
  g ttl-list
  p playlst
  p bad
  p good
  */


  var songs = [];
  for(let i = 0; i<playlistids.length; i++){
    const link = "/users/pauljwbae/playlists/" + playlistids[i] + "/tracks";
    //console.log(link);
    const tracks = await getData(link);
    //console.log(tracks)
    for(let j = 0; j<tracks.items.length; j++){
      //console.log(tracks.items[j]);
      var found = false;
      for(let k = 0; k<songs.length; k++) {
        if(songs[k].name == tracks.items[j].track.name)
          found = true;
      }
      if (!found)
        songs.push(tracks.items[j].track);
    }
  }
  var genres = [];
  for(let i = 0; i<songs.length; i++) {
    console.log(songs);
    const link = "/users/pauljwbae/playlists/" + songs[i].name + "/tracks";
  }




   //const trackItems = tracks.items;
   //const track = me

 })

 console.log('Listening on 8888');
app.listen('63396d22c51f17400519d139--stoopify.netlify.app/');