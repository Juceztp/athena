//Dependencies
require('babel-core/register');
require('babel-polyfill');
const overwatch = require('owapi');
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

	async init() {

		winston.log('info', `With ${this.bot.users.size} users...`);
		await this
			.channel
			.send(config.global.initialmessage);
		winston.log('info', 'Update started successfully...');
	}

	async run() {

		try {
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
					//Assigning nickname
					const rankName = await this.checkUser (userId);

					//Assigning role
					if (!rankName)
						continue;

					await this.checkRole (rankName.capitalize(), userId);
				}
				catch (e) {
					winston.log('error', e);
				}
			}
			
			winston.log('info', 'Successfully completed update...');
			return;
		}
		catch (e) {
			winston.log('error', e);
		}
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

		//Get data profile overwatch
		const data = await overwatch
			.getGeneralStats(battletag.replace('#', '-'), config.global.region);

		await this
			.msg
			.guild
			.members
			.get(userId)
			.setNickname(`${battletag} - ${data.rank}`);

		winston.log('info', `New nickname for ${nickname} to ${battletag} - ${data.rank}...`);

		return data.rank_name;
	}

	async checkRole (rankName, userId) {
		const role = await this
			.msg
			.guild
			.roles
			.find(r => r.name === rankName);

		if (!role)
			return;

		//Add Roles
		await this
			.msg
			.guild
			.members
			.get(userId)
			.addRole(role);

		//Remove Role
		await this
			.msg
			.guild
			.members
			.get(userId)
			.removeRoles( Object
				.values(config.global.ranks)
				.filter(r => r != role.id && r != 0)
			);

		winston.log('info', `Role added ${rankName} to ${userId}...`);

	}

	async getRolesFromServer () {
		await this
			.msg
			.guild
			.roles
			.map(async r => {
				await this
					.channel
					.send(r.name + ': ' + r.id);
			});
		winston.log('info', 'finish');
	}
}