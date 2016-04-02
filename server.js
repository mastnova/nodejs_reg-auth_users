"use strict";

const express = require('express');
const request = require('request');
const engine = require('ejs-locals');
const config = require('./config/index');
const path = require('path');
const log = require('./extensions/log');

const server = express();
config.set('database:port', 5984);
server.listen( config.get('port') );

server.set( 'views', path.join( __dirname, config.get('app-view') ) );
server.set( 'view engine', config.get('view-engine') );
server.use( express.static( path.join( __dirname, config.get('app-static') ) ) );
server.engine(config.get('view-engine'), engine);
server.use( express.bodyParser() );
server.use( express.cookieParser() );
server.use( express.session({
	secret: config.get('session:secret'),
	key: config.get('session:key'),
	cookie: config.get('session:cookie')
}));

require('./routes')(server);

log.info(`server listening on ${config.get('port')}...`);

