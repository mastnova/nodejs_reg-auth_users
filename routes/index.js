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

	server.get('/login', function (req, res, next) {
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

	server.get('/register', function (req, res, next) {
		res.render('register', {title: 'Register'});
	});

	server.post('/register', function (req, res, next) {
		let login = req.body.login;
		let password = req.body.password;
		let location;
		new User({name: login, password: password})
			.save(function (error, user) {
				if (error) {
					location = '/register';
				}
				else {
					req.session.user = user._id;
					location = '/';
				}
				res.status(302);
				res.setHeader('Location', location);
				res.end();
			});
	});

	//catch 404
	server.use(function (req, res, next) {
		res.render('error', {title: 'ошибка', status: 404, message: 'not found!'});
	});
}
