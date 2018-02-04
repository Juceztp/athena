'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//Dependencies
require('babel-core/register');
require('babel-polyfill');
var overwatch = require('owapi');
var winston = require('winston');

//Dependencies local
require('./util/capitalize');

//Config
var config = require('../../config.json');

var Athena = function () {
	function Athena(client) {
		var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

		_classCallCheck(this, Athena);

		this.bot = client;
		this.msg = message;
	}

	_createClass(Athena, [{
		key: 'init',
		value: function () {
			var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
				var channel;
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:

								winston.log('info', 'With ' + this.bot.users.size + ' users...');
								channel = this.bot.channels.get(config.global.mainchannelid);
								_context.next = 4;
								return channel.send(config.global.initialmessage);

							case 4:
								winston.log('info', 'Update started successfully...');

							case 5:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function init() {
				return _ref.apply(this, arguments);
			}

			return init;
		}()
	}, {
		key: 'run',
		value: function () {
			var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
				var _this = this;

				var usersId, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, userId, rankName;

				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								_context2.prev = 0;
								_context2.next = 3;
								return this.bot.users.filter(function (u) {
									return _this.msg.guild.members.get(u.id);
								}).map(function (u) {
									return u.id;
								});

							case 3:
								usersId = _context2.sent;
								_iteratorNormalCompletion = true;
								_didIteratorError = false;
								_iteratorError = undefined;
								_context2.prev = 7;
								_iterator = usersId[Symbol.iterator]();

							case 9:
								if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
									_context2.next = 21;
									break;
								}

								userId = _step.value;
								_context2.next = 13;
								return this.checkUser(userId);

							case 13:
								rankName = _context2.sent;

								if (rankName) {
									_context2.next = 16;
									break;
								}

								return _context2.abrupt('continue', 18);

							case 16:
								_context2.next = 18;
								return this.checkRole(rankName.capitalize(), userId);

							case 18:
								_iteratorNormalCompletion = true;
								_context2.next = 9;
								break;

							case 21:
								_context2.next = 27;
								break;

							case 23:
								_context2.prev = 23;
								_context2.t0 = _context2['catch'](7);
								_didIteratorError = true;
								_iteratorError = _context2.t0;

							case 27:
								_context2.prev = 27;
								_context2.prev = 28;

								if (!_iteratorNormalCompletion && _iterator.return) {
									_iterator.return();
								}

							case 30:
								_context2.prev = 30;

								if (!_didIteratorError) {
									_context2.next = 33;
									break;
								}

								throw _iteratorError;

							case 33:
								return _context2.finish(30);

							case 34:
								return _context2.finish(27);

							case 35:

								winston.log('info', 'Successfully completed update...');
								return _context2.abrupt('return');

							case 39:
								_context2.prev = 39;
								_context2.t1 = _context2['catch'](0);

								winston.log('error', _context2.t1);

							case 42:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this, [[0, 39], [7, 23, 27, 35], [28,, 30, 34]]);
			}));

			function run() {
				return _ref2.apply(this, arguments);
			}

			return run;
		}()
	}, {
		key: 'checkUser',
		value: function () {
			var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(userId) {
				var nickname, battletag, data;
				return regeneratorRuntime.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								nickname = this.msg.guild.members.get(userId).nickname;

								if (nickname) {
									_context3.next = 3;
									break;
								}

								return _context3.abrupt('return');

							case 3:
								battletag = nickname.split('-')[0].trim();

								if (!(!battletag || battletag.search('#') === -1)) {
									_context3.next = 6;
									break;
								}

								return _context3.abrupt('return');

							case 6:
								_context3.next = 8;
								return overwatch.getGeneralStats(battletag.replace('#', '-'), config.global.region);

							case 8:
								data = _context3.sent;
								_context3.next = 11;
								return this.msg.guild.members.get(userId).setNickname(battletag + ' - ' + data.rank);

							case 11:

								winston.log('info', 'New nickname for ' + nickname + ' to ' + battletag + ' - ' + data.rank + '...');

								return _context3.abrupt('return', data.rank_name);

							case 13:
							case 'end':
								return _context3.stop();
						}
					}
				}, _callee3, this);
			}));

			function checkUser(_x2) {
				return _ref3.apply(this, arguments);
			}

			return checkUser;
		}()
	}, {
		key: 'checkRole',
		value: function () {
			var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(rankName, userId) {
				return regeneratorRuntime.wrap(function _callee4$(_context4) {
					while (1) {
						switch (_context4.prev = _context4.next) {
							case 0:
								winston.log('info', rankName);
								winston.log('info', userId);
								/*let role = await message.guild.roles.find(r => r.name === getRole(data.profile.rank));
        if (!role)
        	continue;
        	//Add Roles
        await message.guild.members.get(userId)
        	.addRole(role)
        	.then(g => console.log(`Add role for ${battletag}`))
        	.catch(e => console.log(e));
        	//Remove Role
        await message.guild.members.get(userId)
        	.removeRoles(ROLES.filter(r => r != role.id))
        	.then(g => console.log(`Remove roles for ${battletag}`))
        	.catch(e => console.log(e));*/

							case 2:
							case 'end':
								return _context4.stop();
						}
					}
				}, _callee4, this);
			}));

			function checkRole(_x3, _x4) {
				return _ref4.apply(this, arguments);
			}

			return checkRole;
		}()
	}]);

	return Athena;
}();

exports.default = Athena;