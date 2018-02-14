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
		this.msg = message;
		this.server = message.guild;
		this.members = message.guild.members;
		this.roles = message.guild.roles;
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
		await this.msg.reply(message);
		winston.log('info', `Sent message: ${message}...`);
	}

	async checkUser (userId) {

		const dataMemberUser = await this.members.get(userId);
		//Get Nickname
		const nickname = dataMemberUser.nickname ?
			dataMemberUser.nickname
				.split('|')[0].trim() :
			false;

		if (!nickname)
			return;

		//Get Current Game Config
		const userRoles = dataMemberUser.roles
			.map (r => r.name);

		const currentGameConfig = config.games
			.find(g => userRoles.includes(g.name));

		if (!currentGameConfig)
			return;

		//Get data profile
		const Game = require(`./classes/${currentGameConfig.name.replace(/ /g, '')}`);
		const _game = new Game();
		const dataUser = await _game.searchData(nickname, currentGameConfig);

		//Set data user
		this.changeNick(userId, dataUser.nickname);
		this.checkRole(userId, dataUser.role, currentGameConfig);
	}

	async changeNick(userId, nickname){
		await this.members
			.get(userId)
			.setNickname(`${nickname}`);
		winston.log('info', `New nickname ${nickname}...`);
	}

	async checkRole (userId, rankName, game) {
		const role = await this.roles
			.find(r => r.name === rankName);

		if (!role)
			return;

		// Get old role of the game
		const gameRoles = game.roles;
		const activeRole = await this.members.get(userId).roles.array()
			.find( e => gameRoles.includes(e.name));

		if (activeRole && activeRole.name === role.name)
			return;
			
		//Add Roles
		await this.members.get(userId).addRole(role);
			
		// Remove Role
		await this.members.get(userId).removeRole(activeRole);

		winston.log('info', `Role added ${rankName} to ${userId}...`);
	}

	async createRoles(game){
		winston.log('info', `Creating roles of ${game}...`);

		if (!game)
			return;

		const gameConfig = config.games
			.find(g => g.name === game);
		winston.log('debug', gameConfig);
		const rolesOnServer = await this.roles.array()
			.map(f => f.name);
		winston.log('debug', rolesOnServer);
		gameConfig.roles
			.filter(r => !rolesOnServer.includes(r))
			.map(roleName => this.server.createRole({ name: roleName }));
		winston.log('info', 'Finished process...');
		this.sendMessage('Roles created!');
	}

	async assignRole (game) {
		try {
			winston.log('info', `Assigning ${game}...`);
			if (!game)
				return;

			this.sendMessage('Assigning...');

			//Get Users on server
			const usersId = await this.bot.users
				.filter(u => this.members.get(u.id))
				.map(u => u.id);

			//Get role
			const role = await this.roles
				.find(r => r.name === game);

			if (!role)
				return;

			for (const userId of usersId) {
				try {
					//Add Roles
					await this.members.get(userId).addRole(role);
				}
				catch (e) {
					winston.log('error', e);
				}
			}

			this.sendMessage('Role assigned to all users on the server...');
			winston.log('info', 'Role assigned to all users on the server...');
			return;
		}
		catch (e) {
			winston.log('error', e);
		}
	}
}