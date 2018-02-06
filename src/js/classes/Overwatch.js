// Dependencies
const overwatch = require('owapi');

// Local dependencies
const Game = require ('./Game');

class Overwatch extends Game
{
	//async searchData (battletag, region)
	async searchData(userId, battletag, region, athena)
	{
		this.data = (await overwatch
			.getGeneralStats(battletag, region)
		).rank;
		athena.changeNick(userId, battletag, this.data);
	}
}

module.exports = Overwatch;
