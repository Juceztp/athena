//Dependencies
require('babel-core/register');
require('babel-polyfill');
const winston = require('winston');

//Dependencies local
require('./util/capitalize');

//Config
const config = require('../../config.json');
const games = ['Overwatch', 'LoL'];

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

		const nickname = this
			.msg
			.guild
			.members
			.get(userId)
			.nickname;

		if (!nickname)
			return;

		const battletag = nickname
			.split('-')[0]
			.trim();

		if (!battletag || battletag.search('#') === -1)
			return;

		let rol = await this
				.msg
				.guild
				.members
				.get(userId)
				.roles
				.find( r => {
					return games.includes(r.name);
				});

		if(!rol)
			return;

		//Get data profile
		let Game = require(`./classes/${rol.name}`);
		let _game = new Game();

		await _game
			.searchData(userId, battletag.replace('#', '-'), config.games[`${rol.name}`].region, this);
	}

	async changeNick(userId, battletag, suffix){

		await this
			.msg
			.guild
			.members
			.get(userId)
			.setNickname(`${battletag} - ${suffix}`);

		winston.log('info', `New nickname ${battletag} - ${suffix}...`);
	}
}
