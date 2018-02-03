//Dependencies
const Discord = require("discord.js");
const client = new Discord.Client();

//Dependencies local
import Athena from './athena';

//Config
const config = require("../../config.json");

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	const _athena = new Athena();
	_athena.run();
});

client.on('message', msg => {
	if (msg.content === 'ping') {
		msg.reply('Pong2!');
	}
});

client.login(config.token);