"use strict";

var _athena2 = require("./athena");

var _athena3 = _interopRequireDefault(_athena2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Dependencies
var Discord = require("discord.js");
var client = new Discord.Client();

//Dependencies local


//Config
var config = require("../../config.json");

client.on('ready', function () {
	console.log("Logged in as " + client.user.tag + "!");
	var _athena = new _athena3.default();
	_athena.run();
});

client.on('message', function (msg) {
	if (msg.content === 'ping') {
		msg.reply('Pong2!');
	}
});

client.login(config.token);