const db = require('../extensions/db');
const crypt = require('crypto');

const schemaUser = new db.Schema({
	name: {
		type: String,
		require: true,
		unique: true
	},
	hash: {
		type: String,
		require: true,
	},
	salt: {
		type: String,
		require: true
	},
	iteration: {
		type: Number,
		require: true
	},
	created: {
		type: Date,
		default: Date.now()
	}
});

schemaUser.virtual('password')
	.set(function (data) {
		this.salt = String(Math.random());
		this.iteration = parseInt(Math.random() * 10 + 2);
		this.hash = this.getHash(data);
	})
	.get(function () {
		return this.hash;
	})

schemaUser.methods.getHash = function (password) {
	c = crypt.createHmac('sha1', this.salt);
	for (var i = 0; i < this.iteration; i++) {
		c.update(password);
	}
	return c.digest('hex');
};

schemaUser.methods.checkPassword = function (password) {
	return this.getHash(password) === this.hash;
};

module.exports = db.model('User', schemaUser);

