'use strict';
const User = require('../dbSchema/user');

module.exports = function (server) {

	server.get('/', function (req, res, next) {
		if (req.session.user) {
			User.findById(req.session.user, function (err, user) {
				if (err) next(err);
				res.render("index", {title: 'наш айт', name:  user.name});
			})
		} else {
			res.render("index", {title: 'наш айт', name:  'гость'});
		}
	});

	server.get('/login', function (req, res) {
		res.render('login', {title: 'Login'});
	});

	server.post('/login', function (req, res, next) {
		var login = req.body.login;
		var password = req.body.password;
		User.findOne({name: login}, function (err, user) {
			if (err) next(err);
			if (user) {
				if ( user.checkPassword(password) ) {
					req.session.user = user._id;
					res.status(302);
					res.setHeader('Location', '/');
					res.end();
				} else {
					next();
				}
			} else {
				next();
			}
		});
	});


// var admin = new User.model({name: 'root3', password: 'pass1@'});
// admin.save(function (err) {
// 	if (err) console.log('ERROR');
// });

	//catch 404
	server.use(function (req, res, next) {
		res.render('error', {title: 'ошибка', status: 404, message: 'not found!'});
	});
}
