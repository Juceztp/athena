// Dependencies
const API = require('lol-riot-api-module');
const winston = require('winston');

// Local Dependencies
require('../util/capitalize');


//Constant
const QUEUE_TYPE = 'RANKED_SOLO_5x5';
const getSummoner = (api, nickname) =>
	new Promise(function (resolve, reject) {
		api.getSummoner({ name: nickname }, (err, data) => {
			if (err)
				reject(err);
			resolve(data);
		});
	});
const getSummonerLeaguePositions = (api, id) =>
	new Promise(function (resolve, reject) {
		api.getSummonerLeaguePositions({ summonerId: id }, (err, data) => {
			if (err)
				reject(err);
			resolve(data);
		});
	});

class LeagueOfLegends {
	async searchData(nickname, config) {
		try {
			const api = new API({
				key: config.key,
				region: config.region
			});

			const summoner = await getSummoner(api, nickname);
			const summonerLeaguePosition = await getSummonerLeaguePositions(api, summoner.id);
			const pos = summonerLeaguePosition.find(p => p.queueType === QUEUE_TYPE);

			return {
				nickname: `${nickname} | ${pos.rank}`,
				role: pos.tier.toLowerCase().capitalize() + ' - LoL'
			};
		}
		catch (e) {
			winston.log('error', e);
		}
	}
}

module.exports = LeagueOfLegends;