// Dependencies
const API = require('lol-riot-api-module');
const winston = require('winston');

// Local Dependencies
require('../util/capitalize');

const Game = require('./Game');

const QUEUE_TYPE = 'RANKED_SOLO_5x5';

class LeagueOfLegends extends Game
{

	searchData(athena, userId, nickname, config)
	{
		const api = new API({
			key: config.key,
			region: config.region
		});

		const options = { name: nickname };

		try{
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
					const dataUser = {
						nickname: `${nickname} | ${pos.rank}`,
						role: pos.tier.toLowerCase().capitalize() + ' - LoL'
					};

					super.updateUser(athena, config, userId, dataUser);
				});
			});
		}
		catch(e){
			winston.log('error', e);
		}

	}
}

module.exports = LeagueOfLegends;
