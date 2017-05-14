
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var path = require('path');
/*app.engine('html', require('ejs').renderFile);
app.set('view engine','html');*/
var index = require('./routes/index');
var tasks = require('./routes/tasks');
var members = require('./routes/members');
app.use('/',express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', index);
app.use('/api', tasks);
app.use('/api', members);
app.set('port', (process.env.PORT || 5000));


app.get('/api', function (req, res) {
   res.sendFile(path.join(__dirname+'/public/','index.html'));

});





app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
module.exports = app;
/*

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var index = require('./routes/index');
var tasks = require('./routes/tasks');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public/dist'));
app.set('views', __dirname + '/public/dist/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use('/', index);
app.use('/api', tasks);


app.get('/api', function(req, res){
    res.sendFile(path.join(__dirname+'/public/dist/','index.html'));

});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

module.exports = app;
*/
