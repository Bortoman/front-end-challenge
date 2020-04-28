
var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
const router = express.Router();
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.get('/', function (req, res) {
  res.redirect('/login');
});

app.post('/login', function (req, res) {
    res.redirect('/forum');
});

app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname+'/login.html'));
});

app.get('/forum', function (req, res) {
    res.sendFile(path.join(__dirname+'/forum.html'));
});

app.get('/posts', function (req, res) {
  let json_posts = fs.readFileSync(path.join(__dirname+'/posts.json'));
  res.json(JSON.parse(json_posts));
});

app.post('/forum', function (req, res) {
    let raw_posts = fs.readFileSync(path.join(__dirname+'/posts.json'));
    let json = JSON.parse(raw_posts);
    let post = {
      body : req.body.post_body
    }
    json.posts.push(post);
    let data = JSON.stringify(json);
    fs.writeFileSync(path.join(__dirname+'/posts.json'), data);
    res.sendFile(path.join(__dirname+'/forum.html'));
});


app.use('/', router);
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});