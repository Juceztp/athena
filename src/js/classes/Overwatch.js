// Dependencies
const overwatch = require('owapi');
const winston = require('winston');

class Overwatch
{
	//async searchData (battletag, region)
	async searchData(athena, userId, nickname, config)
	{
		if (nickname.search('#') === -1){
			winston.log('info', `Bad format: ${nickname}`);
			return;
		}

		try{
			const generalStats = await overwatch
				.getGeneralStats(nickname.replace('#', '-'), config.region);

			const dataUser = {
				nickname: `${nickname} | ${generalStats.rank}`,
				role: generalStats.rank_name.capitalize() + ' - OW'
			};

			athena.updateUser(config, userId, dataUser);
		}
		catch(err){
			winston.log('info', `Data not found: ${nickname}`);
			return;
		}
	}
}

module.exports = Overwatch;
