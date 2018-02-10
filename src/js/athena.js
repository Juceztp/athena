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
		this.channel = this
			.bot
			.channels
			.get(config.global.mainchannelid);
	}

	async run() {

		try {
			this.sendMessage(config.global.initialmessage);
			//Get Users on server
			const usersId = await this
				.bot
				.users
				.filter(u =>
					this
						.msg
						.guild
						.members
						.get(u.id)
				).map(u => u.id);

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
		await this
			.channel
			.send(message);
		winston.log('info', `Sent message: ${message}...`);
	}

	async checkUser (userId) {

		let nickname = this
			.msg
			.guild
			.members
			.get(userId)
			.nickname;

		if (!nickname)
			return;

		nickname = nickname
			.split('-')[0]
			.trim();

		let rol = await this
			.msg
			.guild
			.members
			.get(userId)
			.roles
			.find( r => {
				return config.gameslist.includes(r.name);
			});

		if(!rol)
			return;

		//Get data profile
		let Game = require(`./classes/${rol.name}`);
		let _game = new Game();

		_game.searchData(userId, nickname, config.games[`${rol.name}`], this);
	}

	async changeNick(userId, nickname, prefix){

		await this
			.msg
			.guild
			.members
			.get(userId)
			.setNickname(`${prefix}${nickname}`);

		winston.log('info', `New nickname ${prefix} - ${nickname}...`);
	}

	async checkRole (userId, rankName, game) {
		const role = await this
			.msg
			.guild
			.roles
			.find(r => r.name === rankName);

		if (!role)
			return;

		// Get old role of the game
		const gameRoles = config.games[`${game}`].roles;
		const activeRole = await this
			.msg
			.guild
			.members
			.get(userId)
			.roles
			.array()
			.find( e => gameRoles.includes(e.name));

		if(activeRole){
			// Remove Role
			await this
				.msg
				.guild
				.members
				.get(userId)
				.removeRole(activeRole);
		}

		//Add Roles
		await this
			.msg
			.guild
			.members
			.get(userId)
			.addRole(role);

		winston.log('info', `Role added ${rankName} to ${userId}...`);

	}

	async createRoles(){
		config.gameslist.forEach( async (game) => {
			const gameRoles = config.games[`${game}`].roles;
			let nameGuildRoles = [];
			await this
				.msg
				.guild
				.roles
				.array()
				.forEach( e => {
					nameGuildRoles.push(e.name);
				});

			const newRoles = gameRoles.filter( f => nameGuildRoles.includes(f) === false);

			newRoles.forEach( f => {
				this.msg.guild.createRole({ name: f});
			});
		});
	}
}
