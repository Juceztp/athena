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

//Constant
var MIUTEINMILLISECONDS = 60000;
var timeout = void 0;

client.on('ready', function () {
	winston.log('info', 'Logged in as ' + client.user.tag + '...');
	winston.log('info', 'With ' + undefined.bot.users.size + ' users...');
});

client.on('message', function (message) {

	if (!config.global.adminsid.includes(message.author.id)) return;

	var _athena = new _athena3.default(client, message);
	var messageContent = message.content;

	if (messageContent === '!start') _athena.run();

	if (messageContent === '!start loop') {
		_athena.run();
		timeout = client.setInterval(function () {
			return _athena.run();
		}, config.global.intervalminutetime * MIUTEINMILLISECONDS);
	}

	if (messageContent === '!roles') _athena.getRolesFromServer();

	if (messageContent === '!stop loop') {
		_athena.sendMessage(config.global.stoploopmessage);
		client.clearInterval(timeout);
	}

	if (messageContent === '!destroy') {
		_athena.sendMessage(config.global.destroymessage);
		client.destroy();
	}
});

client.login(config.token);