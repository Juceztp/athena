class Game
{
	updateUser(athena, config, userId, dataUser){
		athena.changeNick(userId, dataUser.nickname);
		athena.checkRole(userId, dataUser.role, config);
	}
}

module.exports = Game;
