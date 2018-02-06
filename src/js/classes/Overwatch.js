// Dependencies
const overwatch = require('owapi');
const winston = require('winston');

class Overwatch
{
	//async searchData (battletag, region)
	async searchData(userId, nickname, config, athena)
	{
		if (nickname.search('#') === -1){
			winston.log('info', `Bad format: ${nickname}`);
			return;
		}
		
		try{
			let suffix = await overwatch
				.getGeneralStats(nickname.replace('#', '-'), config.region);

			athena.changeNick(userId, nickname, suffix.rank);
		}
		catch(err){
			winston.log('info', `Data not found: ${nickname}`);
			return;
		}
	}
}

module.exports = Overwatch;
