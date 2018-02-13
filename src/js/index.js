//Dependencies
const Discord = require('discord.js');
const client = new Discord.Client({ fetchAllMembers: true});
const winston = require('winston');

//Dependencies local
import Athena from './athena';

//Config
const config = require('../../config.json');

//Constant
const MINUTEINMILLISECONDS = 60000;
let timeout;

client.on('ready', () => {
	winston.log('info', `Logged in as ${client.user.tag}...`);
	winston.log('info', `With ${client.users.size} users...`);
});

client.on('message', message => {

	if (!config.global.adminsid.includes(message.author.id))
		return;

	const _athena = new Athena(client, message);
	const messageContent = message.content;

	if (messageContent === '!start')
		_athena.run();

	if (messageContent === '!start loop') {
		_athena.run();
		timeout = client.setInterval(
			() => _athena.run(),
			config.global.intervalminutetime * MINUTEINMILLISECONDS);
	}

	if (messageContent === '!roles')
		_athena.getRolesFromServer();

	if (messageContent.indexOf('!init roles') !== -1)
		_athena.createRoles(messageContent.replace('!init roles ', ''));

	if (messageContent === '!stop loop') {
		_athena.sendMessage(config.global.stoploopmessage);
		client.clearInterval(timeout);
	}

	if (messageContent === '!destroy') {
		_athena.sendMessage(config.global.destroymessage);
		client.destroy();
	}
});

client.login(config.global.token);
