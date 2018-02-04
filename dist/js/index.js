'use strict';

var _athena2 = require('./athena');

var _athena3 = _interopRequireDefault(_athena2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Dependencies
var Discord = require('discord.js');
var client = new Discord.Client({ fetchAllMembers: true });
var winston = require('winston');

//Dependencies local


//Config
var config = require('../../config.json');

client.on('ready', function () {
	winston.log('info', 'Logged in as ' + client.user.tag + '...');
	var _athena = new _athena3.default(client);
	_athena.init(client);
});

client.on('message', function (message) {
	if (message.author.id === config.global.botid && message.author.discriminator === config.global.botdiscriminator && message.content.indexOf(config.global.initialmessage) !== -1) {
		var _athena = new _athena3.default(client, message);
		_athena.run(client, message);
	}
});

client.login(config.token);