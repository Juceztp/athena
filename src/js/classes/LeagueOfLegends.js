// Dependencies
const API = require('lol-riot-api-module');
const winston = require('winston');

// Local Dependencies
require('../util/capitalize');

const QUEUE_TYPE = 'RANKED_SOLO_5x5';

class LeagueOfLegends
{

	searchData(nickname, config)
	{
		const api = new API({
			key: config.key,
			region: config.region
		});

		const options = { name: nickname };

		api.getSummoner(options, (err, res) => {
			if(err){
				winston.log('info', `${err.message}: ${nickname}`);
				return;
			}

			const options = { summonerId : res.id };
			api.getSummonerLeaguePositions(options, (err, res) => {
				if(err){
					winston.log('info', `${err.message}: ${nickname}`);
					return;
				}
				if(res.length === 0){
					winston.log('info', `Not data this season for: ${nickname}`);
					return;
				}

				const pos = res.find( p => p.queueType === QUEUE_TYPE);
				
				return {
					nickname: `${nickname} | ${pos.rank}`,
					role: pos.tier.toLowerCase().capitalize() + ' - LoL'
				};
			});

		});
	}
}

module.exports = LeagueOfLegends;
