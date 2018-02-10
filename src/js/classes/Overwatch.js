// Dependencies
const overwatch = require('owapi');
const winston = require('winston');

class Overwatch
{
	//async searchData (battletag, region)
	async searchData(nickname, config)
	{
		if (nickname.search('#') === -1){
			winston.log('info', `Bad format: ${nickname}`);
			return;
		}

		try{
			const dataUser = await overwatch
				.getGeneralStats(nickname.replace('#', '-'), config.region);

			return {
				nickname: `${nickname} | ${dataUser.rank}`,
				role: dataUser.rank_name.capitalize() + ' - OW'
			};
		}
		catch(err){
			winston.log('info', `Data not found: ${nickname}`);
			return;
		}
	}
}

module.exports = Overwatch;
