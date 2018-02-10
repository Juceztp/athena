//Dependencies
require('babel-core/register');
require('babel-polyfill');
const winston = require('winston');

//Dependencies local
require('./util/capitalize');

//Config
const config = require('../../config.json');

export default class Athena {

	constructor (client, message = null) {
		this.bot = client;
		this.server = message.guild;
		this.members = message.guild.members;
		this.roles = message.guild.roles;
		this.channel = this
			.bot
			.channels
			.get(config.global.mainchannelid);
	}

	async run() {
		try {
			this.sendMessage(config.global.initialmessage);
			//Get Users on server
			const usersId = await this.bot.users
				.filter(u => this.members.get(u.id))
				.map(u => u.id);
			for (const userId of usersId) {
				try {
					await this.checkUser (userId);
				}
				catch (e) {
					winston.log('error', e);
				}
			}

			this.sendMessage(config.global.finalmessage);
			winston.log('info', 'Successfully completed update...');
			return;
		}
		catch (e) {
			winston.log('error', e);
		}
	}

	async sendMessage(message) {
		await this.channel.send(message);
		winston.log('info', `Sent message: ${message}...`);
	}

	async checkUser (userId) {
		const nickname = this.msg.guild.members ?
			this.msg.guild.members.split('-')[0].trim() :
			false;

		if (!nickname)
			return;

		const rol = await this.members.get(userId).roles
			.find( r => {
				return config.gameslist.includes(r.name);
			});

		if(!rol)
			return;

		//Get data profile
		const Game = require(`./classes/${rol.name}`);
		const _game = new Game();
		_game.searchData(userId, nickname, config.games[`${rol.name}`], this);
	}

	async changeNick(userId, nickname, prefix){
		await this.members
			.get(userId)
			.setNickname(`${prefix}${nickname}`);
		winston.log('info', `New nickname ${prefix} - ${nickname}...`);
	}

	async checkRole (userId, rankName, game) {
		const role = await this.roles
			.find(r => r.name === rankName);

		if (!role)
			return;

		// Get old role of the game
		const gameRoles = config.games[`${game}`].roles;
		const activeRole = await this.members.get(userId).roles.array()
			.find( e => gameRoles.includes(e.name));

		//Add Roles
		await this.members.get(userId).addRole(role);

		if(!activeRole)
			return;

		// Remove Role
		await this.members.get(userId).removeRole(activeRole);

		winston.log('info', `Role added ${rankName} to ${userId}...`);
	}

	async createRoles(){
		for (const game of config.gameslist) {
			const rolesOnServer = await this.roles.array()
				.map(f => f.name);
			config.games[`${game}`].roles
				.filter(r => !rolesOnServer.includes(r))
				.map(roleName => this.server.createRole({ name: roleName }));	
		}
	}
}
