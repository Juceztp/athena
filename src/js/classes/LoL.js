// Dependencies
const API = require('lol-riot-api-module');

// Local dependencies
const Game = require ('./Game');

//Config
const config = require('../../config.json');

class LoL extends Game
{
	searchData(userId, battletag, region, athena)
	{
		const api = new API({
			key: config.games.LoL.key,
			region: region
		});
		let options = { summonerId: 419883 };

		api.getSummoner(options, (err, res) => {
			athena.changeNick(userId, battletag, res.summonerLevel);
		});
	}
}

module.exports = LoL;
