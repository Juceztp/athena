// Dependencies
const overwatch = require('owapi');

// Local dependencies
const Game = require ('./Game');

class Overwatch extends Game
{
	async searchData (battletag, region)
	{
		this.data = await overwatch
			.getGeneralStats(battletag, region);
	}
}

module.exports = Overwatch;
