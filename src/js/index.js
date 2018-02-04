//Dependencies
const Discord = require('discord.js');
const client = new Discord.Client({ fetchAllMembers: true});
const winston = require('winston');

//Dependencies local
import Athena from './athena';

//Config
const config = require('../../config.json');

client.on('ready', () => {
	winston.log('info', `Logged in as ${client.user.tag}...`);

	if (config.updateusers) {
		const _athena = new Athena(client);
		_athena.init(client);
	}
});

client.on('message', message => {

	const _athena = new Athena(client, message);

	if (message.author.id === config.global.botid &&
	message.author.discriminator === config.global.botdiscriminator &&
	message.content.indexOf(config.global.initialmessage) !== -1) {
		_athena.run(client, message);
	}

	if (message.content === '!list roles')
		_athena.getRolesFromServer();
});

client.login(config.token);