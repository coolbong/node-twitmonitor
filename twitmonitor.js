
var express 	= require('express')
	, path 			= require('path')
	, http			= require('http')
	, SocketIO 	= require('socket.io')
	, Twitter = require('ntwitter')
	, twitterAuth = require('./twitter.json')
	;


var app			= express();
var server	= http.createServer(app);
var io			= SocketIO.listen(server);


// socket io config
io.configure(function () {
    io.set('log level', 1);
});

// express app config
app.configure(function(){
		app.set('port', process.env.PORT || 3001);
		app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
		app.use(express.bodyParser()),
		//app.use(app.router);
		//app.use(express.methodOverride());
		app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
	app.use(express.errorHandler());
});

//twitter config
var twitter = new Twitter(twitterAuth);

function formatData(data) {
	var twit = {
		created_at: data.created_at,
		text: data.text,
		userid: data.user.id,
		name: data.user.screen_name,
		img: data.user.profile_image_url.replace('_normal',''),
		thumbnail: data.user.profile_image_url
	};

	console.log(twit);
	return twit;
}

function getTwitterStream(keyword) {
    twitter.stream('statuses/filter', {track: keyword}, function (stream) {
        stream.on('data', function (data) {
            console.log('new tweet');
            //console.log(formatData(data));
            io.sockets.emit('new_tweet', formatData(data));
        });
        stream.on('error', function (err) {
            console.log('ERROR');
            console.log(err);
        });
    });
}

var keyword = "iPad Air";

getTwitterStream(keyword);

server.listen(app.get('port'), function () {
    console.log("twit monitor listening on port %d in %s mode", app.get('port'), app.settings.env);
});

