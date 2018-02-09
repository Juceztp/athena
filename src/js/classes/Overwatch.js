// Dependencies
const overwatch = require('owapi');
const winston = require('winston');

const GAME = 'Overwatch';

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
			const prefix = await overwatch
				.getGeneralStats(nickname.replace('#', '-'), config.region);

			const role = prefix.rank_name.capitalize() + ' - OW';
			athena.changeNick(userId, nickname, `[${prefix.rank}]`);
			athena.checkRole(userId, role, GAME);
		}
		catch(err){
			winston.log('info', `Data not found: ${nickname}`);
			return;
		}
	}
}

module.exports = Overwatch;
