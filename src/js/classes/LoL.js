// Dependencies
const API = require('lol-riot-api-module');
const winston = require('winston');

class LoL
{
	searchData(userId, nickname, config, athena)
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
			athena.changeNick(userId, nickname, res.summonerLevel);
		});
	}
}

module.exports = LoL;
